import Layout from "@/components/Layout";
import ContactSection from "@/components/ContactSection";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n";
import { CLIENT_REFERENCES_IT, REFERENCE_DETAIL_LABELS_IT } from "@/data/clientReferencesIt";

const BLUE_FILTER_LOGOS = new Set([
  "/lovable-uploads/logo-fluidstack-blue.webp",
  "/lovable-uploads/logo-joone-blue.png",
  "/lovable-uploads/logo-ybrush-blue.webp",
  "/lovable-uploads/logo-lereacteur-blue.png",
  "/lovable-uploads/logo-primo-blue.jpeg",
  "/lovable-uploads/logo-gradium-blue.png",
]);
const BLUE_FILTER_STYLE = { filter: "brightness(0) saturate(100%) invert(15%) sepia(95%) saturate(6000%) hue-rotate(220deg) brightness(100%) contrast(95%)" };

interface ClientData {
  name: string;
  slug: string;
  logo: string;
  description: string;
  tags: string[];
  caseTitle: string;
  intro: string;
  stats: { value: string; label: string }[];
  projectContent: string;
  challengeContent: string;
  objectivesContent: string;
}

const ALL_CLIENTS: ClientData[] = [
  {
    name: "Keyrus",
    slug: "archipel-keyrus",
    logo: "/lovable-uploads/logo-keyrus-blue.png",
    description: "Structurer l'acquisition multi-pays avec Paid & GEO",
    tags: ["Google Ads", "LinkedIn Ads", "GEO", "Landing pages"],
    caseTitle: "Structurer l'acquisition multi-pays de Keyrus avec une stratégie Paid & GEO",
    intro: "Chez Archipel, nous accompagnons des entreprises internationales dans la structuration et l'optimisation de leur acquisition digitale. Depuis janvier 2024, nous collaborons avec Keyrus, acteur majeur du conseil en entreprise (+2000 collaborateurs), pour piloter et scaler leur stratégie d'acquisition en Europe.",
    stats: [
      { value: "+1 000", label: "Leads générés" },
      { value: "6 pays", label: "France, UK, Portugal, Suède, Suisse, Espagne" },
      { value: "2,5 ans", label: "De collaboration continue" },
    ],
    projectContent: "Accompagner Keyrus dans la structuration et le déploiement d'une stratégie d'acquisition multi-pays.\nActivation de Google Ads, LinkedIn Ads, création des assets, optimisation des landing pages et déploiement d'une stratégie GEO sur 6 marchés européens.",
    challengeContent: "Évoluer dans un secteur du conseil très concurrentiel, avec des cycles B2B longs et des enjeux de qualification élevés.\nL'objectif était d'harmoniser les campagnes sur plusieurs pays tout en maintenant une performance constante.",
    objectivesContent: "Générer des leads qualifiés à l'échelle européenne, structurer une stratégie Paid cohérente et scalable, et optimiser les parcours de conversion pour maximiser la performance sur la durée.",
  },
  {
    name: "Billet Réduc'",
    slug: "archipel-billet-reduc",
    logo: "/lovable-uploads/logo-billet-reduc-blue.png",
    description: "Optimiser l'acquisition e-commerce via Paid Ads",
    tags: ["Meta Ads", "Google Ads"],
    caseTitle: "Optimiser et structurer l'acquisition e-commerce de Billet Réduc'",
    intro: "Billet Réduc' est un acteur e-commerce majeur dans la billetterie à prix réduit. Archipel a accompagné l'optimisation de leur stratégie d'acquisition via Meta Ads et Google Ads pour maximiser la performance sur le marché français.",
    stats: [
      { value: "Meta & Google", label: "Stratégie Paid Ads" },
      { value: "E-commerce", label: "Secteur d'activité" },
      { value: "France", label: "Marché cible" },
    ],
    projectContent: "Optimiser et structurer l'acquisition e-commerce via Meta Ads et Google Ads.\nCréation des assets créatifs, amélioration du tracking et pilotage des campagnes pour maximiser la performance sur le marché français.",
    challengeContent: "Évoluer dans un environnement fortement concurrentiel et saisonnier, où la rentabilité publicitaire et la précision du tracking sont déterminantes pour la performance globale.",
    objectivesContent: "Structurer une stratégie Paid performante, améliorer la lecture des données, fiabiliser le tracking et optimiser les campagnes pour renforcer la rentabilité e-commerce.",
  },
  {
    name: "Sodexo",
    slug: "archipel-sodexo",
    logo: "/lovable-uploads/logo-sodexo-blue.png",
    description: "Structurer l'acquisition B2B via Paid Ads",
    tags: ["LinkedIn Ads", "Google Ads"],
    caseTitle: "Structurer l'acquisition B2B de Circles by Sodexo via Paid Ads",
    intro: "Circles by Sodexo accompagne les entreprises dans leurs services aux collaborateurs. Pendant 6 mois, Archipel a piloté la stratégie d'acquisition digitale en France afin de générer des leads B2B qualifiés.",
    stats: [
      { value: "70+", label: "Leads générés" },
      { value: "LinkedIn & Google Ads", label: "Stratégie Paid B2B" },
      { value: "6 mois", label: "Collaboration en France" },
    ],
    projectContent: "Déploiement et pilotage des campagnes LinkedIn Ads et Google Ads, création des assets créatifs et optimisation des landing pages pour maximiser la génération de leads qualifiés.",
    challengeContent: "Générer des leads B2B qualifiés dans un environnement concurrentiel, avec des cycles de décision longs et une forte exigence de ciblage.",
    objectivesContent: "Structurer une acquisition Paid performante, optimiser les parcours de conversion et générer un volume constant de leads qualifiés.",
  },
  {
    name: "Cenareo",
    slug: "archipel-cenareo",
    logo: "/lovable-uploads/logo-cenareo-blue.png",
    description: "Scaler la génération de leads grâce au Paid & GEO",
    tags: ["Paid Ads", "GEO"],
    caseTitle: "Scaler la génération de leads de Cenareo grâce au Paid & GEO",
    intro: "Cenareo, éditeur SaaS spécialisé en digital signage, accompagne les entreprises et acteurs du retail dans leur communication sur écrans. Archipel a structuré leur acquisition pendant 28 mois en France.",
    stats: [
      { value: "+1 700", label: "Leads générés" },
      { value: "Paid Ads & GEO", label: "Stratégie d'acquisition" },
      { value: "28 mois", label: "Collaboration continue" },
    ],
    projectContent: "Déploiement d'une stratégie Paid Ads couplée à une approche GEO afin de générer un volume important de leads qualifiés sur le marché français.",
    challengeContent: "Accélérer la génération de leads dans un marché MarTech concurrentiel tout en maintenant une performance durable sur le long terme.",
    objectivesContent: "Augmenter le volume de leads qualifiés, structurer une acquisition scalable et renforcer la visibilité stratégique via le GEO.",
  },
  {
    name: "Spacefill",
    slug: "archipel-spacefill",
    logo: "/lovable-uploads/logo-spacefill-blue.png",
    description: "Renforcer la visibilité internationale via le GEO",
    tags: ["GEO"],
    caseTitle: "Renforcer la visibilité internationale de Spacefill via le GEO",
    intro: "Spacefill est une plateforme SaaS qui connecte les entreprises à un réseau d'entrepôts logistiques. Archipel a accompagné leur stratégie GEO en France et aux États-Unis.",
    stats: [
      { value: "GEO Strategy", label: "Visibilité stratégique" },
      { value: "France & USA", label: "Déploiement international" },
      { value: "3 mois", label: "Mission ciblée" },
    ],
    projectContent: "Mise en place d'une stratégie GEO pour renforcer la visibilité de Spacefill sur ses marchés prioritaires.",
    challengeContent: "Se positionner sur des requêtes stratégiques dans un secteur LogisticsTech concurrentiel, sur deux marchés différents.",
    objectivesContent: "Accroître la présence organique stratégique, renforcer l'autorité de marque et soutenir l'expansion internationale.",
  },
  {
    name: "Freeda",
    slug: "archipel-freeda",
    logo: "",
    description: "Développer la visibilité internationale grâce au GEO",
    tags: ["GEO"],
    caseTitle: "Développer la visibilité internationale de Freeda grâce au GEO",
    intro: "Freeda est une plateforme SaaS spécialisée dans la conformité réglementaire des projets de construction. Archipel les accompagne depuis janvier 2025 sur leur stratégie GEO en France et aux États-Unis.",
    stats: [
      { value: "GEO Strategy", label: "Acquisition organique" },
      { value: "France & USA", label: "Marchés prioritaires" },
      { value: "Depuis 2025", label: "Collaboration en cours" },
    ],
    projectContent: "Déploiement d'une stratégie GEO visant à renforcer la visibilité de Freeda sur des requêtes stratégiques liées à la conformité et à la construction.",
    challengeContent: "Positionner une startup early-stage sur des thématiques techniques et réglementaires à forte concurrence.",
    objectivesContent: "Accroître la visibilité qualifiée, soutenir la croissance internationale et structurer une présence durable sur les moteurs génératifs.",
  },
  {
    name: "PhantomBuster",
    slug: "archipel-phantombuster",
    logo: "",
    description: "Accélérer l'acquisition internationale",
    tags: ["Paid Ads", "GEO"],
    caseTitle: "Accélérer l'acquisition internationale de PhantomBuster",
    intro: "PhantomBuster, SaaS B2B spécialisé en sales automation, a confié à Archipel sa stratégie Paid Ads et GEO pour soutenir sa croissance internationale.",
    stats: [
      { value: "Paid Ads & GEO", label: "Acquisition B2B" },
      { value: "EU & USA", label: "Focus international" },
      { value: "Depuis 2025", label: "Collaboration en cours" },
    ],
    projectContent: "Pilotage des campagnes Paid Social et déploiement d'une stratégie GEO pour renforcer la génération de leads à l'international.",
    challengeContent: "Maintenir une croissance rapide sur des marchés B2B très concurrentiels tout en optimisant la rentabilité publicitaire.",
    objectivesContent: "Accélérer la génération de leads qualifiés, soutenir l'expansion internationale et structurer une acquisition performante.",
  },
  {
    name: "Hyperline",
    slug: "archipel-hyperline",
    logo: "/lovable-uploads/logo-hyperline-blue.png",
    description: "Structurer la visibilité US grâce au GEO",
    tags: ["GEO"],
    caseTitle: "Devenir n°1 sur ChatGPT le plus vite possible",
    intro: "Hyperline est une fintech française qui propose une plateforme SaaS automatisée de facturation, de tarification et de gestion des revenus pour les entreprises technologiques. Elle simplifie la gestion des devis, des abonnements, des paiements et du pilotage analytique. C'est notre premier client GEO, depuis l'été 2025.",
    stats: [
      { value: "17", label: "Leads générés" },
      { value: "12", label: "MQLs générés" },
      { value: "N°1", label: "Sur ChatGPT aux USA" },
    ],
    projectContent: "Lancer et structurer notre premier accompagnement GEO pour Hyperline, fintech française spécialisée dans la facturation et la gestion des revenus. L'objectif était de poser les bases d'une stratégie claire sur un sujet émergent, en construisant les fondations méthodologiques et opérationnelles.",
    challengeContent: "Le GEO était un sujet nouveau, qui en était encore à ses balbutiements durant l'été 2025, avec peu de recul et beaucoup d'inconnues. Il a fallu comprendre en profondeur le fonctionnement du produit, ses enjeux business et les mécanismes du GEO pour structurer une approche pertinente dans un contexte encore peu mature.",
    objectivesContent: "Lancer et structurer notre premier accompagnement GEO pour Hyperline, fintech française spécialisée dans la facturation et la gestion des revenus. L'objectif était de poser les bases d'une stratégie claire sur un sujet émergent, en construisant les fondations méthodologiques et opérationnelles.",
  },
  {
    name: "Modeo",
    slug: "archipel-modeo",
    logo: "/lovable-uploads/logo-modeo-blue.png",
    description: "Renforcer l'autorité digitale via le GEO",
    tags: ["GEO"],
    caseTitle: "Créer une nouvelle source de leads",
    intro: "Modeo est un expert en Data Engineering qui conçoit des plateformes data et IA sur mesure pour aider les entreprises à exploiter leurs données. L'enjeu est de structurer des architectures performantes et orientées ROI, alignées avec les objectifs métier.",
    stats: [
      { value: "N°2", label: "Sur ChatGPT" },
      { value: "+10", label: "Leads générés" },
      { value: "+2", label: "Clients convertis" },
    ],
    projectContent: "Depuis septembre 2025, nous accompagnons Modeo, plateforme centrée sur l'IA conversationnelle, pour structurer et activer une stratégie d'acquisition performante. L'enjeu principal était de poser une base solide pour développer leur visibilité et générer des résultats concrets sur un marché très compétitif.",
    challengeContent: "Le sujet était nouveau et nécessitait une compréhension fine des usages autour de grands outils d'IA comme ChatGPT, Perplexity, Claude ou Copilot. Il a fallu rapidement assimiler la complexité du produit, identifier les bons leviers et coordonner les actions pour produire des résultats mesurables.",
    objectivesContent: "Booster la visibilité de Modeo, générer des premiers leads qualifiés et obtenir des premiers closings, tout en structurant une méthodologie d'accompagnement claire et scalable. Depuis septembre 2025, ces objectifs ont été atteints, et Modeo est devenue une belle référence sur des plateformes comme ChatGPT, Perplexity, Claude ou encore Copilot.",
  },
  // Clients without detailed case studies
  {
    name: "Pivot",
    slug: "archipel-pivot",
    logo: "/lovable-uploads/logo-pivot-blue.png",
    description: "N°1 sur ChatGPT dans son industrie en 2 mois",
    tags: ["Paid Ads", "GEO"],
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  {
    name: "Softgarden",
    slug: "archipel-softgarden",
    logo: "/lovable-uploads/logo-softgarden-blue.png",
    description: "Description de la référence",
    tags: ["Paid Ads", "GEO"],
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  {
    name: "Factorial",
    slug: "archipel-factorial",
    logo: "/lovable-uploads/logo-factorial-blue.png",
    description: "Dans le top 5 sur plusieurs IA",
    tags: ["Paid Ads", "SEO"],
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  {
    name: "PlayPlay",
    slug: "archipel-playplay",
    logo: "/lovable-uploads/logo-playplay-blue.png",
    description: "Accélérer la génération de leads internationale via Paid Ads",
    tags: ["Google Ads", "LinkedIn Ads"],
    caseTitle: "Accélérer la génération de leads internationale de PlayPlay via Paid Ads",
    intro: "PlayPlay est une plateforme SaaS B2B spécialisée dans la création de vidéos professionnelles à destination des équipes marketing et communication. L'entreprise accompagne des milliers d'organisations dans la production de contenus vidéo engageants, simplement et à grande échelle.\n\nDepuis janvier, Archipel pilote leur stratégie Paid sur plusieurs marchés internationaux.",
    stats: [
      { value: "+1 000", label: "Leads générés" },
      { value: "France, NORAM & DACH", label: "Déploiement international" },
      { value: "Google Ads & LinkedIn Ads", label: "Stratégie Paid B2B" },
    ],
    projectContent: "Déploiement et pilotage d'une stratégie Paid Ads multi-marchés (Google Ads & LinkedIn Ads) afin d'accélérer la génération de leads B2B sur les zones France, Amérique du Nord et DACH.",
    challengeContent: "Maintenir une forte dynamique de génération de leads sur des marchés internationaux concurrentiels, tout en adaptant les messages, les créas et les ciblages selon les spécificités locales.",
    objectivesContent: "Accélérer la génération de leads qualifiés, structurer une stratégie Paid scalable à l'international et optimiser la performance sur des marchés B2B à forte concurrence.",
  },
  {
    name: "Mirakl",
    slug: "archipel-mirakl",
    logo: "/lovable-uploads/logo-mirakl-blue.png",
    description: "Développer la visibilité omnicanale d'une licorne française en Europe",
    tags: ["Google Ads", "LinkedIn Ads", "GEO"],
    caseTitle: "Développer la visibilité omnicanale d'une licorne française en Europe",
    intro: "Mirakl est une solution SaaS qui permet aux entreprises de lancer et gérer une marketplace. Elle aide les retailers et marques à vendre via des vendeurs tiers à grande échelle.\n\nNous l'avons accompagné sur Google & LinkedIn en Europe sur tous ses produits.",
    stats: [
      { value: "x3", label: "Sur le nombre de leads" },
      { value: "66%", label: "Des CPL optimisés de 50%" },
      { value: "17", label: "Pays dans le ciblage géographique" },
    ],
    projectContent: "L'objectif était simple : augmenter significativement la volumétrie de leads à budget équivalent.\nAvec un travail de simplification de structure et un accent fort mis sur la production de landing pages et de créas qualitatives, nous avons atteint l'objectif.",
    challengeContent: "Le défi majeur vient de leur dimension de licorne : beaucoup d'interlocuteurs, des enjeux stratégiques variés et de nombreuses parties prenantes. L'accompagnement repose donc sur une coordination fine et un alignement constant.",
    objectivesContent: "L'objectif était de mettre en place une méthodologie d'accompagnement fluide afin d'optimiser les performances, générer davantage de leads et mieux comprendre un produit complexe. Nous avons atteint cet objectif en structurant un cadre clair et efficace.",
  },
  {
    name: "Everwin",
    slug: "archipel-everwin",
    logo: "/lovable-uploads/logo-everwin-blue.png",
    description: "Renforcer l'acquisition digitale via Paid & GEO",
    tags: ["Paid Ads", "GEO"],
    caseTitle: "Renforcer l'acquisition digitale d'Everwin (ERP) via Paid & GEO",
    intro: "Everwin est un éditeur français de solutions ERP spécialisées dans la gestion d'affaires pour les sociétés de services, offrant des logiciels complets de planification, gestion et pilotage des activités professionnelles.",
    stats: [
      { value: "Paid Ads & GEO", label: "Stratégie d'acquisition" },
      { value: "France", label: "Marché national" },
      { value: "Depuis janvier 2026", label: "Collaboration en cours" },
    ],
    projectContent: "Déployer une stratégie Paid & GEO pour renforcer la visibilité et l'acquisition digitale d'Everwin en France, en optimisant le ciblage, les créas et les parcours de conversion.",
    challengeContent: "Positionner un acteur ERP sur des requêtes concurrentielles tout en répondant à des besoins B2B très spécifiques et en maximisant la visibilité sur des intentions de recherche à forte valeur.",
    objectivesContent: "Structurer une stratégie d'acquisition performante, fiabiliser la lecture des performances et renforcer la présence organique et paid sur des segments stratégiques.",
  },
  {
    name: "Dahlia",
    slug: "archipel-dahlia",
    logo: "/lovable-uploads/logo-dahlia-blue.png",
    description: "Accélérer la génération de leads grâce au SEA",
    tags: ["Google Ads", "SEA"],
    caseTitle: "Accélérer la génération de leads de Dahlia grâce au SEA",
    intro: "Depuis janvier 2026, nous collaborons avec Dahlia, agence immobilière basée en France, pour structurer et optimiser leur stratégie SEA afin d'augmenter le volume de leads qualifiés.",
    stats: [
      { value: "150", label: "Leads générés" },
      { value: "France", label: "Marché activé" },
      { value: "3 mois", label: "De collaboration" },
    ],
    projectContent: "Accompagner Dahlia dans la structuration et le déploiement d'une stratégie d'acquisition via Google Ads.\n\nMise en place d'une stratégie SEA orientée performance :\n• Structuration des campagnes (achat / vente / estimation)\n• Optimisation des ciblages géographiques\n• Création et amélioration des annonces\n• Optimisation continue des conversions",
    challengeContent: "Évoluer dans un marché immobilier fortement concurrentiel, avec des coûts par clic élevés et des prospects très sollicités.\n\nL'enjeu était de générer des leads qualifiés tout en maîtrisant les coûts d'acquisition, dans un contexte local concurrentiel.",
    objectivesContent: "• Générer des leads qualifiés pour les équipes commerciales\n• Maximiser la visibilité locale de l'agence\n• Optimiser le coût par lead\n• Structurer une stratégie SEA durable et scalable",
  },
  {
    name: "Ça assure",
    slug: "archipel-ca-assure",
    logo: "/lovable-uploads/logo-ca-assure-blue.png",
    description: "Structurer la visibilité digitale grâce au GEO",
    tags: ["GEO"],
    caseTitle: "Structurer la présence digitale de Ça Assure (courtier assurance) via une stratégie GEO",
    intro: "Ça Assure est un courtier en assurance en ligne, filiale du groupe Kereis, spécialisé dans l'assurance emprunteur et la comparaison de contrats, avec une approche digitale simplifiée et transparente.",
    stats: [
      { value: "GEO Strategy", label: "Visibilité stratégique" },
      { value: "France", label: "Marché national" },
      { value: "Depuis janvier 2026", label: "Collaboration en cours" },
    ],
    projectContent: "Mettre en place une stratégie GEO pour renforcer la visibilité digitale de Ça Assure sur des requêtes pertinentes dans le domaine de l'assurance, améliorer l'autorité du site et soutenir l'acquisition organique.",
    challengeContent: "Se positionner efficacement dans un environnement assurantiel compétitif et réglementé en France, tout en améliorant la couverture des requêtes clés à forte demande.",
    objectivesContent: "Accroître la visibilité qualifiée, optimiser le positionnement sur les requêtes stratégiques et asseoir la présence digitale de la marque auprès de ses audiences cibles.",
  },
  // --- Joone (case study) ---
  {
    name: "Joone",
    slug: "archipel-joone",
    logo: "/lovable-uploads/logo-joone-blue.png",
    description: "Gérer et optimiser un compte Google Ads à fort budget",
    tags: ["Google Ads"],
    caseTitle: "Gérer et optimiser le compte Google Ads de Joone durant une période de transition",
    intro: "Joone est une marque de couches et de produits de soins pour bébés. La marque utilise des matériaux durables et des ingrédients naturels. Joone propose également des abonnements flexibles pour faciliter la vie des parents et leur permettre de recevoir régulièrement des produits de qualité pour leur bébé.",
    stats: [
      { value: "50K€/mois", label: "Budget Google Ads géré" },
      { value: "4 mois", label: "Période d'accompagnement" },
      { value: "3 jours", label: "Délai de démarrage après audit" },
    ],
    projectContent: "Suite au départ du gestionnaire de compte Google Ads en interne, Joone a fait appel à Archipel Marketing pour assurer la période de transition, dans l'attente d'un nouveau remplaçant. Cette période a duré 4 mois.\n\nGérer un compte Google Ads de 50K€ de dépenses mensuelles. Maîtriser à la perfection les rudiments de Google Ads. Challenger le tracking en cours, la structure des campagnes et les stratégies d'enchères mises en place. Assurer la formation du futur remplaçant.",
    challengeContent: "Un compte Google Ads réorganisé. Une matrice de dépenses budgétaire créée, afin d'optimiser l'investissement média le long du mois. Récurrence hebdomadaire pour suivre les performances et ajuster nos actions.\n\nArchipel Marketing, c'est une solution clé-en-main, permettant de couvrir l'intégralité des sujets dans le déploiement de campagnes média : plan stratégique, création de contenu, déploiement opérationnel, reporting & analyse.",
    objectivesContent: "Réactivité : 3 jours après l'audit, nous entamions la mission d'accompagnement.\nSouplesse : nous avons déployé un volume de campagnes et d'assets créas conséquents en un temps record.\nExpertise : chaque consultant a plus de 5 ans d'expérience en marketing digital.\n\nL'accompagnement proposé à Joone est représentatif de la méthodologie de travail d'Archipel Marketing. Nous proposons un accompagnement souple et dynamique. Réactifs, nous sommes capables de reprendre les sujets média de nos clients, y compris à court-terme sur des périodes de transition, durant un processus de recrutement.",
  },
  // --- Y-Brush (case study) ---
  {
    name: "Y-Brush",
    slug: "archipel-ybrush",
    logo: "/lovable-uploads/logo-ybrush-blue.webp",
    description: "Optimiser les performances Google Ads & Meta Ads",
    tags: ["Google Ads", "Meta Ads"],
    caseTitle: "Optimiser et scaler les performances Google Ads & Meta Ads de Y-Brush",
    intro: "Y-Brush est une société française qui révolutionne le brossage de dents. Avec Y-Brush, 10 secondes suffisent pour un brossage efficace ! Grâce à sa nouvelle technologie de pointe, la brosse recouvre l'intégralité des dents.",
    stats: [
      { value: "x2", label: "Chiffre d'affaires Google Ads en 2 semaines" },
      { value: "x10", label: "Volume de ventes Meta Ads" },
      { value: "+40%", label: "Hausse du ROAS global" },
    ],
    projectContent: "Reprendre la gestion du compte Google Ads et du compte Meta Ads. Améliorer les performances sur les 2 leviers. Mettre en place un suivi des performances. Former les interlocuteurs en interne aux bases de Google & Meta.\n\nSur Google, nous avons doublé le chiffre d'affaires en deux semaines, avec une hausse globale du ROAS de 40%. Nous avons perfectionné les campagnes Perf Max, refondu la structure globale, les groupes d'éléments, les wordings et les visuels poussés en format Shopping. En parallèle, nous avons déployé une série d'AB tests sur la homepage pour booster le taux de conversion.",
    challengeContent: "Sur Meta, nous avons mis en place plusieurs grands chantiers : refonte complète de la structure, mise en place d'audiences broad pour éduquer l'algo et permettre au compte de scaler, review des assets créas pour identifier le meilleur combo créa & wording. Grâce à ce travail, nous avons multiplié par 10 le volume de ventes et le ROAS, à budget équivalent.\n\nL'accompagnement se décompose en un point hebdomadaire récurrent pour le reporting opérationnel et un point mensuel et trimestriel pour approfondir la stratégie et envisager de nouvelles opportunités.",
    objectivesContent: "Réactivité : 3 jours après l'audit, nous entamions la mission d'accompagnement.\nSouplesse : nous avons déployé un volume de campagnes et d'assets créas conséquents en un temps record.\nExpertise : chaque consultant a plus de 5 ans d'expérience en marketing digital.\n\nNous proposons un accompagnement souple, dynamique, basé sur une série de tests permettant d'optimiser au fil du temps les campagnes média de nos clients. À travers nos bootcamps ultra-intensifs, notre but est d'identifier la recette magique pour chacun de nos clients.",
  },
  // --- Le Réacteur (case study) ---
  {
    name: "Le Réacteur",
    slug: "archipel-le-reacteur",
    logo: "/lovable-uploads/logo-lereacteur-blue.png",
    description: "Restructurer et scaler l'acquisition via Google Ads",
    tags: ["Google Ads"],
    caseTitle: "Restructurer et scaler l'acquisition digitale du Réacteur via Google Ads",
    intro: "Le Réacteur est la première formation développeur Web et Mobile JavaScript à Paris. Ces derniers nous ont contacté dans un premier temps pour restructurer leur compte Google Ads.",
    stats: [
      { value: "÷5", label: "Coût par Lead divisé par 5" },
      { value: "6 mois", label: "Phase 1 d'optimisation" },
      { value: "Multi-levier", label: "Google, LinkedIn & Facebook" },
    ],
    projectContent: "Nous avons d'abord procédé à un audit du compte Google Ads. L'essentiel du budget partait sur des mots-clés en requête large à faible valeur ajoutée. Les campagnes étaient en CPA cible, ce que nous déconseillons pour un compte avec plusieurs événements de conversion avec des intentions d'achat différentes. Le compte manquait d'optimisations au niveau des landing pages, du champ sémantique, des exclusions, des zones géographiques et des audiences.\n\nSuite à l'audit, nous avons proposé une nouvelle structure sur Google Ads et un planning de campagnes sur 6 mois. 6 mois plus tard, nous avons divisé le Coût Par Lead par 5.",
    challengeContent: "Google étant désormais stable et performant, nous sommes entrés dans la phase 2 : augmentation progressive du budget sur Google Ads, déploiement de nouveaux leviers média (LinkedIn en acquisition et Facebook en remarketing via du témoignage clients en format vidéo).\n\nLe challenge est de se déployer sur de nouveaux leviers et de les rendre complémentaires à Google, notamment via des stratégies de remarketing. Le processus de décision étant long (environ 4 mois), il est primordial d'avoir une stratégie omni-canal à long-terme.",
    objectivesContent: "Le Réacteur est un cas d'école de l'accompagnement proposé par Archipel. Nos clients nous demandent souvent d'intervenir dans un premier temps sur un levier, dans l'optique d'optimiser au maximum les performances.\n\nSuite à ce travail, l'accompagnement devient généralement plus poussé et plus global, avec l'ajout de nouveaux leviers, avec pour mission d'augmenter la visibilité en ligne de la marque. Cette phase demande beaucoup de créativité et de production de contenus.",
  },
  // --- Clients without case studies ---
  {
    name: "Depancel",
    slug: "archipel-depancel",
    logo: "",
    description: "Structurer l'acquisition via Google Ads & Meta Ads",
    tags: ["Google Ads", "Meta Ads"],
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  {
    name: "Masterdoc",
    slug: "archipel-masterdoc",
    logo: "",
    description: "Déployer une stratégie Paid Ads complète",
    tags: ["Google Ads", "Meta Ads", "LinkedIn Ads"],
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  {
    name: "FluidStack",
    slug: "archipel-fluidstack",
    logo: "/lovable-uploads/logo-fluidstack-blue.webp",
    description: "Accélérer l'acquisition via Google Ads & LinkedIn Ads",
    tags: ["Google Ads", "LinkedIn Ads"],
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  {
    name: "Jimmy Fairly",
    slug: "archipel-jimmy-fairly",
    logo: "",
    description: "Renforcer la visibilité via le GEO",
    tags: ["GEO"],
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  {
    name: "Primo",
    slug: "archipel-primo",
    logo: "/lovable-uploads/logo-primo-blue.jpeg",
    description: "Renforcer la visibilité via le GEO",
    tags: ["GEO"],
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  {
    name: "Gradium",
    slug: "archipel-gradium",
    logo: "/lovable-uploads/logo-gradium-blue.png",
    description: "Déployer une stratégie GEO, Paid & Social Ads complète",
    tags: ["GEO", "Google Ads", "Meta Ads", "LinkedIn Ads"],
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  {
    name: "Ceran",
    slug: "archipel-ceran",
    logo: "",
    description: "Structurer l'acquisition Google Ads et la visibilité GEO",
    tags: ["Google Ads", "GEO"],
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
];

const ArchipelReferenceDetail = () => {
  const { clientSlug } = useParams<{ clientSlug: string }>();
  const navigate = useNavigate();
  const { language, localePath } = useLanguage();
  const isIt = language === "it";

  const baseClient = ALL_CLIENTS.find(c => c.slug === clientSlug) || ALL_CLIENTS[0];
  const itOverride = isIt && clientSlug ? CLIENT_REFERENCES_IT[clientSlug] : undefined;
  const client: ClientData = itOverride
    ? { ...baseClient, ...itOverride, stats: itOverride.stats.length > 0 ? itOverride.stats : baseClient.stats }
    : baseClient;
  const hasContent = !!client.caseTitle;

  const labels = isIt ? REFERENCE_DETAIL_LABELS_IT : {
    caseOf: "Le cas",
    defaultIntro: "Chez Archipel, nous sommes fiers de travailler avec des entreprises de toutes tailles et de toutes industries pour les aider à améliorer leurs performances et à atteindre leurs objectifs.",
    project: "Le projet",
    projectOf: "de",
    challenge: "Le challenge",
    objectives: "Les objectifs",
    viewCaseStudy: "Voir l'étude de cas",
  };

  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    setCarouselIndex(0);
    window.scrollTo(0, 0);
  }, [clientSlug]);

  const otherClients = ALL_CLIENTS.filter((c) => c.slug !== client.slug);

  const navigateToClient = (slug: string) => {
    navigate(localePath(`/${slug}`));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[480px]">
            {/* Left - Text */}
            <div className="flex flex-col justify-center py-12 lg:pr-16">
              <div className="mb-8">
                <span className="border border-gray-300 text-[#010D3E] font-medium text-sm px-6 py-2.5 rounded-full">
                  {labels.caseOf} {client.name}
                </span>
              </div>
              <h1 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.05]" style={{
                background: "linear-gradient(to bottom, #000000, #001354)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {hasContent ? client.caseTitle : `${labels.caseOf}\n${client.name}`}
              </h1>
              <p className="font-inter text-[#010D3E]/70 text-base md:text-lg leading-relaxed max-w-md">
                {hasContent ? client.intro : labels.defaultIntro}
              </p>
            </div>

            {/* Right - Gradient Card */}
            <div className="rounded-2xl lg:rounded-l-none lg:rounded-r-2xl overflow-hidden flex items-center justify-center"
              style={{
                backgroundImage: "url('/lovable-uploads/mesh-gradient-reference.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="flex flex-col items-center justify-center py-16 px-8">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.name}
                    className={`w-auto mb-10 ${BLUE_FILTER_LOGOS.has(client.logo) ? "h-10 md:h-14" : "h-16 md:h-20"}`}
                    style={BLUE_FILTER_LOGOS.has(client.logo) ? BLUE_FILTER_STYLE : undefined}
                    loading="lazy"
                  />
                ) : (
                  <h2 className="font-jakarta text-3xl md:text-4xl font-bold text-[#0043F1] mb-10">{client.name}</h2>
                )}
                <div className="flex flex-wrap justify-center gap-3">
                  {client.tags.map((tag) => (
                    <span key={tag} className="px-5 py-2 text-sm font-inter font-medium rounded-full border border-[#0043F1]/30 text-[#0043F1] bg-transparent">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {hasContent && client.stats.length > 0 && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {client.stats.map((stat) => (
                <div key={stat.label} className="bg-[#F2F2F7] rounded-2xl p-8 text-center">
                  <p className="font-jakarta text-3xl md:text-4xl font-bold text-[#0043F1] mb-2">{stat.value}</p>
                  <p className="font-inter text-sm text-[#010D3E]/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Le projet Section */}
      {hasContent && (
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-jakarta text-3xl md:text-4xl font-bold mb-8" style={{
              background: "linear-gradient(to bottom, #000000, #001354)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {labels.project}<br />{labels.projectOf} {client.name}
            </h2>
            <div className="font-inter text-[#010D3E]/70 text-base md:text-lg leading-relaxed">
              {client.projectContent.split('\n').map((line, i) => (
                <p key={i} className="mb-3">{line}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Challenge & Objectifs */}
      {hasContent && (
        <section className="pb-20">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Le challenge */}
              <div className="text-center md:text-left">
                <h3 className="font-jakarta text-2xl md:text-3xl font-bold text-[#010D3E] mb-6">Le challenge</h3>
                <div className="font-inter text-[#010D3E]/70 text-[15px] leading-relaxed">
                  {client.challengeContent.split('\n').map((line, i) => (
                    <p key={i} className="mb-3">{line}</p>
                  ))}
                </div>
              </div>
              {/* Les objectifs */}
              <div className="text-center md:text-left">
                <h3 className="font-jakarta text-2xl md:text-3xl font-bold text-[#010D3E] mb-6">Les objectifs</h3>
                <div className="font-inter text-[#010D3E]/70 text-[15px] leading-relaxed">
                  {client.objectivesContent.split('\n').map((line, i) => (
                    <p key={i} className="mb-3">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Other Clients Carousel */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => setCarouselIndex((prev) => (prev - 1 + otherClients.length) % otherClients.length)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0043F1] flex items-center justify-center text-[#0043F1] hover:bg-[#0043F1] hover:text-white transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[0, 1].map((offset) => {
                  const c = otherClients[(carouselIndex + offset) % otherClients.length];
                  return (
                    <div
                      key={`${c.name}-${offset}`}
                      className={`bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 cursor-pointer hover:shadow-lg ${offset === 1 ? 'hidden md:block' : ''}`}
                      onClick={() => navigateToClient(c.slug)}
                    >
                      <div className="h-20 flex items-center justify-center mb-5">
                        {c.logo ? (
                          <img src={c.logo} alt={c.name} className={`w-auto object-contain ${BLUE_FILTER_LOGOS.has(c.logo) ? "max-h-10" : "max-h-14"}`} style={BLUE_FILTER_LOGOS.has(c.logo) ? BLUE_FILTER_STYLE : undefined} loading="lazy" />
                        ) : (
                          <span className="font-jakarta text-xl font-bold text-[#0043F1]">{c.name}</span>
                        )}
                      </div>
                      <h4 className="font-jakarta font-bold text-[#010D3E] text-lg mb-1">{c.name}</h4>
                      <p className="font-inter text-sm text-[#010D3E]/60 mb-4">{c.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {c.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 text-xs font-inter font-medium rounded-full border border-[#010D3E]/20 text-[#010D3E]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="font-inter text-sm font-medium text-[#0043F1] hover:text-[#0043F1]/80 transition-colors inline-flex items-center gap-1">
                        Voir l'étude de cas <span>→</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => setCarouselIndex((prev) => (prev + 1) % otherClients.length)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0043F1] flex items-center justify-center text-[#0043F1] hover:bg-[#0043F1] hover:text-white transition-colors flex-shrink-0"
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection />
    </Layout>
  );
};

export default ArchipelReferenceDetail;
