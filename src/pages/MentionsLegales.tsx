
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";

const MentionsLegales = () => {
  return (
    <Layout>
      <Helmet>
        <title>Mentions légales | Archipel Marketing</title>
        <meta name="description" content="Mentions légales d'Archipel Marketing – ARCHEL MARKETING SAS, informations juridiques, hébergement et propriété intellectuelle." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="pt-32 pb-20" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #D2DCFF 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-jakarta text-4xl md:text-5xl font-bold text-[#010D3E] mb-12">
            Mentions légales
          </h1>

          <div className="space-y-10">
            {/* Informations légales */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-6">Informations légales</h2>
              <dl className="space-y-4 font-inter text-[#010D3E]/80 text-sm leading-relaxed">
                <div>
                  <dt className="font-semibold text-[#010D3E]">Nom de la société</dt>
                  <dd>ARCHEL MARKETING</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#010D3E]">Forme juridique</dt>
                  <dd>SAS (Société par Actions Simplifiée)</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#010D3E]">Date de création</dt>
                  <dd>12/02/2024</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#010D3E]">SIRET</dt>
                  <dd>984 715 995 00028</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#010D3E]">Adresse du siège social</dt>
                  <dd>30 Boulevard de Sébastopol<br />75004 Paris<br />France</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#010D3E]">Responsable de la publication</dt>
                  <dd>Edouard Brault</dd>
                </div>
              </dl>
            </div>

            {/* Hébergement */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Hébergement</h2>
              <div className="bg-white/70 backdrop-blur rounded-2xl border border-gray-200 shadow-sm p-6">
                <dl className="space-y-3 font-inter text-[#010D3E]/80 text-sm leading-relaxed">
                  <div>
                    <dt className="font-semibold text-[#010D3E]">Hébergeur</dt>
                    <dd>Lovable (Lovable Cloud)</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#010D3E]">Société</dt>
                    <dd>GPT Engineer Inc.</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#010D3E]">Site web</dt>
                    <dd>
                      <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer" className="text-[#0043F1] underline hover:text-[#0043F1]/80 transition-colors">
                        lovable.dev
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#010D3E]">Infrastructure</dt>
                    <dd>Plateforme cloud full-stack basée sur Supabase (base de données, authentification, stockage, fonctions serverless)</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Propriété intellectuelle</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p>
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MentionsLegales;
