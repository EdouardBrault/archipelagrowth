
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n";

function useCountUp(end: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>();
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [start, end, duration]);
  return value;
}

const NosChiffres = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    { end: 50, prefix: "+", suffix: "", label: t.nosChiffres.clients },
    { end: 100, prefix: "", suffix: "%", label: t.nosChiffres.satisfaction },
    { end: 7, prefix: "+", suffix: "x", label: t.nosChiffres.roas },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) { hasAnimated.current = true; setIsVisible(true); }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">{t.nosChiffres.badge}</span>
        </div>
        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">{t.nosChiffres.title}</span>
        </h2>
        <p className="text-lg text-[#010D3E] mb-12 max-w-2xl mx-auto leading-relaxed font-inter font-normal">{t.nosChiffres.description}</p>
        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const count = useCountUp(stat.end, 2000, isVisible);
            return (
              <div key={stat.label} className="bg-gray-100 rounded-2xl p-10 text-center">
                <div className="font-jakarta text-5xl md:text-6xl font-bold text-[#0043F1] mb-3">{stat.prefix}{count}{stat.suffix}</div>
                <p className="text-[#000000] font-dm-sans text-base">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NosChiffres;
