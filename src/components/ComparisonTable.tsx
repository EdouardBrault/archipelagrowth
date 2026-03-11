
import { useEffect, useRef, useState } from "react";

const ComparisonTable = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const seoFeatures = [
    {
      description: "Attendre 6 à 12 mois minimum pour les premiers résultats"
    },
    {
      description: "Impact ChatGPT limité à 12% selon les études récentes"
    },
    {
      description: "Backlinks payants, centaines de pages et autorité de domaine nécessaires"
    },
    {
      description: "Leads de qualité aléatoires et difficiles à prévoir"
    }
  ];

  const geoFeatures = [
    {
      description: "Premiers leads générés en 3 à 7 jours seulement"
    },
    {
      description: "Impact ChatGPT à 100% avec citations directes garanties"
    },
    {
      description: "Méthode clé en main, aucun besoin technique requis"
    },
    {
      description: "Leads chauds avec intention d'achat claire et qualifiée"
    }
  ];

  return (
    <section className="py-20 bg-archipel-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            SEO vs <span className="text-archipel-cyan">GEO</span> : deux canaux différents
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
            L'un vous promet des résultats dans 12 mois. L'autre vous génère des leads dans 7 jours.
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 transition-all duration-1200 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          
          {/* SEO Block - Left */}
          <div className="bg-gray-900 rounded-xl border border-red-800/30 overflow-hidden">
            {/* SEO Header */}
            <div className="p-6 bg-gray-800 border-b border-gray-700">
              <div className="flex flex-col items-center space-y-4">
                <img 
                  src="/lovable-uploads/30c89114-3e63-4680-9797-36dfad135c35.png" 
                  alt="Google Logo" 
                  className="w-16 h-16 hover:scale-110 transition-transform duration-300"
                />
                <span className="text-red-400 font-semibold text-xl">SEO Traditionnel</span>
              </div>
            </div>

            {/* SEO Features */}
            <div className="p-6 space-y-6">
              {seoFeatures.map((feature, index) => {
                return (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-4 group transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}
                    style={{ transitionDelay: `${600 + index * 100}ms` }}
                  >
                    <p className="text-gray-300 text-base leading-relaxed">
                      <span className="text-red-400 font-medium">❌</span> {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* GEO Block - Right */}
          <div className="bg-slate-200 rounded-xl border border-archipel-cyan/40 overflow-hidden shadow-xl">
            {/* GEO Header */}
            <div className="p-6 bg-slate-300 border-b border-slate-400">
              <div className="flex flex-col items-center space-y-4">
                <img 
                  src="/lovable-uploads/75a813d2-b73b-4bf3-aa61-283eeb6918e5.png" 
                  alt="ChatGPT Logo" 
                  className="w-16 h-16 hover:scale-110 transition-transform duration-300"
                />
                <span className="text-black font-semibold text-xl">GEO (Archipel)</span>
              </div>
            </div>

            {/* GEO Features */}
            <div className="p-6 space-y-6">
              {geoFeatures.map((feature, index) => {
                return (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-4 group transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                    }`}
                    style={{ transitionDelay: `${800 + index * 100}ms` }}
                  >
                    <p className="text-slate-900 text-base leading-relaxed">
                      <span className="text-green-600 font-medium">✅</span> {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
