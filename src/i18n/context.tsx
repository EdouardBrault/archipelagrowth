import { createContext, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Language, Translations } from "./types";
import { en } from "./translations/en";
import { it } from "./translations/it";

const translations: Record<Language, Translations> = { en, it };

interface LanguageContextValue {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
  localePath: (path: string) => string;
  languages: Array<{ code: Language; label: string; flag: string }>;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const SUPPORTED_LANGUAGES: Array<{ code: Language; label: string; flag: string }> = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

export function getLanguageFromPath(pathname: string): Language {
  if (pathname.startsWith("/it/") || pathname === "/it") return "it";
  return "en";
}

export function stripLanguagePrefix(pathname: string): string {
  if (pathname.startsWith("/it/")) return pathname.slice(3);
  if (pathname === "/it") return "/";
  return pathname;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const language = getLanguageFromPath(location.pathname);
  const t = translations[language];

  const setLanguage = (lang: Language) => {
    const basePath = stripLanguagePrefix(location.pathname);
    const hash = location.hash;
    if (lang === "en") {
      navigate(basePath + hash);
    } else {
      navigate(`/${lang}${basePath}` + hash);
    }
  };

  const localePath = (path: string) => {
    if (language === "en") return path;
    return `/it${path}`;
  };

  const value = useMemo(
    () => ({ language, t, setLanguage, localePath, languages: SUPPORTED_LANGUAGES }),
    [language, location.pathname]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
