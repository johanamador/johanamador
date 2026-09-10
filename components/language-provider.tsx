"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { spanish } from "@/lib/translations";

export type Locale = "en" | "es";
const LanguageContext = createContext({
  locale: "en" as Locale,
  setLocale: (_locale: Locale) => {},
  t: (text: string) => text,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-language");
      if (saved === "es" || saved === "en") updateLocale(saved);
    } catch {
      /* The language switch also works when storage is unavailable. */
    }
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title =
      locale === "es"
        ? "Johan Amador | Desarrollador de software | Ingeniero informático"
        : "Johan Amador | Software Developer | Computer Science Engineer";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      locale === "es"
        ? "Johan Amador, desarrollador de software e ingeniero informático en Lima, Perú."
        : "Johan Amador, software developer and Computer Science engineer in Lima, Perú.",
    );
  }, [locale]);
  const setLocale = useCallback((value: Locale) => {
    updateLocale(value);
    try {
      localStorage.setItem("portfolio-language", value);
    } catch {
      /* Optional persistence. */
    }
  }, []);
  const t = useCallback(
    (text: string) => (locale === "es" ? (spanish[text] ?? text) : text),
    [locale],
  );
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
