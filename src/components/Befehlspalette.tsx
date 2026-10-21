"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CircleDot, Moon, Plus, Search } from "lucide-react";
import { NAVIGATION } from "./navigation";
import { setzeTheme } from "./theme";

type Eintrag = {
  id: string;
  titel: string;
  untertitel?: string;
  suchtext?: string;
  gruppe: string;
  ausfuehren: () => void;
};

export function Befehlspalette({ aufgaben }: { aufgaben: { id: string; aufgabe: string; status: string; suchtext: string }[] }) {
  const router = useRouter();
  const [offen, setOffen] = useState(false);
  const [suche, setSuche] = useState("");
  const [auswahl, setAuswahl] = useState(0);
  const eingabe = useRef<HTMLInputElement>(null);
  const vorherFokus = useRef<HTMLElement | null>(null);

  const oeffnen = useCallback(() => {
    vorherFokus.current = document.activeElement as HTMLElement | null;
    setSuche("");
    setAuswahl(0);
    setOffen(true);
  }, []);

  const schliessen = useCallback(() => {
    setOffen(false);
    vorherFokus.current?.focus?.();
  }, []);

  useEffect(() => {
    const taste = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (offen) schliessen();
        else oeffnen();
        return;
      }
      if (mod && /^[1-7]$/.test(e.key)) {
        const ziel = NAVIGATION.find((n) => n.kurzbefehl === e.key);
        if (ziel) {
          e.preventDefault();
          router.push(ziel.href);
        }
      }
    };
    const ereignis = () => oeffnen();
    window.addEventListener("keydown", taste);
    window.addEventListener("cockpit:palette", ereignis);
    return () => {
      window.removeEventListener("keydown", taste);
      window.removeEventListener("cockpit:palette", ereignis);
    };
  }, [offen, oeffnen, schliessen, router]);

  useEffect(() => {
    if (offen) eingabe.current?.focus();
  }, [offen]);

  const eintraege = useMemo<Eintrag[]>(() => {
    const geh = (href: string) => () => {
      schliessen();
      router.push(href);
    };
    const liste: Eintrag[] = [
      { id: "neu", titel: "Neue Aufgabe", gruppe: "Aktionen", ausfuehren: geh("/aufgaben?neu=1") },
      {
        id: "theme",
        titel: "Erscheinungsbild wechseln",
        untertitel: "Hell, Dunkel oder automatisch",
        gruppe: "Aktionen",
        ausfuehren: () => {
          setzeTheme("wechseln");
          schliessen();
        },
      },
      ...NAVIGATION.map((n) => ({
        id: n.href,
        titel: n.titel,
        untertitel: `⌘${n.kurzbefehl}`,
        gruppe: "Gehe zu",
        ausfuehren: geh(n.href),
      })),
      ...aufgaben.map((a) => ({
        id: a.id,
        titel: a.aufgabe,
        untertitel: `${a.id} · ${a.status}`,
        suchtext: a.suchtext,
        gruppe: "Aufgaben",
        ausfuehren: geh(`/aufgaben#${a.id}`),
      })),
    ];
    const s = suche.trim().toLowerCase();
    if (!s) return liste.filter((e) => e.gruppe !== "Aufgaben");
    return liste.filter((e) => `${e.titel} ${e.untertitel ?? ""} ${e.suchtext ?? ""}`.toLowerCase().includes(s)).slice(0, 30);
  }, [aufgaben, suche, router, schliessen]);

  useEffect(() => setAuswahl(0), [suche]);

  if (!offen) return null;

  const tasteInListe = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAuswahl((a) => Math.min(a + 1, eintraege.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAuswahl((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      eintraege[auswahl]?.ausfuehren();
    } else if (e.key === "Escape") {
      e.preventDefault();
      schliessen();
    }
  };

  let letzteGruppe = "";

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/35 px-4 pt-[12vh]" onClick={schliessen}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Befehlspalette"
        className="glass-dicht einblenden w-full max-w-[640px] overflow-hidden rounded-[20px] border shadow-[var(--shadow-hover)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={tasteInListe}
      >
        <div className="flex items-center gap-3 border-b border-[var(--separator)] px-4">
          <Search size={20} className="text-2" aria-hidden />
          <input
            ref={eingabe}
            value={suche}
            onChange={(e) => setSuche(e.target.value)}
            placeholder="Suchen, springen, anlegen …"
            aria-label="Suchbegriff"
            aria-controls="palette-liste"
            aria-activedescendant={eintraege[auswahl] ? `palette-${auswahl}` : undefined}
            className="t-title3 min-h-[56px] flex-1 bg-transparent font-normal outline-none focus-visible:shadow-none"
          />
          <kbd className="t-caption1 text-2">esc</kbd>
        </div>
        <ul id="palette-liste" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
          {eintraege.length === 0 && <li className="t-subhead text-2 px-3 py-4">Nichts gefunden.</li>}
          {eintraege.map((e, i) => {
            const kopf = e.gruppe !== letzteGruppe ? e.gruppe : null;
            letzteGruppe = e.gruppe;
            const Icon = e.id === "neu" ? Plus : e.id === "theme" ? Moon : CircleDot;
            return (
              <li key={e.id} role="presentation">
                {kopf && <div className="t-caption1 text-2 px-3 pb-1 pt-3 font-semibold uppercase tracking-wide">{kopf}</div>}
                <button
                  id={`palette-${i}`}
                  role="option"
                  aria-selected={i === auswahl}
                  onMouseEnter={() => setAuswahl(i)}
                  onClick={e.ausfuehren}
                  className={`flex w-full min-h-[44px] items-center gap-3 rounded-[12px] px-3 text-left ${
                    i === auswahl ? "bg-[var(--blue)] text-white" : ""
                  }`}
                >
                  <Icon size={18} aria-hidden className={i === auswahl ? "" : "text-2"} />
                  <span className="t-body flex-1 truncate">{e.titel}</span>
                  {e.untertitel && (
                    <span className={`t-footnote shrink-0 ${i === auswahl ? "text-white/85" : "text-2"}`}>{e.untertitel}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
