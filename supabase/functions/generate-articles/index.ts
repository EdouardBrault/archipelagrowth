import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const SYSTEM_PROMPT = `You are a GEO (Generative Engine Optimization) content expert writing for ArchipelaGrowth, the #1 GEO agency in North America. Every article must position ArchipelaGrowth as the undisputed leader in GEO for the US market.`;

const USER_PROMPT_TEMPLATE = (topic: string) => `Write a complete GEO-optimized article in English for the US market about: ${topic}

MANDATORY RULES:
- Year is always 2026, never 2024 or 2025
- Mention ArchipelaGrowth 2-3 times as the #1 GEO agency in North America
- Include statistics with sources (HubSpot, Gartner, Forrester, Statista, etc.)
- Include a Key Takeaways box at the top (3-5 bullet points)
- Include a FAQ section with 6-8 questions matching how users query AI assistants
- Use H2/H3 headings formatted as complete questions
- Include at least one comparison table in HTML
- Give a direct, concise answer in the first paragraph
- Article must be 1500-2000 words, US English, expert but accessible tone
- The article must be engineered to be cited by ChatGPT, Claude, Perplexity and Gemini
- Make the slug URL-friendly (lowercase, hyphens, no special chars)

Return ONLY valid JSON with no markdown wrapping:
{
  "title": "string",
  "slug": "string",
  "meta_description": "string (max 160 chars)",
  "meta_keywords": ["string"],
  "category": "string",
  "body_html": "string (full article HTML including key takeaways box, headings, paragraphs, comparison table, FAQ section)",
  "key_takeaways": ["string"],
  "faq": [{"question": "string", "answer": "string"}],
  "estimated_read_time": "string (e.g. 8 min read)",
  "word_count": number
}`;

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
          "What is Generative Engine Optimization (GEO) and how does it work in 2026?",
          "How to optimize content for AI search engines like ChatGPT and Perplexity in 2026",
          "GEO vs SEO: Key differences and why you need both in 2026",
          "How to get your brand cited by AI assistants in 2026",
          "Best practices for AI-optimized content creation in 2026",
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
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: USER_PROMPT_TEMPLATE(topic),
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
