
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    mainTitle: "Vidéo principale",
    mainDescription: "Ici un résumé de la vidéo qui play à gauche en quelques lignes",
    secondaryTitle: "Titre de la vidéo secondaire",
    secondaryDescription: "Ici un résumé de la vidéo en vignette à gauche en quelques lignes",
    summaryTitle: "Vous regardez",
  },
  {
    mainTitle: "Vidéo principale 2",
    mainDescription: "Ici un résumé de la seconde vidéo en quelques lignes",
    secondaryTitle: "Titre de la vidéo secondaire 2",
    secondaryDescription: "Résumé de la seconde vignette vidéo",
    summaryTitle: "Vous regardez",
  },
];

const VideoTestimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
            On se présente
          </span>
        </div>

        {/* Title */}
        <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight text-center">
          <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
            Ce que nos clients{"\n"}disent de nous
          </span>
        </h2>

        {/* Description */}
        <p className="text-lg text-[#010D3E] mb-12 max-w-2xl mx-auto leading-relaxed font-inter text-center">
          Prôner des résultats c'est bien. Mais quand cela vient de la bouche de nos clients, c'est mieux ! Découvrez en vidéo l'accompagnement Archipel.
        </p>

        {/* Video Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main video */}
          <div className="flex flex-col">
            <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center flex-1">
              <span className="text-gray-400">Vidéo à intégrer</span>
            </div>
          </div>

          {/* Right column: summary top + secondary bottom-aligned */}
          <div className="flex flex-col justify-between">
            {/* Summary - top right */}
            <div>
              <h4 className="font-jakarta text-xl font-bold text-[#010D3E] mb-3">
                {t.summaryTitle}
              </h4>
              <p className="text-[#010D3E]/70 font-inter leading-relaxed">
                {t.mainDescription}
              </p>
            </div>

            {/* Secondary video - aligned to bottom */}
            <div className="flex gap-4 items-end mt-auto">
              <div className="w-40 h-24 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                <span className="text-gray-400 text-xs">Vignette</span>
              </div>
              <div className="pb-1">
                <h4 className="font-jakarta font-bold text-[#010D3E] mb-1">
                  {t.secondaryTitle}
                </h4>
                <p className="text-sm text-[#010D3E]/70 font-inter leading-relaxed">
                  {t.secondaryDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-8">
          <button onClick={prev} className="text-[#010D3E] hover:text-[#0043F1] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <span className="text-[#010D3E] font-inter text-sm">Voir le témoignage suivant</span>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border-2 border-[#010D3E] text-[#010D3E] hover:bg-[#010D3E] hover:text-white flex items-center justify-center transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
