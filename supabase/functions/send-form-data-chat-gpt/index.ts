
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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const formData: FormSubmissionData = await req.json();
    
    // Determine which webhook to use based on submission type
    const isUrlOnly = formData.fields.submission_type === 'url_only';
    const urlOnlyWebhookUrl = 'https://hook.eu2.make.com/8gix27bvxecpbrwccnd1fz1ckjeju4cn';
    const fullFormWebhookUrl = 'https://hook.eu2.make.com/rrs7ybnjb54y7owyesaukrrxdx5tj8fo';
    
    const webhookUrl = isUrlOnly ? urlOnlyWebhookUrl : fullFormWebhookUrl;

    console.log('📝 Received form submission:', formData);
    console.log('🔗 Submission type:', formData.fields.submission_type);
    console.log('🎯 Using webhook:', webhookUrl);
    console.log('🔗 UTM params received:', formData.utm_params);

    // Extract all fields to root level for easy mapping in Make
    const webhookPayload = {
      form_name: formData.form_name,
      form_id: formData.form_id,
      url: formData.url,
      timestamp: formData.timestamp,
      // Individual form fields at root level
      analyzed_url: formData.fields.analyzed_url || null,
      firstName: formData.fields.firstName || null,
      lastName: formData.fields.lastName || null,
      company: formData.fields.company || null,
      position: formData.fields.position || null,
      email: formData.fields.email || null,
      phone: formData.fields.phone || null,
      brand_name: formData.fields.brand_name || null,
      submission_type: formData.fields.submission_type || null,
      form_completed: formData.fields.form_completed || false,
      // UTM parameters at root level
      utm_source: formData.utm_params?.utm_source || null,
      utm_medium: formData.utm_params?.utm_medium || null,
      utm_campaign: formData.utm_params?.utm_campaign || null,
      utm_term: formData.utm_params?.utm_term || null,
      utm_content: formData.utm_params?.utm_content || null
    };

    console.log('UTM parameters being sent to webhook:', {
      utm_source: webhookPayload.utm_source,
      utm_medium: webhookPayload.utm_medium,
      utm_campaign: webhookPayload.utm_campaign,
      utm_term: webhookPayload.utm_term,
      utm_content: webhookPayload.utm_content
    });

    console.log('Full payload being sent to webhook:', webhookPayload);

    // Send to Make.com webhook
    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error('Webhook failed:', webhookResponse.status, webhookResponse.statusText);
      throw new Error(`Webhook failed: ${webhookResponse.status}`);
    }

    console.log('Successfully sent to webhook');

    return new Response(
      JSON.stringify({ success: true, message: 'Form data sent successfully' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in send-form-data-chat-gpt function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process form submission'
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
