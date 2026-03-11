
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: "/lovable-uploads/icon-technique.png",
    title: "Technique",
    description: "Nous rendons votre site GEO-friendly pour favoriser la venue des bots IA.",
    link: "/agence-geo-archipel#audit-visibilite",
  },
  {
    icon: "/lovable-uploads/icon-contenu.png",
    title: "Contenu",
    description: "Nous identifions et produisons les contenus à publier sur votre site.",
    link: "/agence-geo-archipel#publication-contenu",
  },
  {
    icon: "/lovable-uploads/icon-social.png",
    title: "Social",
    description: "Nous identifions et influençons les données sociales pertinente pour vous.",
    link: "/agence-geo-archipel#identification-sources",
  },
];

const GeoPillars = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
            Comment devenir n°1 en GEO ?
          </span>
        </div>

        {/* Title */}
        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
            Les 3 piliers du GEO
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg text-[#010D3E] mb-8 max-w-2xl mx-auto leading-relaxed font-inter">
          Chez Archipel, nous avons identifié 3 chantiers principaux à travailler pour avoir un impact significatif sur la visibilité d'une marque sur les LLMs.
        </p>

        {/* CTA */}
        <div className="flex justify-center mb-14">
          <Button
            asChild
            className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal px-8 py-3 text-base rounded-lg font-inter"
          >
            <Link to="/contact#contact-form">Votre score GEO</Link>
          </Button>
        </div>

        {/* 3 Pillars - taller */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white border border-gray-200 rounded-2xl p-8 pb-12 text-left hover:shadow-md transition-shadow duration-300 min-h-[320px] flex flex-col"
            >
              <div className="mb-8">
                <img
                  src={pillar.icon}
                  alt={pillar.title}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="font-jakarta text-xl font-bold text-[#010D3E] mb-3">
                {pillar.title}
              </h3>
              <p className="text-[#010D3E]/60 font-inter leading-relaxed text-[15px] mb-6">
                {pillar.description}
              </p>
              <Link
                to={pillar.link}
                className="text-[#0043F1] font-medium inline-flex items-center gap-1.5 hover:gap-2.5 transition-all text-sm"
              >
                En savoir plus <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GeoPillars;
