import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PipelineArticle {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  meta_keywords: string[] | null;
  category: string | null;
  body_html: string;
  key_takeaways: string[] | null;
  faq: any;
  estimated_read_time: string | null;
  word_count: number | null;
  published_at: string | null;
  status: string | null;
  google_indexed: boolean | null;
  bing_indexed: boolean | null;
  target_prompt: string | null;
}

/**
 * Normalize a "Blog Archipel AI" row into the PipelineArticle shape
 */
function parseFaqField(val: any): any {
  if (!val) return null;
  if (typeof val === "string") {
    try { return JSON.parse(val); } catch { return null; }
  }
  return val;
}

function normalizeBlogArchipelRow(row: any): PipelineArticle {
  return {
    id: String(row.id),
    slug: row.slug || "",
    title: row.title || "",
    meta_description: row.meta_description || row.excerpt || null,
    meta_keywords: row.tags ? row.tags.split(",").map((t: string) => t.trim()) : null,
    category: row.category || null,
    body_html: row.content || "",
    key_takeaways: null,
    faq: parseFaqField(row.faq) || parseFaqField(row.faq_sections) || null,
    estimated_read_time: row.reading_time ? `${row.reading_time} min` : null,
    word_count: row.word_count || null,
    published_at: row.published_at || null,
    status: row.status || null,
    google_indexed: null,
    bing_indexed: null,
    target_prompt: null,
  };
}

const fetchAllPublishedArticles = async (): Promise<PipelineArticle[]> => {
  // Fetch from both tables in parallel
  const [pipelineRes, blogRes] = await Promise.all([
    supabase
      .from("articles")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false }),
    supabase
      .from("Blog Archipel AI")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false }),
  ]);

  if (pipelineRes.error) console.error("Error fetching pipeline articles:", pipelineRes.error);
  if (blogRes.error) console.error("Error fetching blog articles:", blogRes.error);

  const pipelineArticles = ((pipelineRes.data || []) as unknown as PipelineArticle[]);
  const blogArticles = (blogRes.data || []).map(normalizeBlogArchipelRow);

  // Merge: pipeline first, then blog articles not already present by slug
  const slugs = new Set(pipelineArticles.map((a) => a.slug));
  const merged = [
    ...pipelineArticles,
    ...blogArticles.filter((a) => !slugs.has(a.slug)),
  ];

  // Sort by published_at descending
  merged.sort((a, b) => {
    const da = a.published_at ? new Date(a.published_at).getTime() : 0;
    const db = b.published_at ? new Date(b.published_at).getTime() : 0;
    return db - da;
  });

  return merged;
};

export const usePipelineArticles = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pipeline-articles-published"],
    queryFn: fetchAllPublishedArticles,
    staleTime: 5 * 60 * 1000,
  });

  const articles = data || [];
  const categories = [...new Set(articles.map((a) => a.category).filter(Boolean))] as string[];

  return { articles, categories, isLoading, error };
};

export const usePipelineArticleBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["pipeline-article", slug],
    queryFn: async () => {
      // Try pipeline articles table first
      const { data: pipelineData, error: pipelineError } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug!)
        .eq("status", "published")
        .maybeSingle();

      if (pipelineError) console.error("Error fetching pipeline article by slug:", pipelineError);
      if (pipelineData) return pipelineData as unknown as PipelineArticle;

      // Fallback to Blog Archipel AI table
      const { data: blogData, error: blogError } = await supabase
        .from("Blog Archipel AI")
        .select("*")
        .eq("slug", slug!)
        .eq("status", "published")
        .maybeSingle();

      if (blogError) console.error("Error fetching blog article by slug:", blogError);
      if (blogData) return normalizeBlogArchipelRow(blogData);

      return null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
