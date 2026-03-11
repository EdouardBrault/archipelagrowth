import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

    // Parse target count
    let targetCount = 15;
    try {
      const body = await req.json();
      if (body.target_count) targetCount = body.target_count;
    } catch { /* use default */ }

    console.log(`🚀 Starting daily pipeline — target: ${targetCount} articles`);

    // Step 1: Generate articles
    console.log('Step 1: Generating articles...');
    const generateRes = await fetch(`${supabaseUrl}/functions/v1/generate-articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ target_count: targetCount }),
    });

    const generateData = await generateRes.json();
    console.log(`Articles generated: ${generateData.articles_generated || 0}`);

    if (!generateRes.ok) {
      throw new Error(`Article generation failed: ${JSON.stringify(generateData)}`);
    }

    // Step 2: Index articles
    console.log('Step 2: Indexing articles...');
    const indexRes = await fetch(`${supabaseUrl}/functions/v1/index-articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
    });

    const indexData = await indexRes.json();
    console.log(`Indexed — Google: ${indexData.indexed_google || 0}, Bing: ${indexData.indexed_bing || 0}`);

    const summary = {
      success: true,
      pipeline_run_at: new Date().toISOString(),
      articles_generated: generateData.articles_generated || 0,
      generation_errors: generateData.errors?.length || 0,
      indexed_google: indexData.indexed_google || 0,
      indexed_bing: indexData.indexed_bing || 0,
    };

    console.log('✅ Pipeline complete:', JSON.stringify(summary));

    return new Response(
      JSON.stringify(summary),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Pipeline error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
