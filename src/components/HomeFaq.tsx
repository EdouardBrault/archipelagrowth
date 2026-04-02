
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/i18n";

const HomeFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-jakarta text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">{t.homeFaq.title}</span>
        </h2>
        <div className="space-y-0">
          {t.homeFaq.items.map((item, index) => (
            <div key={index}>
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between py-6 text-left">
                <span className="font-inter font-medium text-[#010D3E] text-base pr-8">{item.question}</span>
                {openIndex === index ? <Minus className="w-5 h-5 text-[#010D3E] flex-shrink-0" /> : <Plus className="w-5 h-5 text-[#010D3E] flex-shrink-0" />}
              </button>
              {openIndex === index && (
                <div className="pb-6 pr-12"><p className="font-inter text-[#010D3E]/70 text-sm leading-relaxed">{item.answer}</p></div>
              )}
              <div className="h-px bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFaq;
