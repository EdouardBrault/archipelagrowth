
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const GeoAdvantages = () => {
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

  const proofs = [
    {
      number: "41 MILLIONS",
      subtitle: "de prompts analysés",
      description: "Méthode fondée sur les données réelles issues de ChatGPT, Mistral, Perplexity, Deepseek…",
      imagePlaceholder: "/lovable-uploads/86e96713-6242-4a67-856d-e30b9339d825.png"
    },
    {
      number: "0 BACKLINK",
      subtitle: "nécessaire pour performer",
      description: "Les IA se basent sur clarté, structure, pertinence, pas sur l'autorité de domaine",
      imagePlaceholder: "/lovable-uploads/e776fb76-7ac9-4177-ae42-f6bf1449edda.png"
    },
    {
      number: "3 JOURS",
      subtitle: "pour voir des résultats",
      description: "Visibilité activable ultra rapidement, sans backlink ni contenu long à produire",
      imagePlaceholder: "/lovable-uploads/33e94052-29fb-4cb7-9629-5d16be97dab7.png"
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main titles */}
        <div 
          ref={ref}
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="text-archipel-cyan">AI Optimization</span> : #1 sur ChatGPT en 3 jours
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-5xl mx-auto">
            Notre méthodologie <strong className="text-archipel-cyan">GEO</strong> révolutionnaire permet aux <span className="text-archipel-cyan">moteurs IA</span> de recommander votre entreprise <br className="hidden md:block" />
            instantanément. La première <strong>agence GEO</strong> de France maîtrise l'<strong>AI Optimization</strong> complète.
          </p>
        </div>

        {/* Screenshot with glow effect */}
        <div className={`mb-12 flex justify-center transition-all duration-1200 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative group">
            {/* Glow effect behind the screenshot */}
            <div className="absolute inset-0 bg-archipel-cyan/20 rounded-xl blur-xl scale-105 group-hover:bg-archipel-cyan/30 transition-all duration-500" />
            
            {/* Screenshot */}
            <div className="relative transform group-hover:scale-105 transition-transform duration-500">
              <img 
                src="/lovable-uploads/b1c329a3-dd13-4b8e-864f-dcc49acf1e71.png" 
                alt="Dashboard GEO - Visibilité sur les moteurs IA" 
                className="w-full max-w-4xl h-auto rounded-xl shadow-2xl transform scale-[1.01]"
              />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Button 
            asChild 
            size="lg" 
            className="bg-archipel-cyan text-archipel-dark hover:bg-archipel-cyan/90 font-semibold px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300"
          >
            <Link to="/contact">
              <span>Demander une démo</span>
            </Link>
          </Button>
        </div>

        {/* 3 proof blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {proofs.map((proof, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              {/* Floating glow effect */}
              <div className="absolute inset-0 bg-archipel-cyan/10 rounded-3xl blur-md group-hover:bg-archipel-cyan/20 transition-all duration-500" />
              
              <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-3xl border border-gray-700/40 hover:border-archipel-cyan/50 transition-all duration-500 h-full group-hover:transform group-hover:scale-105 overflow-hidden">
                
                {/* Full-width square image at the top */}
                <div className="aspect-square w-full overflow-hidden rounded-t-3xl">
                  <img 
                    src={proof.imagePlaceholder}
                    alt={`${proof.number} - ${proof.subtitle}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Content below the image */}
                <div className="p-8 text-center">
                  {/* Big number/key phrase */}
                  <div className="mb-4">
                    <div className="text-2xl md:text-3xl font-bold text-archipel-cyan leading-tight group-hover:animate-pulse mb-2">
                      {proof.number}
                    </div>
                    <div className="text-xl font-semibold text-white leading-snug">
                      {proof.subtitle}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-base text-gray-300 leading-relaxed">
                    {proof.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GeoAdvantages;
