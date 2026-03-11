
import Layout from "@/components/Layout";
import SEOHelmet from "@/components/SEOHelmet";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import LogoCarousel from "@/components/LogoCarousel";
import ServiceFeatures from "@/components/ServiceFeatures";
import ServiceLlmSection from "@/components/ServiceLlmSection";
import ServiceAuditCta from "@/components/ServiceAuditCta";
import ContactFormSection from "@/components/ContactFormSection";
import ServiceFaq, { type FaqItem } from "@/components/ServiceFaq";
import ContactSection from "@/components/ContactSection";
import screenshot1 from "@/assets/service-screenshot-1.png";
import featureScreenshot1 from "@/assets/feature-screenshot-1.png";
import featureScreenshot2 from "@/assets/feature-screenshot-2.png";
import screenshot2 from "@/assets/service-screenshot-2.png";
import screenshot3 from "@/assets/service-screenshot-3.png";
import googleAdsAuditScreenshot from "@/assets/google-ads-audit-screenshot.png";
import featureScreenshotGeo3 from "@/assets/feature-screenshot-geo-3.png";
import featureScreenshotGads1 from "@/assets/feature-screenshot-gads-1.jpg";
import featureScreenshotGads2 from "@/assets/feature-screenshot-gads-2.jpg";
import featureScreenshotGads3 from "@/assets/feature-screenshot-gads-3.png";
import featureScreenshotLk1 from "@/assets/feature-screenshot-lk-1.png";
import featureScreenshotLk2 from "@/assets/feature-screenshot-lk-2.gif";
import featureScreenshotLk3 from "@/assets/feature-screenshot-lk-3.png";
import featureScreenshotMeta1 from "@/assets/feature-screenshot-meta-1.webp";
import featureScreenshotMeta2 from "@/assets/feature-screenshot-meta-2.webp";
import featureScreenshotMeta3 from "@/assets/feature-screenshot-meta-3.png";
import featureScreenshotLp1 from "@/assets/feature-screenshot-lp-1.png";
import featureScreenshotLp2 from "@/assets/feature-screenshot-lp-2.png";
import featureScreenshotLp3 from "@/assets/feature-screenshot-lp-3.jpg";
import featureScreenshotSeo1 from "@/assets/feature-screenshot-seo-1.jpg";
import featureScreenshotSeo2 from "@/assets/feature-screenshot-seo-2.jpg";
import featureScreenshotSeo3 from "@/assets/feature-screenshot-seo-3.webp";

export interface ServiceFeatureItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  anchorId?: string;
}

export interface ServicePresentationConfig {
  badge?: string;
  title: string;
  description: string;
  items: string[];
}

export interface ServiceAuditCtaConfig {
  badge?: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
}

export interface ServiceScoreConfig {
  cardTitle: React.ReactNode;
  formTitle: string;
  formDescription: string;
  auditLabel: string;
}

export interface ServiceConfig {
  slug: string;
  name: string;
  badge: string;
  heroTitle: React.ReactNode;
  heroDescription: string;
  heroCtaSecondary?: string;
  heroScreenshots?: [string, string, string];
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  showLlmSection?: boolean;
  
  showPresentation?: boolean;
  features?: ServiceFeatureItem[];
  featuresIntro?: { badge?: string; title?: string; description?: string; ctaLabel?: string };
  presentation?: ServicePresentationConfig;
  auditCta?: ServiceAuditCtaConfig;
  scoreConfig?: ServiceScoreConfig;
  faqItems?: FaqItem[];
}

