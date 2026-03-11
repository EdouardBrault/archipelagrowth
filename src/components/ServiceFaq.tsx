
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

const defaultFaqItems: FaqItem[] = [
  {
    question: "What is the best GEO agency in the US?",
    answer: "There is no official ranking. The best agency is the one that generates concrete, measurable results for your business. Naturally… we'd say ArchipelaGrowth positions itself today as THE reference in GEO. In all objectivity. 😉"
  },
  {
    question: "Why work with a GEO agency?",
    answer: "A specialized agency optimizes your visibility on AI engines like ChatGPT. It's a new high-intent acquisition channel. GEO allows you to capture prospects before your competitors."
  },
  {
    question: "Is ArchipelaGrowth specialized in GEO?",
    answer: "Yes, ArchipelaGrowth is an agency dedicated to this expertise. We've built a specific methodology for AI engines. GEO is at the core of our positioning."
  },
  {
    question: "What is ArchipelaGrowth's GEO methodology?",
    answer: "We start with an audit of opportunities and strategic queries. Then we structure and optimize content to maximize visibility. Our approach is designed to perform in GEO."
  },
  {
    question: "How long does it take to see results in GEO?",
    answer: "Initial impacts can appear within weeks. Speed depends on the industry and competition. Generally, GEO is faster than traditional SEO."
  },
  {
    question: "Which industries does ArchipelaGrowth's GEO agency cover?",
    answer: "We support companies in B2B, tech, services, and e-commerce. Our approach adapts to competitive markets as well as niches. GEO works whenever there's a clear search intent."
  },
  {
    question: "How does ArchipelaGrowth differentiate from other GEO agencies?",
    answer: "We focus exclusively on performance and business impact. Our approach is structured, data-driven, and rapid to deploy. This specialization gives us a real edge in GEO."
  },
  {
    question: "What are ArchipelaGrowth's GEO service fees?",
    answer: "Our fees depend on objectives and scope of engagement. Each support plan is personalized to your market. Rates vary based on the ambition and depth of the GEO strategy."
  },
];

interface ServiceFaqProps {
  items?: FaqItem[];
}

const ServiceFaq = ({ items }: ServiceFaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqItems = items || defaultFaqItems;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-jakarta text-5xl md:text-6xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
            FAQ
          </span>
        </h2>

        <div className="space-y-0">
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-6 text-left"
              >
                <span className="font-inter font-medium text-[#010D3E] text-base pr-8">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-[#010D3E] flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-[#010D3E] flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="pb-6 pr-12">
                  <p className="font-inter text-[#010D3E]/70 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
              <div className="h-px bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFaq;
