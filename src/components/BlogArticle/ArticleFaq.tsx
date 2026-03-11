import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FaqItem, FaqSection } from '@/types/blog';
import DOMPurify from 'dompurify';

interface ArticleFaqProps {
  faq?: FaqItem[];
  faqSections?: FaqSection[];
}

const ArticleFaq = ({ faq = [], faqSections = [] }: ArticleFaqProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(i => i !== itemId)
        : [...prev, itemId]
    );
  };

  const renderAnswer = (answer: string) => {
    const formattedHtml = answer
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-archipel-cyan hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\n/g, '<br>');
    
    const sanitizedHtml = DOMPurify.sanitize(formattedHtml, {
      ALLOWED_TAGS: ['strong', 'em', 'a', 'br'],
      ALLOWED_ATTR: ['href', 'class', 'target', 'rel']
    });

    return (
      <div 
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    );
  };

  // Determine if we have any FAQ content to display
  const hasSimpleFaq = faq.length > 0;
  const hasSectionedFaq = faqSections.length > 0;
  
  if (!hasSimpleFaq && !hasSectionedFaq) {
    return null;
  }

  // Gather all FAQ items for structured data
  const allFaqItems: FaqItem[] = [
    ...faq,
    ...faqSections.flatMap(section => section.questions)
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-archipel-dark">
          Questions fréquemment posées
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Trouvez des réponses aux questions les plus courantes
        </p>
        
        <div className="space-y-6">
          {/* Render simple FAQ first */}
          {hasSimpleFaq && (
            <div className="space-y-4">
              {faq.map((item, index) => {
                const itemId = `simple-${index}`;
                const isOpen = openItems.includes(itemId);
                return (
                  <div 
                    key={itemId}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => toggleItem(itemId)}
                      className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                    >
                      <h3 className="font-medium text-archipel-dark">{item.question}</h3>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 py-4 bg-white border-t border-gray-200">
                        <div className="prose prose-sm max-w-none text-gray-700">
                          {renderAnswer(item.answer)}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Render sectioned FAQ */}
          {hasSectionedFaq && faqSections.map((section, sectionIndex) => (
            <div key={section.id} className="space-y-4">
              {section.title && (
                <h3 className="text-xl font-semibold text-archipel-dark border-b border-gray-200 pb-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-4">
                {section.questions.map((item, questionIndex) => {
                  const itemId = `section-${sectionIndex}-${questionIndex}`;
                  const isOpen = openItems.includes(itemId);
                  return (
                    <div 
                      key={itemId}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                      >
                        <h4 className="font-medium text-archipel-dark">{item.question}</h4>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 py-4 bg-white border-t border-gray-200">
                          <div className="prose prose-sm max-w-none text-gray-700">
                            {renderAnswer(item.answer)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Hidden structured data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": allFaqItems.map(item => ({
              "@type": "Question",
              "name": item.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer
              }
            }))
          })}
        </script>
      </div>
    </section>
  );
};

export default ArticleFaq;
