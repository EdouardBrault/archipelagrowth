
import Layout from "@/components/Layout";
import ContactSection from "@/components/ContactSection";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const FILTER_OPTIONS = {
  leviers: ["GEO", "Google Ads", "LinkedIn Ads", "Meta Ads", "SEA", "SEO", "Landing pages"],
  secteurs: ["E-Commerce", "Leadgen B2C", "Leadgen B2B"],
};

const CLIENT_REFERENCES = [
  {
    name: "Keyrus",
    logo: "/lovable-uploads/logo-keyrus-blue.png",
    title: "Acquisition multi-pays",
    description: "Structurer l'acquisition multi-pays avec Paid & GEO",
    tags: ["Google Ads", "LinkedIn Ads", "GEO", "Landing pages"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-keyrus",
  },
  {
    name: "Billet Réduc'",
    logo: "/lovable-uploads/logo-billet-reduc-blue.png",
    title: "Acquisition e-commerce",
    description: "Optimiser l'acquisition e-commerce via Meta Ads et Google Ads",
    tags: ["Meta Ads", "Google Ads"],
    secteur: "E-Commerce",
    caseStudyUrl: "/archipel-billet-reduc",
  },
  {
    name: "Sodexo",
    logo: "/lovable-uploads/logo-sodexo-blue.png",
    title: "Acquisition B2B",
    description: "Structurer l'acquisition B2B de Circles by Sodexo via Paid Ads",
    tags: ["LinkedIn Ads", "Google Ads"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-sodexo",
  },
  {
    name: "Cenareo",
    logo: "/lovable-uploads/logo-cenareo-blue.png",
    title: "Génération de leads SaaS",
    description: "Scaler la génération de leads grâce au Paid & GEO",
    tags: ["Google Ads", "LinkedIn Ads", "GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-cenareo",
  },
  {
    name: "Spacefill",
    logo: "/lovable-uploads/logo-spacefill-blue.png",
    title: "Visibilité internationale",
    description: "Renforcer la visibilité internationale via le GEO",
    tags: ["GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-spacefill",
  },
  {
    name: "Freeda",
    logo: "",
    title: "Visibilité internationale GEO",
    description: "Développer la visibilité internationale grâce au GEO",
    tags: ["GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-freeda",
  },
  {
    name: "PhantomBuster",
    logo: "",
    title: "Acquisition internationale",
    description: "Accélérer l'acquisition internationale via Paid & GEO",
    tags: ["Google Ads", "LinkedIn Ads", "GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-phantombuster",
  },
  {
    name: "Hyperline",
    logo: "/lovable-uploads/logo-hyperline-blue.png",
    title: "Visibilité US",
    description: "Structurer la visibilité US grâce au GEO",
    tags: ["GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-hyperline",
  },
  {
    name: "Modeo",
    logo: "/lovable-uploads/logo-modeo-blue.png",
    title: "Autorité digitale",
    description: "Renforcer l'autorité digitale via le GEO",
    tags: ["GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-modeo",
  },
  {
    name: "Pivot",
    logo: "/lovable-uploads/logo-pivot-blue.png",
    title: "Visibilité IA",
    description: "N°1 sur ChatGPT dans son industrie en 2 mois",
    tags: ["GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "",
  },
  {
    name: "Softgarden",
    logo: "/lovable-uploads/logo-softgarden-blue.png",
    title: "Acquisition RH",
    description: "Description de la référence",
    tags: ["Google Ads", "LinkedIn Ads", "GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "",
  },
  {
    name: "Factorial",
    logo: "/lovable-uploads/logo-factorial-blue.png",
    title: "Visibilité IA",
    description: "Dans le top 5 sur plusieurs IA",
    tags: ["Google Ads", "LinkedIn Ads", "GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "",
  },
  {
    name: "PlayPlay",
    logo: "/lovable-uploads/logo-playplay-blue.png",
    title: "Génération de leads internationale via Paid Ads",
    description: "Accélérer la génération de leads internationale via Paid Ads",
    tags: ["Google Ads", "LinkedIn Ads"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-playplay",
  },
  {
    name: "Mirakl",
    logo: "/lovable-uploads/logo-mirakl-blue.png",
    title: "Visibilité IA",
    description: "N°1 sur ChatGPT dans son industrie en 3 mois",
    tags: ["GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-mirakl",
  },
  {
    name: "Everwin",
    logo: "/lovable-uploads/logo-everwin-blue.png",
    title: "Acquisition digitale",
    description: "Renforcer l'acquisition digitale d'Everwin via Paid & GEO",
    tags: ["Google Ads", "GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-everwin",
  },
  {
    name: "Dahlia",
    logo: "/lovable-uploads/logo-dahlia-blue.png",
    title: "Génération de leads SEA",
    description: "Accélérer la génération de leads grâce au SEA",
    tags: ["Google Ads", "SEA"],
    secteur: "Leadgen B2C",
    caseStudyUrl: "/archipel-dahlia",
  },
  {
    name: "Ça assure",
    logo: "/lovable-uploads/logo-ca-assure-blue.png",
    title: "Visibilité digitale",
    description: "Structurer la visibilité digitale de Ça Assure grâce au GEO",
    tags: ["GEO"],
    secteur: "Leadgen B2C",
    caseStudyUrl: "/archipel-ca-assure",
  },
  {
    name: "Depancel",
    logo: "",
    title: "Acquisition e-commerce",
    description: "Structurer l'acquisition via Google Ads & Meta Ads",
    tags: ["Google Ads", "Meta Ads"],
    secteur: "E-Commerce",
    caseStudyUrl: "",
  },
  {
    name: "Masterdoc",
    logo: "",
    title: "Acquisition multi-levier",
    description: "Déployer une stratégie Paid Ads complète",
    tags: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "",
  },
  {
    name: "FluidStack",
    logo: "/lovable-uploads/logo-fluidstack-blue.webp",
    title: "Acquisition B2B",
    description: "Accélérer l'acquisition via Google Ads & LinkedIn Ads",
    tags: ["Google Ads", "LinkedIn Ads"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "",
  },
  {
    name: "Joone",
    logo: "/lovable-uploads/logo-joone-blue.png",
    title: "Acquisition e-commerce",
    description: "Gérer et optimiser un compte Google Ads à fort budget",
    tags: ["Google Ads"],
    secteur: "E-Commerce",
    caseStudyUrl: "/archipel-joone",
  },
  {
    name: "Y-Brush",
    logo: "/lovable-uploads/logo-ybrush-blue.webp",
    title: "Acquisition e-commerce",
    description: "Optimiser les performances Google Ads & Meta Ads",
    tags: ["Google Ads", "Meta Ads"],
    secteur: "E-Commerce",
    caseStudyUrl: "/archipel-ybrush",
  },
  {
    name: "Le Réacteur",
    logo: "/lovable-uploads/logo-lereacteur-blue.png",
    title: "Acquisition digitale",
    description: "Restructurer et scaler l'acquisition via Google Ads",
    tags: ["Google Ads"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "/archipel-le-reacteur",
  },
  {
    name: "Jimmy Fairly",
    logo: "",
    title: "Visibilité IA",
    description: "Renforcer la visibilité via le GEO",
    tags: ["GEO"],
    secteur: "E-Commerce",
    caseStudyUrl: "",
  },
  {
    name: "Primo",
    logo: "/lovable-uploads/logo-primo-blue.jpeg",
    title: "Visibilité IA",
    description: "Renforcer la visibilité via le GEO",
    tags: ["GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "",
  },
  {
    name: "Gradium",
    logo: "/lovable-uploads/logo-gradium-blue.png",
    title: "Acquisition multi-levier",
    description: "Déployer une stratégie GEO, Paid & Social Ads complète",
    tags: ["GEO", "Google Ads", "Meta Ads", "LinkedIn Ads"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "",
  },
  {
    name: "Ceran",
    logo: "",
    title: "Acquisition & visibilité IA",
    description: "Structurer l'acquisition Google Ads et la visibilité GEO",
    tags: ["Google Ads", "GEO"],
    secteur: "Leadgen B2B",
    caseStudyUrl: "",
  },
];

const TAG_STYLES: Record<string, string> = {
  "Meta Ads": "bg-white text-[#061A40] border-[#061A40]",
  "GEO": "bg-white text-[#0043F1] border-[#0043F1]",
  "Google Ads": "bg-white text-[#010D3E] border-[#80FFE7]",
  "LinkedIn Ads": "bg-white text-[#757575] border-[#757575]",
  "SEA": "bg-white text-[#0043F1] border-[#0043F1]",
  "Paid Ads": "bg-white text-[#061A40] border-[#061A40]",
};

const BLUE_FILTER_LOGOS = new Set([
  "/lovable-uploads/logo-fluidstack-blue.webp",
  "/lovable-uploads/logo-joone-blue.png",
  "/lovable-uploads/logo-ybrush-blue.webp",
  "/lovable-uploads/logo-lereacteur-blue.png",
  "/lovable-uploads/logo-primo-blue.jpeg",
  "/lovable-uploads/logo-gradium-blue.png",
]);

const LOGO_SIZE_OVERRIDES: Record<string, string> = {
  "/lovable-uploads/logo-ybrush-blue.webp": "max-h-5",
  "/lovable-uploads/logo-fluidstack-blue.webp": "max-h-12",
  "/lovable-uploads/logo-joone-blue.png": "max-h-12",
  "/lovable-uploads/logo-lereacteur-blue.png": "max-h-56",
  "/lovable-uploads/logo-primo-blue.jpeg": "max-h-28",
  "/lovable-uploads/logo-gradium-blue.png": "max-h-28",
};

const ArchipelNosReferences = () => {
  const [selectedLevier, setSelectedLevier] = useState<string>("");
  const [selectedSecteur, setSelectedSecteur] = useState<string>("");
  const [isLevierOpen, setIsLevierOpen] = useState(false);
  const [isSecteurOpen, setIsSecteurOpen] = useState(false);

  const closeAll = () => { setIsLevierOpen(false); setIsSecteurOpen(false); };

  const filteredClients = CLIENT_REFERENCES.filter((client) => {
    if (selectedLevier && !client.tags.includes(selectedLevier)) return false;
    if (selectedSecteur && client.secteur !== selectedSecteur) return false;
    return true;
  }).sort((a, b) => {
    const aHas = a.caseStudyUrl ? 0 : 1;
    const bHas = b.caseStudyUrl ? 0 : 1;
    return aHas - bHas;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center border border-gray-200 rounded-full px-5 py-2 mb-6">
            <span className="font-inter text-sm font-medium text-[#000000]">
              Partenaires de confiance
            </span>
          </div>
          <h1 className="font-jakarta text-4xl md:text-6xl font-bold mb-6" style={{
            background: "linear-gradient(to bottom, #000000, #001354)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Nos références clients
          </h1>
          <p className="font-inter text-[#010D3E] text-base md:text-lg leading-relaxed max-w-xl mx-auto">
            Chez Archipel, nous sommes fiers de travailler avec des entreprises de toutes tailles et de toutes industries pour les aider à améliorer leurs performances et à atteindre leurs objectifs. Découvrez nos références clients et sélectionnez les filtres qui vous intéressent.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-[#0043F1] rounded-2xl p-4 flex flex-wrap md:flex-nowrap gap-4 items-stretch">
            {/* Leviers */}
            <div className="relative flex-1 min-w-[160px]">
              <button
                onClick={() => { const v = !isLevierOpen; closeAll(); setIsLevierOpen(v); }}
                className="flex items-center justify-between w-full px-5 py-3 bg-white rounded-xl text-sm font-inter text-[#010D3E] font-medium"
              >
                <span>{selectedLevier || "Leviers"}</span>
                <ChevronDown className="w-4 h-4 text-[#010D3E]" />
              </button>
              {isLevierOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-full z-50">
                  <button
                    onClick={() => { setSelectedLevier(""); setIsLevierOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm font-inter text-gray-700 hover:bg-gray-50"
                  >
                    Tous
                  </button>
                  {FILTER_OPTIONS.leviers.map((item) => (
                    <button
                      key={item}
                      onClick={() => { setSelectedLevier(item); setIsLevierOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm font-inter transition-colors ${
                        selectedLevier === item ? "text-[#0043F1] bg-blue-50" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Secteurs */}
            <div className="relative flex-1 min-w-[160px]">
              <button
                onClick={() => { const v = !isSecteurOpen; closeAll(); setIsSecteurOpen(v); }}
                className="flex items-center justify-between w-full px-5 py-3 bg-white rounded-xl text-sm font-inter text-[#010D3E] font-medium"
              >
                <span>{selectedSecteur || "Secteurs"}</span>
                <ChevronDown className="w-4 h-4 text-[#010D3E]" />
              </button>
              {isSecteurOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-full z-50">
                  <button
                    onClick={() => { setSelectedSecteur(""); setIsSecteurOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm font-inter text-gray-700 hover:bg-gray-50"
                  >
                    Tous
                  </button>
                  {FILTER_OPTIONS.secteurs.map((item) => (
                    <button
                      key={item}
                      onClick={() => { setSelectedSecteur(item); setIsSecteurOpen(false); }}
                      className={`block w-full text-left px-4 py-2 text-sm font-inter transition-colors ${
                        selectedSecteur === item ? "text-[#0043F1] bg-blue-50" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Client Cards Grid */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => {
              const hasCaseStudy = !!client.caseStudyUrl;
              const CardWrapper = hasCaseStudy ? Link : 'div';
              const cardProps = hasCaseStudy
                ? { to: client.caseStudyUrl, className: "bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 block" }
                : { className: "bg-white border border-gray-200 rounded-2xl p-6 block" };
              return (
                <CardWrapper key={client.name} {...cardProps as any}>
                  {/* Logo */}
                  <div className="h-24 flex items-center justify-center mb-6">
                    {client.logo ? (
                      <img
                        src={client.logo}
                        alt={client.name}
                        className={`w-auto object-contain ${LOGO_SIZE_OVERRIDES[client.logo] || "max-h-20"}`}
                        style={BLUE_FILTER_LOGOS.has(client.logo) ? { filter: "brightness(0) saturate(100%) invert(15%) sepia(95%) saturate(6000%) hue-rotate(220deg) brightness(100%) contrast(95%)" } : undefined}
                        loading="lazy"
                      />
                    ) : (
                      <span className="font-jakarta text-2xl font-bold text-[#0043F1]">{client.name}</span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-jakarta font-bold text-[#010D3E] text-lg mb-2">
                    {client.title}
                  </h3>
                  <p className="font-inter text-sm text-[#010D3E]/60 mb-4 leading-relaxed">
                    {client.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {client.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-xs font-inter font-medium rounded-full border ${TAG_STYLES[tag] || "bg-white text-[#0043F1] border-[#0043F1]/20"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  {hasCaseStudy && (
                    <span className="font-inter text-sm font-medium text-[#0043F1] hover:text-[#0043F1]/80 transition-colors inline-flex items-center gap-1">
                      Voir l'étude de cas <span>→</span>
                    </span>
                  )}
                </CardWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </Layout>
  );
};

export default ArchipelNosReferences;
