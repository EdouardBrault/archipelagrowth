
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import InteractiveVisualFocus from "./InteractiveVisualFocus";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white pt-8">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`text-left transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex items-center mb-8">
              <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
                Welcome ! 👋
              </span>
            </div>
            
            <h1 className="font-jakarta text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.05]">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
                La première agence GEO de France
              </span>
            </h1>
            
            <p className="text-lg text-[#010D3E] mb-10 max-w-xl leading-relaxed font-inter">
              Archipel Marketing est une agence spécialisée en GEO. Obtenez du trafic et des achats via les IA génératives grâce à notre méthodologie d'accompagnement.
            </p>
            
            <div className="flex flex-row items-center gap-4 mb-4 md:mb-10">
              <Button 
                asChild 
                size="lg" 
                className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-lg font-inter"
              >
                <Link to="/contact#contact-form">
                  Contactez-nous
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="ghost" 
                size="lg"
                className="text-[#0043F1] hover:text-[#0043F1]/80 hover:bg-transparent font-normal px-4 md:px-6 py-5 md:py-6 text-sm md:text-base"
              >
                <Link to="/contact#contact-form">
                  Votre score GEO
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Interactive Visual Focus */}
          <div className={`relative transition-all duration-1000 delay-300 -mx-4 sm:-mx-6 lg:mx-0 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <InteractiveVisualFocus />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
