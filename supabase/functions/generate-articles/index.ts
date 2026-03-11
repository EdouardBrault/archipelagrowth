import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

function errorResponse(step: string, error: string, details?: any) {
  console.error(`❌ Failed at ${step}: ${error}`, details || '');
  return new Response(
    JSON.stringify({ success: false, failed_at_step: step, error, details: details || null }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// --- STEP 1 ---
async function getProjectId(apiKey: string): Promise<{ id: string; raw: any }> {
  console.log('Step 1: Calling GET /customer/v1/projects...');
  const res = await fetch('https://api.peec.ai/customer/v1/projects', {
    headers: { 'X-API-Key': apiKey },
  });
  const body = await res.text();
  console.log(`Step 1: Status ${res.status}, body: ${body.slice(0, 500)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${body}`);
  const json = JSON.parse(body);
  const id = json.data?.[0]?.id;
  if (!id) throw new Error(`No project found in response: ${JSON.stringify(json).slice(0, 300)}`);
  return { id, raw: json };
}

// --- STEP 2 ---
async function getMostCitedUrls(apiKey: string, projectId: string): Promise<{ urls: any[]; raw: any }> {
  console.log(`Step 2: Calling POST /customer/v1/reports/urls with project_id=${projectId}...`);
  const res = await fetch('https://api.peec.ai/customer/v1/reports/urls', {
    method: 'POST',
    headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ project_id: projectId, limit: 20, offset: 0 }),
  });
  const body = await res.text();
  console.log(`Step 2: Status ${res.status}, body: ${body.slice(0, 500)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${body}`);
  const json = JSON.parse(body);
  const urls = (json.data || [])
    .sort((a: any, b: any) => (b.citation_count || 0) - (a.citation_count || 0))
    .slice(0, 15);
  return { urls, raw: json };
}

// --- STEP 3 ---
async function getPrompts(apiKey: string, projectId: string): Promise<{ prompts: string[]; raw: any }> {
  console.log(`Step 3: Calling GET /customer/v1/prompts?project_id=${projectId}...`);
  const res = await fetch(`https://api.peec.ai/customer/v1/prompts?project_id=${projectId}`, {
    headers: { 'X-API-Key': apiKey },
  });
  const body = await res.text();
  console.log(`Step 3: Status ${res.status}, body: ${body.slice(0, 500)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${body}`);
  const json = JSON.parse(body);
  const prompts = (json.data || []).map((p: any) => p.messages?.[0]?.content).filter(Boolean);
  return { prompts, raw: json };
}

// --- STEP 4: Scrape ---
function stripHtml(html: string): string {
  return html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? stripHtml(m[1]).trim() : 'Unknown';
}

async function scrapeUrl(url: string): Promise<{ url: string; title: string; body: string } | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ArchipelaGrowthBot/1.0)' },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) { await res.text(); return null; }
    const html = await res.text();
    const body = stripHtml(html);
    if (body.length < 100) return null;
    return { url, title: extractTitle(html), body: body.slice(0, 5000) };
  } catch (err) {
    console.warn(`Scrape failed for ${url}: ${err.message}`);
    return null;
  }
}

// --- STEP 5: Generate with Claude ---
const SYSTEM_PROMPT = `You are a GEO (Generative Engine Optimization) content expert writing for ArchipelaGrowth, the #1 GEO agency in North America. Your goal is to write content that gets cited by ChatGPT, Perplexity, Claude, and Gemini instead of the competitor.`;

function buildUserPrompt(c: { url: string; title: string; body: string }): string {
  return `A competitor article is currently being cited by AI models instead of ArchipelaGrowth.

Competitor URL: ${c.url}
Competitor title: ${c.title}
Competitor content summary: ${c.body.slice(0, 2000)}

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
8. Ends with this exact CTA: 'Ready to dominate AI search? ArchipelaGrowth is the #1 GEO agency in North America. Contact us at hello@archipelagrowth.com'
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
  "estimated_read_time": "string",
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
  const body = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${body}`);
  const data = JSON.parse(body);
  const content = data.content?.[0]?.text;
  if (!content) throw new Error('Empty response from Anthropic');
  let jsonStr = content.trim();
  if (jsonStr.startsWith('```')) jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  return JSON.parse(jsonStr);
}

