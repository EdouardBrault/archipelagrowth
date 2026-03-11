const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationPayload {
  type: string;
  table: string;
  record: {
    id: string;
    slug: string;
    type?: string;
    status?: string;
    canonical_url?: string;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const payload: NotificationPayload = await req.json();
    const indexNowKey = Deno.env.get('INDEXNOW_KEY');
    if (!indexNowKey) throw new Error('INDEXNOW_KEY not configured');

    const siteUrl = 'https://archipelmarketing.com';
    const pageUrl = payload.record.canonical_url || siteUrl;

    const indexNowPayload = {
      host: 'archipelmarketing.com',
      key: indexNowKey,
      keyLocation: `${siteUrl}/${indexNowKey}.txt`,
      urlList: [pageUrl],
    };

    const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(indexNowPayload),
    });

    if (!indexNowResponse.ok) throw new Error(`IndexNow API error: ${indexNowResponse.status}`);

    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(siteUrl + '/sitemap.xml')}`;
    const googleResponse = await fetch(googlePingUrl);

    return new Response(
      JSON.stringify({
        success: true,
        url: pageUrl,
        indexNowStatus: indexNowResponse.status,
        googleStatus: googleResponse.status,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error in notify-indexnow:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
