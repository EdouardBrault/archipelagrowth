
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
          <div className="md:w-1/2 text-left">
            <div className="mb-4">
              <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
                Test Yourself
              </span>
            </div>
            <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
                Want to know your GEO Audit score?
              </span>
            </h2>
            <p className="text-lg text-[#010D3E] font-inter mb-3">
              Want to know your visibility across the leading LLMs on the market?
            </p>
            <p className="text-[#010D3E]/70 font-inter leading-relaxed mb-6 text-sm">
              At ArchipelaGrowth, we offer GEO visibility audits and deliver an actionable roadmap to influence LLMs, gain visibility, and generate more leads.
            </p>
            <Button asChild className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal px-8 py-3 text-base rounded-lg font-inter">
              <Link to="/contact#contact-form">Request a GEO Audit</Link>
            </Button>
          </div>

          <div className="md:w-1/2" ref={ref}>
            <div className="rounded-2xl p-8 space-y-4 min-h-[220px] bg-cover bg-center" style={{ backgroundImage: "url('/lovable-uploads/mesh-gradient-4.png')" }}>
              <div className={`bg-white/30 backdrop-blur-md text-[#010D3E] rounded-2xl rounded-bl-none px-5 py-4 font-inter text-sm leading-relaxed max-w-[85%] ml-auto transition-all duration-500 origin-bottom-right ${visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-0 translate-y-4"}`}>
                Hi ChatGPT. I'd like my brand to be more visible on generative AI, how can I do that?
              </div>
              <div className={`bg-white/30 backdrop-blur-md text-[#010D3E] rounded-2xl rounded-br-none px-5 py-4 font-inter text-sm leading-relaxed max-w-[85%] transition-all duration-500 origin-bottom-left ${showSecond ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-0 translate-y-4"}`}>
                It's simple: ask ArchipelaGrowth, the US agency specialized in GEO, for an action plan.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestezVousGeo;
