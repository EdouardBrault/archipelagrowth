
import { useEffect } from "react";
import Layout from "@/components/Layout";
import SEOHelmet from "@/components/SEOHelmet";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Zap, Timer, MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import LogoCarousel from "@/components/LogoCarousel";
import ContactSection from "@/components/ContactSection";
import { useState } from "react";

const timelineEvents = [
  {
    year: "2021",
    title: "La Rencontre",
    description: "Edouard et Michaël, les 2 fondateurs d'Archipel Marketing, se sont rencontrés en 2021, dans une agence marketing.",
    detail: "C'est l'histoire d'une belle amitié qui s'est vite soldée par une volonté commune d'entreprendre à deux.",
    extra: "",
    month: "Janvier",
    label: "La rencontre",
    photo: "/lovable-uploads/timeline-rencontre.jpg",
    photoPosition: "object-[center_25%]",
  },
  {
    year: "2022",
    title: "Création de l'agence",
    description: "En 2022, ils décident de créer Archipel Marketing, une agence de marketing digital spécialisée en paid. Très vite, les premiers clients affluent, grâce à leur expertise et leur qualité d'accompagnement.",
    detail: "",
    extra: "",
    month: "Juin",
    label: "Création de l'Agence",
    photo: "/lovable-uploads/timeline-creation-agence.jpg",
    photoPosition: "object-[center_25%]",
  },
  {
    year: "2025",
    title: "1er client en GEO accompagné",
    description: "En 2025, Archipel fait un pari : miser la majeure partie de ses ressources et de son temps dans la compréhension du GEO qui est à leur sens, le futur du marketing. C'est grâce à cette vision que l'agence signe son premier client en GEO.",
    detail: "",
    extra: "",
    month: "Avril",
    label: "Premier client accompagné en GEO",
    photo: "/lovable-uploads/timeline-1er-client-geo.jpeg",
    photoPosition: "object-[center_25%]",
  },
  {
    year: "2025",
    title: "On devient partenaire Profound et Peec AI",
    description: "À force d'accompagner de plus en plus de clients, Archipel signe des partenariats privilégiés avec les outils de visibilité d'IA principaux, réputés sur le marché. Ainsi, ils sont la première agence européenne à collaborer avec Profound et une des premières avec Peec AI.",
    detail: "",
    extra: "",
    month: "Juillet",
    label: "Partenaire Profound et Peec AI",
    photo: "/lovable-uploads/timeline-profound.jpg",
    photoPosition: "object-[center_20%]",
  },
  {
    year: "2025",
    title: "Aménagement dans nos premiers bureaux",
    description: "La croissance d'Archipel et de ses équipes s'accompagne d'un changement majeur : pour la première fois, l'agence dispose de ses propres bureaux, en plein Paris, à deux pas des Grands Boulevards.",
    detail: "",
    extra: "",
    month: "Septembre",
    label: "Aménagement dans nos premiers bureaux",
    photo: "/lovable-uploads/timeline-locaux.jpg",
    photoPosition: "object-center",
  },
  {
    year: "2026",
    title: "100ème client Archipel signé",
    description: "À l'aube de ses 5 ans d'existence, Archipel célèbre la signature de 100ème client (son 40ème sur la partie GEO). Une belle étape qui vient récompenser plusieurs années de travail, de tests, d'abnégation et d'innovation.",
    detail: "",
    extra: "",
    month: "Janvier",
    label: "100e client Archipel signé",
    photo: "/lovable-uploads/timeline-100e-client.jpg",
    photoPosition: "object-[center_35%]",
  },
  {
    year: "",
    title: "Et maintenant ?",
    description: "Archipel a pour objectif de devenir la référence mondiale du GEO. Un objectif ambitieux ? Certainement. Trop ambitieux ? Il serait dommage de ne pas viser les étoiles !",
    detail: "",
    extra: "",
    month: "",
    label: "Et maintenant ?",
    photo: "/lovable-uploads/timeline-rooftop.jpg",
    photoPosition: "object-center",
  },
];

const teamMembers = [
  { name: "Edouard Brault", role: "Co-Fondateur", id: 0, photo: "/lovable-uploads/photo-edouard-v2.png" },
  { name: "Michaël Abramczuk", role: "Co-Fondateur", id: 1, photo: "/lovable-uploads/photo-michael-v2.png" },
  { name: "Nour", role: "Consultante GEO & Paid", id: 2, photo: "/lovable-uploads/photo-nour-v2.png" },
  { name: "Germain", role: "Consultant GEO & Paid", id: 3, photo: "/lovable-uploads/photo-germain-v2.png" },
  { name: "Nathan", role: "Consultant GEO & Paid", id: 4, photo: "/lovable-uploads/photo-nathan-v2.png" },
  { name: "Eva", role: "Consultante GEO & Paid", id: 5, photo: "/lovable-uploads/photo-eva-v2.png" },
  { name: "Pauline", role: "Consultante GEO & Paid", id: 6, photo: "/lovable-uploads/photo-pauline-v2.png" },
  { name: "Léa", role: "Business Developer", id: 7, photo: "/lovable-uploads/photo-lea-v2.png" },
  { name: "Hortense", role: "Lead Designer", id: 8, photo: "/lovable-uploads/photo-hortense-v2.png" },
];

