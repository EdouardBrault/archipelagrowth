import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { STATIC_ARTICLES } from "@/data/articles";

export interface DbArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  featured_image: string;
  article_image: string;
  article_image_alt: string;
  alt_text: string;
  author: string;
  published_at: string;
  reading_time: number;
  meta_title: string;
  meta_description: string;
  faq_sections: any;
  faq: any;
  status: string;
  canonical_url: string;
}

// Normalize a DB article to match the display format used in components
export const normalizeDbArticle = (a: DbArticle) => ({
  slug: a.slug || "",
  title: a.title || "",
  description: a.excerpt || "",
  category: a.category || "Agence GEO",
  tags: a.tags ? a.tags.split(",").map((t: string) => t.trim()) : [],
  image: a.featured_image || a.article_image || "",
  date: a.published_at || "",
  author: a.author || "Archipel Marketing",
  readingTime: a.reading_time || 5,
  content: a.content || "",
  faqs: extractFaqs(a),
  // Extra DB fields
  metaTitle: a.meta_title,
  metaDescription: a.meta_description,
  altText: a.alt_text || a.article_image_alt,
  articleImage: a.article_image,
  canonicalUrl: a.canonical_url,
  faqSections: a.faq_sections,
  _source: "db" as const,
});

function extractFaqs(a: DbArticle) {
  // Try faq_sections first, then faq
  if (a.faq_sections && Array.isArray(a.faq_sections) && a.faq_sections.length > 0) {
    // Flatten all questions from sections
    return a.faq_sections.flatMap((section: any) =>
      Array.isArray(section.questions) ? section.questions : []
    );
  }
  if (a.faq && Array.isArray(a.faq) && a.faq.length > 0) {
    return a.faq;
  }
  return [];
}

export type NormalizedArticle = ReturnType<typeof normalizeDbArticle>;

const fetchPublishedArticles = async (): Promise<DbArticle[]> => {
  const { data, error } = await supabase
    .from("Blog Archipel AI")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog articles:", error);
    return [];
  }
  return (data || []) as unknown as DbArticle[];
};

export const usePublishedArticles = () => {
  return useQuery({
    queryKey: ["blog-articles-published"],
    queryFn: fetchPublishedArticles,
    staleTime: 5 * 60 * 1000,
  });
};

/**
 * Merge DB articles with static articles (DB takes priority on slug conflicts).
 */
export const useMergedArticles = () => {
  const { data: dbArticles, isLoading, error } = usePublishedArticles();

  const merged = (() => {
    const dbNormalized = (dbArticles || []).map(normalizeDbArticle);
    const dbSlugs = new Set(dbNormalized.map((a) => a.slug));

    // Static articles as fallback for slugs not in DB
    const staticFallback = STATIC_ARTICLES
      .filter((a) => !dbSlugs.has(a.slug))
      .map((a) => ({ ...a, _source: "static" as const }));

    return [...dbNormalized, ...staticFallback];
  })();

  const categories = [...new Set(merged.map((a) => a.category).filter(Boolean))];

  return { articles: merged, categories, isLoading, error };
};

export const useArticleBySlug = (slug: string | undefined) => {
  // First check static articles
  const staticArticle = STATIC_ARTICLES.find((a) => a.slug === slug);

  const { data: dbArticle, isLoading, error } = useQuery({
    queryKey: ["blog-article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Blog Archipel AI")
        .select("*")
        .eq("slug", slug!)
        .eq("status", "published")
        .maybeSingle();

      if (error) {
        console.error("Error fetching article by slug:", error);
        return null;
      }
      return data as unknown as DbArticle | null;
    },
    enabled: !!slug && !staticArticle, // Only fetch from DB if not in static
    staleTime: 5 * 60 * 1000,
  });

  if (staticArticle) {
    return { article: { ...staticArticle, _source: "static" as const }, isLoading: false, error: null };
  }

  const normalized = dbArticle ? normalizeDbArticle(dbArticle) : null;
  return { article: normalized, isLoading, error };
};