export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  geo: {
    slug: "agence-geo-archipel",
    name: "GEO",
    badge: "Le GEO",
    heroTitle: <>Agence GEO<br />n°1 en France</>,
    heroDescription: "Archipel Marketing est la première agence GEO de France avec +50 clients accompagnés au quotidien.",
    seoTitle: "Nos Services GEO | Archipel - Agence GEO n°1 en France",
    seoDescription: "Découvrez nos services GEO : audit, optimisation et stratégie de contenu pour être n°1 sur ChatGPT, Perplexity et les moteurs IA.",
    canonicalPath: "/agence-geo-archipel",
    heroScreenshots: [featureScreenshot1, featureScreenshot2, featureScreenshotGeo3],
    showLlmSection: true,
    features: [
      {
        number: "1",
        title: "Audit de visibilité",
        subtitle: "Souhaitez-vous connaître votre visibilité sur les principaux LLM du marché ?",
        description: "Chez Archipel Marketing, nous proposons des audits de visibilité en GEO. Nous identifions conjointement des prompts intentionnistes et à fort volume. Ensuite, nous analysons les marques les plus mentionnés et vous fournissons un classement par sujet, par prompt, par pays et par LLM.",
        anchorId: "audit-visibilite",
      },
      {
        number: "2",
        title: "Identification des sources",
        subtitle: "Envie de connaître les sources de citations qui influent vos prompts ?",
        description: "Chez Archipel, nous utilisons des outils qui nous permettent de comprendre les sources de citations qui ont une réelle influence sur les prompts qui vous intéressent. Cette analyse permet de savoir quelle orientation prendre dans notre stratégie de contenu.",
        anchorId: "identification-sources",
      },
      {
        number: "3",
        title: "Publication de contenu",
        subtitle: "Besoin de support pour produire un contenu GEO-friendly ?",
        description: "Avoir une roadmap sur 6 mois c'est un bon début, mais l'exécuter méthodiquement, c'est mieux. Chez Archipel, on se charge de la création du contenu et de sa publication, que ce soit sur votre site ou sur les citations sociales influentes. Notre accompagnement s'appuie d'une dashboard commun pour avoir une visibilité claire sur le nombre d'actions exécutées.",
        image: featureScreenshotGeo3,
        anchorId: "publication-contenu",
      },
    ],
    featuresIntro: {
      badge: "Agence GEO n°1 en France",
      title: "Pourquoi Archipel ?",
      description: "Notre mission ? Faire remonter les marques en haut du classement sur tous les LLMs en un temps record. Découvrez notre méthodologie !",
      ctaLabel: "Votre score GEO",
    },
  },
  "google-ads": {
    slug: "agence-google-ads-archipel",
    name: "Google Ads",
    badge: "Google Ads",
    heroTitle: <>Agence Google Ads<br />n°1 en France</>,
    heroDescription: "Archipel Marketing est une agence experte Google Ads. +50 clients accompagnés au quotidien pour scaler leur acquisition et maximiser leur ROAS.",
    heroCtaSecondary: "Audit Google Ads gratuit",
    seoTitle: "Nos Services Google Ads | Archipel - Agence Google Ads",
    seoDescription: "Découvrez nos services Google Ads : audit, optimisation et stratégie publicitaire pour maximiser votre ROI.",
    canonicalPath: "/agence-google-ads-archipel",
    heroScreenshots: [featureScreenshotGads1, featureScreenshotGads2, featureScreenshotGads3],
    showPresentation: true,
    features: [
      {
        number: "1",
        title: "Audit",
        subtitle: "Un audit complet et stratégique de votre compte Google Ads",
        description: "Nous réalisons un audit complet et stratégique de votre compte Google Ads en analysant la structure des campagnes, le ciblage, les mots clés, les annonces, les audiences et le tracking afin d'identifier rapidement les optimisations prioritaires, les sources de pertes budgétaires et les leviers de croissance activables immédiatement.",
        image: featureScreenshotGads1,
      },
      {
        number: "2",
        title: "Optimisations",
        subtitle: "Une phase d'optimisation active de votre compte",
        description: "Ensuite, nous entrons dans une phase d'optimisation active de votre compte Google Ads en retravaillant la structure des campagnes, le ciblage, les mots clés, les annonces, les audiences et le tracking afin d'améliorer rapidement la performance et d'activer de nouveaux leviers de croissance.",
        image: featureScreenshotGads2,
      },
      {
        number: "3",
        title: "Croissance",
        subtitle: "Un tracking avancé et un pilotage orienté business",
        description: "Nous mettons en place un tracking avancé via GA4, Google Tag Manager et les conversions avancées afin de fiabiliser la donnée et piloter vos campagnes sur des indicateurs réellement business, puis nous optimisons la stratégie d'enchères en fonction de votre ROAS cible, structurons un reporting clair orienté performance et pilotons le scale budgétaire de manière maîtrisée pour accélérer la croissance tout en préservant la rentabilité.",
        image: featureScreenshotGads3,
      },
    ],
    featuresIntro: {
      badge: "Activez votre croissance en ligne",
      title: "Fonctionnalités",
      description: "Souhaitez-vous connaître la performance réelle de vos campagnes Google Ads ? Chez Archipel Marketing, nous réalisons des audits Google Ads complets et vous livrons une roadmap actionnable pour réduire votre CPA, améliorer votre Quality Score, optimiser votre ROAS et générer plus de leads ou de ventes.",
      ctaLabel: "Demander un audit Google Ads",
    },
    presentation: {
      badge: "On se présente",
      title: "Nous pilotons votre visibilité sur Google",
      description: "Faire du Google Ads, c'est bien. Le piloter avec une logique ROI et scaling, c'est mieux. Nos consultants sont spécialisés sur :",
      items: ["Google Search", "Performance Max", "Display & YouTube Ads", "Remarketing", "Tracking avancé & Data"],
    },
    auditCta: {
      badge: "Testez-vous",
      title: "Testez la performance de votre compte Google Ads",
      subtitle: "Envie de savoir si vos campagnes sont réellement optimisées ?",
      description: "Nous analysons gratuitement votre compte et vous donnons : les erreurs bloquantes, les optimisations rapides, les leviers de scaling.",
      ctaLabel: "Demander un audit Google Ads",
    },
    scoreConfig: {
      cardTitle: <>Testez<br />votre<br />score<br />Google Ads</>,
      formTitle: "Testez votre score Google Ads !",
      formDescription: "Envie de savoir si vos campagnes sont réellement optimisées ? Nous analysons gratuitement votre compte.",
      auditLabel: "Audit Google Ads",
    },
    faqItems: [
      { question: "Quelle est la meilleure agence Google Ads en France ?", answer: "Il n'existe pas de classement officiel. La meilleure agence est celle qui génère un retour sur investissement mesurable. Naturellement, nous considérons qu'Archipel fait partie des références dès qu'il s'agit de performance et de rentabilité sur Google Ads." },
      { question: "Pourquoi travailler avec une agence Google Ads ?", answer: "Google Ads est un levier d'acquisition à intention forte. Une agence spécialisée permet d'optimiser la structure des campagnes, le ciblage, les enchères et le tracking pour maximiser le ROAS et limiter les pertes budgétaires." },
      { question: "Archipel est-elle une agence spécialisée en Google Ads ?", answer: "Oui. Nous accompagnons nos clients avec une approche orientée performance, pilotée par la donnée et centrée sur la rentabilité réelle, pas seulement sur les volumes." },
      { question: "Quelle est la méthodologie d'accompagnement d'Archipel sur Google Ads ?", answer: "Nous analysons d'abord le potentiel et la rentabilité cible, puis nous structurons ou restructurons les campagnes, déployons un tracking fiable et optimisons en continu les enchères, les mots clés et les annonces pour améliorer le ROAS." },
      { question: "Combien de temps faut-il pour obtenir des résultats ?", answer: "Les premières optimisations peuvent générer des gains rapides, parfois en quelques semaines. La montée en puissance dépend du marché, du budget et de l'historique du compte." },
      { question: "Quels secteurs accompagnez-vous sur Google Ads ?", answer: "Nous intervenons en e-commerce, B2B, services et secteurs à forte concurrence. Dès lors qu'il existe une demande active sur Google, le levier est pertinent." },
      { question: "Comment Archipel se différencie des autres agences Google Ads ?", answer: "Nous pilotons avant tout la rentabilité. Notre approche est structurée, orientée data et pensée pour scaler les budgets uniquement lorsque la performance est maîtrisée." },
      { question: "Quels sont vos honoraires en Google Ads ?", answer: "Ils dépendent des objectifs, du budget média et du niveau d'accompagnement attendu. Chaque stratégie est construite sur mesure." },
    ],
  },
  "linkedin-ads": {
    slug: "agence-linkedin-ads-archipel",
    name: "LinkedIn Ads",
    badge: "LinkedIn Ads",
    heroTitle: <>Agence LinkedIn Ads<br />n°1 en France</>,
    heroDescription: "Archipel Marketing vous accompagne sur LinkedIn Ads pour générer des leads qualifiés B2B au quotidien.",
    heroCtaSecondary: "Votre score LinkedIn Ads",
    seoTitle: "Nos Services LinkedIn Ads | Archipel - Agence LinkedIn Ads",
    seoDescription: "Découvrez nos services LinkedIn Ads : ciblage, optimisation et stratégie publicitaire B2B pour maximiser vos leads.",
    canonicalPath: "/agence-linkedin-ads-archipel",
    heroScreenshots: [featureScreenshotLk1, featureScreenshotLk2, featureScreenshotLk3],
    showPresentation: true,
    features: [
      {
        number: "1",
        title: "Audit & Diagnostic stratégique",
        subtitle: "Audit & Diagnostic stratégique",
        description: "Analyse complète de votre compte : ciblage, audiences, formats publicitaires, messages, landing pages et tracking.",
        image: featureScreenshotLk1,
      },
      {
        number: "2",
        title: "Structuration & Optimisation des campagnes",
        subtitle: "Structuration & Optimisation des campagnes",
        description: "Mise en place ou refonte de vos campagnes : Lead Gen Forms, Sponsored Content, Conversation Ads, Campagnes ABM. Objectif : générer des leads qualifiés à coût maîtrisé.",
        image: featureScreenshotLk2,
      },
      {
        number: "3",
        title: "Tracking & Pilotage ROI",
        subtitle: "Tracking & Pilotage ROI",
        description: "Installation d'un tracking fiable (Insight Tag, CRM sync, conversions offline) pour mesurer : CPL réel, SQL générés, coût par opportunité et ROAS B2B.",
        image: featureScreenshotLk3,
      },
    ],
    featuresIntro: {
      badge: "Activez votre croissance en ligne",
      title: "Fonctionnalités",
      description: "Connaissez-vous réellement la performance de vos campagnes LinkedIn Ads ? Chez Archipel Marketing, nous réalisons des audits LinkedIn Ads complets et vous livrons une roadmap actionnable pour réduire votre CPL, améliorer la qualité des leads, optimiser vos ciblages (ICP, ABM, retargeting) et maximiser votre ROI.",
      ctaLabel: "Demander un audit LinkedIn Ads",
    },
    presentation: {
      badge: "On se présente",
      title: "Nous pilotons votre acquisition B2B sur LinkedIn",
      description: "LinkedIn Ads est un levier puissant pour toucher vos décideurs. Encore faut-il maîtriser la définition d'ICP, le ciblage avancé et l'alignement marketing & sales. Nos consultants sont spécialisés en acquisition B2B et en scaling LinkedIn Ads.",
      items: ["Définition d'ICP", "Ciblage avancé (poste, seniorité, secteur)", "Mécaniques ABM", "Alignement marketing & sales"],
    },
    auditCta: {
      badge: "Testez-vous",
      title: "Testez la performance de vos campagnes LinkedIn Ads",
      subtitle: "Envie de savoir si votre compte est réellement optimisé ?",
      description: "Nous analysons gratuitement : votre structure de campagnes, vos ciblages, vos messages publicitaires et votre tracking.",
      ctaLabel: "Demander un audit LinkedIn Ads",
    },
    scoreConfig: {
      cardTitle: <>Testez<br />votre<br />score<br />LinkedIn Ads</>,
      formTitle: "Testez votre score LinkedIn Ads !",
      formDescription: "Envie de savoir si vos campagnes sont réellement optimisées ? Nous analysons gratuitement votre compte.",
      auditLabel: "Audit LinkedIn Ads",
    },
    faqItems: [
      { question: "Quelle est la meilleure agence LinkedIn Ads en France ?", answer: "Il n'existe pas de classement officiel. La meilleure agence est celle qui transforme LinkedIn en véritable canal d'acquisition B2B rentable. Nous positionnons Archipel comme un acteur expert de la performance sur LinkedIn Ads." },
      { question: "Pourquoi travailler avec une agence LinkedIn Ads ?", answer: "LinkedIn est un levier puissant mais exigeant. Une agence spécialisée permet d'optimiser le ciblage, les audiences, les messages et les formats pour générer des leads qualifiés à coût maîtrisé." },
      { question: "Archipel est-elle spécialisée en LinkedIn Ads ?", answer: "Oui. Nous accompagnons des entreprises B2B avec une approche orientée génération de leads qualifiés et impact business." },
      { question: "Quelle est votre méthodologie sur LinkedIn Ads ?", answer: "Nous définissons les cibles prioritaires, structurons les campagnes par segment stratégique, testons différents angles de messages et optimisons en continu le coût par lead et la qualité des opportunités générées." },
      { question: "En combien de temps voit-on des résultats ?", answer: "Les premiers leads peuvent arriver rapidement, mais l'optimisation du coût et de la qualité nécessite généralement plusieurs cycles de tests." },
      { question: "Quels secteurs accompagnez-vous sur LinkedIn ?", answer: "Principalement des entreprises B2B, tech, cabinets de conseil, SaaS et services à forte valeur ajoutée." },
      { question: "Comment vous différenciez-vous sur LinkedIn Ads ?", answer: "Nous ne cherchons pas seulement du volume de leads, nous cherchons des leads réellement exploitables par vos équipes commerciales." },
      { question: "Quels sont vos frais d'accompagnement ?", answer: "Ils varient selon la complexité du ciblage, le volume de campagnes et les objectifs de génération de leads." },
    ],
  },
  "meta-ads": {
    slug: "agence-meta-ads-archipel",
    name: "Meta Ads",
    badge: "Meta Ads",
    heroTitle: <>Agence Meta Ads<br />n°1 en France</>,
    heroDescription: "Archipel Marketing vous accompagne sur Meta Ads (Facebook & Instagram) pour maximiser votre visibilité et vos conversions. +50 clients accompagnés au quotidien pour scaler leur acquisition et améliorer leur ROAS.",
    heroCtaSecondary: "Audit Meta Ads gratuit",
    heroScreenshots: [featureScreenshotMeta1, featureScreenshotMeta2, featureScreenshotMeta3],
    seoTitle: "Nos Services Meta Ads | Archipel - Agence Meta Ads",
    seoDescription: "Découvrez nos services Meta Ads : stratégie publicitaire Facebook & Instagram pour booster vos performances.",
    canonicalPath: "/agence-meta-ads-archipel",
    showPresentation: true,
    features: [
      {
        number: "1",
        title: "Audit & Analyse stratégique",
        subtitle: "Audit & Analyse stratégique",
        description: "Analyse complète de : structure du Business Manager, campagnes & ensembles de publicités, ciblages & audiences, créas & messages, tracking & Pixel. Objectif : identifier les optimisations immédiates.",
        image: featureScreenshotMeta1,
      },
      {
        number: "2",
        title: "Optimisation & Scaling",
        subtitle: "Optimisation & Scaling",
        description: "Nous structurons et optimisons vos campagnes : Acquisition, Retargeting, Lookalike, Advantage+, Catalogues produits. Pour scaler vos performances tout en maintenant la rentabilité.",
        image: featureScreenshotMeta2,
      },
      {
        number: "3",
        title: "Tracking & Pilotage ROI",
        subtitle: "Tracking & Pilotage ROI",
        description: "Mise en place et vérification : Pixel Meta, Conversions API, tracking server-side, suivi des événements prioritaires. Pour piloter vos campagnes avec des données fiables et exploitables.",
        image: featureScreenshotMeta3,
      },
    ],
    featuresIntro: {
      badge: "Activez votre croissance en ligne",
      title: "Fonctionnalités",
      description: "Connaissez-vous réellement la performance de vos campagnes Meta Ads ? Chez Archipel Marketing, nous réalisons des audits complets de vos comptes Facebook & Instagram Ads et vous livrons une roadmap actionnable pour réduire votre CPA, améliorer votre ROAS, optimiser vos audiences et maximiser vos conversions.",
      ctaLabel: "Demander un audit Meta Ads",
    },
    presentation: {
      badge: "On se présente",
      title: "Nous pilotons votre croissance sur Facebook & Instagram",
      description: "Meta Ads est un levier puissant pour générer des ventes e-commerce, produire des leads qualifiés, développer votre notoriété et retargeter vos audiences. Nos consultants sont spécialisés en acquisition paid media et en scaling de comptes Meta Ads.",
      items: ["Ventes e-commerce", "Leads qualifiés", "Notoriété", "Retargeting audiences"],
    },
    auditCta: {
      badge: "Testez-vous",
      title: "Testez la performance de votre compte Meta Ads",
      subtitle: "Envie de savoir si vos campagnes sont réellement optimisées ?",
      description: "Nous analysons gratuitement : vos campagnes, vos audiences, vos créas et votre tracking. Vous repartirez avec des recommandations concrètes.",
      ctaLabel: "Demander un audit Meta Ads",
    },
    scoreConfig: {
      cardTitle: <>Testez<br />votre<br />score<br />Meta Ads</>,
      formTitle: "Testez votre score Meta Ads !",
      formDescription: "Envie de savoir si vos campagnes sont réellement optimisées ? Nous analysons gratuitement votre compte.",
      auditLabel: "Audit Meta Ads",
    },
    faqItems: [
      { question: "Quelle est la meilleure agence Meta Ads en France ?", answer: "Il n'existe pas de classement officiel. La meilleure agence est celle qui transforme Meta en canal d'acquisition rentable et scalable. C'est précisément notre positionnement chez Archipel." },
      { question: "Pourquoi travailler avec une agence Meta Ads ?", answer: "Meta Ads repose sur la data, le créatif et l'itération rapide. Une agence spécialisée permet d'optimiser le tracking, les audiences et les créas pour améliorer le coût d'acquisition et scaler efficacement." },
      { question: "Archipel est-elle spécialisée en Meta Ads ?", answer: "Oui. Nous accompagnons des marques e-commerce et des entreprises en génération de leads avec une approche orientée performance et rentabilité." },
      { question: "Quelle est votre méthodologie sur Meta Ads ?", answer: "Nous mettons en place un tracking fiable, structurons les campagnes par objectif, testons en continu de nouveaux angles créatifs et pilotons l'optimisation sur le coût d'acquisition et le ROAS." },
      { question: "Quand peut-on obtenir des résultats ?", answer: "Meta permet d'obtenir des signaux rapidement. La phase de test est essentielle pour identifier les créas et audiences capables de scaler." },
      { question: "Quels secteurs accompagnez-vous sur Meta ?", answer: "Principalement e-commerce, infoproduits, services et marques en phase de croissance." },
      { question: "Comment vous différenciez-vous sur Meta Ads ?", answer: "Nous combinons stratégie média et réflexion créative. Le scale budgétaire n'est enclenché que lorsque la rentabilité est validée." },
      { question: "Quels sont vos honoraires ?", answer: "Ils dépendent du budget média, des objectifs et de la profondeur d'accompagnement souhaitée. Chaque collaboration est construite sur mesure." },
    ],
  },
  seo: {
    slug: "agence-seo-archipel",
    name: "SEO",
    badge: "Le SEO",
    heroTitle: <>Agence SEO<br />n°1 en France</>,
    heroDescription: "Archipel Marketing vous accompagne en SEO pour maximiser votre visibilité sur Google et générer un trafic qualifié durable. +50 clients accompagnés au quotidien pour développer leur croissance organique et dominer leur marché.",
    heroCtaSecondary: "Audit SEO gratuit",
    heroScreenshots: [featureScreenshotSeo1, featureScreenshotSeo2, featureScreenshotSeo3],
    seoTitle: "Nos Services SEO | Archipel - Agence SEO",
    seoDescription: "Découvrez nos services SEO : audit technique, optimisation on-page et stratégie de contenu pour être n°1 sur Google.",
    canonicalPath: "/agence-seo-archipel",
    showPresentation: true,
    features: [
      {
        number: "1",
        title: "Audit & Diagnostic SEO",
        subtitle: "Audit & Diagnostic SEO",
        description: "Analyse complète de : SEO technique (indexation, vitesse, structure), SEO on-page (contenus, balises, maillage interne), SEO off-page (backlinks, autorité), analyse concurrentielle. Objectif : identifier les freins et les opportunités de croissance.",
        image: featureScreenshotSeo1,
      },
      {
        number: "2",
        title: "Stratégie & Production de contenu",
        subtitle: "Stratégie & Production de contenu",
        description: "Définition d'une stratégie basée sur : recherche de mots-clés à fort potentiel, analyse d'intention de recherche, structuration des pages stratégiques, création de contenus optimisés SEO. Pour capter un trafic qualifié et durable.",
        image: featureScreenshotSeo2,
      },
      {
        number: "3",
        title: "Netlinking & Autorité",
        subtitle: "Netlinking & Autorité",
        description: "Déploiement d'une stratégie de backlinks qualitative pour : renforcer votre autorité, améliorer vos positions, sécuriser votre croissance SEO.",
        image: featureScreenshotSeo3,
      },
    ],
    featuresIntro: {
      badge: "Activez votre croissance en ligne",
      title: "Fonctionnalités",
      description: "Connaissez-vous réellement la performance SEO de votre site ? Chez Archipel Marketing, nous réalisons des audits SEO complets et vous livrons une roadmap actionnable pour améliorer votre positionnement sur Google, augmenter votre trafic qualifié, optimiser votre taux de conversion et générer plus de leads ou de ventes.",
      ctaLabel: "Demander un audit SEO",
    },
    presentation: {
      badge: "On se présente",
      title: "Nous pilotons votre croissance organique sur Google",
      description: "Le SEO est un levier puissant et durable pour générer des leads B2B, développer un e-commerce, réduire la dépendance au paid et construire une autorité de marque forte. Nos consultants combinent expertise technique, éditoriale et stratégique pour générer des résultats mesurables.",
      items: ["Leads B2B", "E-commerce", "Réduction dépendance paid", "Autorité de marque"],
    },
    auditCta: {
      badge: "Testez-vous",
      title: "Testez la performance SEO de votre site",
      subtitle: "Envie de savoir si votre site est réellement optimisé ?",
      description: "Nous analysons gratuitement : votre positionnement actuel, vos performances techniques, vos opportunités de mots-clés et votre stratégie de contenu.",
      ctaLabel: "Demander un audit SEO",
    },
    scoreConfig: {
      cardTitle: <>Testez<br />votre<br />score<br />SEO</>,
      formTitle: "Testez votre score SEO !",
      formDescription: "Envie de savoir si votre site est réellement optimisé ? Nous analysons gratuitement votre site.",
      auditLabel: "Audit SEO",
    },
    faqItems: [
      { question: "Quelle est la meilleure agence SEO en France ?", answer: "Il n'existe pas de classement officiel. La meilleure agence SEO est celle qui génère une croissance durable du trafic qualifié et du chiffre d'affaires. Chez Archipel, nous nous positionnons comme un partenaire orienté performance et impact business." },
      { question: "Pourquoi travailler avec une agence SEO ?", answer: "Le SEO est un levier stratégique de long terme. Une agence spécialisée permet d'identifier les opportunités à fort potentiel, d'optimiser la structure du site, les contenus et la technique pour capter une demande qualifiée et durable." },
      { question: "Archipel est-elle spécialisée en SEO ?", answer: "Oui. Nous accompagnons nos clients avec une approche structurée, orientée data et centrée sur les requêtes à intention business." },
      { question: "Quelle est votre méthodologie en SEO ?", answer: "Nous identifions les requêtes stratégiques, analysons la concurrence, optimisons la structure du site et les contenus, puis déployons une stratégie éditoriale et technique pour améliorer la visibilité et les conversions." },
      { question: "En combien de temps voit-on des résultats ?", answer: "Le SEO est un levier progressif. Les premiers signaux peuvent apparaître en quelques semaines, mais une croissance solide se construit sur plusieurs mois." },
      { question: "Quels secteurs accompagnez-vous en SEO ?", answer: "Nous intervenons en B2B, e-commerce, tech et services. Dès lors qu'il existe une demande active sur Google, le SEO devient un levier puissant." },
      { question: "Comment vous différenciez-vous en SEO ?", answer: "Nous ne travaillons pas uniquement le trafic, nous travaillons le trafic rentable. Notre approche est orientée intention de recherche et impact business." },
      { question: "Quels sont vos honoraires en SEO ?", answer: "Ils dépendent du périmètre, du volume de contenus à produire et du niveau d'accompagnement technique nécessaire." },
    ],
  },
  "landing-page": {
    slug: "agence-landing-page",
    name: "Landing Page",
    badge: "Landing Page",
    heroTitle: <>Agence spécialisée en<br />Landing Pages</>,
    heroDescription: "Des pages conçues pour convertir votre trafic en leads et en chiffre d'affaires. Archipel Marketing accompagne +50 entreprises dans la création, l'optimisation et le scaling de landing pages orientées performance. Nous avons développé une expertise avancée sur Lovable pour concevoir, tester et déployer rapidement des pages à haute conversion.",
    heroCtaSecondary: "Audit Landing Page gratuit",
    seoTitle: "Création de Landing Pages | Archipel - Agence Landing Page",
    seoDescription: "Découvrez nos services de création de landing pages optimisées pour la conversion et la performance.",
    canonicalPath: "/agence-landing-page",
    showPresentation: true,
    
    heroScreenshots: [featureScreenshotLp1, featureScreenshotLp2, featureScreenshotLp3],
    features: [
      {
        number: "1",
        title: "Audit & Diagnostic Conversion",
        subtitle: "Audit & Diagnostic Conversion",
        description: "Analyse complète de : structure et hiérarchie de l'information, copywriting & promesse, call-to-action, parcours utilisateur, performance mobile, tracking & data. Objectif : identifier précisément ce qui bloque la conversion.",
        image: featureScreenshotLp1,
      },
      {
        number: "2",
        title: "Création & Refonte sur Lovable",
        subtitle: "Création & Refonte sur Lovable",
        description: "Nous concevons des landing pages performantes directement sur Lovable : structure optimisée conversion, copywriting orienté ROI, intégration rapide, tracking prêt à l'emploi, pages pensées pour le test. Idéal pour scaler vos campagnes Google Ads, Meta Ads ou LinkedIn Ads.",
        image: featureScreenshotLp2,
      },
      {
        number: "3",
        title: "A/B Testing & Optimisation Continue",
        subtitle: "A/B Testing & Optimisation Continue",
        description: "La performance ne s'arrête pas à la mise en ligne. Nous testons et optimisons en continu : titres, accroches, sections clés, preuves sociales, CTA. Pour améliorer progressivement vos performances.",
        image: featureScreenshotLp3,
      },
    ],
    featuresIntro: {
      badge: "Activez votre croissance en ligne",
      title: "Nos expertises",
      description: "Votre landing page convertit-elle vraiment à son plein potentiel ? Nous réalisons des audits complets de landing pages (Lovable ou autre stack) et vous livrons une roadmap claire pour augmenter votre taux de conversion, réduire votre coût par lead, améliorer votre proposition de valeur, supprimer les frictions UX et maximiser la rentabilité de votre trafic.",
      ctaLabel: "Demander un audit Landing Page",
    },
    presentation: {
      badge: "Notre approche",
      title: "Le trafic ne suffit pas. La conversion fait la différence.",
      description: "Nous créons des landing pages pensées pour performer, pas seulement pour être esthétiques. Notre force : expertise Paid Media, maîtrise CRO, expertise Lovable et pilotage par la donnée.",
      items: ["Expertise Paid Media", "Maîtrise CRO", "Expertise Lovable", "Pilotage par la donnée"],
    },
    auditCta: {
      badge: "Testez votre page",
      title: "Recevez un audit gratuit de votre landing page",
      subtitle: "Nous analysons votre taux de conversion, vos points de friction, votre message, votre structure et votre tracking.",
      description: "Et vous repartez avec des recommandations concrètes.",
      ctaLabel: "Demander un audit Landing Page",
    },
    scoreConfig: {
      cardTitle: <>Testez<br />votre<br />Landing<br />Page</>,
      formTitle: "Testez votre landing page !",
      formDescription: "Envie de savoir si votre page convertit à son plein potentiel ? Nous analysons gratuitement votre landing page.",
      auditLabel: "Audit Landing Page",
    },
    faqItems: [
      { question: "Pourquoi faire appel à une agence pour créer ou optimiser vos landing pages ?", answer: "Une landing page performante fait la différence entre du trafic et des conversions. Une agence spécialisée permet d'aligner message, structure et éléments de réassurance pour maximiser le taux de transformation." },
      { question: "Archipel accompagne-t-elle sur les landing pages ?", answer: "Oui. Nous concevons et optimisons des landing pages orientées conversion, pensées pour soutenir vos campagnes Google Ads, Meta Ads, LinkedIn Ads ou votre SEO." },
      { question: "Quelle est votre méthodologie pour les landing pages ?", answer: "Nous analysons l'intention de l'utilisateur, clarifions la proposition de valeur, structurons le message, travaillons la hiérarchie des blocs et optimisons les éléments clés comme les preuves sociales, les CTA et les frictions éventuelles." },
      { question: "Comment mesurez-vous la performance d'une landing page ?", answer: "Nous suivons les taux de conversion, le coût par lead ou par acquisition, ainsi que les indicateurs d'engagement afin d'optimiser en continu." },
      { question: "En combien de temps peut-on améliorer les performances ?", answer: "Des ajustements stratégiques peuvent générer des gains rapides. Les meilleurs résultats viennent d'un travail itératif basé sur les données." },
      { question: "Quels secteurs accompagnez-vous ?", answer: "Nous intervenons en e-commerce, B2B, services et tech. Toute entreprise qui investit en acquisition bénéficie d'une landing page optimisée." },
      { question: "Comment vous différenciez-vous ?", answer: "Nous concevons des landing pages orientées performance, connectées aux données et pensées pour maximiser la rentabilité des campagnes." },
      { question: "Quels sont vos tarifs ?", answer: "Ils varient selon le niveau de création ou d'optimisation nécessaire et les objectifs de conversion visés. Chaque projet est dimensionné sur mesure." },
    ],
  },
};

