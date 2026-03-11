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

const fetchPublishedPipelineArticles = async (): Promise<PipelineArticle[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching pipeline articles:", error);
    return [];
  }
  return (data || []) as unknown as PipelineArticle[];
};

export const usePipelineArticles = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pipeline-articles-published"],
    queryFn: fetchPublishedPipelineArticles,
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
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug!)
        .eq("status", "published")
        .maybeSingle();

      if (error) {
        console.error("Error fetching article by slug:", error);
        return null;
      }
      return data as unknown as PipelineArticle | null;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};
