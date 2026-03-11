import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import SEOHelmet from "@/components/SEOHelmet";
import LogoCarousel from "@/components/LogoCarousel";
import { useFormWebhook } from "@/hooks/useFormWebhook";
import { useUtmTracking } from "@/hooks/useUtmTracking";
import { generateGeoScores, getScoreColor, getScoreLabel, type GeoScores } from "@/utils/geoScoring";
import { ArrowRight, AlertTriangle, CheckCircle2, XCircle, Globe, FileText, Users, BarChart3, X } from "lucide-react";

type Phase = "input" | "analyzing" | "results";

const LLM_LOGOS = [
  { name: "ChatGPT", src: "/lovable-uploads/logo-chatgpt-full.png" },
  { name: "Google AI", src: "/lovable-uploads/logo-googleai-full.png" },
  { name: "Copilot", src: "/lovable-uploads/logo-copilot-full.png" },
  { name: "Mistral AI", src: "/lovable-uploads/logo-mistral-full.png", needsFilter: true },
  { name: "DeepSeek", src: "/lovable-uploads/logo-deepseek-full.png", needsFilter: true },
  { name: "Perplexity", src: "/lovable-uploads/logo-perplexity-full.png" },
];

const SOCIAL_ICONS: Record<string, string> = {
  reddit: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/reddit.svg",
  wikipedia: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/wikipedia.svg",
  linkedin: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
  youtube: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg",
};

const ANALYZE_MESSAGES = [
  "Analyse du contenu…",
  "Analyse des citations sociales…",
  "Vérification technique…",
  "Calcul du score GEO…",
];

// ─── Helpers ─────────────────────────────────────────────

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  return url;
}

function extractDomain(url: string): string {
  try {
    return new URL(normalizeUrl(url)).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

function isValidDomain(input: string): boolean {
  const normalized = normalizeUrl(input);
  try {
    const parsed = new URL(normalized);
    // Must have a TLD (at least one dot in hostname)
    return /\.[a-z]{2,}$/i.test(parsed.hostname);
  } catch {
    return false;
  }
}

// ─── Score Gauge SVG ─────────────────────────────────────

const ScoreGauge = ({ score, animated, size = 180 }: { score: number; animated: number; size?: number }) => {
  const r = (size - 20) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - animated / 100);
  const color = getScoreColor(score);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E5E7EB" strokeWidth="12" />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth="12"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-jakarta text-5xl font-bold" style={{ color }}>{animated}</span>
        <span className="text-sm text-[#010D3E]/50 font-inter mt-1">/100</span>
      </div>
    </div>
  );
};

// ─── Animated Counter Hook ───────────────────────────────

function useAnimatedCounter(target: number, duration = 1500, enabled = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!enabled) { setValue(0); return; }
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, enabled]);
  return value;
}

// ─── Score Bar ───────────────────────────────────────────

