// Italian translations for client reference detail pages
// Keys match the slug field from ALL_CLIENTS

interface ClientDataIt {
  description: string;
  caseTitle: string;
  intro: string;
  stats: { value: string; label: string }[];
  projectContent: string;
  challengeContent: string;
  objectivesContent: string;
}

export const CLIENT_REFERENCES_IT: Record<string, ClientDataIt> = {
  "archipel-keyrus": {
    description: "Strutturare l'acquisizione multi-paese con Paid & GEO",
    caseTitle: "Strutturare l'acquisizione multi-paese di Keyrus con una strategia Paid & GEO",
    intro: "In Archipel, accompagniamo aziende internazionali nella strutturazione e ottimizzazione della loro acquisizione digitale. Da gennaio 2024, collaboriamo con Keyrus, attore principale della consulenza aziendale (+2000 collaboratori), per pilotare e scalare la loro strategia di acquisizione in Europa.",
    stats: [
      { value: "+1 000", label: "Lead generati" },
      { value: "6 paesi", label: "Francia, UK, Portogallo, Svezia, Svizzera, Spagna" },
      { value: "2,5 anni", label: "Di collaborazione continua" },
    ],
    projectContent: "Accompagnare Keyrus nella strutturazione e nel dispiegamento di una strategia di acquisizione multi-paese.\nAttivazione di Google Ads, LinkedIn Ads, creazione degli asset, ottimizzazione delle landing page e dispiegamento di una strategia GEO su 6 mercati europei.",
    challengeContent: "Operare in un settore della consulenza molto competitivo, con cicli B2B lunghi e sfide di qualificazione elevate.\nL'obiettivo era armonizzare le campagne su più paesi mantenendo una performance costante.",
    objectivesContent: "Generare lead qualificati su scala europea, strutturare una strategia Paid coerente e scalabile, e ottimizzare i percorsi di conversione per massimizzare le performance nel tempo.",
  },
  "archipel-billet-reduc": {
    description: "Ottimizzare l'acquisizione e-commerce tramite Paid Ads",
    caseTitle: "Ottimizzare e strutturare l'acquisizione e-commerce di Billet Réduc'",
    intro: "Billet Réduc' è un attore e-commerce principale nella biglietteria a prezzi ridotti. Archipel ha accompagnato l'ottimizzazione della loro strategia di acquisizione tramite Meta Ads e Google Ads per massimizzare le performance sul mercato francese.",
    stats: [
      { value: "Meta & Google", label: "Strategia Paid Ads" },
      { value: "E-commerce", label: "Settore di attività" },
      { value: "Francia", label: "Mercato target" },
    ],
    projectContent: "Ottimizzare e strutturare l'acquisizione e-commerce tramite Meta Ads e Google Ads.\nCreazione degli asset creativi, miglioramento del tracking e pilotaggio delle campagne per massimizzare le performance sul mercato francese.",
    challengeContent: "Operare in un ambiente fortemente competitivo e stagionale, dove la redditività pubblicitaria e la precisione del tracking sono determinanti per le performance globali.",
    objectivesContent: "Strutturare una strategia Paid performante, migliorare la lettura dei dati, affidabilizzare il tracking e ottimizzare le campagne per rafforzare la redditività e-commerce.",
  },
  "archipel-sodexo": {
    description: "Strutturare l'acquisizione B2B tramite Paid Ads",
    caseTitle: "Strutturare l'acquisizione B2B di Circles by Sodexo tramite Paid Ads",
    intro: "Circles by Sodexo accompagna le aziende nei servizi ai collaboratori. Per 6 mesi, Archipel ha pilotato la strategia di acquisizione digitale in Francia per generare lead B2B qualificati.",
    stats: [
      { value: "70+", label: "Lead generati" },
      { value: "LinkedIn & Google Ads", label: "Strategia Paid B2B" },
      { value: "6 mesi", label: "Collaborazione in Francia" },
    ],
    projectContent: "Dispiegamento e pilotaggio delle campagne LinkedIn Ads e Google Ads, creazione degli asset creativi e ottimizzazione delle landing page per massimizzare la generazione di lead qualificati.",
    challengeContent: "Generare lead B2B qualificati in un ambiente competitivo, con cicli decisionali lunghi e un'esigenza elevata di targeting.",
    objectivesContent: "Strutturare un'acquisizione Paid performante, ottimizzare i percorsi di conversione e generare un volume costante di lead qualificati.",
  },
  "archipel-cenareo": {
    description: "Scalare la generazione di lead grazie a Paid & GEO",
    caseTitle: "Scalare la generazione di lead di Cenareo grazie a Paid & GEO",
    intro: "Cenareo, editore SaaS specializzato in digital signage, accompagna le aziende e gli attori del retail nella comunicazione su schermi. Archipel ha strutturato la loro acquisizione per 28 mesi in Francia.",
    stats: [
      { value: "+1 700", label: "Lead generati" },
      { value: "Paid Ads & GEO", label: "Strategia di acquisizione" },
      { value: "28 mesi", label: "Collaborazione continua" },
    ],
    projectContent: "Dispiegamento di una strategia Paid Ads abbinata a un approccio GEO per generare un volume importante di lead qualificati sul mercato francese.",
    challengeContent: "Accelerare la generazione di lead in un mercato MarTech competitivo mantenendo una performance duratura nel lungo termine.",
    objectivesContent: "Aumentare il volume di lead qualificati, strutturare un'acquisizione scalabile e rafforzare la visibilità strategica tramite il GEO.",
  },
  "archipel-spacefill": {
    description: "Rafforzare la visibilità internazionale tramite il GEO",
    caseTitle: "Rafforzare la visibilità internazionale di Spacefill tramite il GEO",
    intro: "Spacefill è una piattaforma SaaS che connette le aziende a una rete di magazzini logistici. Archipel ha accompagnato la loro strategia GEO in Francia e negli Stati Uniti.",
    stats: [
      { value: "GEO Strategy", label: "Visibilità strategica" },
      { value: "Francia & USA", label: "Dispiegamento internazionale" },
      { value: "3 mesi", label: "Missione mirata" },
    ],
    projectContent: "Implementazione di una strategia GEO per rafforzare la visibilità di Spacefill sui mercati prioritari.",
    challengeContent: "Posizionarsi su query strategiche in un settore LogisticsTech competitivo, su due mercati differenti.",
    objectivesContent: "Accrescere la presenza organica strategica, rafforzare l'autorità del brand e sostenere l'espansione internazionale.",
  },
  "archipel-freeda": {
    description: "Sviluppare la visibilità internazionale grazie al GEO",
    caseTitle: "Sviluppare la visibilità internazionale di Freeda grazie al GEO",
    intro: "Freeda è una piattaforma SaaS specializzata nella conformità normativa dei progetti di costruzione. Archipel li accompagna da gennaio 2025 sulla loro strategia GEO in Francia e negli Stati Uniti.",
    stats: [
      { value: "GEO Strategy", label: "Acquisizione organica" },
      { value: "Francia & USA", label: "Mercati prioritari" },
      { value: "Dal 2025", label: "Collaborazione in corso" },
    ],
    projectContent: "Dispiegamento di una strategia GEO volta a rafforzare la visibilità di Freeda su query strategiche legate alla conformità e alla costruzione.",
    challengeContent: "Posizionare una startup early-stage su tematiche tecniche e normative ad alta concorrenza.",
    objectivesContent: "Accrescere la visibilità qualificata, sostenere la crescita internazionale e strutturare una presenza duratura sui motori generativi.",
  },
  "archipel-phantombuster": {
    description: "Accelerare l'acquisizione internazionale",
    caseTitle: "Accelerare l'acquisizione internazionale di PhantomBuster",
    intro: "PhantomBuster, SaaS B2B specializzato in sales automation, ha affidato ad Archipel la sua strategia Paid Ads e GEO per sostenere la crescita internazionale.",
    stats: [
      { value: "Paid Ads & GEO", label: "Acquisizione B2B" },
      { value: "EU & USA", label: "Focus internazionale" },
      { value: "Dal 2025", label: "Collaborazione in corso" },
    ],
    projectContent: "Pilotaggio delle campagne Paid Social e dispiegamento di una strategia GEO per rafforzare la generazione di lead a livello internazionale.",
    challengeContent: "Mantenere una crescita rapida su mercati B2B molto competitivi ottimizzando la redditività pubblicitaria.",
    objectivesContent: "Accelerare la generazione di lead qualificati, sostenere l'espansione internazionale e strutturare un'acquisizione performante.",
  },
  "archipel-hyperline": {
    description: "Strutturare la visibilità US grazie al GEO",
    caseTitle: "Diventare n°1 su ChatGPT il più velocemente possibile",
    intro: "Hyperline è una fintech francese che propone una piattaforma SaaS automatizzata di fatturazione, tariffazione e gestione dei ricavi per le aziende tecnologiche. Semplifica la gestione dei preventivi, degli abbonamenti, dei pagamenti e del pilotaggio analitico. È il nostro primo cliente GEO, dall'estate 2025.",
    stats: [
      { value: "17", label: "Lead generati" },
      { value: "12", label: "MQL generati" },
      { value: "N°1", label: "Su ChatGPT negli USA" },
    ],
    projectContent: "Lanciare e strutturare il nostro primo accompagnamento GEO per Hyperline, fintech francese specializzata in fatturazione e gestione dei ricavi. L'obiettivo era porre le basi di una strategia chiara su un argomento emergente, costruendo le fondamenta metodologiche e operative.",
    challengeContent: "Il GEO era un argomento nuovo, ancora ai suoi albori nell'estate 2025, con poco riscontro e molte incognite. È stato necessario comprendere a fondo il funzionamento del prodotto, le sfide business e i meccanismi del GEO per strutturare un approccio pertinente in un contesto ancora poco maturo.",
    objectivesContent: "Lanciare e strutturare il nostro primo accompagnamento GEO per Hyperline, fintech francese specializzata in fatturazione e gestione dei ricavi. L'obiettivo era porre le basi di una strategia chiara su un argomento emergente, costruendo le fondamenta metodologiche e operative.",
  },
  "archipel-modeo": {
    description: "Rafforzare l'autorità digitale tramite il GEO",
    caseTitle: "Creare una nuova fonte di lead",
    intro: "Modeo è un esperto di Data Engineering che progetta piattaforme data e IA su misura per aiutare le aziende a sfruttare i propri dati. La sfida è strutturare architetture performanti e orientate al ROI, allineate con gli obiettivi business.",
    stats: [
      { value: "N°2", label: "Su ChatGPT" },
      { value: "+10", label: "Lead generati" },
      { value: "+2", label: "Clienti convertiti" },
    ],
    projectContent: "Da settembre 2025, accompagniamo Modeo, piattaforma incentrata sull'IA conversazionale, per strutturare e attivare una strategia di acquisizione performante. La sfida principale era porre una base solida per sviluppare la loro visibilità e generare risultati concreti su un mercato molto competitivo.",
    challengeContent: "L'argomento era nuovo e richiedeva una comprensione fine degli usi attorno ai grandi strumenti di IA come ChatGPT, Perplexity, Claude o Copilot. È stato necessario assimilare rapidamente la complessità del prodotto, identificare le giuste leve e coordinare le azioni per produrre risultati misurabili.",
    objectivesContent: "Potenziare la visibilità di Modeo, generare i primi lead qualificati e ottenere le prime chiusure, strutturando al contempo una metodologia di accompagnamento chiara e scalabile. Da settembre 2025, questi obiettivi sono stati raggiunti, e Modeo è diventata un bel riferimento su piattaforme come ChatGPT, Perplexity, Claude o Copilot.",
  },
  "archipel-pivot": {
    description: "N°1 su ChatGPT nel suo settore in 2 mesi",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-softgarden": {
    description: "Descrizione del riferimento",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-factorial": {
    description: "Nella top 5 su diversi motori IA",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-playplay": {
    description: "Accelerare la generazione di lead internazionale tramite Paid Ads",
    caseTitle: "Accelerare la generazione di lead internazionale di PlayPlay tramite Paid Ads",
    intro: "PlayPlay è una piattaforma SaaS B2B specializzata nella creazione di video professionali destinati ai team di marketing e comunicazione. L'azienda accompagna migliaia di organizzazioni nella produzione di contenuti video coinvolgenti, in modo semplice e su larga scala.\n\nDa gennaio, Archipel pilota la loro strategia Paid su diversi mercati internazionali.",
    stats: [
      { value: "+1 000", label: "Lead generati" },
      { value: "Francia, NORAM & DACH", label: "Dispiegamento internazionale" },
      { value: "Google Ads & LinkedIn Ads", label: "Strategia Paid B2B" },
    ],
    projectContent: "Dispiegamento e pilotaggio di una strategia Paid Ads multi-mercato (Google Ads & LinkedIn Ads) per accelerare la generazione di lead B2B sulle zone Francia, Nord America e DACH.",
    challengeContent: "Mantenere una forte dinamica di generazione di lead su mercati internazionali competitivi, adattando messaggi, creatività e targeting secondo le specificità locali.",
    objectivesContent: "Accelerare la generazione di lead qualificati, strutturare una strategia Paid scalabile a livello internazionale e ottimizzare le performance su mercati B2B ad alta concorrenza.",
  },
  "archipel-mirakl": {
    description: "Sviluppare la visibilità omnicanale di un unicorno francese in Europa",
    caseTitle: "Sviluppare la visibilità omnicanale di un unicorno francese in Europa",
    intro: "Mirakl è una soluzione SaaS che permette alle aziende di lanciare e gestire un marketplace. Aiuta i retailer e i brand a vendere tramite venditori terzi su larga scala.\n\nLo abbiamo accompagnato su Google & LinkedIn in Europa su tutti i suoi prodotti.",
    stats: [
      { value: "x3", label: "Sul numero di lead" },
      { value: "66%", label: "CPL ottimizzati del 50%" },
      { value: "17", label: "Paesi nel targeting geografico" },
    ],
    projectContent: "L'obiettivo era semplice: aumentare significativamente il volume di lead a budget equivalente.\nCon un lavoro di semplificazione della struttura e un forte accento sulla produzione di landing page e creatività di qualità, abbiamo raggiunto l'obiettivo.",
    challengeContent: "La sfida principale deriva dalla loro dimensione di unicorno: molti interlocutori, sfide strategiche variegate e numerose parti interessate. L'accompagnamento si basa quindi su un coordinamento fine e un allineamento costante.",
    objectivesContent: "L'obiettivo era implementare una metodologia di accompagnamento fluida per ottimizzare le performance, generare più lead e comprendere meglio un prodotto complesso. Abbiamo raggiunto questo obiettivo strutturando un quadro chiaro ed efficace.",
  },
  "archipel-everwin": {
    description: "Rafforzare l'acquisizione digitale tramite Paid & GEO",
    caseTitle: "Rafforzare l'acquisizione digitale di Everwin (ERP) tramite Paid & GEO",
    intro: "Everwin è un editore francese di soluzioni ERP specializzate nella gestione d'affari per le società di servizi, che offre software completi di pianificazione, gestione e pilotaggio delle attività professionali.",
    stats: [
      { value: "Paid Ads & GEO", label: "Strategia di acquisizione" },
      { value: "Francia", label: "Mercato nazionale" },
      { value: "Da gennaio 2026", label: "Collaborazione in corso" },
    ],
    projectContent: "Dispiegare una strategia Paid & GEO per rafforzare la visibilità e l'acquisizione digitale di Everwin in Francia, ottimizzando il targeting, le creatività e i percorsi di conversione.",
    challengeContent: "Posizionare un attore ERP su query concorrenziali rispondendo a esigenze B2B molto specifiche e massimizzando la visibilità su intenzioni di ricerca ad alto valore.",
    objectivesContent: "Strutturare una strategia di acquisizione performante, affidabilizzare la lettura delle performance e rafforzare la presenza organica e paid su segmenti strategici.",
  },
  "archipel-dahlia": {
    description: "Accelerare la generazione di lead grazie al SEA",
    caseTitle: "Accelerare la generazione di lead di Dahlia grazie al SEA",
    intro: "Da gennaio 2026, collaboriamo con Dahlia, agenzia immobiliare con sede in Francia, per strutturare e ottimizzare la loro strategia SEA al fine di aumentare il volume di lead qualificati.",
    stats: [
      { value: "150", label: "Lead generati" },
      { value: "Francia", label: "Mercato attivato" },
      { value: "3 mesi", label: "Di collaborazione" },
    ],
    projectContent: "Accompagnare Dahlia nella strutturazione e nel dispiegamento di una strategia di acquisizione tramite Google Ads.\n\nImplementazione di una strategia SEA orientata alle performance:\n• Strutturazione delle campagne (acquisto / vendita / valutazione)\n• Ottimizzazione dei targeting geografici\n• Creazione e miglioramento degli annunci\n• Ottimizzazione continua delle conversioni",
    challengeContent: "Operare in un mercato immobiliare fortemente competitivo, con costi per clic elevati e prospect molto sollecitati.\n\nLa sfida era generare lead qualificati controllando i costi di acquisizione, in un contesto locale concorrenziale.",
    objectivesContent: "• Generare lead qualificati per i team commerciali\n• Massimizzare la visibilità locale dell'agenzia\n• Ottimizzare il costo per lead\n• Strutturare una strategia SEA duratura e scalabile",
  },
  "archipel-ca-assure": {
    description: "Strutturare la visibilità digitale grazie al GEO",
    caseTitle: "Strutturare la presenza digitale di Ça Assure (broker assicurativo) tramite una strategia GEO",
    intro: "Ça Assure è un broker assicurativo online, filiale del gruppo Kereis, specializzato nell'assicurazione del mutuatario e nel confronto dei contratti, con un approccio digitale semplificato e trasparente.",
    stats: [
      { value: "GEO Strategy", label: "Visibilità strategica" },
      { value: "Francia", label: "Mercato nazionale" },
      { value: "Da gennaio 2026", label: "Collaborazione in corso" },
    ],
    projectContent: "Implementare una strategia GEO per rafforzare la visibilità digitale di Ça Assure su query pertinenti nel campo delle assicurazioni, migliorare l'autorità del sito e sostenere l'acquisizione organica.",
    challengeContent: "Posizionarsi efficacemente in un ambiente assicurativo competitivo e regolamentato in Francia, migliorando la copertura delle query chiave ad alta domanda.",
    objectivesContent: "Accrescere la visibilità qualificata, ottimizzare il posizionamento sulle query strategiche e consolidare la presenza digitale del brand presso il pubblico target.",
  },
  "archipel-joone": {
    description: "Gestire e ottimizzare un account Google Ads ad alto budget",
    caseTitle: "Gestire e ottimizzare l'account Google Ads di Joone durante un periodo di transizione",
    intro: "Joone è un marchio di pannolini e prodotti per la cura dei neonati. Il marchio utilizza materiali sostenibili e ingredienti naturali. Joone propone anche abbonamenti flessibili per facilitare la vita dei genitori.",
    stats: [
      { value: "50K€/mese", label: "Budget Google Ads gestito" },
      { value: "4 mesi", label: "Periodo di accompagnamento" },
      { value: "3 giorni", label: "Tempo di avvio dopo l'audit" },
    ],
    projectContent: "In seguito alla partenza del responsabile dell'account Google Ads in azienda, Joone si è rivolto ad Archipel Marketing per assicurare il periodo di transizione, in attesa di un nuovo sostituto. Questo periodo è durato 4 mesi.\n\nGestire un account Google Ads con 50K€ di spese mensili. Padroneggiare alla perfezione i fondamenti di Google Ads. Sfidare il tracking in corso, la struttura delle campagne e le strategie di offerta.",
    challengeContent: "Un account Google Ads riorganizzato. Una matrice di spese di budget creata per ottimizzare l'investimento media nel corso del mese. Ricorrenza settimanale per monitorare le performance e adeguare le nostre azioni.\n\nArchipel Marketing è una soluzione chiavi in mano, che permette di coprire tutti gli aspetti nel dispiegamento di campagne media.",
    objectivesContent: "Reattività: 3 giorni dopo l'audit, iniziavamo la missione di accompagnamento.\nFlessibilità: abbiamo dispiegato un volume di campagne e asset creativi considerevole in tempi record.\nEsperienza: ogni consulente ha più di 5 anni di esperienza nel marketing digitale.",
  },
  "archipel-ybrush": {
    description: "Ottimizzare le performance Google Ads & Meta Ads",
    caseTitle: "Ottimizzare e scalare le performance Google Ads & Meta Ads di Y-Brush",
    intro: "Y-Brush è un'azienda francese che rivoluziona lo spazzolamento dei denti. Con Y-Brush, 10 secondi sono sufficienti per uno spazzolamento efficace! Grazie alla sua nuova tecnologia all'avanguardia.",
    stats: [
      { value: "x2", label: "Fatturato Google Ads in 2 settimane" },
      { value: "x10", label: "Volume di vendite Meta Ads" },
      { value: "+40%", label: "Aumento del ROAS globale" },
    ],
    projectContent: "Riprendere la gestione dell'account Google Ads e dell'account Meta Ads. Migliorare le performance su entrambe le leve. Implementare un monitoraggio delle performance. Formare gli interlocutori interni sulle basi di Google & Meta.\n\nSu Google, abbiamo raddoppiato il fatturato in due settimane, con un aumento globale del ROAS del 40%.",
    challengeContent: "Su Meta, abbiamo implementato diversi grandi cantieri: ristrutturazione completa della struttura, implementazione di audience broad per educare l'algoritmo e permettere all'account di scalare, review degli asset creativi per identificare la migliore combinazione creatività & wording.\n\nGrazie a questo lavoro, abbiamo moltiplicato per 10 il volume di vendite e il ROAS, a budget equivalente.",
    objectivesContent: "Reattività: 3 giorni dopo l'audit, iniziavamo la missione di accompagnamento.\nFlessibilità: abbiamo dispiegato un volume di campagne e asset creativi considerevole in tempi record.\nEsperienza: ogni consulente ha più di 5 anni di esperienza nel marketing digitale.",
  },
  "archipel-le-reacteur": {
    description: "Ristrutturare e scalare l'acquisizione tramite Google Ads",
    caseTitle: "Ristrutturare e scalare l'acquisizione digitale de Le Réacteur tramite Google Ads",
    intro: "Le Réacteur è la prima formazione per sviluppatori Web e Mobile JavaScript a Parigi. Ci hanno contattato inizialmente per ristrutturare il loro account Google Ads.",
    stats: [
      { value: "÷5", label: "Costo per Lead diviso per 5" },
      { value: "6 mesi", label: "Fase 1 di ottimizzazione" },
      { value: "Multi-leva", label: "Google, LinkedIn & Facebook" },
    ],
    projectContent: "Abbiamo prima proceduto a un audit dell'account Google Ads. La maggior parte del budget andava su keyword a corrispondenza generica a basso valore aggiunto.\n\nDopo l'audit, abbiamo proposto una nuova struttura su Google Ads e un planning di campagne su 6 mesi. 6 mesi dopo, abbiamo diviso il Costo Per Lead per 5.",
    challengeContent: "Google essendo ormai stabile e performante, siamo entrati nella fase 2: aumento progressivo del budget su Google Ads, dispiegamento di nuove leve media (LinkedIn in acquisizione e Facebook in remarketing).\n\nLa sfida è dispiegarsi su nuove leve e renderle complementari a Google, in particolare tramite strategie di remarketing.",
    objectivesContent: "Le Réacteur è un caso di scuola dell'accompagnamento proposto da Archipel. I nostri clienti ci chiedono spesso di intervenire inizialmente su una leva, con l'obiettivo di ottimizzare al massimo le performance.\n\nIn seguito, l'accompagnamento diventa generalmente più approfondito e più globale, con l'aggiunta di nuove leve.",
  },
  "archipel-depancel": {
    description: "Strutturare l'acquisizione tramite Google Ads & Meta Ads",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-masterdoc": {
    description: "Dispiegare una strategia Paid Ads completa",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-fluidstack": {
    description: "Accelerare l'acquisizione tramite Google Ads & LinkedIn Ads",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-jimmy-fairly": {
    description: "Rafforzare la visibilità tramite il GEO",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-primo": {
    description: "Rafforzare la visibilità tramite il GEO",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-gradium": {
    description: "Dispiegare una strategia GEO, Paid & Social Ads completa",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
  "archipel-ceran": {
    description: "Strutturare l'acquisizione Google Ads e la visibilità GEO",
    caseTitle: "", intro: "", stats: [], projectContent: "", challengeContent: "", objectivesContent: "",
  },
};

// UI labels for the reference detail page
export const REFERENCE_DETAIL_LABELS_IT = {
  caseOf: "Il caso",
  defaultIntro: "In Archipel, siamo orgogliosi di lavorare con aziende di tutte le dimensioni e di tutti i settori per aiutarle a migliorare le performance e raggiungere i loro obiettivi.",
  project: "Il progetto",
  projectOf: "di",
  challenge: "La sfida",
  objectives: "Gli obiettivi",
  viewCaseStudy: "Vedi il caso studio",
};
