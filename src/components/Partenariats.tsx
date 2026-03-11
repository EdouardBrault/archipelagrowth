
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const partners = [
  {
    name: "Profound Partner",
    description: "Advanced AI platform for analyzing and optimizing marketing performance.",
    detail: "Since summer 2025, we are the first European partner of Profound. It's one of the two leading tools on the market for measuring brand visibility across predefined prompts.",
    image: "/lovable-uploads/profound-screenshot.png",
  },
  {
    name: "Peec AI Partner",
    description: "Tool that measures and improves brand visibility in AI responses.",
    detail: "Since 2025, we are also partners of Peec AI, the European leader in AI visibility tools. We support their clients end-to-end: from strategy, to prompt definition, to blog article publishing.",
    image: "/lovable-uploads/peecai-screenshot.png",
  },
];

const Partenariats = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-6">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
            Partnerships
          </span>
        </div>

        {partners.map((partner, idx) => (
          <div key={idx} className={`flex flex-col md:flex-row items-center gap-10 mb-20 last:mb-0 ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
            <div className="md:w-1/2 text-left">
              <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">{partner.name}</span>
              </h2>
              <p className="text-lg text-[#010D3E] font-inter mb-4">{partner.description}</p>
              <p className="text-[#010D3E]/70 font-inter leading-relaxed mb-6">{partner.detail}</p>
              <Button asChild className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal font-inter px-8 py-3 text-base rounded-lg">
                <Link to="/contact#contact-form">Contact Us</Link>
              </Button>
            </div>
            <div className="md:w-1/2 perspective-[1200px]">
              {partner.image ? (
                <img src={partner.image} alt={partner.name} className="rounded-2xl w-full border border-gray-200 transition-all duration-500 ease-out hover:[transform:rotateY(-4deg)_rotateX(3deg)_scale(1.03)] cursor-pointer" style={{ boxShadow: "0 20px 60px -15px rgba(0, 19, 84, 0.25), 0 8px 24px -8px rgba(0, 0, 0, 0.15)" }} loading="lazy" />
              ) : (
                <div className="bg-gray-100 rounded-2xl aspect-[4/3] flex items-center justify-center border border-gray-200">
                  <span className="text-gray-400">Partner screenshot</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Partenariats;