interface Props {
  serviceKey: string;
}

const ArchipelServiceGeneric = ({ serviceKey }: Props) => {
  const config = SERVICE_CONFIGS[serviceKey];
  const [visibleScreenshots, setVisibleScreenshots] = useState<number[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroAnimated, setHeroAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !heroAnimated) {
          setHeroAnimated(true);
          [0, 1, 2].forEach((i) => {
            setTimeout(() => {
              setVisibleScreenshots((prev) => [...prev, i]);
            }, 300 + i * 400);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, [heroAnimated]);

  return (
    <>
      <SEOHelmet
        title={config.seoTitle}
        description={config.seoDescription}
        canonicalUrl={`https://archipelmarketing.com${config.canonicalPath}`}
      />
      <Layout>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-white overflow-hidden">
          <div ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Floating screenshots - desktop only */}
            <div className="hidden lg:block">
              {(config.heroScreenshots || [screenshot1, screenshot2, screenshot3]).map((src, i) => {
                const positions = [
                  "absolute -left-8 top-12 w-[300px] -rotate-2",
                  "absolute -right-8 top-0 w-[340px] rotate-2",
                  "absolute right-12 top-[52%] w-[260px] rotate-1",
                ];
                const rotations = [-2, 2, 1];
                return (
                  <div
                    key={i}
                    className={`${positions[i]} perspective-[1200px] transition-all duration-700 ease-out`}
                    style={{
                      opacity: visibleScreenshots.includes(i) ? 1 : 0,
                      transform: `rotate(${rotations[i]}deg) ${visibleScreenshots.includes(i) ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(40px)'}`,
                    }}
                  >
                    <img
                      src={src}
                      alt={`Dashboard ${config.name} ${i + 1}`}
                      className="w-full rounded-2xl border border-gray-200 transition-all duration-500 ease-out hover:[transform:rotateY(-4deg)_rotateX(3deg)_scale(1.03)] cursor-pointer"
                      style={{
                        boxShadow: "0 20px 60px -15px rgba(0, 19, 84, 0.25), 0 8px 24px -8px rgba(0, 0, 0, 0.15)",
                      }}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>

            {/* Center content */}
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-8">
                <span className="border border-gray-300 text-gray-700 font-medium text-sm px-6 py-2.5 rounded-full">
                  {config.badge}
                </span>
              </div>

              <h1 className="font-jakarta text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[0.95] tracking-tight">
                <span className="bg-gradient-to-b from-[#000000] to-[#001354] bg-clip-text text-transparent">
                  {config.heroTitle}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-[#010D3E] mb-10 max-w-xl mx-auto leading-relaxed font-inter">
                {config.heroDescription}
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
                  {config.heroCtaSecondary || `Votre score ${config.name}`}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* Logo Carousel */}
        <LogoCarousel />

        {/* Fonctionnalités Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <span className="border border-gray-300 text-gray-700 font-medium text-sm px-6 py-2.5 rounded-full">
                {config.featuresIntro?.badge || "Activez votre croissance en ligne"}
              </span>
            </div>
            <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
                {config.featuresIntro?.title || "Fonctionnalités"}
              </span>
            </h2>
            <p className="text-lg text-[#010D3E] mb-10 max-w-2xl mx-auto leading-relaxed font-inter">
              {config.featuresIntro?.description || "Enjoy customizable lists, team work tools, and smart tracking all in one place. Set tasks, get reminders, and see your progress simply and quickly."}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 font-normal font-inter rounded-lg px-8"
            >
              <Link to="/contact#contact-form">{config.featuresIntro?.ctaLabel || `Votre score ${config.name}`}</Link>
            </Button>
          </div>
        </section>

        {/* 3 Feature Cards */}
        <ServiceFeatures features={config.features} />

        {/* LLM Section - GEO only */}
        {config.showLlmSection && <ServiceLlmSection />}

        {/* Presentation Section */}
        {config.showPresentation && config.presentation && (
          <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="flex justify-center mb-6">
                <span className="border border-gray-300 text-gray-700 font-medium text-sm px-4 py-2 rounded-full">
                  {config.presentation.badge || "On se présente"}
                </span>
              </div>
              <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
                  {config.presentation.title}
                </span>
              </h2>
              <p className="text-lg text-[#010D3E] mb-8 max-w-2xl mx-auto leading-relaxed font-inter">
                {config.presentation.description}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {config.presentation.items.map((item, i) => (
                  <span key={i} className="border border-gray-300 text-[#010D3E] font-medium text-sm px-5 py-2.5 rounded-full font-inter">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Audit CTA */}
        <ServiceAuditCta config={config.auditCta} />

        {/* Contact Form */}
        <ContactFormSection />

        {/* FAQ */}
        <ServiceFaq items={config.faqItems} />

        {/* Contact */}
        <ContactSection />
      </Layout>
    </>
  );
};

export default ArchipelServiceGeneric;
