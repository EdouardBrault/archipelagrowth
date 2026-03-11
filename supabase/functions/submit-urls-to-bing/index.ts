
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SubmitUrlsRequest {
  urls: string[]
  siteUrl?: string
}

interface BingApiResponse {
  d: any
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { urls, siteUrl = 'https://archipelmarketing.com' }: SubmitUrlsRequest = await req.json()

    if (!urls || urls.length === 0) {
      console.error('❌ No URLs provided in request');
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid request' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const bingApiKey = Deno.env.get('BING_WEBMASTER_API_KEY')
    if (!bingApiKey) {
      console.error('❌ Bing API key not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Service configuration error' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      )
    }

    console.log(`📤 Submitting ${urls.length} URLs to Bing for site: ${siteUrl}`)

    // Bing allows max 10 URLs per request
    const batches = []
    for (let i = 0; i < urls.length; i += 10) {
      batches.push(urls.slice(i, i + 10))
    }

    const results = []

    for (const batch of batches) {
      console.log(`🔄 Processing batch of ${batch.length} URLs:`, batch)

      const bingPayload = {
        siteUrl: siteUrl,
        urlList: batch
      }

      const bingResponse = await fetch(
        `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${bingApiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Host': 'ssl.bing.com'
          },
          body: JSON.stringify(bingPayload)
        }
      )

      if (!bingResponse.ok) {
        const errorText = await bingResponse.text()
        console.error(`❌ Bing API error for batch:`, errorText)
        
        return new Response(
          JSON.stringify({ success: false, error: 'External service error' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
        )
      }

      const bingResult: BingApiResponse = await bingResponse.json()
      console.log(`✅ Batch submitted successfully:`, bingResult)

      results.push({
        urls: batch,
        success: true,
        response: bingResult
      })

      // Log submission to database
      try {
        await supabaseClient
          .from('bing_url_submissions')
          .insert([{
            site_url: siteUrl,
            urls_submitted: batch,
            submission_date: new Date().toISOString(),
            status: 'success',
            bing_response: bingResult
          }])
      } catch (dbError) {
        console.error('❌ Error logging to database:', dbError)
        // Don't fail the whole operation if logging fails
      }

      // Small delay between batches to be respectful to Bing API
      if (batches.length > 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        totalUrls: urls.length,
        batchesProcessed: batches.length,
        results: results
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('💥 Error in submit-urls-to-bing function:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred processing your request'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
