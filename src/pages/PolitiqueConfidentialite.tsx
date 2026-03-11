
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";
import ContactProtection from "@/components/ContactProtection";

const PolitiqueConfidentialite = () => {
  return (
    <Layout>
      <Helmet>
        <title>Politique de confidentialité | Archipel Marketing</title>
        <meta name="description" content="Politique de confidentialité d'Archipel Marketing – ARCHEL MARKETING SAS. Collecte, traitement et protection de vos données personnelles." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="pt-32 pb-20" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #D2DCFF 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-jakarta text-4xl md:text-5xl font-bold text-[#010D3E] mb-12">
            Politique de confidentialité
          </h1>

          <div className="space-y-10">
            {/* Responsable du traitement */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Responsable du traitement</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-2">
                <p>ARCHEL MARKETING – SAS au capital social variable</p>
                <p>Siège social : 30 Boulevard de Sébastopol, 75004 Paris, France</p>
                <p>SIRET : 984 715 995 00028</p>
                <p>Responsable : Edouard Brault</p>
              </div>
            </div>

            {/* Données collectées */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Données personnelles collectées</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>
                  Dans le cadre de l'utilisation de notre site, nous sommes susceptibles de collecter les catégories de données suivantes :
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Données d'identification :</strong> nom, prénom, adresse email, numéro de téléphone, nom de l'entreprise.</li>
                  <li><strong>Données de connexion :</strong> adresse IP, type de navigateur, pages consultées, date et heure de visite.</li>
                  <li><strong>Données transmises via les formulaires :</strong> toute information que vous nous communiquez volontairement (demande de contact, inscription à une masterclass, demande d'audit, etc.).</li>
                </ul>
              </div>
            </div>

            {/* Finalités */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Finalités du traitement</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Répondre à vos demandes de contact et de devis.</li>
                  <li>Gérer les inscriptions aux événements (masterclass, webinaires).</li>
                  <li>Améliorer notre site web et nos services grâce à l'analyse de la navigation.</li>
                  <li>Envoyer des communications commerciales (uniquement avec votre consentement préalable).</li>
                  <li>Respecter nos obligations légales et réglementaires.</li>
                </ul>
              </div>
            </div>

            {/* Base légale */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Base légale du traitement</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed">
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Consentement :</strong> pour l'envoi de communications commerciales et l'utilisation de cookies non essentiels.</li>
                  <li><strong>Intérêt légitime :</strong> pour l'analyse et l'amélioration de nos services.</li>
                  <li><strong>Exécution contractuelle :</strong> pour le traitement des demandes de devis et la gestion de la relation client.</li>
                </ul>
              </div>
            </div>

            {/* Conservation */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Durée de conservation</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>Vos données personnelles sont conservées pendant une durée proportionnée à la finalité pour laquelle elles ont été collectées :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Données de contact :</strong> 3 ans à compter du dernier contact.</li>
                  <li><strong>Données de navigation :</strong> 13 mois maximum (cookies).</li>
                  <li><strong>Données contractuelles :</strong> durée de la relation commerciale + 5 ans (prescription légale).</li>
                </ul>
              </div>
            </div>

            {/* Destinataires */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Destinataires des données</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>Vos données personnelles peuvent être transmises aux catégories de destinataires suivants :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Les membres de l'équipe Archipel Marketing habilités à traiter vos demandes.</li>
                  <li>Nos sous-traitants techniques (hébergement, outils d'analyse, CRM).</li>
                </ul>
                <p>Nous ne vendons ni ne louons vos données personnelles à des tiers.</p>
              </div>
            </div>

            {/* Droits */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Vos droits</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Droit d'accès :</strong> obtenir la confirmation que vos données sont traitées et en recevoir une copie.</li>
                  <li><strong>Droit de rectification :</strong> faire corriger vos données inexactes ou incomplètes.</li>
                  <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données.</li>
                  <li><strong>Droit à la limitation :</strong> demander la limitation du traitement de vos données.</li>
                  <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré et couramment utilisé.</li>
                  <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données pour des motifs légitimes.</li>
                </ul>
                <p>
                  Pour exercer ces droits, contactez-nous via le formulaire ci-dessous :
                </p>
                <ContactProtection />
                <p>
                  Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-[#0043F1] underline hover:text-[#0043F1]/80 transition-colors">www.cnil.fr</a>
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Cookies</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>
                  Notre site utilise des cookies pour assurer son bon fonctionnement et analyser son audience. Vous pouvez à tout moment gérer vos préférences en matière de cookies via les paramètres de votre navigateur.
                </p>
                <p>Les cookies utilisés peuvent inclure :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site.</li>
                  <li><strong>Cookies analytiques :</strong> pour mesurer l'audience et améliorer l'expérience utilisateur (ex : PostHog, Google Analytics).</li>
                </ul>
              </div>
            </div>

            {/* Mise à jour */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Mise à jour de la politique</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed">
                <p>
                  La présente politique de confidentialité peut être mise à jour à tout moment. Nous vous invitons à la consulter régulièrement. Dernière mise à jour : février 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PolitiqueConfidentialite;
