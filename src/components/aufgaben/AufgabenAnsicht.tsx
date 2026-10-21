"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Search } from "lucide-react";
import type { Aufgabe } from "@/brain/schema";
import { PRIORITAET_ERKLAERUNG, PRIORITAET_NAME, ZUSTAENDIGE, prioritaet, type Prioritaet } from "@/brain/regeln";
import { AufgabenZeile } from "./AufgabenZeile";
import { NeueAufgabe } from "./NeueAufgabe";

const ANSICHTEN = [
  { id: "aktiv", titel: "Aktiv", status: ["offen", "in Arbeit"] },
  { id: "wartet", titel: "Wartet", status: ["wartet", "wartet auf Freigabe"] },
  { id: "pruefen", titel: "Prüfen", status: ["prüfen"] },
  { id: "spaeter", titel: "Später", status: ["später"] },
  { id: "erledigt", titel: "Erledigt", status: ["erledigt"] },
  { id: "alle", titel: "Alle", status: null },
] as const;

type AnsichtId = (typeof ANSICHTEN)[number]["id"];

const GRUPPEN: (Prioritaet | null)[] = [1, 2, 3, 4, null];

export function AufgabenAnsicht({ aufgaben, partner, heute }: { aufgaben: Aufgabe[]; partner: string[]; heute: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const [ansicht, setAnsicht] = useState<AnsichtId>("aktiv");
  const [partnerFilter, setPartnerFilter] = useState("");
  const [zustaendigFilter, setZustaendigFilter] = useState("");
  const [suche, setSuche] = useState("");
  const [neuOffen, setNeuOffen] = useState(params.get("neu") === "1");
  const [ziel, setZiel] = useState<string | null>(null);

  // Sprung aus der Befehlspalette: #AUF-0001 öffnet die Aufgabe in „Alle“
  useEffect(() => {
    const anker = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id && aufgaben.some((a) => a.id === id)) {
        setAnsicht("alle");
        setZiel(id);
        requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ block: "center" }));
      }
    };
    anker();
    window.addEventListener("hashchange", anker);
    return () => window.removeEventListener("hashchange", anker);
  }, [aufgaben]);

  useEffect(() => {
    if (params.get("neu") === "1") setNeuOffen(true);
  }, [params]);

  const zaehler = useMemo(() => {
    const z: Record<string, number> = {};
    for (const v of ANSICHTEN) {
      z[v.id] = v.status ? aufgaben.filter((a) => (v.status as readonly string[]).includes(a.status)).length : aufgaben.length;
    }
    return z;
  }, [aufgaben]);

  const gefiltert = useMemo(() => {
    const v = ANSICHTEN.find((x) => x.id === ansicht)!;
    const s = suche.trim().toLowerCase();
    return aufgaben.filter(
      (a) =>
        (!v.status || (v.status as readonly string[]).includes(a.status)) &&
        (!partnerFilter || a.partner.includes(partnerFilter) || (partnerFilter !== "C&E intern" && a.partner.includes("Alle Partner"))) &&
        (!zustaendigFilter || a.zustaendig === zustaendigFilter) &&
        (!s || `${a.aufgabe} ${a.naechsterSchritt ?? ""} ${a.id}`.toLowerCase().includes(s)),
    );
  }, [aufgaben, ansicht, partnerFilter, zustaendigFilter, suche]);

  const schliesseNeu = () => {
    setNeuOffen(false);
    if (params.get("neu")) router.replace("/aufgaben");
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Ansicht" className="flex flex-wrap gap-1 rounded-[14px] bg-[var(--fill)] p-1">
          {ANSICHTEN.map((v) => (
            <button
              key={v.id}
              role="tab"
              aria-selected={ansicht === v.id}
              onClick={() => setAnsicht(v.id)}
              className={`t-subhead flex min-h-[44px] items-center gap-1.5 rounded-[10px] px-3.5 font-medium transition-colors ${
                ansicht === v.id ? "bg-[var(--surface)] font-semibold shadow-[var(--shadow)]" : "text-2 hover:text-[var(--label)]"
              }`}
            >
              {v.titel}
              <span className="t-caption1 text-2 tabular-nums">{zaehler[v.id]}</span>
            </button>
          ))}
        </div>
        <button className="knopf knopf-primaer ml-auto" onClick={() => setNeuOffen(true)}>
          <Plus size={18} /> Neue Aufgabe
        </button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_220px_220px]">
        <label className="relative">
          <span className="sr-only">Aufgaben durchsuchen</span>
          <Search size={18} className="text-3 pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" aria-hidden />
          <input className="feld pl-10" placeholder="Durchsuchen" value={suche} onChange={(e) => setSuche(e.target.value)} />
        </label>
        <label>
          <span className="sr-only">Partner</span>
          <select className="feld" value={partnerFilter} onChange={(e) => setPartnerFilter(e.target.value)}>
            <option value="">Alle Partner</option>
            {partner.map((p) => (
              <option key={p}>{p}</option>
            ))}
            <option>C&amp;E intern</option>
          </select>
        </label>
        <label>
          <span className="sr-only">Zuständig</span>
          <select className="feld" value={zustaendigFilter} onChange={(e) => setZustaendigFilter(e.target.value)}>
            <option value="">Alle Zuständigen</option>
            {ZUSTAENDIGE.map((z) => (
              <option key={z}>{z}</option>
            ))}
          </select>
        </label>
      </div>

      {gefiltert.length === 0 && (
        <div className="card t-body text-2 px-6 py-10 text-center">Keine Aufgaben in dieser Ansicht.</div>
      )}

      <div className="flex flex-col gap-6">
        {GRUPPEN.map((g) => {
          const liste = gefiltert.filter((a) => (a.status === "erledigt" ? g === null : prioritaet(a) === g));
          if (liste.length === 0) return null;
          const titel =
            g === null
              ? ansicht === "erledigt"
                ? "Erledigt"
                : "Noch nicht eingeschätzt"
              : `${g} ${PRIORITAET_NAME[g]}`;
          const erklaerung = g === null ? (ansicht === "erledigt" ? "" : "Wichtig und Dringend setzen") : PRIORITAET_ERKLAERUNG[g];
          return (
            <section key={String(g)} aria-labelledby={`gruppe-${g}`}>
              <h2 id={`gruppe-${g}`} className="mb-2 flex items-baseline gap-2 px-1">
                <span className="t-title3">{titel}</span>
                <span className="t-subhead text-2">
                  {liste.length} · {erklaerung}
                </span>
              </h2>
              <ul className="gruppe card">
                {liste.map((a) => (
                  <AufgabenZeile key={a.id} a={a} heute={heute} offenStart={ziel === a.id} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      {neuOffen && (
        <NeueAufgabe
          partner={partner}
          onSchliessen={schliesseNeu}
          onAngelegt={(id) => {
            setAnsicht("aktiv");
            setPartnerFilter("");
            setZustaendigFilter("");
            setSuche("");
            setZiel(id);
            setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "center" }), 300);
          }}
        />
      )}
    </>
  );
}
