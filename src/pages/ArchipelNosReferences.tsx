
import Layout from "@/components/Layout";
import ContactSection from "@/components/ContactSection";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n";

const FILTER_OPTIONS = {
  leviers: ["GEO", "Google Ads", "LinkedIn Ads", "Meta Ads", "SEA", "SEO", "Landing pages"],
  secteurs: ["E-Commerce", "Leadgen B2C", "Leadgen B2B"],
};

const CLIENT_REFERENCES_BASE = [
  { name: "Keyrus", logo: "/lovable-uploads/logo-keyrus-blue.png", tags: ["Google Ads", "LinkedIn Ads", "GEO", "Landing pages"], secteur: "Leadgen B2B", caseStudyUrl: "/archipel-keyrus" },
  { name: "Billet Réduc'", logo: "/lovable-uploads/logo-billet-reduc-blue.png", tags: ["Meta Ads", "Google Ads"], secteur: "E-Commerce", caseStudyUrl: "/archipel-billet-reduc" },
  { name: "Sodexo", logo: "/lovable-uploads/logo-sodexo-blue.png", tags: ["LinkedIn Ads", "Google Ads"], secteur: "Leadgen B2B", caseStudyUrl: "/archipel-sodexo" },
  { name: "Cenareo", logo: "/lovable-uploads/logo-cenareo-blue.png", tags: ["Google Ads", "LinkedIn Ads", "GEO"], secteur: "Leadgen B2B", caseStudyUrl: "/archipel-cenareo" },
  { name: "Spacefill", logo: "/lovable-uploads/logo-spacefill-blue.png", tags: ["GEO"], secteur: "Leadgen B2B", caseStudyUrl: "/archipel-spacefill" },
  { name: "Mirakl", logo: "/lovable-uploads/logo-mirakl-blue.png", tags: ["GEO"], secteur: "Leadgen B2B", caseStudyUrl: "/archipel-mirakl" },
  { name: "Hyperline", logo: "/lovable-uploads/logo-hyperline-blue.png", tags: ["GEO"], secteur: "Leadgen B2B", caseStudyUrl: "/archipel-hyperline" },
  { name: "Pivot", logo: "/lovable-uploads/logo-pivot-blue.png", tags: ["GEO"], secteur: "Leadgen B2B", caseStudyUrl: "" },
  { name: "PlayPlay", logo: "/lovable-uploads/logo-playplay-blue.png", tags: ["Google Ads", "LinkedIn Ads"], secteur: "Leadgen B2B", caseStudyUrl: "/archipel-playplay" },
  { name: "Everwin", logo: "/lovable-uploads/logo-everwin-blue.png", tags: ["Google Ads", "GEO"], secteur: "Leadgen B2B", caseStudyUrl: "/archipel-everwin" },
  { name: "Modeo", logo: "/lovable-uploads/logo-modeo-blue.png", tags: ["GEO"], secteur: "Leadgen B2B", caseStudyUrl: "/archipel-modeo" },
  { name: "Factorial", logo: "/lovable-uploads/logo-factorial-blue.png", tags: ["Google Ads", "LinkedIn Ads", "GEO"], secteur: "Leadgen B2B", caseStudyUrl: "" },
];

const TAG_STYLES: Record<string, string> = {
  "Meta Ads": "bg-white text-[#061A40] border-[#061A40]",
  "GEO": "bg-white text-[#0043F1] border-[#0043F1]",
  "Google Ads": "bg-white text-[#010D3E] border-[#80FFE7]",
  "LinkedIn Ads": "bg-white text-[#757575] border-[#757575]",
  "SEA": "bg-white text-[#0043F1] border-[#0043F1]",
};

