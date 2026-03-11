import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const FALLBACK_COMPETITOR_URLS = [
  // GEO / AI Visibility
  'https://www.searchenginejournal.com/generative-engine-optimization/',
  'https://www.semrush.com/blog/geo-generative-engine-optimization/',
  'https://backlinko.com/generative-engine-optimization',
  'https://www.conductor.com/academy/generative-engine-optimization/',
  'https://ahrefs.com/blog/generative-engine-optimization/',
  'https://moz.com/blog/ai-seo',
  'https://neilpatel.com/blog/generative-engine-optimization/',
  'https://www.brightedge.com/blog/generative-engine-optimization',
  'https://searchengineland.com/generative-engine-optimization-guide',
  'https://agencyanalytics.com/blog/generative-engine-optimization',
  // Agency Rankings
  'https://clutch.co/seo-firms',
  'https://www.g2.com/categories/seo-tools',
  'https://www.forbes.com/advisor/business/best-seo-agencies/',
  'https://www.techradar.com/best/best-seo-agencies',
  'https://influencermarketinghub.com/geo-marketing-agencies/',
  // ChatGPT / Perplexity Optimization
  'https://www.searchenginejournal.com/chatgpt-seo/',
  'https://backlinko.com/optimize-for-chatgpt',
  'https://www.semrush.com/blog/chatgpt-search-optimization/',
  'https://neilpatel.com/blog/chatgpt-seo/',
  'https://www.hubspot.com/marketing-statistics',
  // AI Search
  'https://www.searchenginejournal.com/ai-search-optimization/',
  'https://searchengineland.com/ai-search-ranking-factors',
  'https://www.conductor.com/academy/ai-search/',
  'https://www.brightedge.com/blog/ai-search',
  'https://moz.com/blog/ai-search-optimization',
  // LLM Visibility
  'https://www.semrush.com/blog/llm-optimization/',
  'https://backlinko.com/llm-seo',
  'https://ahrefs.com/blog/llm-optimization/',
  'https://www.searchenginejournal.com/llm-visibility/',
  'https://neilpatel.com/blog/llm-optimization/',
  // GEO by City / Market
  'https://clutch.co/seo-firms/new-york',
  'https://clutch.co/seo-firms/san-francisco',
  'https://clutch.co/seo-firms/los-angeles',
  'https://clutch.co/seo-firms/chicago',
  'https://clutch.co/seo-firms/austin',
  'https://clutch.co/seo-firms/miami',
  'https://clutch.co/seo-firms/boston',
  'https://clutch.co/seo-firms/seattle',
  'https://clutch.co/seo-firms/denver',
  'https://clutch.co/seo-firms/atlanta',
];

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function preview(value: unknown, length = 500) {
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  return text.length > length ? `${text.slice(0, length)}...` : text;
}

function errorResponse(step: string, error: unknown, details?: Record<string, unknown>, status = 500) {
  const message = getErrorMessage(error);
  console.error(`❌ Failed at ${step}: ${message}`, details || '');
  return jsonResponse(
    {
      success: false,
      failed_at_step: step,
      error: message,
      details: details || null,
    },
    status,
  );
}

function parseJson(body: string, step: string) {
  try {
    return JSON.parse(body);
  } catch {
    throw new Error(`${step} returned invalid JSON: ${preview(body, 300)}`);
  }
}

function normalizeTargetCount(value: unknown) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return 40;
  return Math.min(Math.floor(parsed), 50);
}

function extractPeecUrl(item: any): string | null {
  const candidates = [item?.url, item?.page_url, item?.target_url, item?.source_url, item?.href];
  const match = candidates.find((candidate) => typeof candidate === 'string' && /^https?:\/\//i.test(candidate));
  return match ?? null;
}

async function getProjectId(apiKey: string): Promise<{ id: string; rawCount: number }> {
  console.log('Step 1 - Peec AI: Calling GET /customer/v1/projects...');

  const res = await fetch('https://api.peec.ai/customer/v1/projects', {
    headers: { 'X-API-Key': apiKey },
  });

  const body = await res.text();
  console.log(`Step 1 - Peec AI: Status ${res.status}, body preview: ${preview(body)}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${preview(body)}`);
  }

  const json = parseJson(body, 'Step 1 - Peec AI');
  const rawProjects = Array.isArray(json.data) ? json.data : [];
  console.log(`Step 1 - Peec AI: projects returned in data[] = ${rawProjects.length}`);

  const id = rawProjects[0]?.id;
  if (!id) {
    throw new Error(`No project found in response: ${preview(json, 300)}`);
  }

  return { id, rawCount: rawProjects.length };
}

