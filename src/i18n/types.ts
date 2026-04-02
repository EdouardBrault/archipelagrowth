export type Language = "en" | "it";

export interface Translations {
  nav: {
    home: string;
    about: string;
    services: string;
    references: string;
    blog: string;
    contactUs: string;
    geo: string;
    googleAds: string;
    linkedinAds: string;
    metaAds: string;
    seo: string;
    landingPages: string;
  };
  footer: {
    description: string;
    ourServices: string;
    resources: string;
    contact: string;
    legal: string;
    aboutUs: string;
    contactForm: string;
    ourGeoTeam: string;
    geoMethodology: string;
    clientTestimonials: string;
    legalNotice: string;
    termsOfUse: string;
    privacyPolicy: string;
  };
  hero: {
    welcome: string;
    title: string;
    description: string;
    cta: string;
    ctaSecondary: string;
  };
  boostProductivity: {
    badge: string;
    title: string;
    description: string;
  };
  geoPillars: {
    badge: string;
    title: string;
    description: string;
    cta: string;
    technical: { title: string; description: string };
    content: { title: string; description: string };
    social: { title: string; description: string };
    learnMore: string;
  };
  notreEquipe: {
    badge: string;
    title: string;
    description: string;
    cta: string;
  };
  nosChiffres: {
    badge: string;
    title: string;
    description: string;
    clients: string;
    satisfaction: string;
    roas: string;
  };
  methodologie: {
    badge: string;
    title: string;
    description: string;
    audit: string;
    strategy: string;
    deployment: string;
  };
  testezVousGeo: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    bubble1: string;
    bubble2: string;
  };
  testezVousPaid: {
    badge: string;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    bubble1: string;
    bubble2: string;
  };
  paidSection: {
    badge: string;
    title: string;
    description: string;
  };
  partenariats: {
    badge: string;
    cta: string;
    partners: Array<{
      name: string;
      description: string;
      detail: string;
    }>;
  };
  latestArticles: {
    badge: string;
    title: string;
    description: string;
    readArticle: string;
    viewBlog: string;
  };
  homeFaq: {
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  contactSection: {
    title: string;
    description: string;
    cta: string;
    followSocial: string;
    writeTo: string;
    contactVerified: string;
    fillForm: string;
    antiSpam: string;
    showContact: string;
    verifying: string;
  };
  contactForm: {
    cardTitle: string;
    formTitle: string;
    formDescription: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    company: string;
    requestAbout: string;
    message: string;
    send: string;
    sending: string;
    successTitle: string;
    successDescription: string;
    errorTitle: string;
    errorDescription: string;
    requestTypes: string[];
  };
  logoCarousel: {
    trustedBy: string;
  };
  about: {
    seoTitle: string;
    seoDescription: string;
    welcome: string;
    title: string;
    description: string;
    cta: string;
    ctaSecondary: string;
    teamBadge: string;
    teamTitle: string;
    teamDescription: string;
    valuesBadge: string;
    valuesTitle: string;
    valuesDescription: string;
    letsTalk: string;
    nextMilestone: string;
    timeline: Array<{
      title: string;
      description: string;
      label: string;
    }>;
    values: Array<{
      title: string;
      description: string;
    }>;
    teamMembers: Array<{
      name: string;
      role: string;
    }>;
  };
  contactPage: {
    seoTitle: string;
    seoDescription: string;
    welcome: string;
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  references: {
    badge: string;
    title: string;
    description: string;
    channels: string;
    industries: string;
    all: string;
    viewCaseStudy: string;
    clients: Array<{
      title: string;
      description: string;
    }>;
  };
  index: {
    seoTitle: string;
    seoDescription: string;
  };
}
