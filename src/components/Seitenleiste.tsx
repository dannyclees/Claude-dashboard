"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Mic, Search, X } from "lucide-react";
import { NAVIGATION } from "./navigation";

export function Seitenleiste() {
  const pfad = usePathname();
  const [offen, setOffen] = useState(false);

  useEffect(() => setOffen(false), [pfad]);

  return (
    <>
      {/* Obere Leiste auf schmalen Bildschirmen */}
      <header className="glass sticky top-0 z-30 flex items-center justify-between border-b px-4 py-1 lg:hidden">
        <button className="knopf" aria-label="Navigation öffnen" onClick={() => setOffen(true)}>
          <Menu size={22} />
        </button>
        <span className="t-headline">Cockpit</span>
        <button
          className="knopf"
          aria-label="Suchen und Befehle"
          onClick={() => window.dispatchEvent(new Event("cockpit:palette"))}
        >
          <Search size={20} />
        </button>
      </header>

      {offen && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setOffen(false)} aria-hidden />
      )}

      <nav
        aria-label="Hauptnavigation"
        className={`glass fixed inset-y-0 left-0 z-50 flex w-[var(--sidebar)] flex-col border-r px-3 pb-4 pt-5 transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          offen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between px-3">
          <div>
            <div className="t-title3">Cockpit</div>
            <div className="t-footnote text-2">Clees &amp; Ernster</div>
          </div>
          <button className="knopf lg:hidden" aria-label="Navigation schließen" onClick={() => setOffen(false)}>
            <X size={22} />
          </button>
        </div>

        <button
          className="mb-3 flex min-h-[44px] items-center gap-2 rounded-[12px] bg-[var(--fill)] px-3 text-left text-[var(--label-2)]"
          onClick={() => window.dispatchEvent(new Event("cockpit:palette"))}
        >
          <Search size={18} />
          <span className="t-subhead flex-1">Suchen</span>
          <kbd className="t-caption1 rounded-md bg-[var(--surface)] px-1.5 py-0.5 font-sans text-[var(--label-2)]">⌘K</kbd>
        </button>

        <ul className="flex flex-col gap-0.5">
          {NAVIGATION.map((punkt) => {
            const aktiv = pfad === punkt.href || pfad.startsWith(punkt.href + "/");
            const Icon = punkt.icon;
            return (
              <li key={punkt.href}>
                <Link
                  href={punkt.href}
                  aria-current={aktiv ? "page" : undefined}
                  className={`flex min-h-[44px] items-center gap-3 rounded-[12px] px-3 transition-colors ${
                    aktiv ? "bg-[var(--fill-2)] font-semibold" : "hover:bg-[var(--fill)]"
                  }`}
                >
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-[8px] text-white"
                    style={{ background: punkt.farbe }}
                    aria-hidden
                  >
                    <Icon size={17} strokeWidth={2.2} />
                  </span>
                  <span className="t-body">{punkt.titel}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto">
          <button
            className="flex w-full min-h-[56px] items-center gap-3 rounded-[16px] bg-[var(--surface)] px-3 text-left shadow-[var(--shadow)]"
            disabled
            aria-describedby="mark-hinweis"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--fill)] text-[var(--label-2)]">
              <Mic size={18} />
            </span>
            <span className="flex-1">
              <span className="t-headline block">Mark</span>
              <span id="mark-hinweis" className="t-footnote text-2 block">
                Stimme folgt in Phase 5
              </span>
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
