
import { useState, useEffect, useRef } from "react";

const aiLogos = [
  { src: "/lovable-uploads/logo-chatgpt-full.png", alt: "ChatGPT" },
  { src: "/lovable-uploads/logo-googleai-full.png", alt: "Google AI" },
  { src: "/lovable-uploads/logo-copilot-full.png", alt: "Copilot" },
  { src: "/lovable-uploads/logo-mistral-full.png", alt: "Mistral AI" },
  { src: "/lovable-uploads/logo-deepseek-full.png", alt: "DeepSeek", needsFilter: true },
  { src: "/lovable-uploads/logo-perplexity-full.png", alt: "Perplexity" },
  { src: "/lovable-uploads/logo-claude-full.png", alt: "Claude" },
];

const ServiceLlmSection = () => {
  const [visibleLogos, setVisibleLogos] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          aiLogos.forEach((_, i) => {
            setTimeout(() => {
              setVisibleLogos((prev) => [...prev, i]);
            }, i * 250);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
            About Us
          </span>
        </div>

        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
            We influence your visibility on the following LLMs
          </span>
        </h2>

        <p className="text-lg text-[#010D3E] mb-12 max-w-2xl mx-auto leading-relaxed font-inter">
          GEO is great, but it's not the only lever to generate leads or sales. That's why our consultants also specialize in the following channels.
        </p>

        <div
          ref={sectionRef}
          className="rounded-2xl py-8 px-12 mx-auto max-w-3xl flex items-center justify-center"
          style={{
            backgroundImage: "url('/lovable-uploads/mesh-gradient-llm-service.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex justify-center">
              <img src={aiLogos[0].src} alt={aiLogos[0].alt} className="h-28 md:h-48 w-auto object-contain transition-all duration-700 ease-out" style={{ opacity: visibleLogos.includes(0) ? 1 : 0, transform: visibleLogos.includes(0) ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)' }} loading="lazy" />
            </div>
            <div className="flex items-center justify-center gap-12 md:gap-20">
              {[1, 2].map((i) => (
                <img key={i} src={aiLogos[i].src} alt={aiLogos[i].alt} className="h-24 md:h-40 w-auto object-contain transition-all duration-700 ease-out" style={{ opacity: visibleLogos.includes(i) ? 1 : 0, transform: visibleLogos.includes(i) ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)' }} loading="lazy" />
              ))}
            </div>
            <div className="flex justify-center">
              <img src={aiLogos[3].src} alt={aiLogos[3].alt} className="h-24 md:h-40 w-auto object-contain transition-all duration-700 ease-out" style={{ opacity: visibleLogos.includes(3) ? 1 : 0, transform: visibleLogos.includes(3) ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)' }} loading="lazy" />
            </div>
            <div className="flex items-center justify-center gap-12 md:gap-20">
              <img src={aiLogos[4].src} alt={aiLogos[4].alt} className="h-24 md:h-40 w-auto object-contain transition-all duration-700 ease-out" style={{ opacity: visibleLogos.includes(4) ? 1 : 0, transform: visibleLogos.includes(4) ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)', filter: "brightness(0) saturate(100%) invert(8%) sepia(30%) saturate(2000%) hue-rotate(200deg) brightness(95%) contrast(100%)" }} loading="lazy" />
              <img src={aiLogos[5].src} alt={aiLogos[5].alt} className="h-24 md:h-40 w-auto object-contain transition-all duration-700 ease-out" style={{ opacity: visibleLogos.includes(5) ? 1 : 0, transform: visibleLogos.includes(5) ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)' }} loading="lazy" />
            </div>
            <div className="flex justify-center">
              <img src={aiLogos[6].src} alt={aiLogos[6].alt} className="h-24 md:h-40 w-auto object-contain transition-all duration-700 ease-out" style={{ opacity: visibleLogos.includes(6) ? 1 : 0, transform: visibleLogos.includes(6) ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)' }} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceLlmSection;
