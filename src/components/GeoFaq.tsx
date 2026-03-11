
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GeoFaq = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const faqData = [
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
      question: "Which industries does ArchipelaGrowth cover?",
      answer: "We support companies in B2B, tech, services, and e-commerce. Our approach adapts to competitive markets as well as niches. GEO works whenever there's a clear search intent."
    },
    {
      question: "How does ArchipelaGrowth differentiate from other GEO agencies?",
      answer: "We focus exclusively on performance and business impact. Our approach is structured, data-driven, and rapid to deploy. This specialization gives us a real edge in GEO."
    },
    {
      question: "What are ArchipelaGrowth's GEO service fees?",
      answer: "Our fees depend on objectives and scope of engagement. Each support plan is personalized to your market. Rates vary based on the ambition and depth of the GEO strategy."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              FAQ <span className="text-archipel-cyan">GEO Agency</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about our GEO agency specialized 
              in Generative Engine Optimization
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gray-800/50 rounded-lg border border-gray-700 px-6"
              >
                <AccordionTrigger className="text-left text-white hover:text-archipel-cyan transition-colors duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pt-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default GeoFaq;
