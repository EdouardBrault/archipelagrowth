import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const SITE_URL = 'https://archipelagrowth.com';

function base64url(input: string): string {
  return btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function arrayBufferToBase64url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function getGoogleAccessToken(serviceAccountJson: string): Promise<string | null> {
  try {
    const sa = JSON.parse(serviceAccountJson);

    const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
    const now = Math.floor(Date.now() / 1000);
    const claimSet = base64url(JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/indexing',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    }));

    const pemContent = sa.private_key
      .replace(/-----BEGIN PRIVATE KEY-----/g, '')
      .replace(/-----END PRIVATE KEY-----/g, '')
      .replace(/\s/g, '');

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
    const jwt = `${header}.${claimSet}.${arrayBufferToBase64url(signature)}`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      console.error('Google token error:', JSON.stringify(tokenData));
      return null;
    }
    console.log('✓ Google access token obtained');
    return tokenData.access_token;
  } catch (error) {
    console.error('Google auth error:', error);
    return null;
  }
}

async function submitToGoogle(urls: string[], accessToken: string): Promise<number> {
  let indexed = 0;
  for (const url of urls) {
    try {
      const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, type: 'URL_UPDATED' }),
      });

      if (res.ok) {
        indexed++;
        console.log(`✓ Google indexed: ${url}`);
      } else {
        const errBody = await res.text();
        console.error(`✗ Google error for ${url}: ${res.status} ${errBody}`);
      }
    } catch (err) {
      console.error(`✗ Google error for ${url}:`, err);
    }
  }
  return indexed;
}

async function submitToBing(urls: string[], indexNowKey: string): Promise<number> {
  try {
    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'archipelagrowth.com',
        key: indexNowKey,
        keyLocation: `${SITE_URL}/${indexNowKey}.txt`,
        urlList: urls,
      }),
    });

    const status = response.status;
    await response.text();

    if (status === 200 || status === 202) {
      console.log(`✓ Bing IndexNow: ${urls.length} URLs submitted (status ${status})`);
      return urls.length;
    } else {
      console.error(`✗ Bing IndexNow error: status ${status}`);
      return 0;
    }
  } catch (error) {
    console.error('Bing IndexNow error:', error);
    return 0;
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
    const googleServiceAccount = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_JSON');

    if (!indexNowKey && !googleServiceAccount) {
      return new Response(
        JSON.stringify({ error: 'Missing both INDEXNOW_KEY and GOOGLE_SERVICE_ACCOUNT_JSON secrets' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch unindexed published articles
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

    const bingArticles = articles.filter(a => !a.bing_indexed);
    const googleArticles = articles.filter(a => !a.google_indexed);
    const bingUrls = bingArticles.map(a => `${SITE_URL}/blog/${a.slug}`);
    const googleUrls = googleArticles.map(a => `${SITE_URL}/blog/${a.slug}`);

    let bingCount = 0;
    let googleCount = 0;

    // Bing IndexNow
    if (bingUrls.length > 0 && indexNowKey) {
      bingCount = await submitToBing(bingUrls, indexNowKey);
      if (bingCount > 0) {
        for (const article of bingArticles) {
          await supabase.from('articles').update({
            bing_indexed: true,
            bing_indexed_at: new Date().toISOString(),
          }).eq('id', article.id);
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

    // Google Indexing
    if (googleUrls.length > 0 && googleServiceAccount) {
      const accessToken = await getGoogleAccessToken(googleServiceAccount);
      if (accessToken) {
        googleCount = await submitToGoogle(googleUrls, accessToken);
        if (googleCount > 0) {
          // Only mark articles that were actually indexed
          const indexedArticles = googleArticles.slice(0, googleCount);
          for (const article of indexedArticles) {
            await supabase.from('articles').update({
              google_indexed: true,
              google_indexed_at: new Date().toISOString(),
            }).eq('id', article.id);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        indexed_bing: bingCount,
        indexed_google: googleCount,
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