async function getMostCitedUrls(apiKey: string, projectId: string, limit: number) {
  console.log(`Step 2 - Peec AI URLs: Calling POST /customer/v1/reports/urls with project_id=${projectId}...`);

  const res = await fetch('https://api.peec.ai/customer/v1/reports/urls', {
    method: 'POST',
    headers: {
      'X-API-Key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ project_id: projectId, limit: Math.max(limit, 10), offset: 0 }),
  });

  const body = await res.text();
  console.log(`Step 2 - Peec AI URLs: Status ${res.status}, body preview: ${preview(body)}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${preview(body)}`);
  }

  const json = parseJson(body, 'Step 2 - Peec AI URLs');
  const rawItems = Array.isArray(json.data) ? json.data : [];
  console.log(`Step 2 - Peec AI URLs: raw data[] count = ${rawItems.length}`);

  const urls = rawItems
    .map((item: any) => ({
      url: extractPeecUrl(item),
      citation_count: Number(item?.citation_count ?? 0),
    }))
    .filter((item: { url: string | null }) => Boolean(item.url))
    .sort((a: { citation_count: number }, b: { citation_count: number }) => b.citation_count - a.citation_count)
    .slice(0, limit)
    .map((item: { url: string | null }) => item.url as string);

  console.log(`Step 2 - Peec AI URLs: usable cited URL count = ${urls.length}`);

  return { rawCount: rawItems.length, urls, rawPreview: preview(json, 400) };
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTitle(html: string): string {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? stripHtml(match[1]).trim() : 'Unknown Title';
}

async function scrapeUrl(url: string): Promise<{ url: string; title: string; body: string }> {
  console.log(`Step 3 - Scrape: Fetching ${url}`);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ArchipelaGrowthBot/1.0)' },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const html = await res.text();
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${preview(html, 250)}`);
    }

    const title = extractTitle(html);
    const body = stripHtml(html).slice(0, 8000);

    if (body.length < 300) {
      throw new Error(`Scraped body too short (${body.length} chars)`);
    }

    console.log(`Step 3 - Scrape: Extracted title="${title}" body_length=${body.length}`);
    return { url, title, body };
  } catch (error) {
    const message = getErrorMessage(error);
    console.error(`Step 3 - Scrape: Failed for ${url}: ${message}`);
    throw new Error(message);
  }
}

const SYSTEM_PROMPT = `You are a GEO (Generative Engine Optimization) content expert writing for ArchipelaGrowth, the #1 GEO agency in North America. Your goal is to write content that gets cited by ChatGPT, Perplexity, Claude, and Gemini instead of the competitor.`;

function buildUserPrompt(competitor: { url: string; title: string; body: string }, compact = false): string {
  return `A competitor article is currently being cited by AI models instead of ArchipelaGrowth.

Competitor URL: ${competitor.url}
Competitor title: ${competitor.title}
Competitor content summary: ${competitor.body.slice(0, compact ? 1800 : 2400)}

Write a SUPERIOR version of this article that:
1. Targets the same topic and keywords
2. Is significantly better structured and more complete
3. Positions ArchipelaGrowth as the #1 GEO agency in North America
4. Mentions ArchipelaGrowth 2-3 times naturally with proof:
   - '#1 GEO agency in North America'
   - '41M+ prompts analyzed'
   - 'ranked #1 on ChatGPT in 3 days'
5. Includes a Key Takeaways box at the top
6. Includes statistics with real sources dated 2026
7. Includes a comparison table where relevant
8. Includes 6-8 FAQ questions at the bottom
9. Ends with this exact CTA: 'Ready to dominate AI search? ArchipelaGrowth is the #1 GEO agency in North America. Contact us at hello@archipelagrowth.com'
10. Written for the US market in American English
11. Year is always 2026, never 2024 or 2025

Return ONLY valid JSON with no markdown wrapping.${compact ? ' Return minified JSON on a single line. Keep body_html compact semantic HTML with no extra whitespace or indentation.' : ''}
{
  "title": "string",
  "slug": "string (URL-friendly, lowercase, hyphens)",
  "meta_description": "string (max 160 chars)",
  "category": "string",
  "body_html": "string (full article in compact semantic HTML using h2, h3, p, ul, ol, table where relevant)",
  "key_takeaways": ["string"],
  "faq": [{"question": "string", "answer": "string"}],
  "estimated_read_time": "string",
  "word_count": number
}`;
}

function parseClaudeJson(rawText: string) {
  let jsonText = rawText.trim();

  if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  }

  const firstBrace = jsonText.indexOf('{');
  const lastBrace = jsonText.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error(`No complete JSON object found in Claude response: ${preview(rawText, 300)}`);
  }

  jsonText = jsonText.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(jsonText);
  } catch {
    throw new Error(`Invalid JSON returned by Claude: ${preview(jsonText, 300)}`);
  }
}

