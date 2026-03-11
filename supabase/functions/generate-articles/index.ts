import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const ANTHROPIC_SYSTEM_PROMPT = `You are a GEO content expert for ArchipelaGrowth, the #1 GEO agency in the US. Write articles engineered to be cited by ChatGPT, Claude, Perplexity and Gemini. Every article must:
- Open with a Key Takeaways box (3-5 points)
- Give a direct answer in the first paragraph
- Include 4+ statistics with real sources (HubSpot, Gartner, Forrester)
- Use H2/H3 headings as complete questions
- Include a comparison table
- End with 6-8 FAQ questions matching how users query AI assistants
- Be 1500-2000 words, US English, expert but accessible tone

Return ONLY valid JSON with no markdown wrapping: {title, slug, meta_description, meta_keywords[], category, body_html, key_takeaways[], faq[{question, answer}], estimated_read_time, word_count}`;

async function fetchPeecTopics(apiKey: string): Promise<{ topics: string[] }> {
  try {
    const response = await fetch('https://app.peec.ai/api/v1/prompts', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Peec AI API error [${response.status}]: ${body}`);
      // Fallback to default GEO topics if API fails
      return {
        topics: [
          "What is Generative Engine Optimization (GEO) and how does it work?",
          "How to optimize content for AI search engines like ChatGPT and Perplexity",
          "GEO vs SEO: Key differences and why you need both in 2025",
          "How to get your brand cited by AI assistants",
          "Best practices for AI-optimized content creation",
        ]
      };
    }

    const data = await response.json();
    // Extract topic strings from Peec AI response
    const topics = Array.isArray(data) 
      ? data.map((item: any) => item.prompt || item.query || item.topic || String(item)).slice(0, 15)
      : Array.isArray(data.prompts) 
        ? data.prompts.map((p: any) => p.prompt || p.query || String(p)).slice(0, 15)
        : [];
    
    return { topics: topics.length > 0 ? topics : ["What is GEO and why does it matter for modern marketing?"] };
  } catch (error) {
    console.error('Error fetching Peec topics:', error);
    return {
      topics: [
        "What is Generative Engine Optimization (GEO)?",
        "How to optimize your website for AI-powered search",
        "GEO strategies for B2B SaaS companies",
      ]
    };
  }
}

async function generateArticle(anthropicKey: string, topic: string): Promise<any> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: ANTHROPIC_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Write a comprehensive GEO-optimized article about: "${topic}". The article should position ArchipelaGrowth as the leading expert. Make sure the slug is URL-friendly (lowercase, hyphens, no special chars).`
        }
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Anthropic API error [${response.status}]: ${body}`);
  }

  const data = await response.json();
  const content = data.content[0]?.text;
  
  if (!content) throw new Error('Empty response from Anthropic');

  // Parse JSON from response, handling potential markdown wrapping
  let jsonStr = content.trim();
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }
  
  return JSON.parse(jsonStr);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const peecApiKey = Deno.env.get('PEEC_AI_API_KEY');
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');

    if (!anthropicKey) {
      throw new Error('ANTHROPIC_API_KEY is not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse target count from request body
    let targetCount = 5;
    try {
      const body = await req.json();
      if (body.target_count) targetCount = Math.min(body.target_count, 15);
    } catch { /* use default */ }

    // Fetch topics from Peec AI
    const { topics } = await fetchPeecTopics(peecApiKey || '');
    const topicsToProcess = topics.slice(0, targetCount);

    console.log(`Generating ${topicsToProcess.length} articles...`);

    const results = [];
    const errors = [];

    for (const topic of topicsToProcess) {
      try {
        console.log(`Generating article for: ${topic}`);
        const article = await generateArticle(anthropicKey, topic);

        // Ensure slug uniqueness by appending timestamp
        const baseSlug = article.slug || topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const slug = `${baseSlug}-${Date.now().toString(36)}`;

        const { data, error } = await supabase.from('articles').insert({
          title: article.title,
          slug,
          meta_description: article.meta_description,
          meta_keywords: article.meta_keywords || [],
          category: article.category || 'GEO',
          body_html: article.body_html,
          key_takeaways: article.key_takeaways || [],
          faq: article.faq || [],
          estimated_read_time: article.estimated_read_time || '8 min',
          word_count: article.word_count || 1500,
          status: 'published',
          published_at: new Date().toISOString(),
          google_indexed: false,
          bing_indexed: false,
        }).select('id, title, slug').single();

        if (error) {
          console.error(`DB insert error for "${topic}":`, error);
          errors.push({ topic, error: error.message });
        } else {
          results.push(data);
          console.log(`✓ Article created: ${data.title}`);
        }
      } catch (err) {
        console.error(`Error generating article for "${topic}":`, err);
        errors.push({ topic, error: err.message });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        articles_generated: results.length,
        articles: results,
        errors: errors.length > 0 ? errors : undefined,
      }),
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
