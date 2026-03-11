
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
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

  return (
    <section className="py-20 bg-archipel-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left column - Text */}
          <div className="space-y-6 lg:pr-8">
            {/* Logo Archipel */}
            <div className="mb-6">
              <img 
                src="/lovable-uploads/096342cb-c5f0-4649-9085-3d636d9ded3c.png" 
                alt="Archipel Logo" 
                className="h-8 w-auto"
                width="160"
                height="32"
                loading="lazy"
              />
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Agence GEO pionnière en AI Optimization
            </h3>
            <div className="text-lg text-gray-300 leading-relaxed space-y-4 max-w-none lg:max-w-2xl">
              <p>
                Archipel est une agence spécialisée en SEO et SEA fondée en 2022 par Édouard Brault et Michaël Abramczuk.
              </p>
              <p>
                Ils ont établi des partenariats stratégiques avec les meilleures start-ups du GEO pour sélectionner les meilleurs outils, se former auprès des leaders, et débloquer des accès exclusifs encore indisponibles en Europe.
              </p>
              <p>
                Aujourd'hui, ils ramènent ces outils en France pour les déployer chez leurs clients et les aider à être les{" "}
                <span className="text-archipel-cyan font-semibold">
                  premiers référencés dans les IA comme ChatGPT
                </span>.
              </p>
            </div>
            
            {/* Button En savoir Plus */}
            <div className="pt-6">
              <Button 
                asChild 
                size="lg"
                className="bg-archipel-cyan text-archipel-dark hover:bg-archipel-cyan/90 font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                <Link to="/qui-sommes-nous">
                  En savoir Plus
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-archipel-cyan/30 to-blue-500/30 rounded-xl blur-2xl scale-125"></div>
              <img 
                src="/lovable-uploads/026cc98d-c0bb-4aec-ac84-bdc36e3547f9.png" 
                alt="Édouard Brault et Michaël Abramczuk, fondateurs d'Archipel" 
                className="relative rounded-xl shadow-2xl max-w-full h-auto w-full max-w-xs lg:max-w-sm transition-transform duration-300 hover:scale-105"
                width="400"
                height="600"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
