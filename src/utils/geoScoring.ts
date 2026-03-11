export interface GeoScores {
  global: number;
  content: number;
  technical: number;
  social: number;
  llm: {
    chatgpt: number;
    copilot: number;
    perplexity: number;
    googleAI: number;
  };
}

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number, index: number): number {
  const x = Math.sin(seed * 9301 + index * 49297 + 233280) * 10000;
  return x - Math.floor(x);
}

export function generateGeoScores(url: string): GeoScores {
  const domain = url.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '').trim();

  // Special case: Archipel Marketing
  if (domain === 'archipelmarketing.com') {
    return {
      global: 97,
      content: 95,
      technical: 98,
      social: 92,
      llm: {
        chatgpt: 96,
        copilot: 94,
        perplexity: 98,
        googleAI: 95,
      },
    };
  }

  const hash = simpleHash(url.toLowerCase().trim());
  const r = (i: number) => seededRandom(hash, i);

  const content = Math.round(20 + r(1) * 30); // 20–50
  const technical = Math.round(40 + r(2) * 20); // 40–60
  const social = Math.round(10 + r(3) * 20); // 10–30

  // Weighted average: content 35%, technical 40%, social 25%
  const rawGlobal = content * 0.35 + technical * 0.40 + social * 0.25;
  // Raw range: 25.5–49 → mapped to 40–60
  const global = Math.round(40 + ((rawGlobal - 25.5) / (49 - 25.5)) * 20);

  return {
    global: Math.max(40, Math.min(60, global)),
    content,
    technical,
    social,
    llm: {
      chatgpt: Math.round(30 + r(4) * 40),
      copilot: Math.round(30 + r(5) * 40),
      perplexity: Math.round(30 + r(6) * 40),
      googleAI: Math.round(30 + r(7) * 40),
    },
  };
}

export function getScoreColor(score: number): string {
  if (score < 30) return "#EF4444";
  if (score < 50) return "#F59E0B";
  if (score < 70) return "#0043F1";
  return "#10B981";
}

export function getScoreLabel(score: number): string {
  if (score < 30) return "Faible";
  if (score < 50) return "À améliorer";
  if (score < 70) return "Correct";
  return "Bon";
}
