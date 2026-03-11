
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqItems = [
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
  },
];

const HomeFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

export default HomeFaq;
