
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import ContactSection from "@/components/ContactSection";
import SEOHelmet from "@/components/SEOHelmet";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Plus, Clock, Calendar, User, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { useArticleBySlug, useMergedArticles } from "@/hooks/useBlogArticles";
import { Skeleton } from "@/components/ui/skeleton";
import ArticleContent from "@/components/BlogArticle/ArticleContent";
import TableOfContents from "@/components/BlogArticle/TableOfContents";
import DOMPurify from "dompurify";

const TAG_STYLES: Record<string, string> = {
  "Agence GEO": "text-[#0043F1] border-[#0043F1]",
  "Agence SEO IA": "text-[#80FFE7] border-[#80FFE7] bg-[#010D3E]",
  "Agence AIO": "text-[#061941] border-[#061941]",
};

const AUTHOR_PHOTOS: Record<string, string> = {
  "James Carter": "/lovable-uploads/photo-edouard-new.png",
  "Megan Reed": "/lovable-uploads/photo-eva-new.png",
  "Tyler Brooks": "/lovable-uploads/photo-germain-new.png",
  "Chloe Bennett": "/lovable-uploads/photo-hortense-new.png",
  "Ashley Morgan": "/lovable-uploads/photo-lea-new.png",
  "Ryan Mitchell": "/lovable-uploads/photo-michael-new.png",
  "Brandon Hayes": "/lovable-uploads/photo-nathan-new.png",
  "Aiden Ross": "/lovable-uploads/photo-nour-new.png",
  "Lauren Scott": "/lovable-uploads/photo-pauline-new.png",
};

const getAuthorPhoto = (author: string): string | null => {
  for (const [name, photo] of Object.entries(AUTHOR_PHOTOS)) {
    if (author.toLowerCase().includes(name.toLowerCase())) return photo;
  }
  return null;
};

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "Date non définie";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr || "Date non définie";
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr || "Date non définie";
  }
};

const ArchipelArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { article, isLoading } = useArticleBySlug(slug);
  const { articles: allArticles } = useMergedArticles();
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [showSecondBubble, setShowSecondBubble] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBubbleVisible(true);
          setTimeout(() => setShowSecondBubble(true), 800);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (bubbleRef.current) observer.observe(bubbleRef.current);
    return () => observer.disconnect();
  }, []);

  const baseUrl = "https://archipelmarketing.com";

  const structuredData = useMemo(() => {
    if (!article) return [];
    const schemas: object[] = [];

    schemas.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      dateModified: article.date,
      author: { "@type": "Person", name: article.author || "Archipel Marketing" },
      publisher: {
        "@type": "Organization",
        name: "Archipel",
        logo: { "@type": "ImageObject", url: `${baseUrl}/lovable-uploads/096342cb-c5f0-4649-9085-3d636d9ded3c.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/blog/${article.slug}` },
      image: article.image,
      keywords: article.tags?.join(", "),
      articleSection: article.category,
      wordCount: article.content?.split(/\s+/).length || 0,
      inLanguage: "fr-FR",
    });

    if (article.faqs && article.faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faqs.map((faq: any) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: DOMPurify.sanitize(faq.answer, { ALLOWED_TAGS: [] }) },
        })),
      });
    }

    return schemas;
  }, [article]);

  if (isLoading) {
    return (
      <Layout>
        <div className="py-20 max-w-6xl mx-auto px-4 space-y-8">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="aspect-[21/9] w-full rounded-2xl" />
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
          <h1 className="font-jakarta text-3xl font-bold text-[#010D3E] mb-4">Article introuvable</h1>
          <Link to="/blog" className="text-[#0043F1] font-inter">← Retour au blog</Link>
        </div>
      </Layout>
    );
  }

  const relatedArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 2);
  const canonicalUrl = (article as any).canonicalUrl || `${baseUrl}/blog/${article.slug}`;
  const authorPhoto = getAuthorPhoto(article.author || "");

  return (
    <Layout>
      <SEOHelmet
        title={(article as any).metaTitle || `${article.title} | Archipel`}
        description={(article as any).metaDescription || article.description || ""}
        canonicalUrl={canonicalUrl}
        ogImage={article.image || `${baseUrl}/og-image.png`}
        ogType="article"
        keywords={article.tags?.join(", ")}
        author={article.author}
        publishedTime={article.date}
        modifiedTime={article.date}
        section={article.category}
        articleTag={article.tags}
      />
      {structuredData.map((sd, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sd) }} />
      ))}

      {/* Breadcrumb */}
      <div className="pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm font-inter text-gray-500">
            <Link to="/" className="hover:text-[#0043F1] transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blog" className="hover:text-[#0043F1] transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400 truncate max-w-[200px]">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero - Full-width image with overlay */}
      <section className="pt-6 pb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-4 py-1.5 text-xs font-inter font-medium rounded-full border ${TAG_STYLES[article.category] || "text-[#0043F1] border-[#0043F1]"}`}>
              {article.category}
            </span>
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-3 py-1 text-xs font-inter text-gray-500 rounded-full border border-gray-200">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="font-jakarta text-3xl md:text-4xl lg:text-[2.75rem] font-bold mb-6 leading-[1.1] max-w-4xl"
            style={{
              background: "linear-gradient(to bottom, #000000, #001354)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {article.title}
          </h1>

          {/* Description */}
          <p className="font-inter text-lg text-gray-500 leading-relaxed max-w-2xl mb-8">
            {article.description}
          </p>

          {/* Author bar */}
          <div className="flex items-center gap-6 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {authorPhoto ? (
                <img
                  src={authorPhoto}
                  alt={article.author}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0043F1] to-[#001354] flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                <p className="font-inter font-semibold text-[#010D3E] text-sm">{article.author || "Archipel Marketing"}</p>
                <p className="font-inter text-xs text-gray-400">Archipel Marketing</p>
              </div>
            </div>
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span className="font-inter text-sm">{formatDate(article.date)}</span>
            </div>
            <div className="h-8 w-px bg-gray-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-1.5 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="font-inter text-sm">{article.readingTime} min de lecture</span>
            </div>
          </div>

          {/* Hero image */}
          <div className="mt-8 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={article.image}
              alt={(article as any).altText || article.title}
              className="w-full aspect-[21/9] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Table of Contents (floating sidebar) */}
      <TableOfContents content={article.content} />

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ArticleContent content={article.content} />
        </div>
      </section>

      {/* Audit GEO CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">Testez-vous</span>
              </div>
              <h2
                className="font-jakarta text-3xl md:text-4xl font-bold mb-6 leading-tight"
                style={{
                  background: "linear-gradient(to bottom, #000000, #001354)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Envie de connaître votre score d'Audit GEO ?
              </h2>
              <p className="text-sm text-[#010D3E]/70 font-inter leading-relaxed mb-8 max-w-md">
                Chez Archipel Marketing, nous proposons des audits de visibilité en GEO et vous livrons une roadmap actionnable pour influencer les LLM, gagner en visibilité et générer plus de leads.
              </p>
              <Button asChild className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal px-8 py-3 text-base rounded-lg">
                <Link to="/contact#contact-form">Demander un audit GEO</Link>
              </Button>
            </div>
            <div className="flex justify-center" ref={bubbleRef}>
              <div
                className="rounded-2xl p-8 space-y-4 min-h-[260px] w-full max-w-md bg-cover bg-center flex flex-col justify-center"
                style={{ backgroundImage: "url('/lovable-uploads/mesh-gradient-article.png')" }}
              >
                <div className={`bg-white/25 backdrop-blur-md text-[#010D3E] rounded-2xl rounded-tr-sm px-5 py-4 font-inter text-sm leading-relaxed max-w-[85%] ml-auto border border-white/40 shadow-sm transition-all duration-500 ${bubbleVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"}`}>
                  Bonjour Chat GPT. J'aimerais que ma marque soit plus visible sur les IA génératives, comment faire ?
                </div>
                <div className={`bg-white/25 backdrop-blur-md text-[#010D3E] rounded-2xl rounded-tl-sm px-5 py-4 font-inter text-sm leading-relaxed max-w-[85%] border border-white/40 shadow-sm transition-all duration-500 ${showSecondBubble ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-95"}`}>
                  C'est très simple : demandez un plan d'action à Archipel, l'agence française spécialisée en GEO
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-jakarta text-2xl md:text-3xl font-bold text-[#010D3E] mb-10">Articles recommandés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {relatedArticles.map((a) => (
              <Link key={a.slug} to={`/blog/${a.slug}`} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 block group">
                <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 text-[10px] font-inter font-medium rounded-full border ${TAG_STYLES[a.category] || "text-[#0043F1] border-[#0043F1]"}`}>
                      {a.category}
                    </span>
                    <span className="text-xs font-inter text-gray-400">{a.readingTime} min</span>
                  </div>
                  <h3 className="font-jakarta font-bold text-[#010D3E] text-lg mb-2 group-hover:text-[#0043F1] transition-colors">{a.title}</h3>
                  <p className="font-inter text-sm text-gray-500 mb-4 line-clamp-2">{a.description}</p>
                  <span className="font-inter text-sm font-medium text-[#0043F1] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Lire l'article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-end gap-3">
            <Link to="/blog" className="font-inter text-sm text-gray-500 hover:text-[#0043F1] transition-colors flex items-center gap-1 mr-auto">
              ← Tous les articles
            </Link>
            <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-[#0043F1] hover:text-[#0043F1] transition-colors" aria-label="Précédent">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full border-2 border-[#0043F1] flex items-center justify-center text-[#0043F1] hover:bg-[#0043F1] hover:text-white transition-colors" aria-label="Suivant">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {article.faqs && article.faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-jakarta text-3xl md:text-4xl font-bold text-center mb-12 text-[#010D3E]">FAQ</h2>
            <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {article.faqs.map((faq, i) => (
                <div key={i}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left">
                    <span className="font-inter font-medium text-[#010D3E] text-base pr-4">{faq.question}</span>
                    <Plus className={`w-5 h-5 text-[#010D3E] shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40 pb-5" : "max-h-0"}`}>
                    <p className="font-inter text-sm text-[#010D3E]/70 leading-relaxed">{faq.answer}</p>
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
