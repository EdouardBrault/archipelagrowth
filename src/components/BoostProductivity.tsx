
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const aiLogos = [
  { src: "/lovable-uploads/logo-chatgpt-full.png", alt: "ChatGPT" },
  { src: "/lovable-uploads/logo-googleai-full.png", alt: "Google AI" },
  { src: "/lovable-uploads/logo-copilot-full.png", alt: "Copilot" },
  { src: "/lovable-uploads/logo-mistral-full.png", alt: "Mistral AI" },
  { src: "/lovable-uploads/logo-deepseek-full.png", alt: "DeepSeek", needsFilter: true },
  { src: "/lovable-uploads/logo-perplexity-full.png", alt: "Perplexity" },
];

const BoostProductivity = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
            Agence GEO n°1 en France
          </span>
        </div>

        {/* Title */}
        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
            N°1 sur Chat GPT ou AI Overview en 1 mois
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg text-[#010D3E] mb-12 max-w-2xl mx-auto leading-relaxed font-inter">
          Notre expertise en GEO vous permet d'être visible sur tous les moteurs IA en un temps record.
        </p>

        {/* Logos grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-1.5 md:gap-2 items-center justify-items-center max-w-3xl mx-auto">
          {aiLogos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-32 md:h-64 w-auto object-contain"
              style={logo.needsFilter ? {
                filter: "brightness(0) saturate(100%) invert(8%) sepia(30%) saturate(2000%) hue-rotate(200deg) brightness(95%) contrast(100%)",
              } : undefined}
              loading="lazy"
            />
          ))}
        </div>

        {/* Case study screenshot */}
        <div className="mt-10 mx-auto max-w-3xl perspective-[1200px]">
          <img
            src="/lovable-uploads/case-study-screenshot.jpg"
            alt="Étude de cas - Visibility Score #1"
            className="w-full rounded-2xl border border-gray-200 transition-all duration-500 ease-out hover:[transform:rotateY(-4deg)_rotateX(3deg)_scale(1.03)] cursor-pointer"
            style={{
              boxShadow: "0 20px 60px -15px rgba(0, 19, 84, 0.25), 0 8px 24px -8px rgba(0, 0, 0, 0.15)",
            }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default BoostProductivity;