const ScoreBar = ({ score, icon, label }: { score: number; icon: string; label: string }) => {
  const color = getScoreColor(score);
  const animated = useAnimatedCounter(score, 1200, true);

  return (
    <div className="flex items-center gap-4">
      <img src={icon} alt={label} className="w-8 h-8 object-contain" loading="lazy" />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-bold font-jakarta" style={{ color }}>{animated}/100</span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-[1.5s] ease-out"
            style={{ width: `${score}%`, backgroundColor: color }}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Social Item (with icon) ─────────────────────────────

const SocialItem = ({ type, text, platform }: { type: "warning" | "error" | "success"; text: string; platform?: string }) => (
  <div className="flex items-start gap-3">
    {platform && SOCIAL_ICONS[platform] ? (
      <img src={SOCIAL_ICONS[platform]} alt={platform} className="w-5 h-5 mt-0.5 shrink-0 opacity-60" />
    ) : (
      <>
        {type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
        {type === "error" && <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />}
        {type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />}
      </>
    )}
    <span className="text-sm text-[#010D3E]/80 font-inter leading-relaxed">{text}</span>
  </div>
);

// ─── Detail Card ─────────────────────────────────────────

interface DetailCardProps {
  title: string;
  score: number;
  icon: React.ReactNode;
  children: React.ReactNode;
  conclusion: React.ReactNode;
}

const DetailCard = ({ title, score, icon, children, conclusion }: DetailCardProps) => {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 md:px-8 py-6 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
            {icon}
          </div>
          <h3 className="font-jakarta text-lg font-bold text-[#010D3E]">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold font-jakarta" style={{ color }}>{score}</span>
          <span className="text-xs font-inter px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}15`, color }}>{label}</span>
        </div>
      </div>
      <div className="px-6 md:px-8 py-6 space-y-3">
        {children}
      </div>
      <div className="px-6 md:px-8 py-6 bg-gray-50/60 border-t border-gray-50">
        <div className="text-sm text-[#010D3E]/70 font-inter leading-relaxed space-y-3">
          {conclusion}
        </div>
      </div>
    </div>
  );
};

// ─── Default Detail Item ─────────────────────────────────

const DetailItem = ({ type, text }: { type: "warning" | "error" | "success"; text: string }) => (
  <div className="flex items-start gap-3">
    {type === "warning" && <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
    {type === "error" && <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />}
    {type === "success" && <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />}
    <span className="text-sm text-[#010D3E]/80 font-inter leading-relaxed">{text}</span>
  </div>
);

// ═════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═════════════════════════════════════════════════════════

const SimulateurAuditGeo = () => {
  const [phase, setPhase] = useState<Phase>("input");
  const [url, setUrl] = useState("");
  const [scores, setScores] = useState<GeoScores | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeLogoIndex, setActiveLogoIndex] = useState(-1);
  const [messageIndex, setMessageIndex] = useState(0);
  const [urlError, setUrlError] = useState("");
  const [showCalendly, setShowCalendly] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const calendlyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { sendFormData } = useFormWebhook();
  const { getUtmParams } = useUtmTracking();

  const animatedGlobal = useAnimatedCounter(scores?.global ?? 0, 1800, phase === "results");

  // ─── Calendly popup after 20s on results ──────────────
  useEffect(() => {
    if (phase === "results") {
      calendlyTimerRef.current = setTimeout(() => setShowCalendly(true), 10000);
    }
    return () => {
      if (calendlyTimerRef.current) clearTimeout(calendlyTimerRef.current);
    };
  }, [phase]);

  // ─── Submit Handler ──────────────────────────────────

  const handleSubmit = useCallback(async () => {
    if (!url.trim()) {
      setUrlError("Veuillez entrer une URL");
      return;
    }
    if (!isValidDomain(url)) {
      setUrlError("Veuillez entrer un domaine valide (ex : monsite.fr)");
      return;
    }
    setUrlError("");

    const normalized = normalizeUrl(url);

    // Webhook — fire & forget
    sendFormData({
      form_name: "Simulateur Audit GEO",
      form_id: "simulateur_audit_geo",
      fields: { url: normalized },
      url: typeof window !== "undefined" ? window.location.href : undefined,
      utm_params: getUtmParams(),
    });

    // Secondary webhook — collect site + date de dépôt
    fetch("https://hook.eu2.make.com/3zb5yqbgfuojymdfr49ni1vpa5mdev7x", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ site: normalized, date_depot: new Date().toISOString() }),
    }).catch(() => {});

    // Generate scores
    const generated = generateGeoScores(normalized);
    setScores(generated);

    // Start analyzing phase
    setPhase("analyzing");
    setProgress(0);
    setActiveLogoIndex(-1);
    setMessageIndex(0);
  }, [url, sendFormData, getUtmParams]);

  // ─── Analyzing Animation ─────────────────────────────

  useEffect(() => {
    if (phase !== "analyzing") return;

    const totalDuration = 5000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(elapsed / totalDuration, 1);
      setProgress(Math.round(pct * 100));

      const logoIdx = Math.min(Math.floor(pct * 6), 5);
      setActiveLogoIndex(logoIdx);
      setMessageIndex(Math.min(Math.floor(pct * 4), 3));

      if (pct >= 1) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase("results");
          setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
        }, 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [phase]);

  // ─── Render ──────────────────────────────────────────

  return (
    <Layout>
      <SEOHelmet
        title="Simulateur Audit GEO — Testez votre visibilité IA | Archipel"
        description="Auditez gratuitement la visibilité de votre site sur ChatGPT, Copilot, Perplexity et Google AI Overview. Obtenez votre score GEO et un plan d'action."
        canonicalUrl="https://archipelmarketing.com/simulateur-audit-GEO"
        keywords="audit GEO, visibilité IA, ChatGPT, Copilot, Perplexity, Google AI Overview, référencement IA"
      />

      {/* ─── HERO / INPUT PHASE ─────────────────────────── */}
      {phase === "input" && (
        <>
          <section className="relative min-h-[75vh] flex items-center justify-center bg-white overflow-hidden">
            {/* Floating screenshot left */}
            <div className="hidden lg:block absolute left-[-80px] top-1/2 -translate-y-1/2 z-0">
              <img
                src="/lovable-uploads/tool-screenshot-prompts.png"
                alt="Tracked Prompts"
                className="w-[320px] rounded-2xl border border-gray-200 shadow-xl opacity-80 -rotate-3"
                loading="lazy"
              />
            </div>
            {/* Floating screenshot right */}
            <div className="hidden lg:block absolute right-[-80px] top-1/2 -translate-y-1/2 z-0">
              <img
                src="/lovable-uploads/tool-screenshot-visibility.png"
                alt="Visibility Score"
                className="w-[320px] rounded-2xl border border-gray-200 shadow-xl opacity-80 rotate-3"
                loading="lazy"
              />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
              <div className="inline-flex items-center gap-2 mb-8 border border-gray-200 rounded-full px-4 py-2">
                <img src="/favicon.png" alt="Archipel" className="w-4 h-4 object-contain" />
                <span className="text-sm text-[#010D3E]/70 font-inter">Audit gratuit</span>
              </div>

              <h1 className="font-jakarta text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-[1.08]">
                <span className="bg-gradient-to-b from-[#000000] to-[#001354] bg-clip-text text-transparent">
                  Analysez votre visibilité sur les IA
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#010D3E]/75 font-inter max-w-2xl mx-auto mb-10 leading-relaxed">
                Découvrez votre score de visibilité GEO. Obtenez des recommandations concrètes et un plan d'action activable pour améliorer votre référencement sur les IA génératives.
              </p>

              {/* LLM Logos — same as homepage BoostProductivity */}
              <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2 items-center justify-items-center max-w-2xl mx-auto mb-12">
                {LLM_LOGOS.map((logo) => (
                  <img
                    key={logo.name}
                    src={logo.src}
                    alt={logo.name}
                    className="h-20 md:h-28 w-auto object-contain"
                    style={(logo as any).needsFilter ? {
                      filter: "brightness(0) saturate(100%) invert(8%) sepia(30%) saturate(2000%) hue-rotate(200deg) brightness(95%) contrast(100%)",
                    } : undefined}
                    loading="lazy"
                  />
                ))}
              </div>

              {/* URL Input */}
              <div className="max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <Input
                      type="url"
                      placeholder="https://votresite.com"
                      value={url}
                      onChange={(e) => { setUrl(e.target.value); setUrlError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      className="h-13 px-5 text-base border-gray-200 rounded-xl focus-visible:ring-[#0043F1] font-inter"
                    />
                    {urlError && <p className="text-sm text-red-500 mt-2 text-left font-inter">{urlError}</p>}
                  </div>
                  <Button
                    onClick={handleSubmit}
                    className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 h-13 px-8 rounded-xl font-inter font-normal text-base whitespace-nowrap"
                  >
                    Analyser mon site
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* "Ils nous font confiance" label — desktop only (mobile has it in LogoCarousel) */}
              <p className="hidden md:block text-center text-sm text-gray-500 font-inter mt-12 mb-4">
                Ils nous font confiance
              </p>

              {/* Mobile screenshot — visible only on small screens */}
              <div className="lg:hidden mt-10">
                <img
                  src="/lovable-uploads/tool-screenshot-visibility.png"
                  alt="Visibility Score"
                  className="w-full max-w-xs mx-auto rounded-2xl border border-gray-200 shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Client logo carousel */}
          <LogoCarousel />
        </>
      )}

      {/* ─── ANALYZING PHASE ────────────────────────────── */}
      {phase === "analyzing" && (
        <section className="min-h-[85vh] flex items-center justify-center bg-white overflow-hidden">
          <div className="max-w-lg mx-auto px-4 text-center relative">
            <p className="text-sm text-[#010D3E]/50 font-inter mb-3">Analyse en cours</p>

            {/* URL being scanned */}
            <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-5 py-2.5 mb-8">
              <Globe className="w-4 h-4 text-[#0043F1] animate-pulse" />
              <span className="text-sm font-mono text-[#010D3E]/70 truncate max-w-[260px]">{extractDomain(url)}</span>
            </div>

            {/* Logos with activation */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {LLM_LOGOS.map((logo, i) => (
                <div
                  key={logo.name}
                  className="relative transition-all duration-500"
                  style={{ opacity: i <= activeLogoIndex ? 1 : 0.25, transform: i <= activeLogoIndex ? "scale(1)" : "scale(0.9)" }}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-16 w-auto object-contain"
                    style={(logo as any).needsFilter ? {
                      filter: "brightness(0) saturate(100%) invert(8%) sepia(30%) saturate(2000%) hue-rotate(200deg) brightness(95%) contrast(100%)",
                    } : undefined}
                  />
                  {i <= activeLogoIndex && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0043F1] rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Social logos popping up */}
            <div className="flex items-center justify-center gap-5 mb-8 h-10">
              {[
                { key: "reddit", src: SOCIAL_ICONS.reddit, threshold: 0.45 },
                { key: "wikipedia", src: SOCIAL_ICONS.wikipedia, threshold: 0.55 },
                { key: "youtube", src: SOCIAL_ICONS.youtube, threshold: 0.65 },
                { key: "linkedin", src: SOCIAL_ICONS.linkedin, threshold: 0.75 },
              ].map((item) => {
                const pct = progress / 100;
                const visible = pct >= item.threshold;
                return (
                  <div
                    key={item.key}
                    className="transition-all duration-500"
                    style={{
                      opacity: visible ? 0.7 : 0,
                      transform: visible ? "scale(1) translateY(0)" : "scale(0.5) translateY(12px)",
                    }}
                  >
                    <img src={item.src} alt={item.key} className="w-7 h-7 object-contain" />
                  </div>
                );
              })}
            </div>

            {/* Floating blog article image sliding left to right */}
            <div className="absolute left-0 right-0 pointer-events-none overflow-hidden h-16 mb-4" style={{ top: "calc(100% - 80px)" }}>
              <img
                src="/lovable-uploads/mesh-gradient-article.png"
                alt=""
                className="h-14 w-auto rounded-lg border border-gray-100 shadow-md absolute"
                style={{
                  animation: "slide-across 4s linear infinite",
                  opacity: 0.5,
                }}
              />
              <style>{`
                @keyframes slide-across {
                  0% { left: -120px; opacity: 0; }
                  10% { opacity: 0.5; }
                  90% { opacity: 0.5; }
                  100% { left: calc(100% + 20px); opacity: 0; }
                }
              `}</style>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-sm mx-auto mb-6">
              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#0043F1] transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-[#010D3E]/40 font-inter">{ANALYZE_MESSAGES[messageIndex]}</span>
                <span className="text-xs text-[#010D3E]/40 font-inter">{progress}%</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── RESULTS PHASE ──────────────────────────────── */}
      {phase === "results" && scores && (
        <div ref={resultsRef}>
          {/* Global Score */}
          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <p className="text-sm text-[#010D3E]/50 font-inter mb-2">Résultats pour</p>
              <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-5 py-2 mb-10">
                <Globe className="w-4 h-4 text-[#0043F1]" />
                <span className="text-sm font-mono text-[#010D3E]/70">{extractDomain(url)}</span>
              </div>

              <h2 className="font-jakarta text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-b from-[#000000] to-[#001354] bg-clip-text text-transparent">
                  Score GEO global
                </span>
              </h2>
              <p className="text-[#010D3E]/60 font-inter mb-10 max-w-lg mx-auto">
                Votre score reflète la capacité actuelle de votre site à être recommandé par les IA génératives.
              </p>

              <ScoreGauge score={scores.global} animated={animatedGlobal} size={200} />

              <div className="mt-6">
                <span
                  className="text-sm font-inter font-medium px-4 py-1.5 rounded-full"
                  style={{ backgroundColor: `${getScoreColor(scores.global)}15`, color: getScoreColor(scores.global) }}
                >
                  {getScoreLabel(scores.global)}
                </span>
              </div>
            </div>
          </section>

          {/* LLM Visibility — logo only, no text label */}
          <section className="py-12 md:py-16 bg-gray-50/50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
              <h3 className="font-jakarta text-xl font-bold text-[#010D3E] mb-8 text-center">
                Visibilité par moteur IA
              </h3>
              <div className="space-y-5">
                <ScoreBar score={scores.llm.chatgpt} icon="/lovable-uploads/logo-chatgpt-service.png" label="ChatGPT" />
                <ScoreBar score={scores.llm.copilot} icon="/lovable-uploads/logo-copilot-service.png" label="Copilot" />
                <ScoreBar score={scores.llm.perplexity} icon="/lovable-uploads/logo-perplexity-service.png" label="Perplexity" />
                <ScoreBar score={scores.llm.googleAI} icon="/lovable-uploads/logo-googleai-service.png" label="Google AI Overview" />
              </div>
            </div>
          </section>

          {/* Detail Cards */}
          <section className="py-12 md:py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">

              {/* ── Contenu ── */}
              <DetailCard
                title="Contenu"
                score={scores.content}
                icon={<FileText className="w-5 h-5" style={{ color: getScoreColor(scores.content) }} />}
                conclusion={
                  scores.content >= 80 ? (
                    <>
                      <p>Votre stratégie de contenu est exemplaire. Vos articles sont bien structurés, riches en FAQ et optimisés pour l'extraction par les IA génératives.</p>
                      <p>Points forts identifiés :</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Contenu expert et régulièrement mis à jour</li>
                        <li>Classements et comparatifs bien intégrés</li>
                        <li>FAQ stratégiques présentes sur les pages clés</li>
                        <li>Introductions optimisées pour les LLM</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p>Votre site dispose d'une base éditoriale existante. Cependant, les contenus ne sont pas encore optimisés pour le GEO.</p>
                      <p>Les IA privilégient :</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Les classements</li>
                        <li>Les comparateurs</li>
                        <li>Les FAQ intégrées</li>
                        <li>Les introductions structurées et informatives</li>
                      </ul>
                      <p>Il est recommandé d'intégrer systématiquement des FAQ sur les pages stratégiques et d'optimiser les premières sections de vos articles, car les LLM analysent prioritairement les débuts de contenu.</p>
                    </>
                  )
                }
              >
                {scores.content >= 80 ? (
                  <>
                    <DetailItem type="success" text="Volume d'articles de blog conséquent, autorité thématique bien établie" />
                    <DetailItem type="success" text="Contenus de type classement et comparatifs bien intégrés" />
                    <DetailItem type="success" text="FAQ stratégiques présentes et régulièrement enrichies" />
                    <DetailItem type="success" text="Introductions optimisées pour la lecture par les modèles de langage" />
                  </>
                ) : (
                  <>
                    <DetailItem type="warning" text="Volume d'articles de blog insuffisant pour asseoir l'autorité thématique" />
                    <DetailItem type="warning" text="Manque de contenus de type classement (top 5, top 10…)" />
                    <DetailItem type="error" text="Absence de comparatifs structurés exploitables par les IA" />
                    <DetailItem type="error" text="FAQ stratégiques absentes sur les pages clés" />
                    <DetailItem type="warning" text="Introductions peu optimisées pour la lecture par les modèles de langage" />
                  </>
                )}
              </DetailCard>

              {/* ── Technique ── */}
              <DetailCard
                title="Technique"
                score={scores.technical}
                icon={<Globe className="w-5 h-5" style={{ color: getScoreColor(scores.technical) }} />}
                conclusion={
                  scores.technical >= 80 ? (
                    <p>L'infrastructure technique de votre site est parfaitement optimisée pour le GEO. Le fichier <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">LLMs.txt</code> est bien configuré, la structure sémantique est exemplaire et les bots IA accèdent facilement au contenu.</p>
                  ) : (
                    <p>L'infrastructure technique de votre site présente des marges d'optimisation significatives pour le GEO. Le fichier <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">LLMs.txt</code>, la structure sémantique et l'accessibilité du contenu aux bots IA sont des leviers prioritaires.</p>
                  )
                }
              >
                {scores.technical >= 80 ? (
                  <>
                    <DetailItem type="success" text={`Fichier LLMs.txt — correctement configuré sur ${extractDomain(url)}`} />
                    <DetailItem type="success" text="Fichier robots.txt — crawl ouvert et optimisé pour les bots IA" />
                    <DetailItem type="success" text="Balises title parfaitement optimisées pour le référencement IA" />
                    <DetailItem type="success" text="Meta descriptions efficaces pour les citations IA" />
                    <DetailItem type="success" text="Structure Hn exemplaire, facilitant l'extraction d'informations" />
                    <DetailItem type="success" text="Code HTML propre et optimisé pour la lecture par les IA" />
                  </>
                ) : (
                  <>
                    <DetailItem type="error" text={`Fichier LLMs.txt — non détecté sur ${extractDomain(url)}`} />
                    <DetailItem type="warning" text="Fichier robots.txt — crawl partiellement restreint pour certains bots IA" />
                    <DetailItem type="warning" text="Balises title perfectibles pour le référencement sur les IA génératives" />
                    <DetailItem type="warning" text="Meta descriptions optimisables pour améliorer les citations IA" />
                    <DetailItem type="warning" text="Structure Hn à améliorer pour faciliter l'extraction d'informations" />
                    <DetailItem type="error" text="Code HTML pouvant être simplifié pour une meilleure lecture par les IA" />
                  </>
                )}
              </DetailCard>

              {/* ── Citations sociales ── */}
              <DetailCard
                title="Citations sociales"
                score={scores.social}
                icon={<Users className="w-5 h-5" style={{ color: getScoreColor(scores.social) }} />}
                conclusion={
                  scores.social >= 80 ? (
                    <>
                      <p>Votre présence sur les plateformes sociales clés est excellente. Les signaux de citation sont forts et renforcent significativement votre visibilité IA.</p>
                      <p>Points forts :</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Mentions fréquentes sur Reddit et forums spécialisés</li>
                        <li>Présence LinkedIn influente et active</li>
                        <li>Vidéos YouTube avec transcription optimisée</li>
                        <li>Présence Wikipédia bien établie</li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <p>Les citations sociales représentent une part majeure des signaux exploités par les IA génératives.</p>
                      <p>Il est stratégique de :</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Développer une page Wikipédia</li>
                        <li>Influencer des discussions Reddit pertinentes</li>
                        <li>Renforcer la présence LinkedIn</li>
                        <li>Produire des vidéos YouTube avec transcription activée</li>
                      </ul>
                    </>
                  )
                }
              >
                {scores.social >= 80 ? (
                  <>
                    <SocialItem type="success" platform="reddit" text="Présence forte sur Reddit — mentions régulières dans les discussions pertinentes" />
                    <SocialItem type="success" platform="wikipedia" text="Page Wikipédia bien référencée et à jour" />
                    <SocialItem type="success" platform="linkedin" text="Influence LinkedIn établie, renforçant la crédibilité IA" />
                    <SocialItem type="success" platform="youtube" text="Vidéos YouTube avec transcription activée et bien indexées" />
                  </>
                ) : (
                  <>
                    <SocialItem type="warning" platform="reddit" text="Présence limitée sur Reddit — peu de mentions dans les discussions pertinentes" />
                    <SocialItem type="error" platform="wikipedia" text="Absence ou faiblesse de la page Wikipédia associée" />
                    <SocialItem type="warning" platform="linkedin" text="Influence LinkedIn insuffisante pour renforcer la crédibilité IA" />
                    <SocialItem type="error" platform="youtube" text="Manque de vidéos YouTube avec transcription activée" />
                  </>
                )}
              </DetailCard>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 bg-gray-50/50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
              <h2 className="font-jakarta text-2xl md:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-b from-[#000000] to-[#001354] bg-clip-text text-transparent">
                  Obtenez votre audit GEO complet
                </span>
              </h2>
              <p className="text-[#010D3E]/60 font-inter mb-8 max-w-lg mx-auto leading-relaxed">
                Nos experts analysent en profondeur votre visibilité IA et construisent un plan d'action sur-mesure pour améliorer votre référencement sur les moteurs génératifs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 h-12 px-8 rounded-xl font-inter font-normal text-base"
                >
                  <Link to="/contact#contact-form">
                    Demander un audit complet
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  onClick={() => { setPhase("input"); setUrl(""); setScores(null); setShowCalendly(false); }}
                  variant="ghost"
                  className="text-[#0043F1] hover:text-[#0043F1]/80 hover:bg-transparent h-12 px-6 font-inter font-normal text-base"
                >
                  Tester un autre site
                </Button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ─── CALENDLY POPUP ─────────────────────────────── */}
      {showCalendly && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center">
            <button
              onClick={() => setShowCalendly(false)}
              className="absolute top-4 right-4 text-[#010D3E]/40 hover:text-[#010D3E] transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-14 h-14 rounded-full bg-[#0043F1]/10 flex items-center justify-center mx-auto mb-5">
              <img src="/favicon.png" alt="Archipel" className="w-7 h-7 object-contain" />
            </div>
            <h3 className="font-jakarta text-xl font-bold text-[#010D3E] mb-3">
              Envie d'aller plus loin ?
            </h3>
            <p className="text-sm text-[#010D3E]/60 font-inter mb-6 leading-relaxed">
              Réservez un appel stratégique avec nos experts GEO pour transformer ces recommandations en plan d'action concret.
            </p>
            <Button
              asChild
              className="bg-[#0043F1] text-white hover:bg-[#0043F1]/90 h-12 px-8 rounded-xl font-inter font-normal text-base w-full"
            >
              <a href="https://calendly.com/michael-archipel/audit-geo-par-archipel" target="_blank" rel="noopener noreferrer">
                Prendre rendez-vous
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <button
              onClick={() => setShowCalendly(false)}
              className="mt-4 text-sm text-[#010D3E]/40 hover:text-[#010D3E]/60 font-inter transition-colors"
            >
              Non merci, pas maintenant
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SimulateurAuditGeo;