const ArchipelNosReferences = () => {
  const [selectedLevier, setSelectedLevier] = useState<string>("");
  const [selectedSecteur, setSelectedSecteur] = useState<string>("");
  const [isLevierOpen, setIsLevierOpen] = useState(false);
  const [isSecteurOpen, setIsSecteurOpen] = useState(false);
  const { t } = useLanguage();

  const closeAll = () => { setIsLevierOpen(false); setIsSecteurOpen(false); };

  const clients = CLIENT_REFERENCES_BASE.map((c, i) => ({
    ...c,
    title: t.references.clients[i]?.title || c.name,
    description: t.references.clients[i]?.description || "",
  }));

  const filteredClients = clients.filter((client) => {
    if (selectedLevier && !client.tags.includes(selectedLevier)) return false;
    if (selectedSecteur && client.secteur !== selectedSecteur) return false;
    return true;
  }).sort((a, b) => (a.caseStudyUrl ? 0 : 1) - (b.caseStudyUrl ? 0 : 1));

  return (
    <Layout>
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center border border-gray-200 rounded-full px-5 py-2 mb-6"><span className="font-inter text-sm font-medium text-[#000000]">{t.references.badge}</span></div>
          <h1 className="font-jakarta text-4xl md:text-6xl font-bold mb-6" style={{ background: "linear-gradient(to bottom, #000000, #001354)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t.references.title}</h1>
          <p className="font-inter text-[#010D3E] text-base md:text-lg leading-relaxed max-w-xl mx-auto">{t.references.description}</p>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-[#0043F1] rounded-2xl p-4 flex flex-wrap md:flex-nowrap gap-4 items-stretch">
            <div className="relative flex-1 min-w-[160px]">
              <button onClick={() => { const v = !isLevierOpen; closeAll(); setIsLevierOpen(v); }} className="flex items-center justify-between w-full px-5 py-3 bg-white rounded-xl text-sm font-inter text-[#010D3E] font-medium">
                <span>{selectedLevier || t.references.channels}</span><ChevronDown className="w-4 h-4 text-[#010D3E]" />
              </button>
              {isLevierOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-full z-50">
                  <button onClick={() => { setSelectedLevier(""); setIsLevierOpen(false); }} className="block w-full text-left px-4 py-2 text-sm font-inter text-gray-700 hover:bg-gray-50">{t.references.all}</button>
                  {FILTER_OPTIONS.leviers.map((item) => (<button key={item} onClick={() => { setSelectedLevier(item); setIsLevierOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm font-inter transition-colors ${selectedLevier === item ? "text-[#0043F1] bg-blue-50" : "text-gray-700 hover:bg-gray-50"}`}>{item}</button>))}
                </div>
              )}
            </div>
            <div className="relative flex-1 min-w-[160px]">
              <button onClick={() => { const v = !isSecteurOpen; closeAll(); setIsSecteurOpen(v); }} className="flex items-center justify-between w-full px-5 py-3 bg-white rounded-xl text-sm font-inter text-[#010D3E] font-medium">
                <span>{selectedSecteur || t.references.industries}</span><ChevronDown className="w-4 h-4 text-[#010D3E]" />
              </button>
              {isSecteurOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 w-full z-50">
                  <button onClick={() => { setSelectedSecteur(""); setIsSecteurOpen(false); }} className="block w-full text-left px-4 py-2 text-sm font-inter text-gray-700 hover:bg-gray-50">{t.references.all}</button>
                  {FILTER_OPTIONS.secteurs.map((item) => (<button key={item} onClick={() => { setSelectedSecteur(item); setIsSecteurOpen(false); }} className={`block w-full text-left px-4 py-2 text-sm font-inter transition-colors ${selectedSecteur === item ? "text-[#0043F1] bg-blue-50" : "text-gray-700 hover:bg-gray-50"}`}>{item}</button>))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => {
              const hasCaseStudy = !!client.caseStudyUrl;
              const CardWrapper = hasCaseStudy ? Link : 'div';
              const cardProps = hasCaseStudy ? { to: client.caseStudyUrl, className: "bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 block" } : { className: "bg-white border border-gray-200 rounded-2xl p-6 block" };
              return (
                <CardWrapper key={client.name} {...cardProps as any}>
                  <div className="h-24 flex items-center justify-center mb-6">
                    {client.logo ? <img src={client.logo} alt={client.name} className="w-auto object-contain max-h-20" loading="lazy" /> : <span className="font-jakarta text-2xl font-bold text-[#0043F1]">{client.name}</span>}
                  </div>
                  <h3 className="font-jakarta font-bold text-[#010D3E] text-lg mb-2">{client.title}</h3>
                  <p className="font-inter text-sm text-[#010D3E]/60 mb-4 leading-relaxed">{client.description}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {client.tags.map((tag) => (<span key={tag} className={`px-3 py-1 text-xs font-inter font-medium rounded-full border ${TAG_STYLES[tag] || "bg-white text-[#0043F1] border-[#0043F1]/20"}`}>{tag}</span>))}
                  </div>
                  {hasCaseStudy && <span className="font-inter text-sm font-medium text-[#0043F1] hover:text-[#0043F1]/80 transition-colors inline-flex items-center gap-1">{t.references.viewCaseStudy} <span>→</span></span>}
                </CardWrapper>
              );
            })}
          </div>
        </div>
      </section>
      <ContactSection />
    </Layout>
  );
};

export default ArchipelNosReferences;