const values = [
  { icon: Zap, title: "Performance", description: "Chaque action est pensée pour produire un impact mesurable : visibilité accrue, citations dans les moteurs génératifs et avantage concurrentiel durable." },
  { icon: Timer, title: "Pragmatisme", description: "Le GEO évolue vite. Nous aussi. Nous testons, analysons et optimisons en continu. Pas de théorie superflue : uniquement des stratégies concrètes qui fonctionnent dans les environnements IA réels." },
  { icon: MoveRight, title: "Transparence", description: "Comprendre votre marché avant d'optimiser votre visibilité. Nous travaillons en transparence, avec pédagogie, pour construire une stratégie GEO alignée avec vos enjeux business et vos ambitions de croissance." },
];

const ArchipelAPropos = () => {
  const [activeTimeline, setActiveTimeline] = useState(0);

  // Preload all timeline images on mount
  useEffect(() => {
    timelineEvents.forEach((event) => {
      if (event.photo) {
        const img = new Image();
        img.src = event.photo;
      }
    });
  }, []);

  return (
    <>
      <SEOHelmet
        title="À propos | Archipel Marketing - Agence GEO n°1 en France"
        description="Découvrez l'histoire, l'équipe et les valeurs d'Archipel Marketing, la première agence GEO de France."
        canonicalUrl="https://archipelmarketing.com/qui-sommes-nous"
      />
      <Layout>
        {/* Hero */}
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-8">
              <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
                Welcome ! 👋
              </span>
            </div>
            <h1 className="font-jakarta text-5xl md:text-7xl font-bold mb-6 leading-[0.95] tracking-tight">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
                À propos d'Archipel Marketing
              </span>
            </h1>
            <p className="text-lg text-[#010D3E] font-inter mb-8">
              {"Archipel, c'est l'histoire d'une agence pionnière en GEO et de consultants qui ont retroussé leurs manches dès 2024 pour comprendre son fonctionnement."}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal font-inter rounded-lg px-8"
              >
                 <Link to="/contact#contact-form">Contactez-nous</Link>
              </Button>
              <Link
                 to="/contact#contact-form"
                className="text-[#0043F1] font-normal font-inter flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                Votre score GEO
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="pb-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Active event card */}
            <div
              className="rounded-t-2xl p-6 md:p-12 relative overflow-hidden bg-cover bg-center min-h-[420px] md:min-h-[500px] md:h-[380px]"
              style={{ backgroundImage: "url('/lovable-uploads/mesh-gradient-timeline.png')" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center relative z-10">
                {/* Images column - shown first on mobile */}
                <div className="flex flex-col items-end order-first md:order-last">
                  <div className="flex items-center justify-between w-full mb-2">
                    {timelineEvents[activeTimeline].month && (
                      <span className="font-inter text-[#010D3E]/60 text-sm">
                        {timelineEvents[activeTimeline].month}
                      </span>
                    )}
                    {timelineEvents[activeTimeline].year && (
                      <span className="font-jakarta text-5xl md:text-8xl font-bold text-[#010D3E]/20">
                        {timelineEvents[activeTimeline].year}
                      </span>
                    )}
                  </div>
                  <div className="w-full rounded-xl overflow-hidden relative h-44 md:h-60">
                    {timelineEvents.map((event, index) => (
                      event.photo && (
                        <img
                          key={index}
                          src={event.photo}
                          alt={event.title}
                          className={`absolute inset-0 w-full h-full object-cover rounded-xl transition-opacity duration-300 ${event.photoPosition || ''} ${
                            index === activeTimeline ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      )
                    ))}
                  </div>
                </div>
                {/* Text column */}
                <div className="order-last md:order-first">
                  <h3 className="font-jakarta text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-[#010D3E]">
                    {timelineEvents[activeTimeline].title}
                  </h3>
                  <p className="font-inter text-[#010D3E]/80 text-sm md:text-base mb-3">
                    {timelineEvents[activeTimeline].description}
                  </p>
                  {timelineEvents[activeTimeline].detail && (
                    <p className="font-inter text-[#010D3E]/60 text-sm mb-4">
                      {timelineEvents[activeTimeline].detail}
                    </p>
                  )}
                  {timelineEvents[activeTimeline].extra && (
                    <p className="font-inter text-[#010D3E]/50 text-sm mb-6">
                      {timelineEvents[activeTimeline].extra}
                    </p>
                  )}
                  {/* Desktop button */}
                  <Button
                    onClick={() => {
                      if (activeTimeline < timelineEvents.length - 1) {
                        setActiveTimeline(activeTimeline + 1);
                      }
                    }}
                    className="hidden md:inline-flex bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal rounded-full px-6"
                  >
                    Date clé suivante
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mobile timeline nav */}
            <div className="md:hidden bg-[#0043F1] px-4 py-5">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => setActiveTimeline(Math.max(0, activeTimeline - 1))}
                  disabled={activeTimeline === 0}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center disabled:opacity-30 transition-opacity"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <span className="font-jakarta text-white font-bold text-sm text-center px-2">
                  {timelineEvents[activeTimeline].label}
                </span>
                <button
                  onClick={() => setActiveTimeline(Math.min(timelineEvents.length - 1, activeTimeline + 1))}
                  disabled={activeTimeline === timelineEvents.length - 1}
                  className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center disabled:opacity-30 transition-opacity"
                >
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>
              {/* Progress dots */}
              <div className="flex justify-center gap-2">
                {timelineEvents.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTimeline(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === activeTimeline ? 'bg-white scale-125' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop timeline bar */}
            <div className="hidden md:block bg-[#0043F1] rounded-b-2xl px-8 md:px-12 py-8 relative">
              <div className="flex items-center relative z-10">
                <span className="font-jakarta text-white font-bold text-2xl md:text-4xl italic shrink-0 mr-4 md:mr-6">2021</span>
                <div className="flex-1 relative h-[120px]">
                  <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-white/40 -translate-y-1/2" />
                  <div className="flex justify-between h-full relative z-10">
                    {timelineEvents.map((event, index) => {
                      const isAbove = index % 2 !== 0;
                      return (
                        <button
                          key={index}
                          onClick={() => setActiveTimeline(index)}
                          className="relative flex flex-col items-center justify-center group"
                        >
                          <div className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-white transition-all ${
                            index === activeTimeline ? "bg-white scale-125" : "bg-white/40"
                          }`} />
                          <span className={`absolute whitespace-normal font-jakarta text-xs text-white text-center max-w-[120px] leading-snug ${
                            isAbove ? "bottom-[calc(50%+14px)]" : "top-[calc(50%+14px)]"
                          } ${index === activeTimeline ? "font-bold" : "font-semibold opacity-80"}`}>
                            <sup className="text-[6px] mr-0.5">({index + 1})</sup>{event.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <span className="font-jakarta text-white font-bold text-2xl md:text-4xl italic shrink-0 ml-4 md:ml-6">2026</span>
              </div>
            </div>

            {/* Mobile rounded bottom */}
            <div className="md:hidden bg-[#0043F1] rounded-b-2xl h-3" />
          </div>
        </section>

        {/* Notre équipe */}
        <section id="notre-equipe" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
                On se présente
              </span>
            </div>
            <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
                Notre équipe
              </span>
            </h2>
            <p className="text-[#010D3E] font-inter mb-8 max-w-xl mx-auto">
              Archipel est une agence dynamique composée de talents techniques, agiles, dynamiques et à l'écoute.
            </p>
            <div className="flex justify-center mb-12">
              <Button
                asChild
                className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-inter font-normal rounded-lg px-8"
              >
                <Link to="/contact#contact-form">Contactez-nous</Link>
              </Button>
            </div>

            {/* Team grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="flex justify-center mb-4 w-48 h-48 rounded-full overflow-hidden mx-auto">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} className="w-full h-full object-cover scale-110 object-[center_-5%]" loading="lazy" />
                    ) : (
                      <div className="w-full h-full bg-gray-100" />
                    )}
                  </div>
                  <h3 className="font-jakarta font-bold text-[#010D3E] text-lg">{member.name}</h3>
                  <p className="font-inter text-[#010D3E]/60 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nos valeurs */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
                On se présente
              </span>
            </div>
            <h2 className="font-jakarta text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
                Nos{"\n"}valeurs
              </span>
            </h2>
            <p className="text-[#010D3E]/70 font-inter mb-16 max-w-xl mx-auto leading-relaxed">
              Le GEO redéfinit les règles de la visibilité en ligne.<br />
              Chez Archipel, nos valeurs guident chacune de nos décisions, de nos recommandations et de nos actions.<br /><br />
              Elles structurent notre manière d'accompagner nos clients : avec exigence, pragmatisme et transparence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
              {values.map((v, index) => (
                <div
                  key={v.title}
                  className="text-center group hover:-translate-y-2 transition-all duration-500 ease-out"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex justify-center mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#0043F1]/5 flex items-center justify-center group-hover:bg-[#0043F1]/10 group-hover:scale-110 transition-all duration-500">
                      <v.icon className="w-7 h-7 text-[#0043F1] group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="font-jakarta font-bold text-[#010D3E] text-lg mb-2">{v.title}</h3>
                  <p className="font-inter text-[#010D3E]/60 text-sm leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>

            <Link
              to="/contact#contact-form"
              className="text-[#0043F1] font-inter font-medium inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
            >
              On en discute ?
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Contact */}
        <ContactSection />
      </Layout>
    </>
  );
};

export default ArchipelAPropos;
