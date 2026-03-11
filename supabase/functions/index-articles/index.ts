import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const SITE_URL = 'https://archipelagrowth.com';

async function submitToIndexNow(urls: string[], indexNowKey: string): Promise<{ success: boolean; count: number }> {
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: 'archipelagrowth.com',
        key: indexNowKey,
        keyLocation: `${SITE_URL}/${indexNowKey}.txt`,
        urlList: urls,
      }),
    });

    const status = response.status;
    await response.text(); // consume body
    
    // IndexNow returns 200 or 202 on success
    if (status === 200 || status === 202) {
      console.log(`✓ IndexNow: ${urls.length} URLs submitted successfully`);
      return { success: true, count: urls.length };
    } else {
      console.error(`IndexNow error: status ${status}`);
      return { success: false, count: 0 };
    }
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return { success: false, count: 0 };
  }
}

async function submitToGoogleIndexing(urls: string[], serviceAccountJson: string): Promise<{ success: boolean; count: number }> {
  try {
    const serviceAccount = JSON.parse(serviceAccountJson);
    
    // Create JWT for Google API auth
    const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const now = Math.floor(Date.now() / 1000);
    const claimSet = btoa(JSON.stringify({
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }));

    // Import private key and sign JWT
    const pemContent = serviceAccount.private_key
      .replace(/-----BEGIN PRIVATE KEY-----/, '')
      .replace(/-----END PRIVATE KEY-----/, '')
      .replace(/\n/g, '');
    
    const binaryKey = Uint8Array.from(atob(pemContent), c => c.charCodeAt(0));
    const cryptoKey = await crypto.subtle.importKey(
      'pkcs8',
      binaryKey,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureInput = new TextEncoder().encode(`${header}.${claimSet}`);
    const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, signatureInput);
    const jwt = `${header}.${claimSet}.${btoa(String.fromCharCode(...new Uint8Array(signature)))}`;

    // Exchange JWT for access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });
    
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error('Google token error:', tokenData);
      return { success: false, count: 0 };
    }

    // Submit each URL to Google Indexing API
    let indexed = 0;
    for (const url of urls) {
      try {
        const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url, type: 'URL_UPDATED' }),
        });
        
        if (res.ok) {
          indexed++;
          console.log(`✓ Google indexed: ${url}`);
        } else {
          const errBody = await res.text();
          console.error(`Google indexing error for ${url}: ${errBody}`);
        }
      } catch (err) {
        console.error(`Google indexing error for ${url}:`, err);
      }
    }

    return { success: true, count: indexed };
  } catch (error) {
    console.error('Google Indexing setup error:', error);
    return { success: false, count: 0 };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const indexNowKey = Deno.env.get('INDEXNOW_KEY');
    const bingKey = Deno.env.get('BING_WEBMASTER_API_KEY');
    const googleServiceAccount = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON');

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch unindexed articles
    const { data: articles, error } = await supabase
      .from('articles')
      .select('id, slug, google_indexed, bing_indexed')
      .eq('status', 'published')
      .or('google_indexed.eq.false,bing_indexed.eq.false')
      .limit(50);

    if (error) throw error;
    if (!articles || articles.length === 0) {
      return new Response(
        JSON.stringify({ success: true, message: 'No articles to index', indexed_google: 0, indexed_bing: 0 }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Found ${articles.length} articles to index`);

    // Prepare URLs
    const bingUrls = articles.filter(a => !a.bing_indexed).map(a => `${SITE_URL}/blog/${a.slug}`);
    const googleUrls = articles.filter(a => !a.google_indexed).map(a => `${SITE_URL}/blog/${a.slug}`);

    let bingResult = { success: false, count: 0 };
    let googleResult = { success: false, count: 0 };

    // Submit to Bing/IndexNow
    if (bingUrls.length > 0 && indexNowKey) {
      bingResult = await submitToIndexNow(bingUrls, indexNowKey);
      
      if (bingResult.success) {
        const bingIds = articles.filter(a => !a.bing_indexed).map(a => a.id);
        for (const id of bingIds) {
          await supabase.from('articles').update({
            bing_indexed: true,
            bing_indexed_at: new Date().toISOString(),
          }).eq('id', id);
        }

        // Log submission
        await supabase.from('bing_url_submissions').insert({
          site_url: SITE_URL,
          urls_submitted: bingUrls,
          status: 'success',
          submission_date: new Date().toISOString(),
        });
      }
    }

    // Submit to Google
    if (googleUrls.length > 0 && googleServiceAccount) {
      googleResult = await submitToGoogleIndexing(googleUrls, googleServiceAccount);

      if (googleResult.success && googleResult.count > 0) {
        const googleIds = articles.filter(a => !a.google_indexed).map(a => a.id);
        for (const id of googleIds) {
          await supabase.from('articles').update({
            google_indexed: true,
            google_indexed_at: new Date().toISOString(),
          }).eq('id', id);
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        indexed_bing: bingResult.count,
        indexed_google: googleResult.count,
        total_processed: articles.length,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Indexing error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
