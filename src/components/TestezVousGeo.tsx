
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TestezVousGeo = () => {
  const [visible, setVisible] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setShowSecond(true), 800);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left - Text */}
          <div className="md:w-1/2 text-left">
            <div className="mb-4">
              <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
                Testez-vous
              </span>
            </div>
            <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
                Envie de connaître votre score d'Audit GEO ?
              </span>
            </h2>
            <p className="text-lg text-[#010D3E] font-inter mb-3">
              Souhaitez-vous connaître votre visibilité sur les principaux LLM du marché ?
            </p>
            <p className="text-[#010D3E]/70 font-inter leading-relaxed mb-6 text-sm">
              Chez Archipel Marketing, nous proposons des audits de visibilité en GEO et vous livrons une roadmap actionnable pour influencer les LLM, gagner en visibilité et générer plus de leads.
            </p>
            <Button
              asChild
              className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal px-8 py-3 text-base rounded-lg font-inter"
            >
              <Link to="/contact#contact-form">Demander un audit GEO</Link>
            </Button>
          </div>

          {/* Right - iMessage bubbles */}
          <div className="md:w-1/2" ref={ref}>
            <div className="rounded-2xl p-8 space-y-4 min-h-[220px] bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/mesh-gradient-4.png')" }}>
              <div
                className={`bg-white/30 backdrop-blur-md text-[#010D3E] rounded-2xl rounded-bl-none px-5 py-4 font-inter text-sm leading-relaxed max-w-[85%] ml-auto transition-all duration-500 origin-bottom-right ${
                  visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-0 translate-y-4"
                }`}
              >
                Bonjour Chat GPT. J'aimerais que ma marque soit plus visible sur les IA génératives, commente faire?
              </div>
              <div
                className={`bg-white/30 backdrop-blur-md text-[#010D3E] rounded-2xl rounded-br-none px-5 py-4 font-inter text-sm leading-relaxed max-w-[85%] transition-all duration-500 origin-bottom-left ${
                  showSecond ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-0 translate-y-4"
                }`}
              >
                C'est très simple : demandez un plan d'action à Archipel, l'agence française spécialisée en GEO
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestezVousGeo;
