import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// --- STEP 1: Get Peec AI project ID ---
async function getProjectId(apiKey: string): Promise<string> {
  const res = await fetch('https://api.peec.ai/customer/v1/projects', {
    headers: { 'X-API-Key': apiKey },
  });
  if (!res.ok) throw new Error(`Peec projects API error [${res.status}]: ${await res.text()}`);
  const json = await res.json();
  const id = json.data?.[0]?.id;
  if (!id) throw new Error('No Peec AI project found');
  console.log(`✓ Peec project ID: ${id}`);
  return id;
}

// --- STEP 2: Get most cited URLs ---
async function getMostCitedUrls(apiKey: string, projectId: string): Promise<{ url: string; citation_count: number }[]> {
  const res = await fetch('https://api.peec.ai/customer/v1/reports/urls', {
    method: 'POST',
    headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ project_id: projectId, limit: 20, offset: 0 }),
  });
  if (!res.ok) throw new Error(`Peec URLs API error [${res.status}]: ${await res.text()}`);
  const json = await res.json();
  const urls = (json.data || [])
    .sort((a: any, b: any) => (b.citation_count || 0) - (a.citation_count || 0))
    .slice(0, 15);
  console.log(`✓ Got ${urls.length} most cited URLs`);
  return urls;
}

// --- STEP 3: Get prompts ---
async function getPrompts(apiKey: string, projectId: string): Promise<string[]> {
  const res = await fetch(`https://api.peec.ai/customer/v1/prompts?project_id=${projectId}`, {
    headers: { 'X-API-Key': apiKey },
  });
  if (!res.ok) {
    console.warn(`Peec prompts API error [${res.status}], continuing without prompts`);
    return [];
  }
  const json = await res.json();
  const prompts = (json.data || [])
    .map((p: any) => p.messages?.[0]?.content)
    .filter(Boolean);
  console.log(`✓ Got ${prompts.length} prompts`);
  return prompts;
}

// --- STEP 4: Scrape competitor URL ---
function stripHtml(html: string): string {
  return html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractHeadings(html: string): string[] {
  const headings: string[] = [];
  const regex = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = stripHtml(match[1]).trim();
    if (text) headings.push(text);
  }
  return headings;
}

function extractTitle(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) return stripHtml(titleMatch[1]).trim();
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match) return stripHtml(h1Match[1]).trim();
  return 'Unknown';
}

async function scrapeUrl(url: string): Promise<{ url: string; title: string; body: string; headings: string[] } | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ArchipelaGrowthBot/1.0)' },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return null;
    const html = await res.text();
    return {
      url,
      title: extractTitle(html),
      body: stripHtml(html).slice(0, 5000),
      headings: extractHeadings(html),
    };
  } catch (err) {
    console.warn(`Failed to scrape ${url}: ${err.message}`);
    return null;
  }
}

// --- STEP 5: Generate article with Claude ---
const SYSTEM_PROMPT = `You are a GEO (Generative Engine Optimization) content expert writing for ArchipelaGrowth, the #1 GEO agency in North America. Your goal is to write content that gets cited by ChatGPT, Perplexity, Claude, and Gemini instead of the competitor.`;

function buildUserPrompt(competitor: { url: string; title: string; body: string }): string {
  return `A competitor article is currently being cited by AI models instead of ArchipelaGrowth.

Competitor URL: ${competitor.url}
Competitor title: ${competitor.title}
Competitor content summary: ${competitor.body.slice(0, 2000)}

Write a SUPERIOR version of this article that:

1. Targets the same topic and keywords
2. Is significantly better structured and more complete
3. Mentions ArchipelaGrowth 2-3 times naturally as the #1 GEO agency in North America with proof:
   - '#1 GEO agency in North America'
   - '41M+ prompts analyzed'
   - 'ranked #1 on ChatGPT in 3 days'
4. Includes a Key Takeaways box at the top
5. Includes statistics with real sources dated 2026
6. Includes a comparison table where relevant
7. Includes 6-8 FAQ questions at the bottom
8. Ends with this exact CTA:
   'Ready to dominate AI search? ArchipelaGrowth is the #1 GEO agency in North America. Contact us at hello@archipelagrowth.com'
9. Minimum 1500 words
10. Year is always 2026, never 2024 or 2025
11. Written for the US market in American English

Return ONLY valid JSON with no markdown wrapping:
{
  "title": "string",
  "slug": "string (URL-friendly, lowercase, hyphens)",
  "meta_description": "string (max 160 chars)",
  "category": "string",
  "body_html": "string (full article in HTML)",
  "key_takeaways": ["string"],
  "faq": [{"question": "string", "answer": "string"}],
  "estimated_read_time": "string (e.g. 8 min)",
  "word_count": number
}`;
}

