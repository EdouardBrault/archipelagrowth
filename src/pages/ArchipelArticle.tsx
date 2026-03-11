
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import ContactSection from "@/components/ContactSection";
import ServiceFaq from "@/components/ServiceFaq";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TAG_STYLES: Record<string, string> = {
  "GEO": "text-[#0043F1] border-[#0043F1]",
  "Google Ads": "text-[#80FFE7] border-[#80FFE7]",
  "Clients": "text-[#757575] border-[#757575]",
  "Autre": "text-[#061941] border-[#061941]",
};

const MOCK_RELATED = [
  { title: "Nom de l'article", description: "Description ou mot clé", tags: ["GEO", "Google Ads", "Clients", "Autre"] },
  { title: "Nom de l'article", description: "Description ou mot clé", tags: ["GEO", "Google Ads", "Clients", "Autre"] },
  { title: "Nom de l'article", description: "Description ou mot clé", tags: ["GEO", "Google Ads", "Clients", "Autre"] },
  { title: "Nom de l'article", description: "Description ou mot clé", tags: ["GEO", "Google Ads", "Clients", "Autre"] },
];

const ArchipelArticle = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [showSecondBubble, setShowSecondBubble] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

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

  const visibleRelated = MOCK_RELATED.slice(carouselIndex, carouselIndex + 2);
  const canPrev = carouselIndex > 0;
  const canNext = carouselIndex + 2 < MOCK_RELATED.length;

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full inline-block mb-6">
                Article de blog
              </span>
              <h1 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{
                background: "linear-gradient(to bottom, #000000, #001354)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Le titre<br />de l'article
              </h1>
              <p className="font-inter text-[#010D3E]/70 text-base md:text-lg leading-relaxed max-w-lg">
                Chez Archipel, nous sommes fiers de travailler avec des entreprises de toutes tailles et de toutes industries pour les aider à améliorer leurs performances et à atteindre leurs objectifs. Découvrez nos références clients et sélectionnez les filtres qui vous intéressent.
              </p>
              <div className="flex flex-wrap gap-2 mt-8">
                <span className="px-4 py-2 text-sm font-inter font-medium rounded-full border border-gray-300 text-[#010D3E]">Les filtres ici</span>
                <span className="px-4 py-2 text-sm font-inter font-medium rounded-full border border-gray-300 text-[#010D3E]">Les filtres ici</span>
                <span className="px-4 py-2 text-sm font-inter font-medium rounded-full border border-gray-300 text-[#010D3E]">Les filtres ici</span>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Block 1 */}
          <div>
            <h2 className="font-jakarta text-2xl md:text-3xl font-bold text-[#010D3E] mb-4" style={{
              background: "linear-gradient(to bottom, #000000, #001354)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Titre ici</h2>
            <p className="font-inter text-[#010D3E]/70 text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in maximus arcu. Pellentesque sit amet sem cursus, commodo purus eu, luctus justo. Vestibulum sed dui lacinia ligula commodo ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse gravida blandit velit non consectetur. Donec pretium, nunc in tempor iaculis, diam sem rhoncus metus, sit amet varius quam metus non diam. Vestibulum sodales erat a tincidunt tincidunt. Etiam ac eros fringilla, aliquam neque eget, placerat sem. In faucibus egestas laoreet. Fusce nec eleifend mauris. Ut a lacus velit. Donec vestibulum sollicitudin dui, in feugiat eros aliquet a. Curabitur nec justo tempor, feugiat tellus quis, condimentum odio. Sed in mauris risus. Nullam maximus magna sit amet mollis consequat.
            </p>
          </div>

          {/* Block 2 */}
          <div>
            <h2 className="font-jakarta text-2xl md:text-3xl font-bold text-[#010D3E] mb-4" style={{
              background: "linear-gradient(to bottom, #000000, #001354)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Titre ici</h2>
            <p className="font-inter text-[#010D3E]/70 text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in maximus arcu. Pellentesque sit amet sem cursus, commodo purus eu, luctus justo. Vestibulum sed dui lacinia ligula commodo ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse gravida blandit velit non consectetur.
            </p>
          </div>

          {/* Image placeholder */}
          <div className="rounded-2xl bg-gray-100 aspect-[16/9] w-full" />

          {/* Block 3 */}
          <div>
            <h2 className="font-jakarta text-2xl md:text-3xl font-bold text-[#010D3E] mb-4" style={{
              background: "linear-gradient(to bottom, #000000, #001354)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Titre ici</h2>
            <p className="font-inter text-[#010D3E]/70 text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in maximus arcu. Pellentesque sit amet sem cursus, commodo purus eu, luctus justo. Vestibulum sed dui lacinia ligula commodo ultrices. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse gravida blandit velit non consectetur.
            </p>
          </div>
        </div>
      </section>

      {/* Audit GEO CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4">
                <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
                  Testez-vous
                </span>
              </div>
              <h2 className="font-jakarta text-3xl md:text-4xl font-bold mb-6 leading-tight" style={{
                background: "linear-gradient(to bottom, #000000, #001354)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Envie de connaître votre score d'Audit GEO ?
              </h2>
              <p className="text-[#010D3E] font-inter font-medium mb-3">
                Souhaitez-vous connaître votre visibilité sur les principaux LLM du marché ?
              </p>
              <p className="text-sm text-[#010D3E]/70 font-inter leading-relaxed mb-8 max-w-md">
                Chez Archipel Marketing, nous proposons des audits de visibilité en GEO et vous livrons une roadmap actionnable pour influencer les LLM, gagner en visibilité et générer plus de leads.
              </p>
              <Button asChild className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal px-8 py-3 text-base rounded-lg">
                <Link to="/contact#contact-form">Demander un audit GEO</Link>
              </Button>
            </div>
            <div className="flex justify-center" ref={bubbleRef}>
              <div className="rounded-2xl p-8 space-y-4 min-h-[260px] w-full max-w-md bg-cover bg-center flex flex-col justify-center" style={{ backgroundImage: "url('/lovable-uploads/mesh-gradient-article.png')" }}>
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

      {/* Related Articles Carousel */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleRelated.map((article, idx) => (
              <div key={idx} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-[16/9] bg-gray-100" />
                <div className="p-6">
                  <h3 className="font-jakarta font-bold text-[#010D3E] text-lg mb-2">{article.title}</h3>
                  <p className="font-inter text-sm text-[#010D3E]/60 mb-4">{article.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span key={tag} className={`px-3 py-1 text-xs font-inter font-medium rounded-full border bg-white ${TAG_STYLES[tag] || "text-[#010D3E] border-gray-200"}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="font-inter text-sm font-medium text-[#0043F1] inline-flex items-center gap-1">
                    Lire l'article <span>→</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 2))}
              disabled={!canPrev}
              className={`text-[#0043F1] ${!canPrev ? "opacity-30 cursor-not-allowed" : "hover:text-[#0043F1]/80"}`}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => setCarouselIndex(carouselIndex + 2)}
              disabled={!canNext}
              className={`flex items-center gap-2 font-inter text-sm font-medium text-[#0043F1] ${!canNext ? "opacity-30 cursor-not-allowed" : "hover:text-[#0043F1]/80"}`}
            >
              Articles suivants
              <span className="w-10 h-10 rounded-full border-2 border-[#0043F1] flex items-center justify-center">
                <ChevronRight className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ServiceFaq />

      {/* Contact */}
      <ContactSection />
    </Layout>
  );
};

export default ArchipelArticle;
