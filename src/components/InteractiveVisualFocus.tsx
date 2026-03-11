
import { useState, useEffect } from "react";

const InteractiveVisualFocus = () => {
  const llmLogos = [
    { name: "ChatGPT", src: "/lovable-uploads/logo-chatgpt-blue-text.png", alt: "ChatGPT Logo" },
    { name: "Mistral", src: "/lovable-uploads/logo-mistral-blue-text.png", alt: "Mistral AI Logo" },
    { name: "Perplexity", src: "/lovable-uploads/logo-perplexity-blue-text.png", alt: "Perplexity Logo" },
    { name: "DeepSeek", src: "/lovable-uploads/logo-deepseek-blue-text.png", alt: "DeepSeek Logo" },
  ];

  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % llmLogos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [llmLogos.length]);

  return (
    <div className="relative w-full aspect-[4/4.5] md:aspect-[5/5] overflow-hidden bg-cover bg-center rounded-none md:rounded-3xl" style={{
      backgroundImage: "url('/lovable-uploads/mesh-gradient-hero.png')"
    }}>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-8">
        <h2 className="font-jakarta text-3xl md:text-5xl lg:text-6xl font-bold text-[#0043F1] text-center mb-6 md:mb-10 leading-tight">
          Become #1 on
        </h2>
        
        <div className="relative w-72 h-20 md:w-[500px] md:h-36 lg:w-[600px] lg:h-44">
          {llmLogos.map((logo, index) => (
            <div
              key={logo.name}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${
                index === currentLogoIndex
                  ? 'opacity-100 scale-100 translate-y-0'
                  : 'opacity-0 scale-95 translate-y-2'
              }`}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveVisualFocus;