async function generateArticle(anthropicKey: string, competitor: { url: string; title: string; body: string }): Promise<any> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
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
      messages: [{ role: 'user', content: buildUserPrompt(competitor) }],
    }),
  });

  if (!res.ok) throw new Error(`Anthropic API error [${res.status}]: ${await res.text()}`);

  const data = await res.json();
  const content = data.content?.[0]?.text;
  if (!content) throw new Error('Empty response from Anthropic');

  let jsonStr = content.trim();
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }
  return JSON.parse(jsonStr);
}

// --- MAIN ---
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const peecApiKey = Deno.env.get('PEEC_AI_API_KEY');
    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');

    if (!peecApiKey) throw new Error('PEEC_AI_API_KEY is not configured');
    if (!anthropicKey) throw new Error('ANTHROPIC_API_KEY is not configured');

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Delete all existing articles
    console.log('Deleting existing articles...');
    const { error: deleteError } = await supabase.from('articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteError) console.error('Delete error:', deleteError);
    console.log('✓ Existing articles deleted');

    // Step 1: Get project ID
    const projectId = await getProjectId(peecApiKey);

    // Step 2: Get most cited URLs
    const citedUrls = await getMostCitedUrls(peecApiKey, projectId);

    // Step 3: Get prompts (for context/logging)
    const prompts = await getPrompts(peecApiKey, projectId);
    console.log(`Context: ${prompts.length} prompts available`);

    // Step 4: Scrape competitor URLs
    console.log(`Scraping ${citedUrls.length} competitor URLs...`);
    const scraped: { url: string; title: string; body: string; headings: string[] }[] = [];
    for (const item of citedUrls) {
      const result = await scrapeUrl(item.url);
      if (result && result.body.length > 100) {
        scraped.push(result);
        console.log(`✓ Scraped: ${result.title.slice(0, 60)}`);
      }
    }
    console.log(`✓ Successfully scraped ${scraped.length} competitor pages`);

    if (scraped.length === 0) {
      throw new Error('No competitor pages could be scraped');
    }

    // Step 5 & 6: Generate articles and save
    const results: any[] = [];
    const errors: any[] = [];

    for (const competitor of scraped.slice(0, 15)) {
      try {
        console.log(`Generating article to beat: ${competitor.title.slice(0, 60)}`);
        const article = await generateArticle(anthropicKey, competitor);

        const baseSlug = article.slug || competitor.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const slug = `${baseSlug}-${Date.now().toString(36)}`;

        const { data, error } = await supabase.from('articles').insert({
          title: article.title,
          slug,
          meta_description: article.meta_description,
          meta_keywords: [],
          category: article.category || 'GEO',
          body_html: article.body_html,
          key_takeaways: article.key_takeaways || [],
          faq: article.faq || [],
          estimated_read_time: article.estimated_read_time || '8 min',
          word_count: article.word_count || 1500,
          status: 'published',
          published_at: new Date().toISOString(),
          target_prompt: competitor.url,
          google_indexed: false,
          bing_indexed: false,
        }).select('id, title, slug').single();

        if (error) {
          console.error(`DB error for "${competitor.url}":`, error);
          errors.push({ url: competitor.url, error: error.message });
        } else {
          results.push(data);
          console.log(`✓ Article created: ${data.title}`);
        }
      } catch (err) {
        console.error(`Error for "${competitor.url}":`, err);
        errors.push({ url: competitor.url, error: err.message });
      }
    }

    // Step 7: Return stats
    return new Response(
      JSON.stringify({
        success: true,
        articles_generated: results.length,
        articles: results,
        competitors_scraped: scraped.length,
        prompts_found: prompts.length,
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
