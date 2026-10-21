"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { liesTheme, setzeTheme, type Theme } from "./theme";

const OPTIONEN: { id: Theme; titel: string; icon: typeof Sun }[] = [
  { id: "auto", titel: "Automatisch", icon: Monitor },
  { id: "hell", titel: "Hell", icon: Sun },
  { id: "dunkel", titel: "Dunkel", icon: Moon },
];

export function ThemeWahl() {
  const [theme, setTheme] = useState<Theme>("auto");

  useEffect(() => {
    setTheme(liesTheme());
    const neu = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener("cockpit:theme", neu);
    return () => window.removeEventListener("cockpit:theme", neu);
  }, []);

  return (
    <div role="radiogroup" aria-label="Erscheinungsbild" className="flex flex-wrap gap-1 rounded-[14px] bg-[var(--fill)] p-1">
      {OPTIONEN.map((o) => {
        const Icon = o.icon;
        const aktiv = theme === o.id;
        return (
          <button
            key={o.id}
            role="radio"
            aria-checked={aktiv}
            onClick={() => setzeTheme(o.id)}
            className={`t-subhead flex min-h-[44px] items-center gap-2 rounded-[10px] px-4 ${
              aktiv ? "bg-[var(--surface)] font-semibold shadow-[var(--shadow)]" : "text-2"
            }`}
          >
            <Icon size={17} aria-hidden /> {o.titel}
          </button>
        );
      })}
    </div>
  );
}
