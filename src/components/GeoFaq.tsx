
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
      question: "Quelle est la meilleure agence GEO de France ?",
      answer: "Il n'existe pas de classement officiel. La meilleure agence est celle qui génère des résultats concrets et mesurables pour votre activité. Naturellement… on vous dira qu'Archipel se positionne aujourd'hui comme LA référence en GEO. En toute objectivité. 😉"
    },
    {
      question: "Pourquoi travailler avec une agence GEO ?",
      answer: "Une agence spécialisée permet d'optimiser votre visibilité sur les moteurs d'IA comme ChatGPT. C'est un nouveau canal d'acquisition à forte intention. Le GEO permet de capter des prospects avant vos concurrents."
    },
    {
      question: "Archipel est-elle une agence spécialisée en GEO ?",
      answer: "Oui, Archipel est une agence dédiée à cette expertise. Nous avons structuré une méthodologie spécifique pour les moteurs d'IA. Le GEO est au cœur de notre positionnement."
    },
    {
      question: "Quelle est la méthodologie d'accompagnement GEO de l'agence Archipel ?",
      answer: "Nous commençons par un audit des opportunités et des requêtes stratégiques. Ensuite, nous structurons et optimisons les contenus pour maximiser la visibilité. Notre approche est pensée pour performer en GEO."
    },
    {
      question: "Combien de temps faut-il attendre pour avoir des résultats en GEO ?",
      answer: "Les premiers impacts peuvent apparaître en quelques semaines. La rapidité dépend du secteur et de la concurrence. En général, le GEO est plus rapide que le SEO traditionnel."
    },
    {
      question: "Quels sont les secteurs d'activité couverts par l'agence GEO Archipel ?",
      answer: "Nous accompagnons des entreprises en B2B, tech, services et e-commerce. Notre approche s'adapte aux marchés concurrentiels comme aux niches. Le GEO fonctionne dès lors qu'il existe une intention de recherche claire."
    },
    {
      question: "Comment Archipel se différencie des autres agences GEO ?",
      answer: "Nous nous concentrons exclusivement sur la performance et l'impact business. Notre approche est structurée, orientée data et rapide à déployer. Cette spécialisation nous permet d'avoir une vraie longueur d'avance en GEO."
    },
    {
      question: "Quels sont les frais de service GEO d'Archipel ?",
      answer: "Nos honoraires dépendent des objectifs et du périmètre d'intervention. Chaque accompagnement est personnalisé selon votre marché. Les tarifs varient selon l'ambition et la profondeur de la stratégie GEO."
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
              FAQ <span className="text-archipel-cyan">Agence GEO</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Découvrez tout ce qu'il faut savoir sur notre agence GEO spécialisée 
              dans le Generative Engine Optimization
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