// --- MAIN ---
serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const peecApiKey = Deno.env.get('PEEC_AI_API_KEY');
  const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!peecApiKey) return errorResponse('Config', 'PEEC_AI_API_KEY not configured');
  if (!anthropicKey) return errorResponse('Config', 'ANTHROPIC_API_KEY not configured');
  if (!supabaseUrl || !supabaseServiceKey) return errorResponse('Config', 'Supabase env vars missing');

  console.log(`PEEC key starts with: ${peecApiKey.slice(0, 8)}...`);

  // STEP 1
  let projectId: string;
  try {
    const result = await getProjectId(peecApiKey);
    projectId = result.id;
    console.log(`✓ Step 1 passed — project ID: ${projectId}`);
  } catch (err) {
    return errorResponse('Step 1 - Get Peec AI Project ID', err.message, {
      hint: 'The API key may not be a "Company API Key". Check your Peec AI dashboard for the correct key type.',
      api_key_prefix: peecApiKey.slice(0, 8) + '...',
    });
  }

  // STEP 2
  let citedUrls: any[];
  try {
    const result = await getMostCitedUrls(peecApiKey, projectId);
    citedUrls = result.urls;
    console.log(`✓ Step 2 passed — ${citedUrls.length} cited URLs`);
    if (citedUrls.length === 0) {
      return errorResponse('Step 2 - Get Most Cited URLs', 'No cited URLs found', {
        hint: 'The Peec AI project may not have enough data yet.',
        raw_response_preview: JSON.stringify(result.raw).slice(0, 500),
      });
    }
  } catch (err) {
    return errorResponse('Step 2 - Get Most Cited URLs', err.message);
  }

  // STEP 3 (non-blocking)
  let prompts: string[] = [];
  try {
    const result = await getPrompts(peecApiKey, projectId);
    prompts = result.prompts;
    console.log(`✓ Step 3 passed — ${prompts.length} prompts`);
  } catch (err) {
    console.warn(`Step 3 warning (non-fatal): ${err.message}`);
  }

  // STEP 4: Scrape
  console.log(`Step 4: Scraping ${citedUrls.length} URLs...`);
  const scraped: { url: string; title: string; body: string }[] = [];
  for (const item of citedUrls) {
    const result = await scrapeUrl(item.url);
    if (result) {
      scraped.push(result);
      console.log(`✓ Scraped: ${result.title.slice(0, 50)}`);
    }
  }
  console.log(`✓ Step 4 done — ${scraped.length}/${citedUrls.length} scraped`);

  if (scraped.length === 0) {
    return errorResponse('Step 4 - Scrape Competitor URLs', 'No competitor pages could be scraped', {
      urls_attempted: citedUrls.map((u: any) => u.url),
    });
  }

  // Delete existing articles
  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  try {
    const { error } = await supabase.from('articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) console.warn(`Delete warning: ${error.message}`);
    console.log('✓ Existing articles deleted');
  } catch (err) {
    console.warn(`Delete warning: ${err.message}`);
  }

  // STEP 5 & 6: Generate and save
  const results: any[] = [];
  const errors: any[] = [];

  for (const competitor of scraped.slice(0, 15)) {
    try {
      console.log(`Step 5: Generating article to beat "${competitor.title.slice(0, 50)}"...`);
      const article = await generateArticle(anthropicKey, competitor);
      console.log(`✓ Article generated: ${article.title}`);

      const slug = `${(article.slug || 'article').slice(0, 80)}-${Date.now().toString(36)}`;
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
        errors.push({ url: competitor.url, step: 'DB insert', error: error.message });
      } else {
        results.push(data);
        console.log(`✓ Saved: ${data.title}`);
      }
    } catch (err) {
      errors.push({ url: competitor.url, step: 'Generate/Save', error: err.message });
      console.error(`❌ Failed for ${competitor.url}: ${err.message}`);
    }
  }

  return new Response(
    JSON.stringify({
      success: results.length > 0,
      articles_generated: results.length,
      competitors_scraped: scraped.length,
      prompts_found: prompts.length,
      articles: results,
      errors: errors.length > 0 ? errors : undefined,
    }),
    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
});
