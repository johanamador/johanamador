"use client";

import { useEffect, useState } from "react";
import { Languages, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage, type Locale } from "@/components/language-provider";
import { CompactSelect } from "@/components/compact-select";

export function AppearanceControls() {
  const { locale, setLocale, t } = useLanguage();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const light = mounted && resolvedTheme === "light";
  return (
    <div className="appearance-controls">
      <CompactSelect
        label={t("Language")}
        value={locale}
        displayValue={locale.toUpperCase()}
        onValueChange={(value) => setLocale(value as Locale)}
        icon={<Languages size={16} aria-hidden="true" />}
        options={[
          { value: "en", label: "English" },
          { value: "es", label: "Español" },
        ]}
      />
      <button
        type="button"
        className="icon-button theme-toggle"
        disabled={!mounted}
        aria-label={t(light ? "Switch to dark theme" : "Switch to light theme")}
        title={t(light ? "Switch to dark theme" : "Switch to light theme")}
        onClick={() => setTheme(light ? "dark" : "light")}
      >
        {light ? (
          <Moon size={17} aria-hidden="true" />
        ) : (
          <Sun size={17} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
