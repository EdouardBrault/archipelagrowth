
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";

const CGU = () => {
  return (
    <Layout>
      <Helmet>
        <title>Conditions Générales d'Utilisation | Archipel Marketing</title>
        <meta name="description" content="Conditions Générales d'Utilisation du site Archipel Marketing – ARCHEL MARKETING SAS. Règles d'accès et d'utilisation du site." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <section className="pt-32 pb-20" style={{ background: 'linear-gradient(to bottom, #FFFFFF 0%, #D2DCFF 100%)' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-jakarta text-4xl md:text-5xl font-bold text-[#010D3E] mb-12">
            Conditions Générales d'Utilisation
          </h1>

          <div className="space-y-10">
            {/* Objet */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Article 1 – Objet</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>
                  Les présentes Conditions Générales d'Utilisation (ci-après « CGU ») ont pour objet de définir les modalités et conditions d'accès et d'utilisation du site internet <strong>archipelmarketing.com</strong> (ci-après « le Site »), édité par la société ARCHEL MARKETING, SAS au capital social variable, immatriculée au RCS de Paris sous le numéro 984 715 995, dont le siège social est situé au 30 Boulevard de Sébastopol, 75004 Paris.
                </p>
                <p>
                  L'accès et l'utilisation du Site impliquent l'acceptation pleine et entière des présentes CGU.
                </p>
              </div>
            </div>

            {/* Accès au site */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Article 2 – Accès au site</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>
                  Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Tous les frais liés à l'accès au Site (matériel informatique, connexion Internet, etc.) sont à la charge de l'utilisateur.
                </p>
                <p>
                  ARCHEL MARKETING met tout en œuvre pour assurer un accès continu au Site, mais ne saurait être tenue responsable en cas d'interruption, qu'elle soit due à des opérations de maintenance, des mises à jour, des cas de force majeure, ou tout autre événement indépendant de sa volonté.
                </p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Article 3 – Propriété intellectuelle</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>
                  L'ensemble des éléments du Site (textes, images, graphismes, logos, icônes, vidéos, logiciels, bases de données, etc.) est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation ou exploitation de tout ou partie du Site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable d'ARCHEL MARKETING.
                </p>
                <p>
                  Toute exploitation non autorisée du Site ou de l'un quelconque des éléments qu'il contient sera considérée comme constitutive d'une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de la propriété intellectuelle.
                </p>
              </div>
            </div>

            {/* Utilisation du site */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Article 4 – Utilisation du site</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>L'utilisateur s'engage à utiliser le Site de manière conforme aux présentes CGU et aux lois en vigueur. Il s'interdit notamment de :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Utiliser le Site à des fins illicites, frauduleuses ou portant atteinte aux droits de tiers.</li>
                  <li>Tenter de porter atteinte au bon fonctionnement du Site (intrusion, virus, surcharge, etc.).</li>
                  <li>Collecter ou extraire des données du Site de manière automatisée sans autorisation préalable.</li>
                  <li>Reproduire ou diffuser le contenu du Site sans autorisation écrite.</li>
                </ul>
              </div>
            </div>

            {/* Formulaires et données */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Article 5 – Formulaires et données personnelles</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>
                  Le Site propose des formulaires de contact et d'inscription. En les remplissant, l'utilisateur consent à la collecte et au traitement de ses données personnelles conformément à notre{" "}
                  <a href="/politique-confidentialite" className="text-[#0043F1] underline hover:text-[#0043F1]/80 transition-colors">
                    Politique de confidentialité
                  </a>.
                </p>
                <p>
                  L'utilisateur s'engage à fournir des informations exactes et à jour. ARCHEL MARKETING ne saurait être tenue responsable des conséquences liées à la fourniture d'informations erronées.
                </p>
              </div>
            </div>

            {/* Liens hypertextes */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Article 6 – Liens hypertextes</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>
                  Le Site peut contenir des liens hypertextes vers des sites tiers. ARCHEL MARKETING n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leurs pratiques en matière de protection des données ou leur disponibilité.
                </p>
                <p>
                  La création de liens hypertextes vers le Site est soumise à l'autorisation préalable d'ARCHEL MARKETING.
                </p>
              </div>
            </div>

            {/* Limitation de responsabilité */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Article 7 – Limitation de responsabilité</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>
                  ARCHEL MARKETING s'efforce de fournir sur le Site des informations aussi précises que possible. Toutefois, elle ne saurait être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers.
                </p>
                <p>
                  En aucun cas, ARCHEL MARKETING ne pourra être tenue responsable de tout dommage direct ou indirect résultant de l'utilisation du Site.
                </p>
              </div>
            </div>

            {/* Droit applicable */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Article 8 – Droit applicable et juridiction compétente</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed space-y-4">
                <p>
                  Les présentes CGU sont régies par le droit français. En cas de litige relatif à l'interprétation ou à l'exécution des présentes, et à défaut de résolution amiable, les tribunaux compétents de Paris seront seuls compétents.
                </p>
              </div>
            </div>

            {/* Mise à jour */}
            <div>
              <h2 className="font-jakarta text-2xl font-bold text-[#010D3E] mb-4">Article 9 – Modification des CGU</h2>
              <div className="font-inter text-[#010D3E]/80 text-sm leading-relaxed">
                <p>
                  ARCHEL MARKETING se réserve le droit de modifier les présentes CGU à tout moment. Les modifications prendront effet dès leur publication sur le Site. L'utilisateur est invité à consulter régulièrement cette page. Dernière mise à jour : février 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CGU;