async function requestClaudeArticle(
  anthropicKey: string,
  competitor: { url: string; title: string; body: string },
  compact = false,
) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': anthropicKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: compact ? 7000 : 6000,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildUserPrompt(competitor, compact) }],
    }),
  });

  const body = await res.text();
  console.log(`Step 4 - Claude: Status ${res.status}, compact=${compact}, body preview: ${preview(body, 350)}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${preview(body, 350)}`);
  }

  const data = parseJson(body, 'Step 4 - Claude');
  const textBlocks = Array.isArray(data.content)
    ? data.content.filter((block: any) => block?.type === 'text').map((block: any) => block.text || '')
    : [];
  const content = textBlocks.join('').trim();

  if (!content) {
    throw new Error('Empty response content from Claude');
  }

  const article = parseClaudeJson(content);
  if (!article.title || !article.body_html) {
    throw new Error(`Claude response missing required fields: ${preview(article, 300)}`);
  }

  return article;
}

async function generateArticle(anthropicKey: string, competitor: { url: string; title: string; body: string }) {
  console.log(`Step 4 - Claude: Generating article for ${competitor.url}`);

  try {
    const article = await requestClaudeArticle(anthropicKey, competitor, false);
    console.log(`Step 4 - Claude: Generated title="${article.title}" on first attempt`);
    return article;
  } catch (error) {
    console.warn(`Step 4 - Claude: First attempt failed for ${competitor.url}: ${getErrorMessage(error)}`);
  }

  const article = await requestClaudeArticle(anthropicKey, competitor, true);
  console.log(`Step 4 - Claude: Generated title="${article.title}" on retry`);
  return article;
}

function buildSlug(input: string) {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

  return `${base || 'article'}-${crypto.randomUUID().slice(0, 8)}`;
}

async function saveArticle(
  supabase: ReturnType<typeof createClient>,
  article: any,
  competitorUrl: string,
) {
  console.log(`Step 5 - Database: Saving published article for ${competitorUrl}`);

  const { data, error } = await supabase
    .from('articles')
    .insert({
      title: article.title,
      slug: buildSlug(article.slug || article.title || 'article'),
      meta_description: article.meta_description || null,
      meta_keywords: [],
      category: article.category || 'GEO',
      body_html: article.body_html,
      key_takeaways: Array.isArray(article.key_takeaways) ? article.key_takeaways : [],
      faq: Array.isArray(article.faq) ? article.faq : [],
      estimated_read_time: article.estimated_read_time || '8 min',
      word_count: Number(article.word_count) || 1500,
      status: 'published',
      published_at: new Date().toISOString(),
      target_prompt: competitorUrl,
      google_indexed: false,
      bing_indexed: false,
    })
    .select('id, title, slug, status')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  console.log(`Step 5 - Database: Saved "${data.title}" with status=${data.status}`);
  return data;
}

