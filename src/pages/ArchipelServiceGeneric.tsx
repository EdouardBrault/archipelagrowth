
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
import { useLanguage } from "@/i18n";
import { SERVICE_CONFIGS_IT } from "@/data/serviceConfigsIt";
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
    slug: "geo-services",
    name: "GEO",
    badge: "GEO",
    heroTitle: <>#1 GEO Agency<br />in the US</>,
    heroDescription: "ArchipelaGrowth is the leading GEO agency in the US with 50+ clients served daily.",
    seoTitle: "GEO Services | ArchipelaGrowth - #1 GEO Agency in the US",
    seoDescription: "Discover our GEO services: audit, optimization and content strategy to rank #1 on ChatGPT, Perplexity and AI engines.",
    canonicalPath: "/geo-services",
    heroScreenshots: [featureScreenshot1, featureScreenshot2, featureScreenshotGeo3],
    showLlmSection: true,
    features: [
      {
        number: "1",
        title: "Visibility Audit",
        subtitle: "Want to know your visibility on the leading LLMs on the market?",
        description: "At ArchipelaGrowth, we offer GEO visibility audits. We jointly identify high-intent, high-volume prompts. Then we analyze the most mentioned brands and provide a ranking by topic, prompt, country, and LLM.",
        anchorId: "visibility-audit",
      },
      {
        number: "2",
        title: "Source Identification",
        subtitle: "Want to know which citation sources influence your prompts?",
        description: "At ArchipelaGrowth, we use tools that help us understand which citation sources truly influence the prompts that matter to you. This analysis guides the direction of our content strategy.",
        anchorId: "source-identification",
      },
      {
        number: "3",
        title: "Content Publishing",
        subtitle: "Need support producing GEO-friendly content?",
        description: "Having a 6-month roadmap is a great start, but executing it methodically is even better. At ArchipelaGrowth, we handle content creation and publication, whether on your site or on influential social citations. Our support includes a shared dashboard for clear visibility on the number of actions executed.",
        image: featureScreenshotGeo3,
        anchorId: "content-publishing",
      },
    ],
    featuresIntro: {
      badge: "#1 GEO Agency in the US",
      title: "Why ArchipelaGrowth?",
      description: "Our mission? To push brands to the top of rankings across all LLMs in record time. Discover our methodology!",
      ctaLabel: "Your GEO Score",
    },
  },
  "google-ads": {
    slug: "google-ads-services",
    name: "Google Ads",
    badge: "Google Ads",
    heroTitle: <>#1 Google Ads Agency<br />in the US</>,
    heroDescription: "ArchipelaGrowth is an expert Google Ads agency. 50+ clients served daily to scale their acquisition and maximize their ROAS.",
    heroCtaSecondary: "Free Google Ads Audit",
    seoTitle: "Google Ads Services | ArchipelaGrowth - Google Ads Agency",
    seoDescription: "Discover our Google Ads services: audit, optimization and advertising strategy to maximize your ROI.",
    canonicalPath: "/google-ads-services",
    heroScreenshots: [featureScreenshotGads1, featureScreenshotGads2, featureScreenshotGads3],
    showPresentation: true,
    features: [
      {
        number: "1",
        title: "Audit",
        subtitle: "A complete, strategic audit of your Google Ads account",
        description: "We perform a complete strategic audit of your Google Ads account, analyzing campaign structure, targeting, keywords, ads, audiences, and tracking to quickly identify priority optimizations, budget leaks, and immediately actionable growth levers.",
        image: featureScreenshotGads1,
      },
      {
        number: "2",
        title: "Optimization",
        subtitle: "An active optimization phase for your account",
        description: "Next, we enter an active optimization phase for your Google Ads account by reworking campaign structure, targeting, keywords, ads, audiences, and tracking to rapidly improve performance and activate new growth levers.",
        image: featureScreenshotGads2,
      },
      {
        number: "3",
        title: "Growth",
        subtitle: "Advanced tracking and business-oriented management",
        description: "We implement advanced tracking via GA4, Google Tag Manager and enhanced conversions to ensure reliable data and drive your campaigns based on real business indicators, then optimize bidding strategy based on your target ROAS, build clear performance-oriented reporting, and manage budget scaling in a controlled manner to accelerate growth while preserving profitability.",
        image: featureScreenshotGads3,
      },
    ],
    featuresIntro: {
      badge: "Activate Your Online Growth",
      title: "Features",
      description: "Want to know the real performance of your Google Ads campaigns? At ArchipelaGrowth, we conduct complete Google Ads audits and deliver an actionable roadmap to reduce your CPA, improve your Quality Score, optimize your ROAS, and generate more leads or sales.",
      ctaLabel: "Request a Google Ads Audit",
    },
    presentation: {
      badge: "About Us",
      title: "We manage your visibility on Google",
      description: "Running Google Ads is one thing. Managing it with a ROI and scaling mindset is another. Our consultants specialize in:",
      items: ["Google Search", "Performance Max", "Display & YouTube Ads", "Remarketing", "Advanced Tracking & Data"],
    },
    auditCta: {
      badge: "Test Yourself",
      title: "Test the performance of your Google Ads account",
      subtitle: "Want to know if your campaigns are truly optimized?",
      description: "We analyze your account for free and provide: blocking errors, quick optimizations, and scaling levers.",
      ctaLabel: "Request a Google Ads Audit",
    },
    scoreConfig: {
      cardTitle: <>Test<br />your<br />Google Ads<br />score</>,
      formTitle: "Test your Google Ads score!",
      formDescription: "Want to know if your campaigns are truly optimized? We analyze your account for free.",
      auditLabel: "Google Ads Audit",
    },
    faqItems: [
      { question: "What is the best Google Ads agency in the US?", answer: "There is no official ranking. The best agency is the one that generates measurable return on investment. Naturally, we believe ArchipelaGrowth is among the top references when it comes to performance and profitability on Google Ads." },
      { question: "Why work with a Google Ads agency?", answer: "Google Ads is a high-intent acquisition channel. A specialized agency optimizes campaign structure, targeting, bidding, and tracking to maximize ROAS and minimize budget waste." },
      { question: "Is ArchipelaGrowth specialized in Google Ads?", answer: "Yes. We support our clients with a performance-driven, data-oriented approach centered on real profitability, not just volume." },
      { question: "What is ArchipelaGrowth's methodology for Google Ads?", answer: "We first analyze potential and target profitability, then structure or restructure campaigns, deploy reliable tracking, and continuously optimize bidding, keywords, and ads to improve ROAS." },
      { question: "How long does it take to see results?", answer: "Initial optimizations can generate quick wins, sometimes within weeks. The ramp-up depends on the market, budget, and account history." },
      { question: "Which industries do you serve for Google Ads?", answer: "We work with e-commerce, B2B, services, and highly competitive sectors. Wherever there's active demand on Google, the channel is relevant." },
      { question: "How does ArchipelaGrowth differentiate from other agencies?", answer: "We primarily manage profitability. Our approach is structured, data-driven, and designed to scale budgets only when performance is under control." },
      { question: "What are your Google Ads fees?", answer: "They depend on objectives, media budget, and the level of support expected. Each strategy is custom-built." },
    ],
  },
  "linkedin-ads": {
    slug: "linkedin-ads-services",
    name: "LinkedIn Ads",
    badge: "LinkedIn Ads",
    heroTitle: <>#1 LinkedIn Ads Agency<br />in the US</>,
    heroDescription: "ArchipelaGrowth supports you on LinkedIn Ads to generate qualified B2B leads every day.",
    heroCtaSecondary: "Your LinkedIn Ads Score",
    seoTitle: "LinkedIn Ads Services | ArchipelaGrowth - LinkedIn Ads Agency",
    seoDescription: "Discover our LinkedIn Ads services: targeting, optimization and B2B advertising strategy to maximize your leads.",
    canonicalPath: "/linkedin-ads-services",
    heroScreenshots: [featureScreenshotLk1, featureScreenshotLk2, featureScreenshotLk3],
    showPresentation: true,
    features: [
      {
        number: "1",
        title: "Audit & Strategic Diagnosis",
        subtitle: "Audit & Strategic Diagnosis",
        description: "Complete analysis of your account: targeting, audiences, ad formats, messaging, landing pages, and tracking.",
        image: featureScreenshotLk1,
      },
      {
        number: "2",
        title: "Campaign Structuring & Optimization",
        subtitle: "Campaign Structuring & Optimization",
        description: "Setup or overhaul of your campaigns: Lead Gen Forms, Sponsored Content, Conversation Ads, ABM Campaigns. Goal: generate qualified leads at controlled cost.",
        image: featureScreenshotLk2,
      },
      {
        number: "3",
        title: "Tracking & ROI Management",
        subtitle: "Tracking & ROI Management",
        description: "Installation of reliable tracking (Insight Tag, CRM sync, offline conversions) to measure: real CPL, generated SQLs, cost per opportunity, and B2B ROAS.",
        image: featureScreenshotLk3,
      },
    ],
    featuresIntro: {
      badge: "Activate Your Online Growth",
      title: "Features",
      description: "Do you truly know the performance of your LinkedIn Ads campaigns? At ArchipelaGrowth, we conduct complete LinkedIn Ads audits and deliver an actionable roadmap to reduce your CPL, improve lead quality, optimize your targeting (ICP, ABM, retargeting), and maximize your ROI.",
      ctaLabel: "Request a LinkedIn Ads Audit",
    },
    presentation: {
      badge: "About Us",
      title: "We manage your B2B acquisition on LinkedIn",
      description: "LinkedIn Ads is a powerful channel to reach decision-makers. But you need to master ICP definition, advanced targeting, and marketing & sales alignment. Our consultants specialize in B2B acquisition and LinkedIn Ads scaling.",
      items: ["ICP Definition", "Advanced Targeting (title, seniority, industry)", "ABM Strategies", "Marketing & Sales Alignment"],
    },
    auditCta: {
      badge: "Test Yourself",
      title: "Test the performance of your LinkedIn Ads campaigns",
      subtitle: "Want to know if your account is truly optimized?",
      description: "We analyze for free: your campaign structure, targeting, ad copy, and tracking.",
      ctaLabel: "Request a LinkedIn Ads Audit",
    },
    scoreConfig: {
      cardTitle: <>Test<br />your<br />LinkedIn Ads<br />score</>,
      formTitle: "Test your LinkedIn Ads score!",
      formDescription: "Want to know if your campaigns are truly optimized? We analyze your account for free.",
      auditLabel: "LinkedIn Ads Audit",
    },
    faqItems: [
      { question: "What is the best LinkedIn Ads agency in the US?", answer: "There is no official ranking. The best agency is one that turns LinkedIn into a truly profitable B2B acquisition channel. We position ArchipelaGrowth as an expert in LinkedIn Ads performance." },
      { question: "Why work with a LinkedIn Ads agency?", answer: "LinkedIn is a powerful but demanding channel. A specialized agency optimizes targeting, audiences, messaging, and formats to generate qualified leads at controlled cost." },
      { question: "Is ArchipelaGrowth specialized in LinkedIn Ads?", answer: "Yes. We support B2B companies with an approach focused on qualified lead generation and business impact." },
      { question: "What is your methodology for LinkedIn Ads?", answer: "We define priority targets, structure campaigns by strategic segment, test different messaging angles, and continuously optimize cost per lead and opportunity quality." },
      { question: "How quickly can we see results?", answer: "First leads can arrive quickly, but optimizing cost and quality typically requires several testing cycles." },
      { question: "Which industries do you serve on LinkedIn?", answer: "Primarily B2B companies, tech, consulting firms, SaaS, and high-value services." },
      { question: "How do you differentiate on LinkedIn Ads?", answer: "We don't just seek lead volume — we seek leads that are truly actionable for your sales teams." },
      { question: "What are your fees?", answer: "They vary based on targeting complexity, campaign volume, and lead generation objectives." },
    ],
  },
  "meta-ads": {
    slug: "meta-ads-services",
    name: "Meta Ads",
    badge: "Meta Ads",
    heroTitle: <>#1 Meta Ads Agency<br />in the US</>,
    heroDescription: "ArchipelaGrowth supports you on Meta Ads (Facebook & Instagram) to maximize your visibility and conversions. 50+ clients served daily to scale their acquisition and improve their ROAS.",
    heroCtaSecondary: "Free Meta Ads Audit",
    heroScreenshots: [featureScreenshotMeta1, featureScreenshotMeta2, featureScreenshotMeta3],
    seoTitle: "Meta Ads Services | ArchipelaGrowth - Meta Ads Agency",
    seoDescription: "Discover our Meta Ads services: Facebook & Instagram advertising strategy to boost your performance.",
    canonicalPath: "/meta-ads-services",
    showPresentation: true,
    features: [
      {
        number: "1",
        title: "Audit & Strategic Analysis",
        subtitle: "Audit & Strategic Analysis",
        description: "Complete analysis of: Business Manager structure, campaigns & ad sets, targeting & audiences, creatives & messaging, tracking & Pixel. Goal: identify immediate optimizations.",
        image: featureScreenshotMeta1,
      },
      {
        number: "2",
        title: "Optimization & Scaling",
        subtitle: "Optimization & Scaling",
        description: "We structure and optimize your campaigns: Acquisition, Retargeting, Lookalike, Advantage+, Product Catalogs. To scale your performance while maintaining profitability.",
        image: featureScreenshotMeta2,
      },
      {
        number: "3",
        title: "Tracking & ROI Management",
        subtitle: "Tracking & ROI Management",
        description: "Setup and verification: Meta Pixel, Conversions API, server-side tracking, priority event tracking. To drive your campaigns with reliable, actionable data.",
        image: featureScreenshotMeta3,
      },
    ],
    featuresIntro: {
      badge: "Activate Your Online Growth",
      title: "Features",
      description: "Do you truly know the performance of your Meta Ads campaigns? At ArchipelaGrowth, we conduct complete audits of your Facebook & Instagram Ads accounts and deliver an actionable roadmap to reduce your CPA, improve your ROAS, optimize your audiences, and maximize your conversions.",
      ctaLabel: "Request a Meta Ads Audit",
    },
    presentation: {
      badge: "About Us",
      title: "We drive your growth on Facebook & Instagram",
      description: "Meta Ads is a powerful lever to generate e-commerce sales, produce qualified leads, build brand awareness, and retarget your audiences. Our consultants specialize in paid media acquisition and Meta Ads account scaling.",
      items: ["E-commerce Sales", "Qualified Leads", "Brand Awareness", "Audience Retargeting"],
    },
    auditCta: {
      badge: "Test Yourself",
      title: "Test the performance of your Meta Ads account",
      subtitle: "Want to know if your campaigns are truly optimized?",
      description: "We analyze for free: your campaigns, audiences, creatives, and tracking. You'll leave with concrete recommendations.",
      ctaLabel: "Request a Meta Ads Audit",
    },
    scoreConfig: {
      cardTitle: <>Test<br />your<br />Meta Ads<br />score</>,
      formTitle: "Test your Meta Ads score!",
      formDescription: "Want to know if your campaigns are truly optimized? We analyze your account for free.",
      auditLabel: "Meta Ads Audit",
    },
    faqItems: [
      { question: "What is the best Meta Ads agency in the US?", answer: "There is no official ranking. The best agency is one that turns Meta into a profitable, scalable acquisition channel. That's precisely our positioning at ArchipelaGrowth." },
      { question: "Why work with a Meta Ads agency?", answer: "Meta Ads relies on data, creative, and rapid iteration. A specialized agency optimizes tracking, audiences, and creatives to improve acquisition cost and scale effectively." },
      { question: "Is ArchipelaGrowth specialized in Meta Ads?", answer: "Yes. We support e-commerce brands and lead generation companies with a performance and profitability-driven approach." },
      { question: "What is your methodology for Meta Ads?", answer: "We set up reliable tracking, structure campaigns by objective, continuously test new creative angles, and drive optimization on acquisition cost and ROAS." },
      { question: "When can we expect results?", answer: "Meta can deliver signals quickly. The testing phase is essential to identify the creatives and audiences capable of scaling." },
      { question: "Which industries do you serve on Meta?", answer: "Primarily e-commerce, info products, services, and growth-stage brands." },
      { question: "How do you differentiate on Meta Ads?", answer: "We combine media strategy and creative thinking. Budget scaling is only triggered when profitability is validated." },
      { question: "What are your fees?", answer: "They depend on media budget, objectives, and the depth of support desired. Each collaboration is custom-built." },
    ],
  },
  seo: {
    slug: "seo-services",
    name: "SEO",
    badge: "SEO",
    heroTitle: <>#1 SEO Agency<br />in the US</>,
    heroDescription: "ArchipelaGrowth supports you in SEO to maximize your visibility on Google and generate lasting qualified traffic. 50+ clients served daily to grow organically and dominate their market.",
    heroCtaSecondary: "Free SEO Audit",
    heroScreenshots: [featureScreenshotSeo1, featureScreenshotSeo2, featureScreenshotSeo3],
    seoTitle: "SEO Services | ArchipelaGrowth - SEO Agency",
    seoDescription: "Discover our SEO services: technical audit, on-page optimization and content strategy to rank #1 on Google.",
    canonicalPath: "/seo-services",
    showPresentation: true,
    features: [
      {
        number: "1",
        title: "SEO Audit & Diagnosis",
        subtitle: "SEO Audit & Diagnosis",
        description: "Complete analysis of: technical SEO (indexation, speed, structure), on-page SEO (content, tags, internal linking), off-page SEO (backlinks, authority), competitive analysis. Goal: identify blockers and growth opportunities.",
        image: featureScreenshotSeo1,
      },
      {
        number: "2",
        title: "Content Strategy & Production",
        subtitle: "Content Strategy & Production",
        description: "Strategy definition based on: high-potential keyword research, search intent analysis, strategic page structuring, SEO-optimized content creation. To capture qualified, lasting traffic.",
        image: featureScreenshotSeo2,
      },
      {
        number: "3",
        title: "Link Building & Authority",
        subtitle: "Link Building & Authority",
        description: "Deployment of a quality backlink strategy to: strengthen your authority, improve your rankings, and secure your SEO growth.",
        image: featureScreenshotSeo3,
      },
    ],
    featuresIntro: {
      badge: "Activate Your Online Growth",
      title: "Features",
      description: "Do you truly know your site's SEO performance? At ArchipelaGrowth, we conduct complete SEO audits and deliver an actionable roadmap to improve your Google rankings, increase qualified traffic, optimize your conversion rate, and generate more leads or sales.",
      ctaLabel: "Request an SEO Audit",
    },
    presentation: {
      badge: "About Us",
      title: "We drive your organic growth on Google",
      description: "SEO is a powerful, lasting lever to generate B2B leads, grow e-commerce, reduce paid dependency, and build strong brand authority. Our consultants combine technical, editorial, and strategic expertise to deliver measurable results.",
      items: ["B2B Leads", "E-commerce", "Reduced Paid Dependency", "Brand Authority"],
    },
    auditCta: {
      badge: "Test Yourself",
      title: "Test your site's SEO performance",
      subtitle: "Want to know if your site is truly optimized?",
      description: "We analyze for free: your current rankings, technical performance, keyword opportunities, and content strategy.",
      ctaLabel: "Request an SEO Audit",
    },
    scoreConfig: {
      cardTitle: <>Test<br />your<br />SEO<br />score</>,
      formTitle: "Test your SEO score!",
      formDescription: "Want to know if your site is truly optimized? We analyze your site for free.",
      auditLabel: "SEO Audit",
    },
    faqItems: [
      { question: "What is the best SEO agency in the US?", answer: "There is no official ranking. The best SEO agency is one that generates lasting growth in qualified traffic and revenue. At ArchipelaGrowth, we position ourselves as a performance and business impact partner." },
      { question: "Why work with an SEO agency?", answer: "SEO is a long-term strategic lever. A specialized agency identifies high-potential opportunities, optimizes site structure, content, and technical aspects to capture qualified, lasting demand." },
      { question: "Is ArchipelaGrowth specialized in SEO?", answer: "Yes. We support our clients with a structured, data-driven approach focused on business-intent queries." },
      { question: "What is your SEO methodology?", answer: "We identify strategic queries, analyze competition, optimize site structure and content, then deploy an editorial and technical strategy to improve visibility and conversions." },
      { question: "How quickly can we see results?", answer: "SEO is a progressive lever. First signals can appear within weeks, but solid growth is built over several months." },
      { question: "Which industries do you serve in SEO?", answer: "We work with B2B, e-commerce, tech, and services. Wherever there's active demand on Google, SEO becomes a powerful lever." },
      { question: "How do you differentiate in SEO?", answer: "We don't just work on traffic — we work on profitable traffic. Our approach is focused on search intent and business impact." },
      { question: "What are your SEO fees?", answer: "They depend on scope, content volume to produce, and the level of technical support needed." },
    ],
  },
  "landing-page": {
    slug: "landing-page-services",
    name: "Landing Page",
    badge: "Landing Page",
    heroTitle: <>Agency Specialized in<br />Landing Pages</>,
    heroDescription: "Pages designed to convert your traffic into leads and revenue. ArchipelaGrowth supports 50+ companies in creating, optimizing, and scaling performance-oriented landing pages. We've developed advanced expertise on Lovable to design, test, and rapidly deploy high-converting pages.",
    heroCtaSecondary: "Free Landing Page Audit",
    seoTitle: "Landing Page Creation | ArchipelaGrowth - Landing Page Agency",
    seoDescription: "Discover our landing page services optimized for conversion and performance.",
    canonicalPath: "/landing-page-services",
    showPresentation: true,
    heroScreenshots: [featureScreenshotLp1, featureScreenshotLp2, featureScreenshotLp3],
    features: [
      {
        number: "1",
        title: "Conversion Audit & Diagnosis",
        subtitle: "Conversion Audit & Diagnosis",
        description: "Complete analysis of: information structure and hierarchy, copywriting & promise, call-to-action, user journey, mobile performance, tracking & data. Goal: precisely identify what's blocking conversion.",
        image: featureScreenshotLp1,
      },
      {
        number: "2",
        title: "Creation & Redesign on Lovable",
        subtitle: "Creation & Redesign on Lovable",
        description: "We design high-performing landing pages directly on Lovable: conversion-optimized structure, ROI-focused copywriting, rapid integration, ready-to-use tracking, pages built for testing. Ideal for scaling your Google Ads, Meta Ads, or LinkedIn Ads campaigns.",
        image: featureScreenshotLp2,
      },
      {
        number: "3",
        title: "A/B Testing & Continuous Optimization",
        subtitle: "A/B Testing & Continuous Optimization",
        description: "Performance doesn't stop at launch. We continuously test and optimize: headlines, hooks, key sections, social proof, CTAs. To progressively improve your performance.",
        image: featureScreenshotLp3,
      },
    ],
    featuresIntro: {
      badge: "Activate Your Online Growth",
      title: "Our Expertise",
      description: "Is your landing page truly converting at its full potential? We conduct complete landing page audits (Lovable or other stack) and deliver a clear roadmap to increase your conversion rate, reduce your cost per lead, improve your value proposition, remove UX friction, and maximize your traffic ROI.",
      ctaLabel: "Request a Landing Page Audit",
    },
    presentation: {
      badge: "Our Approach",
      title: "Traffic isn't enough. Conversion makes the difference.",
      description: "We create landing pages built to perform, not just to look good. Our strength: Paid Media expertise, CRO mastery, Lovable expertise, and data-driven management.",
      items: ["Paid Media Expertise", "CRO Mastery", "Lovable Expertise", "Data-Driven Management"],
    },
    auditCta: {
      badge: "Test Your Page",
      title: "Get a free audit of your landing page",
      subtitle: "We analyze your conversion rate, friction points, messaging, structure, and tracking.",
      description: "And you'll leave with concrete recommendations.",
      ctaLabel: "Request a Landing Page Audit",
    },
    scoreConfig: {
      cardTitle: <>Test<br />your<br />Landing<br />Page</>,
      formTitle: "Test your landing page!",
      formDescription: "Want to know if your page converts at its full potential? We analyze your landing page for free.",
      auditLabel: "Landing Page Audit",
    },
    faqItems: [
      { question: "Why hire an agency to create or optimize your landing pages?", answer: "A high-performing landing page makes the difference between traffic and conversions. A specialized agency aligns messaging, structure, and trust elements to maximize conversion rate." },
      { question: "Does ArchipelaGrowth work on landing pages?", answer: "Yes. We design and optimize conversion-oriented landing pages built to support your Google Ads, Meta Ads, LinkedIn Ads, or SEO campaigns." },
      { question: "What is your methodology for landing pages?", answer: "We analyze user intent, clarify the value proposition, structure the message, work on block hierarchy, and optimize key elements like social proof, CTAs, and potential friction points." },
      { question: "How do you measure landing page performance?", answer: "We track conversion rates, cost per lead or acquisition, and engagement indicators to continuously optimize." },
      { question: "How quickly can performance improve?", answer: "Strategic adjustments can generate quick wins. The best results come from iterative, data-driven work." },
      { question: "Which industries do you serve?", answer: "We work with e-commerce, B2B, services, and tech. Any company investing in acquisition benefits from an optimized landing page." },
      { question: "How do you differentiate?", answer: "We design performance-oriented landing pages, connected to data and built to maximize campaign profitability." },
      { question: "What are your rates?", answer: "They vary based on the level of creation or optimization needed and the targeted conversion objectives. Each project is custom-sized." },
    ],
  },
};

