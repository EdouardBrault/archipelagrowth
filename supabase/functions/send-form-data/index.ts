import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormSubmissionData {
  form_name: string;
  form_id: string;
  fields: Record<string, any>;
  url?: string;
  timestamp: string;
  utm_params?: Record<string, string | null>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: corsHeaders });

  try {
    const formData: FormSubmissionData = await req.json();
    console.log('📝 Received form data:', JSON.stringify(formData));
    console.log('🔗 UTM params received:', JSON.stringify(formData.utm_params));
    const webhookUrl = 'https://hook.eu2.make.com/icakt9b2nd3wfqsnf266r15aba7774nb';

    const utmSource = formData.utm_params?.utm_source || null;
    const utmMedium = formData.utm_params?.utm_medium || null;
    const utmCampaign = formData.utm_params?.utm_campaign || null;
    const utmTerm = formData.utm_params?.utm_term || null;
    const utmContent = formData.utm_params?.utm_content || null;

    console.log('🎯 UTM values for webhook:', { utmSource, utmMedium, utmCampaign, utmTerm, utmContent });

    const webhookPayload = {
      form_name: formData.form_name,
      form_id: formData.form_id,
      fields: formData.fields,
      url: formData.url,
      timestamp: formData.timestamp,
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
    };

    console.log('📤 Full webhook payload:', JSON.stringify(webhookPayload));

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) throw new Error(`Webhook failed: ${webhookResponse.status}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (error: any) {
    console.error('Error in send-form-data:', error);
    return new Response(JSON.stringify({ error: 'Failed to process form submission' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
};

serve(handler);