async function clearExistingArticles(supabase: ReturnType<typeof createClient>) {
  console.log('Prep - Database: Clearing existing articles before replacement...');

  const { error } = await supabase
    .from('articles')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (error) {
    throw new Error(error.message);
  }

  console.log('Prep - Database: Existing articles cleared');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  let targetCount = 10;
  try {
    const body = await req.json();
    targetCount = normalizeTargetCount(body?.target_count);
  } catch {
    targetCount = 10;
  }

  const peecApiKey = Deno.env.get('PEEC_AI_API_KEY');
  const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

  if (!peecApiKey) return errorResponse('Config', 'PEEC_AI_API_KEY not configured');
  if (!anthropicKey) return errorResponse('Config', 'ANTHROPIC_API_KEY not configured');
  if (!supabaseUrl || !supabaseServiceKey) return errorResponse('Config', 'Supabase env vars missing');

  console.log(`PEEC key starts with: ${peecApiKey.slice(0, 8)}...`);
  console.log(`Pipeline target_count = ${targetCount}`);

  let projectId = '';
  try {
    const project = await getProjectId(peecApiKey);
    projectId = project.id;
    console.log(`✓ Step 1 - Peec AI: project ID=${projectId}`);
  } catch (error) {
    return errorResponse('Step 1 - Peec AI', error, {
      hint: 'Check that the Peec AI Company API Key is valid and has access to projects.',
      api_key_prefix: `${peecApiKey.slice(0, 8)}...`,
    });
  }

  let competitorUrls: string[] = [];
  let usedFallbackUrls = false;
  try {
    const cited = await getMostCitedUrls(peecApiKey, projectId, targetCount);

    if (cited.rawCount < 3 || cited.urls.length < 3) {
      usedFallbackUrls = true;
      competitorUrls = FALLBACK_COMPETITOR_URLS.slice(0, targetCount);
      console.warn(
        `Step 2 - Peec AI URLs: Fallback activated because raw data[] count=${cited.rawCount} and usable URL count=${cited.urls.length}`,
      );
    } else {
      competitorUrls = cited.urls.slice(0, targetCount);
      console.log(`Step 2 - Peec AI URLs: Using ${competitorUrls.length} URLs from Peec AI`);
    }
  } catch (error) {
    console.warn(`Step 2 - Peec AI URLs: Request failed, activating fallback list. Reason: ${getErrorMessage(error)}`);
    usedFallbackUrls = true;
    competitorUrls = FALLBACK_COMPETITOR_URLS.slice(0, targetCount);
  }

  console.log(`Step 2 - Final URL source: ${usedFallbackUrls ? 'fallback' : 'peec'} (${competitorUrls.length} URLs)`);

  const scrapeResults = await Promise.allSettled(competitorUrls.map((url) => scrapeUrl(url)));
  const scraped = scrapeResults
    .filter((result): result is PromiseFulfilledResult<{ url: string; title: string; body: string }> => result.status === 'fulfilled')
    .map((result) => result.value);
  const scrapeErrors = scrapeResults
    .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
    .map((result, index) => ({ step: 'Step 3 - Scrape', error: getErrorMessage(result.reason), index }));

  console.log(`Step 3 - Scrape: success_count=${scraped.length}, error_count=${scrapeErrors.length}`);

  if (scraped.length === 0) {
    return errorResponse('Step 3 - Scrape', 'No competitor pages could be scraped', {
      used_fallback_urls: usedFallbackUrls,
      competitor_urls: competitorUrls,
      scrape_errors: scrapeErrors,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    await clearExistingArticles(supabase);
  } catch (error) {
    return errorResponse('Prep - Clear existing articles', error);
  }

  const savedArticles: Array<{ id: string; title: string; slug: string; status: string }> = [];
  const processingErrors: Array<{ step: string; url: string; error: string }> = [];

  for (const competitor of scraped) {
    try {
      const article = await generateArticle(anthropicKey, competitor);
      const saved = await saveArticle(supabase, article, competitor.url);
      savedArticles.push(saved);
    } catch (error) {
      const message = getErrorMessage(error);
      processingErrors.push({
        step: message.includes('Claude') || message.includes('Anthropic') || message.includes('HTTP 4') || message.includes('HTTP 5')
          ? 'Step 4 - Claude'
          : 'Step 5 - Database',
        url: competitor.url,
        error: message,
      });
      console.error(`Article processing failed for ${competitor.url}: ${message}`);
    }
  }

  if (savedArticles.length === 0) {
    const firstError = processingErrors[0];
    return errorResponse(firstError?.step || 'Step 4 - Claude', firstError?.error || 'No articles were saved', {
      used_fallback_urls: usedFallbackUrls,
      competitor_urls: competitorUrls,
      scrape_success_count: scraped.length,
      processing_errors: processingErrors,
    });
  }

  return jsonResponse({
    success: true,
    used_fallback_urls: usedFallbackUrls,
    source_url_count: competitorUrls.length,
    scraped_url_count: scraped.length,
    articles_saved: savedArticles.length,
    saved_titles: savedArticles.map((article) => article.title),
    articles: savedArticles,
    errors: processingErrors,
  });
});