interface Props {
  serviceKey: string;
}

const ArchipelServiceGeneric = ({ serviceKey }: Props) => {
  const { language, localePath } = useLanguage();
  const baseConfig = SERVICE_CONFIGS[serviceKey];
  const itOverride = language === "it" ? SERVICE_CONFIGS_IT[serviceKey] : undefined;
  // Merge Italian overrides, preserving images from base features
  const config = itOverride
    ? {
        ...baseConfig,
        ...itOverride,
        features: itOverride.features
          ? itOverride.features.map((f, i) => ({
              ...baseConfig.features?.[i],
              ...f,
              image: f.image || baseConfig.features?.[i]?.image,
            }))
          : baseConfig.features,
      } as ServiceConfig
    : baseConfig;
  const contactPath = localePath("/contact#contact-form");
  const ctaLabel = language === "it" ? "Contattaci" : "Contact Us";
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
                  <Link to={contactPath}>{ctaLabel}</Link>
                </Button>
                <Link
                   to="/contact#contact-form"
                  className="text-[#0043F1] font-normal font-inter flex items-center gap-1.5 hover:gap-2.5 transition-all"
                >
                  {config.heroCtaSecondary || `Your ${config.name} Score`}
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
                {config.featuresIntro?.badge || "Activate Your Online Growth"}
              </span>
            </div>
            <h2 className="font-jakarta text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#000000] to-[#001354] bg-clip-text text-transparent">
                {config.featuresIntro?.title || "Features"}
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
              <Link to="/contact#contact-form">{config.featuresIntro?.ctaLabel || `Your ${config.name} Score`}</Link>
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
                  {config.presentation.badge || "About Us"}
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
