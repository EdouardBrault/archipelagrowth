
import Layout from "@/components/Layout";
import ContactSection from "@/components/ContactSection";
import ServiceFaq from "@/components/ServiceFaq";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useMergedArticles } from "@/hooks/useBlogArticles";
import { Skeleton } from "@/components/ui/skeleton";

const TAG_STYLES: Record<string, string> = {
  "GEO": "text-[#0043F1] border-[#0043F1]",
  "Agence GEO": "text-[#0043F1] border-[#0043F1]",
  "Agence SEO IA": "text-[#80FFE7] border-[#80FFE7]",
  "Agence AIO": "text-[#061941] border-[#061941]",
  "SEO IA": "text-[#80FFE7] border-[#80FFE7]",
  "AIO": "text-[#061941] border-[#061941]",
};

const FILTER_STYLES: Record<string, { active: string; inactive: string }> = {
  "Agence GEO": { active: "bg-[#0043F1] text-white border-[#0043F1]", inactive: "bg-white text-[#0043F1] border-[#0043F1] hover:bg-[#0043F1]/5" },
  "Agence SEO IA": { active: "bg-[#010D3E] text-[#80FFE7] border-[#010D3E]", inactive: "bg-white text-[#010D3E] border-[#010D3E] hover:bg-[#010D3E]/5" },
  "Agence AIO": { active: "bg-[#061941] text-white border-[#061941]", inactive: "bg-white text-[#061941] border-[#061941] hover:bg-[#061941]/5" },
};

const ArchipelBlog = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [showSecondBubble, setShowSecondBubble] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const { articles, categories, isLoading } = useMergedArticles();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setBubbleVisible(true); setTimeout(() => setShowSecondBubble(true), 1200); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (bubbleRef.current) observer.observe(bubbleRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredArticles = activeFilter ? articles.filter((a) => a.category === activeFilter) : articles;

  return (
    <Layout>
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full inline-block mb-4">Blog</span>
          <h1 className="font-jakarta text-4xl md:text-6xl font-bold mb-6" style={{ background: "linear-gradient(to bottom, #000000, #001354)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            All Articles
          </h1>
          <p className="font-inter text-[#010D3E]/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Discover our latest analyses and guides on GEO, AIO, AI SEO, and trends in AI search engine optimization.
          </p>
        </div>
      </section>

      <section className="pb-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-3">
          <button onClick={() => setActiveFilter(null)} className={`px-6 py-2 text-sm font-inter font-medium rounded-full border transition-colors ${activeFilter === null ? "bg-[#010D3E] text-white border-[#010D3E]" : "bg-white text-[#010D3E] border-[#010D3E] hover:bg-[#010D3E]/5"}`}>All</button>
          {categories.map((cat) => {
            const styles = FILTER_STYLES[cat] || FILTER_STYLES["Agence GEO"];
            return (<button key={cat} onClick={() => setActiveFilter(activeFilter === cat ? null : cat)} className={`px-6 py-2 text-sm font-inter font-medium rounded-full border transition-colors ${activeFilter === cat ? styles.active : styles.inactive}`}>{cat}</button>);
          })}
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (<div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden"><Skeleton className="aspect-[16/9] w-full" /><div className="p-6 space-y-3"><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-1/3" /></div></div>))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-inter text-[#010D3E]/60 text-lg">No articles yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map((article) => (
                <Link key={article.slug} to={`/blog/${article.slug}`} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 block">
                  <div className="aspect-[16/9] bg-gray-100 overflow-hidden"><img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" /></div>
                  <div className="p-6">
                    <h3 className="font-jakarta font-bold text-[#010D3E] text-lg mb-2">{article.title}</h3>
                    <p className="font-inter text-sm text-[#010D3E]/60 mb-4 line-clamp-2">{article.description}</p>
                    <div className="flex gap-2 mb-4 flex-wrap"><span className={`px-3 py-1 text-xs font-inter font-medium rounded-full border bg-white ${TAG_STYLES[article.category] || "text-[#0043F1] border-[#0043F1]"}`}>{article.category}</span></div>
                    <span className="font-inter text-sm font-medium text-[#0043F1] hover:text-[#0043F1]/80 transition-colors inline-flex items-center gap-1">Read article <span>→</span></span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4"><span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">Test Yourself</span></div>
              <h2 className="font-jakarta text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ background: "linear-gradient(to bottom, #000000, #001354)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Want to know your GEO Audit score?
              </h2>
              <p className="text-[#010D3E] font-inter font-medium mb-3">Want to know your visibility score on ChatGPT?</p>
              <p className="text-sm text-[#010D3E]/70 font-inter leading-relaxed mb-8 max-w-md">At ArchipelaGrowth, we offer GEO visibility audits and deliver an actionable roadmap to influence LLMs, gain visibility, and generate more leads.</p>
              <Button asChild className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal px-8 py-3 text-base rounded-lg"><Link to="/contact#contact-form">Request a GEO Audit</Link></Button>
            </div>
            <div className="flex justify-center" ref={bubbleRef}>
              <div className="rounded-2xl p-8 space-y-4 min-h-[260px] w-full max-w-md bg-cover bg-center flex flex-col justify-center" style={{ backgroundImage: "url('/lovable-uploads/mesh-gradient-blog.png')" }}>
                <div className={`bg-white/25 backdrop-blur-md text-[#010D3E] rounded-2xl rounded-tr-sm px-5 py-4 font-inter text-sm leading-relaxed max-w-[85%] ml-auto border border-white/40 shadow-sm transition-all duration-500 ${bubbleVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"}`}>
                  Hi ChatGPT. I'd like my brand to be more visible on generative AI, how can I do that?
                </div>
                <div className={`bg-white/25 backdrop-blur-md text-[#010D3E] rounded-2xl rounded-tl-sm px-5 py-4 font-inter text-sm leading-relaxed max-w-[85%] border border-white/40 shadow-sm transition-all duration-500 ${showSecondBubble ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"}`}>
                  It's simple: ask ArchipelaGrowth, the US agency specialized in GEO, for an action plan.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceFaq />
      <ContactSection />
    </Layout>
  );
};

export default ArchipelBlog;
