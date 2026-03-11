
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ContactSection from "@/components/ContactSection";
import SEOHelmet from "@/components/SEOHelmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Plus, Clock, Calendar, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { usePipelineArticles, usePipelineArticleBySlug } from "@/hooks/usePipelineArticles";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleBody from "@/components/BlogArticle/ArticleBody";
import { extractHeadings } from "@/components/BlogArticle/ArticleBody";
import DOMPurify from "dompurify";

const TAG_STYLES: Record<string, string> = {
  "GEO": "text-[#0043F1] border-[#0043F1]",
  "Agence GEO": "text-[#0043F1] border-[#0043F1]",
  "Agence SEO IA": "text-[#80FFE7] border-[#80FFE7] bg-[#010D3E]",
  "Agence AIO": "text-[#061941] border-[#061941]",
};

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
};

const ArchipelArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = usePipelineArticleBySlug(slug);
  const { articles: allArticles } = usePipelineArticles();
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [showSecondBubble, setShowSecondBubble] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setBubbleVisible(true); setTimeout(() => setShowSecondBubble(true), 800); observer.disconnect(); }
      },
      { threshold: 0.3 }
    );
    if (bubbleRef.current) observer.observe(bubbleRef.current);
    return () => observer.disconnect();
  }, []);

  const baseUrl = "https://archipelagrowth.com";

  const faqs = useMemo(() => {
    if (!article?.faq) return [];
    if (Array.isArray(article.faq)) return article.faq;
    return [];
  }, [article]);

  const structuredData = useMemo(() => {
    if (!article) return [];
    const schemas: object[] = [];
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.meta_description,
      datePublished: article.published_at,
      dateModified: article.published_at,
      author: { "@type": "Organization", name: "ArchipelaGrowth" },
      publisher: {
        "@type": "Organization",
        name: "ArchipelaGrowth",
        logo: { "@type": "ImageObject", url: `${baseUrl}/lovable-uploads/096342cb-c5f0-4649-9085-3d636d9ded3c.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/blog/${article.slug}` },
      keywords: article.meta_keywords?.join(", "),
      articleSection: article.category,
      wordCount: article.word_count || 0,
      inLanguage: "en-US",
    });

    if (faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq: any) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: DOMPurify.sanitize(faq.answer, { ALLOWED_TAGS: [] }) },
        })),
      });
    }
    return schemas;
  }, [article, faqs]);

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20 max-w-6xl mx-auto px-4 space-y-8">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-4 max-w-4xl">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="py-40 text-center">
          <h1 className="font-jakarta text-3xl font-bold text-[#010D3E] mb-4">Article not found</h1>
          <Link to="/blog" className="text-[#0043F1] font-inter">← Back to blog</Link>
        </div>
      </Layout>
    );
  }

  const relatedArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <Layout>
      <SEOHelmet
        title={`${article.title} | ArchipelaGrowth`}
        description={article.meta_description || ""}
        canonicalUrl={`${baseUrl}/blog/${article.slug}`}
        ogImage={`${baseUrl}/og-image.png`}
        ogType="article"
        keywords={article.meta_keywords?.join(", ")}
        author="ArchipelaGrowth"
        publishedTime={article.published_at || undefined}
        modifiedTime={article.published_at || undefined}
        section={article.category || undefined}
      />
      {structuredData.map((sd, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sd) }} />
      ))}

      {/* Breadcrumb */}
      <div className="pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm font-inter text-gray-500">
            <Link to="/" className="hover:text-[#0043F1] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blog" className="hover:text-[#0043F1] transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 truncate max-w-[200px]">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-6 pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {article.category && (
              <span className={`px-4 py-1.5 text-xs font-inter font-medium rounded-full border ${TAG_STYLES[article.category] || "text-[#0043F1] border-[#0043F1]"}`}>
                {article.category}
              </span>
            )}
            {article.meta_keywords?.slice(0, 3).map((kw) => (
              <span key={kw} className="px-3 py-1 text-xs font-inter text-gray-500 rounded-full border border-gray-200">{kw}</span>
            ))}
          </div>

          <h1 className="font-jakarta text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-[1.1] max-w-4xl" style={{ background: "linear-gradient(to bottom, #000000, #001354)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {article.title}
          </h1>

          {article.meta_description && (
            <p className="font-inter text-lg text-gray-500 leading-relaxed max-w-2xl mb-8">{article.meta_description}</p>
          )}

          <div className="flex items-center gap-6 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0043F1] to-[#001354] flex items-center justify-center">
                <span className="text-white font-bold text-sm">AG</span>
              </div>
              <div>
                <p className="font-inter font-semibold text-[#010D3E] text-sm">ArchipelaGrowth</p>
              </div>
            </div>
            {article.published_at && (
              <>
                <div className="h-8 w-px bg-gray-200" />
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span className="font-inter text-sm">{formatDate(article.published_at)}</span>
                </div>
              </>
            )}
            {article.estimated_read_time && (
              <>
                <div className="h-8 w-px bg-gray-200 hidden sm:block" />
                <div className="hidden sm:flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="font-inter text-sm">{article.estimated_read_time}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      {article.key_takeaways && article.key_takeaways.length > 0 && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#F0F4FF] border border-[#0043F1]/20 rounded-2xl p-6 md:p-8">
              <h2 className="font-jakarta font-bold text-[#010D3E] text-lg mb-4">🔑 Key Takeaways</h2>
              <ul className="space-y-2">
                {article.key_takeaways.map((point, i) => (
                  <li key={i} className="font-inter text-sm text-[#010D3E]/80 flex items-start gap-2">
                    <span className="text-[#0043F1] font-bold mt-0.5">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Article Content with Sticky TOC */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-12">
            {/* Sticky Table of Contents - desktop only */}
            {(() => {
              const headings = extractHeadings(article.body_html);
              if (headings.length < 2) return null;
              return (
                <aside className="hidden xl:block w-64 shrink-0">
                  <nav className="sticky top-28">
                    <p className="font-jakarta font-bold text-[#010D3E] text-sm uppercase tracking-wider mb-4">Table of Contents</p>
                    <ul className="space-y-2 border-l border-gray-200">
                      {headings.map((h) => (
                        <li key={h.id} className={h.level === 3 ? "pl-6" : "pl-4"}>
                          <a
                            href={`#${h.id}`}
                            className="font-inter text-sm text-gray-500 hover:text-[#0043F1] transition-colors block py-1 leading-snug"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </aside>
              );
            })()}
            {/* Article body */}
            <div className="flex-1 max-w-4xl">
              <ArticleBody html={article.body_html} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4"><span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">Test Yourself</span></div>
              <h2 className="font-jakarta text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{ background: "linear-gradient(to bottom, #000000, #001354)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Want to know your GEO Audit score?
              </h2>
              <p className="text-sm text-[#010D3E]/70 font-inter leading-relaxed mb-8 max-w-md">
                At ArchipelaGrowth, we offer GEO visibility audits and deliver an actionable roadmap to influence LLMs, gain visibility, and generate more leads.
              </p>
              <Button asChild className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal px-8 py-3 text-base rounded-lg">
                <Link to="/contact#contact-form">Request a GEO Audit</Link>
              </Button>
            </div>
            <div className="flex justify-center" ref={bubbleRef}>
              <div className="rounded-2xl p-8 space-y-4 min-h-[260px] w-full max-w-md bg-cover bg-center flex flex-col justify-center" style={{ backgroundImage: "url('/lovable-uploads/mesh-gradient-article.png')" }}>
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

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-[#F9FAFB]">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="font-jakarta text-2xl md:text-3xl font-bold text-[#010D3E] mb-10">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {relatedArticles.map((a) => (
                <Link key={a.slug} to={`/blog/${a.slug}`} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 block group">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {a.category && (
                        <span className={`px-3 py-1 text-[10px] font-inter font-medium rounded-full border ${TAG_STYLES[a.category] || "text-[#0043F1] border-[#0043F1]"}`}>{a.category}</span>
                      )}
                      {a.estimated_read_time && <span className="text-xs font-inter text-gray-400">{a.estimated_read_time}</span>}
                    </div>
                    <h3 className="font-jakarta font-bold text-[#010D3E] text-lg mb-2 group-hover:text-[#0043F1] transition-colors">{a.title}</h3>
                    <p className="font-inter text-sm text-gray-500 mb-4 line-clamp-2">{a.meta_description}</p>
                    <span className="font-inter text-sm font-medium text-[#0043F1] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-start">
              <Link to="/blog" className="font-inter text-sm text-gray-500 hover:text-[#0043F1] transition-colors flex items-center gap-1">
                ← All articles
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-jakarta text-3xl md:text-4xl font-bold text-center mb-12 text-[#010D3E]">FAQ</h2>
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {faqs.map((faq: any, i: number) => (
                <div key={i}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left">
                    <span className="font-inter font-medium text-[#010D3E] text-base pr-4">{faq.question}</span>
                    <Plus className={`w-5 h-5 text-[#010D3E] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96 pb-5" : "max-h-0"}`}>
                    <div className="font-inter text-sm text-[#010D3E]/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faq.answer) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactSection />
    </Layout>
  );
};

export default ArchipelArticleDetail;
