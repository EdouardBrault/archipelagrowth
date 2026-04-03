// English translations for client reference detail pages
// Keys match the slug field from ALL_CLIENTS

interface ClientDataEn {
  description: string;
  caseTitle: string;
  intro: string;
  stats: { value: string; label: string }[];
  projectContent: string;
  challengeContent: string;
  objectivesContent: string;
}

export const CLIENT_REFERENCES_EN: Record<string, ClientDataEn> = {
  "archipel-keyrus": {
    description: "Structuring multi-country acquisition with Paid & GEO",
    caseTitle: "Structuring Keyrus's multi-country acquisition with a Paid & GEO strategy",
    intro: "At Archipel, we support international companies in structuring and optimizing their digital acquisition. Since January 2024, we've been working with Keyrus, a major consulting firm (+2,000 employees), to drive and scale their acquisition strategy across Europe.",
    stats: [
      { value: "+1,000", label: "Leads generated" },
      { value: "6 countries", label: "France, UK, Portugal, Sweden, Switzerland, Spain" },
      { value: "2.5 years", label: "Of continuous collaboration" },
    ],
    projectContent: "Supporting Keyrus in structuring and deploying a multi-country acquisition strategy.\nActivation of Google Ads, LinkedIn Ads, asset creation, landing page optimization, and deployment of a GEO strategy across 6 European markets.",
    challengeContent: "Operating in a highly competitive consulting sector, with long B2B cycles and high qualification challenges.\nThe goal was to harmonize campaigns across multiple countries while maintaining consistent performance.",
    objectivesContent: "Generate qualified leads at European scale, structure a coherent and scalable Paid strategy, and optimize conversion paths to maximize long-term performance.",
  },
  "archipel-billet-reduc": {
    description: "Optimizing e-commerce acquisition through Paid Ads",
    caseTitle: "Optimizing and structuring Billet Réduc's e-commerce acquisition",
    intro: "Billet Réduc' is a major e-commerce player in discounted ticketing. Archipel supported the optimization of their acquisition strategy via Meta Ads and Google Ads to maximize performance on the French market.",
    stats: [
      { value: "Meta & Google", label: "Paid Ads Strategy" },
      { value: "E-commerce", label: "Industry" },
      { value: "France", label: "Target market" },
    ],
    projectContent: "Optimizing and structuring e-commerce acquisition through Meta Ads and Google Ads.\nCreative asset creation, tracking improvement, and campaign management to maximize performance on the French market.",
    challengeContent: "Operating in a highly competitive and seasonal environment, where advertising profitability and tracking accuracy are critical to overall performance.",
    objectivesContent: "Structure a high-performing Paid strategy, improve data readability, strengthen tracking reliability, and optimize campaigns to boost e-commerce profitability.",
  },
  "archipel-sodexo": {
    description: "Structuring B2B acquisition through Paid Ads",
    caseTitle: "Structuring Circles by Sodexo's B2B acquisition through Paid Ads",
    intro: "Circles by Sodexo supports companies with employee services. For 6 months, Archipel managed their digital acquisition strategy in France to generate qualified B2B leads.",
    stats: [
      { value: "70+", label: "Leads generated" },
      { value: "LinkedIn & Google Ads", label: "B2B Paid Strategy" },
      { value: "6 months", label: "Collaboration in France" },
    ],
    projectContent: "Deployment and management of LinkedIn Ads and Google Ads campaigns, creative asset creation, and landing page optimization to maximize qualified lead generation.",
    challengeContent: "Generating qualified B2B leads in a competitive environment with long decision-making cycles and high targeting requirements.",
    objectivesContent: "Structure a high-performing Paid acquisition, optimize conversion paths, and generate a consistent volume of qualified leads.",
  },
  "archipel-cenareo": {
    description: "Scaling lead generation through Paid & GEO",
    caseTitle: "Scaling Cenareo's lead generation through Paid & GEO",
    intro: "Cenareo, a SaaS company specializing in digital signage, helps businesses and retail players with screen-based communication. Archipel structured their acquisition for 28 months in France.",
    stats: [
      { value: "+1,700", label: "Leads generated" },
      { value: "Paid Ads & GEO", label: "Acquisition strategy" },
      { value: "28 months", label: "Continuous collaboration" },
    ],
    projectContent: "Deployment of a Paid Ads strategy combined with a GEO approach to generate a high volume of qualified leads on the French market.",
    challengeContent: "Accelerating lead generation in a competitive MarTech market while maintaining sustainable long-term performance.",
    objectivesContent: "Increase the volume of qualified leads, structure a scalable acquisition, and strengthen strategic visibility through GEO.",
  },
  "archipel-spacefill": {
    description: "Strengthening international visibility through GEO",
    caseTitle: "Strengthening Spacefill's international visibility through GEO",
    intro: "Spacefill is a SaaS platform connecting businesses to a network of logistics warehouses. Archipel supported their GEO strategy in France and the United States.",
    stats: [
      { value: "GEO Strategy", label: "Strategic visibility" },
      { value: "France & USA", label: "International deployment" },
      { value: "3 months", label: "Targeted mission" },
    ],
    projectContent: "Implementation of a GEO strategy to strengthen Spacefill's visibility on its priority markets.",
    challengeContent: "Ranking on strategic queries in a competitive LogisticsTech sector across two different markets.",
    objectivesContent: "Increase strategic organic presence, strengthen brand authority, and support international expansion.",
  },
  "archipel-freeda": {
    description: "Developing international visibility through GEO",
    caseTitle: "Developing Freeda's international visibility through GEO",
    intro: "Freeda is a SaaS platform specializing in regulatory compliance for construction projects. Archipel has been supporting them since January 2025 on their GEO strategy in France and the United States.",
    stats: [
      { value: "GEO Strategy", label: "Organic acquisition" },
      { value: "France & USA", label: "Priority markets" },
      { value: "Since 2025", label: "Ongoing collaboration" },
    ],
    projectContent: "Deployment of a GEO strategy to strengthen Freeda's visibility on strategic queries related to compliance and construction.",
    challengeContent: "Positioning an early-stage startup on highly competitive technical and regulatory topics.",
    objectivesContent: "Increase qualified visibility, support international growth, and establish a lasting presence on generative search engines.",
  },
  "archipel-phantombuster": {
    description: "Accelerating international acquisition",
    caseTitle: "Accelerating PhantomBuster's international acquisition",
    intro: "PhantomBuster, a B2B SaaS specializing in sales automation, entrusted Archipel with their Paid Ads and GEO strategy to support international growth.",
    stats: [
      { value: "Paid Ads & GEO", label: "B2B Acquisition" },
      { value: "EU & USA", label: "International focus" },
      { value: "Since 2025", label: "Ongoing collaboration" },
    ],
    projectContent: "Managing Paid Social campaigns and deploying a GEO strategy to strengthen international lead generation.",
    challengeContent: "Maintaining rapid growth in highly competitive B2B markets while optimizing advertising profitability.",
    objectivesContent: "Accelerate qualified lead generation, support international expansion, and structure a high-performing acquisition.",
  },
  "archipel-hyperline": {
    description: "Structuring US visibility through GEO",
    caseTitle: "Becoming #1 on ChatGPT as fast as possible",
    intro: "Hyperline is a French fintech offering an automated SaaS platform for billing, pricing, and revenue management for technology companies. It simplifies quote, subscription, payment, and analytics management. They were our first GEO client, since summer 2025.",
    stats: [
      { value: "17", label: "Leads generated" },
      { value: "12", label: "MQLs generated" },
      { value: "#1", label: "On ChatGPT in the USA" },
    ],
    projectContent: "Launching and structuring our first GEO engagement for Hyperline, a French fintech specializing in billing and revenue management. The goal was to lay the foundations of a clear strategy on an emerging topic, building methodological and operational foundations.",
    challengeContent: "GEO was a new topic, still in its early stages in summer 2025, with little hindsight and many unknowns. We had to deeply understand the product, its business challenges, and GEO mechanics to structure a relevant approach in a still-immature context.",
    objectivesContent: "Launch and structure our first GEO engagement for Hyperline, a French fintech specializing in billing and revenue management. The goal was to lay the foundations of a clear strategy on an emerging topic, building methodological and operational foundations.",
  },
  "archipel-modeo": {
    description: "Strengthening digital authority through GEO",
    caseTitle: "Creating a new lead source",
    intro: "Modeo is a Data Engineering expert that designs custom data and AI platforms to help businesses leverage their data. The challenge is to structure performant, ROI-driven architectures aligned with business objectives.",
    stats: [
      { value: "#2", label: "On ChatGPT" },
      { value: "+10", label: "Leads generated" },
      { value: "+2", label: "Clients converted" },
    ],
    projectContent: "Since September 2025, we've been supporting Modeo, a platform focused on conversational AI, to structure and activate a high-performing acquisition strategy. The main challenge was to build a solid foundation to develop their visibility and generate concrete results in a highly competitive market.",
    challengeContent: "The topic was new and required a deep understanding of usage around major AI tools like ChatGPT, Perplexity, Claude, and Copilot. We needed to quickly grasp the product's complexity, identify the right levers, and coordinate actions to produce measurable results.",
    objectivesContent: "Boost Modeo's visibility, generate initial qualified leads, and secure first closings, while structuring a clear and scalable support methodology. Since September 2025, these goals have been achieved, and Modeo has become a strong reference on platforms like ChatGPT, Perplexity, Claude, and Copilot.",
  },
  "archipel-pivot": {
    description: "#1 on ChatGPT in its industry in 2 months",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-softgarden": {
    description: "Reference description",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-factorial": {
    description: "In the top 5 across multiple AI engines",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-playplay": {
    description: "Accelerating international lead generation through Paid Ads",
    caseTitle: "Accelerating PlayPlay's international lead generation through Paid Ads",
    intro: "PlayPlay is a B2B SaaS platform specializing in professional video creation for marketing and communication teams. The company supports thousands of organizations in producing engaging video content, simply and at scale.\n\nSince January, Archipel has been managing their Paid strategy across multiple international markets.",
    stats: [
      { value: "+1,000", label: "Leads generated" },
      { value: "France, NORAM & DACH", label: "International deployment" },
      { value: "Google Ads & LinkedIn Ads", label: "B2B Paid Strategy" },
    ],
    projectContent: "Deployment and management of a multi-market Paid Ads strategy (Google Ads & LinkedIn Ads) to accelerate B2B lead generation across France, North America, and DACH regions.",
    challengeContent: "Maintaining strong lead generation momentum across competitive international markets while adapting messaging, creatives, and targeting to local specificities.",
    objectivesContent: "Accelerate qualified lead generation, structure an internationally scalable Paid strategy, and optimize performance in highly competitive B2B markets.",
  },
  "archipel-mirakl": {
    description: "Developing the omnichannel visibility of a French unicorn in Europe",
    caseTitle: "Developing the omnichannel visibility of a French unicorn in Europe",
    intro: "Mirakl is a SaaS solution enabling companies to launch and manage a marketplace. It helps retailers and brands sell through third-party sellers at scale.\n\nWe supported them on Google & LinkedIn across Europe on all their products.",
    stats: [
      { value: "x3", label: "On the number of leads" },
      { value: "66%", label: "CPLs optimized by 50%" },
      { value: "17", label: "Countries in geographic targeting" },
    ],
    projectContent: "The goal was simple: significantly increase lead volume at equivalent budget.\nWith work on simplifying the structure and a strong emphasis on producing quality landing pages and creatives, we achieved the objective.",
    challengeContent: "The main challenge comes from their unicorn scale: many stakeholders, varied strategic challenges, and numerous decision-makers. Support relies on precise coordination and constant alignment.",
    objectivesContent: "The goal was to implement a smooth support methodology to optimize performance, generate more leads, and better understand a complex product. We achieved this by structuring a clear and effective framework.",
  },
  "archipel-everwin": {
    description: "Strengthening digital acquisition through Paid & GEO",
    caseTitle: "Strengthening Everwin's (ERP) digital acquisition through Paid & GEO",
    intro: "Everwin is a French ERP software publisher specializing in business management for service companies, offering comprehensive planning, management, and professional activity management software.",
    stats: [
      { value: "Paid Ads & GEO", label: "Acquisition strategy" },
      { value: "France", label: "National market" },
      { value: "Since January 2026", label: "Ongoing collaboration" },
    ],
    projectContent: "Deploying a Paid & GEO strategy to strengthen Everwin's visibility and digital acquisition in France, optimizing targeting, creatives, and conversion paths.",
    challengeContent: "Positioning an ERP player on competitive queries while addressing highly specific B2B needs and maximizing visibility on high-value search intents.",
    objectivesContent: "Structure a high-performing acquisition strategy, strengthen performance readability, and boost organic and paid presence on strategic segments.",
  },
  "archipel-dahlia": {
    description: "Accelerating lead generation through SEA",
    caseTitle: "Accelerating Dahlia's lead generation through SEA",
    intro: "Since January 2026, we've been working with Dahlia, a France-based real estate agency, to structure and optimize their SEA strategy to increase the volume of qualified leads.",
    stats: [
      { value: "150", label: "Leads generated" },
      { value: "France", label: "Active market" },
      { value: "3 months", label: "Of collaboration" },
    ],
    projectContent: "Supporting Dahlia in structuring and deploying a Google Ads acquisition strategy.\n\nImplementation of a performance-oriented SEA strategy:\n• Campaign structuring (buying / selling / valuation)\n• Geographic targeting optimization\n• Ad creation and improvement\n• Continuous conversion optimization",
    challengeContent: "Operating in a highly competitive real estate market with high cost-per-click and highly solicited prospects.\n\nThe challenge was to generate qualified leads while controlling acquisition costs in a competitive local context.",
    objectivesContent: "• Generate qualified leads for sales teams\n• Maximize the agency's local visibility\n• Optimize cost per lead\n• Structure a sustainable and scalable SEA strategy",
  },
  "archipel-ca-assure": {
    description: "Structuring digital visibility through GEO",
    caseTitle: "Structuring the digital presence of Ça Assure (insurance broker) through a GEO strategy",
    intro: "Ça Assure is an online insurance broker, a subsidiary of the Kereis group, specializing in borrower insurance and contract comparison, with a simplified and transparent digital approach.",
    stats: [
      { value: "GEO Strategy", label: "Strategic visibility" },
      { value: "France", label: "National market" },
      { value: "Since January 2026", label: "Ongoing collaboration" },
    ],
    projectContent: "Implementing a GEO strategy to strengthen Ça Assure's digital visibility on relevant queries in the insurance space, improve site authority, and support organic acquisition.",
    challengeContent: "Positioning effectively in a competitive and regulated insurance environment in France while improving coverage of high-demand key queries.",
    objectivesContent: "Increase qualified visibility, optimize positioning on strategic queries, and establish the brand's digital presence among target audiences.",
  },
  "archipel-joone": {
    description: "Managing and optimizing a high-budget Google Ads account",
    caseTitle: "Managing and optimizing Joone's Google Ads account during a transition period",
    intro: "Joone is a brand of diapers and baby care products. The brand uses sustainable materials and natural ingredients. Joone also offers flexible subscriptions to make parents' lives easier.",
    stats: [
      { value: "€50K/month", label: "Google Ads budget managed" },
      { value: "4 months", label: "Support period" },
      { value: "3 days", label: "Start time after audit" },
    ],
    projectContent: "Following the departure of the in-house Google Ads account manager, Joone called on Archipel Marketing to cover the transition period while waiting for a replacement. This period lasted 4 months.\n\nManaging a Google Ads account with €50K monthly spend. Mastering Google Ads fundamentals. Challenging the existing tracking, campaign structure, and bidding strategies. Training the future replacement.",
    challengeContent: "A reorganized Google Ads account. A budget spending matrix created to optimize media investment throughout the month. Weekly meetings to track performance and adjust actions.\n\nArchipel Marketing is a turnkey solution covering all aspects of media campaign deployment.",
    objectivesContent: "Responsiveness: 3 days after the audit, we started the support mission.\nFlexibility: we deployed a significant volume of campaigns and creative assets in record time.\nExpertise: each consultant has over 5 years of experience in digital marketing.",
  },
  "archipel-ybrush": {
    description: "Optimizing Google Ads & Meta Ads performance",
    caseTitle: "Optimizing and scaling Y-Brush's Google Ads & Meta Ads performance",
    intro: "Y-Brush is a French company revolutionizing tooth brushing. With Y-Brush, 10 seconds is enough for effective brushing! Thanks to its cutting-edge technology.",
    stats: [
      { value: "x2", label: "Google Ads revenue in 2 weeks" },
      { value: "x10", label: "Meta Ads sales volume" },
      { value: "+40%", label: "Overall ROAS increase" },
    ],
    projectContent: "Taking over the management of Google Ads and Meta Ads accounts. Improving performance on both channels. Setting up performance monitoring. Training internal stakeholders on Google & Meta basics.\n\nOn Google, we doubled revenue in two weeks, with a 40% overall ROAS increase.",
    challengeContent: "On Meta, we implemented several major initiatives: complete structure overhaul, broad audience implementation to educate the algorithm and allow the account to scale, creative asset review to identify the best creative & copy combo.\n\nThanks to this work, we multiplied sales volume and ROAS by 10 at equivalent budget.",
    objectivesContent: "Responsiveness: 3 days after the audit, we started the support mission.\nFlexibility: we deployed a significant volume of campaigns and creative assets in record time.\nExpertise: each consultant has over 5 years of experience in digital marketing.",
  },
  "archipel-le-reacteur": {
    description: "Restructuring and scaling acquisition through Google Ads",
    caseTitle: "Restructuring and scaling Le Réacteur's digital acquisition through Google Ads",
    intro: "Le Réacteur is the leading Web and Mobile JavaScript developer training program in Paris. They initially contacted us to restructure their Google Ads account.",
    stats: [
      { value: "÷5", label: "Cost per Lead divided by 5" },
      { value: "6 months", label: "Phase 1 optimization" },
      { value: "Multi-channel", label: "Google, LinkedIn & Facebook" },
    ],
    projectContent: "We first conducted a Google Ads account audit. Most of the budget was going to broad match keywords with low added value.\n\nAfter the audit, we proposed a new Google Ads structure and a 6-month campaign plan. 6 months later, we divided the Cost Per Lead by 5.",
    challengeContent: "With Google now stable and performing, we entered phase 2: progressive budget increase on Google Ads, deployment of new media channels (LinkedIn for acquisition and Facebook for remarketing).\n\nThe challenge is to expand to new channels and make them complementary to Google, particularly through remarketing strategies.",
    objectivesContent: "Le Réacteur is a textbook case of the support offered by Archipel. Our clients often ask us to intervene initially on one channel, with the goal of maximizing performance.\n\nFollowing this work, the engagement typically becomes more in-depth and comprehensive, with the addition of new channels.",
  },
  "archipel-depancel": {
    description: "Structuring acquisition through Google Ads & Meta Ads",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-masterdoc": {
    description: "Deploying a complete Paid Ads strategy",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-fluidstack": {
    description: "Accelerating acquisition through Google Ads & LinkedIn Ads",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-jimmy-fairly": {
    description: "Strengthening visibility through GEO",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-primo": {
    description: "Strengthening visibility through GEO",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-gradium": {
    description: "Deploying a complete GEO, Paid & Social Ads strategy",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-ceran": {
    description: "Structuring Google Ads acquisition and GEO visibility",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
};

export const REFERENCE_DETAIL_LABELS_EN = {
  caseOf: "",
  caseSuffix: "'s case",
  defaultIntro: "At Archipel, we're proud to work with companies of all sizes and industries to help them improve their performance and achieve their goals.",
  project: "The project",
  projectOf: "for",
  challenge: "The challenge",
  objectives: "The objectives",
  viewCaseStudy: "View case study",
};
