
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePipelineArticles } from "@/hooks/usePipelineArticles";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/i18n";

const TAG_STYLES: Record<string, string> = {
  "GEO": "text-[#0043F1] border-[#0043F1]",
  "GEO Agency": "text-[#0043F1] border-[#0043F1]",
  "AI SEO Agency": "text-[#80FFE7] border-[#80FFE7]",
  "AIO Agency": "text-[#061941] border-[#061941]",
};

const LatestArticles = () => {
  const { articles, isLoading } = usePipelineArticles();
  const { t, localePath } = useLanguage();
  const displayedArticles = articles.slice(0, 4);

  if (!isLoading && displayedArticles.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-4">
            <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">{t.latestArticles.badge}</span>
          </div>
          <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">{t.latestArticles.title}</span>
          </h2>
          <p className="font-inter text-[#010D3E]/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">{t.latestArticles.description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  <Skeleton className="aspect-[16/9] w-full" />
                  <div className="p-5 space-y-2"><Skeleton className="h-4 w-1/3" /><Skeleton className="h-5 w-full" /><Skeleton className="h-4 w-2/3" /></div>
                </div>
              ))
            : displayedArticles.map((article) => (
                <Link key={article.slug} to={localePath(`/blog/${article.slug}`)} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 block">
                  <div className="p-5">
                    {article.category && (
                      <span className={`px-3 py-1 text-xs font-inter font-medium rounded-full border bg-white inline-block mb-3 ${TAG_STYLES[article.category] || "text-[#0043F1] border-[#0043F1]"}`}>{article.category}</span>
                    )}
                    <h3 className="font-jakarta font-bold text-[#010D3E] text-base mb-2 line-clamp-2">{article.title}</h3>
                    <p className="font-inter text-sm text-[#010D3E]/60 mb-3 line-clamp-2">{article.meta_description}</p>
                    <span className="font-inter text-sm font-medium text-[#0043F1] inline-flex items-center gap-1">{t.latestArticles.readArticle} <span>→</span></span>
                  </div>
                </Link>
              ))}
        </div>
        <div className="text-center">
          <Button asChild className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal rounded-lg px-8">
            <Link to={localePath("/blog")} className="flex items-center gap-2">{t.latestArticles.viewBlog}<ArrowRight className="w-5 h-5" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;
