"use client";

import { useEffect, useState, useTransition } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { Aufgabe } from "@/brain/schema";
import { aendereAufgabe } from "@/brain/aktionen";
import { BEREICHE, STATUS, UMSATZHEBEL, ZUSTAENDIGE, datumDeutsch, istUeberfaellig, prioritaet } from "@/brain/regeln";
import { MetaPille, PrioritaetPille, StatusPille } from "./Pillen";

type Feld = Parameters<typeof aendereAufgabe>[1];

function jaNein(w: boolean | null) {
  return w === null ? "" : w ? "ja" : "nein";
}

export function AufgabenZeile({ a, heute, offenStart = false }: { a: Aufgabe; heute: string; offenStart?: boolean }) {
  const [offen, setOffen] = useState(offenStart);
  useEffect(() => {
    if (offenStart) setOffen(true);
  }, [offenStart]);
  const [laeuft, starte] = useTransition();
  const [fehler, setFehler] = useState<string | null>(null);
  const p = prioritaet(a);
  const erledigt = a.status === "erledigt";
  const ueberfaellig = istUeberfaellig(a, heute);

  const speichere = (feld: Feld, wert: string | null) => {
    setFehler(null);
    starte(async () => {
      try {
        await aendereAufgabe(a.id, feld, wert);
      } catch (e) {
        setFehler(e instanceof Error ? e.message : "Speichern fehlgeschlagen");
      }
    });
  };

  const detailId = `detail-${a.id}`;

  return (
    <li id={a.id} className={`scroll-mt-24 ${laeuft ? "opacity-70" : ""}`}>
      <div className="flex items-start gap-3 px-4 py-3">
        <button
          aria-label={erledigt ? `${a.aufgabe} wieder öffnen` : `${a.aufgabe} erledigen`}
          aria-pressed={erledigt}
          onClick={() => speichere("status", erledigt ? "offen" : "erledigt")}
          className="-m-2.5 flex h-11 w-11 shrink-0 items-center justify-center"
        >
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors"
            style={{
              borderColor: erledigt ? "var(--green)" : "var(--label-3)",
              background: erledigt ? "var(--green)" : "transparent",
            }}
          >
            {erledigt && <Check size={14} strokeWidth={3} color="#fff" />}
          </span>
        </button>

        <button
          className="min-w-0 flex-1 rounded-[10px] text-left"
          aria-expanded={offen}
          aria-controls={detailId}
          onClick={() => setOffen((o) => !o)}
        >
          <div className="flex items-start gap-2">
            <span className={`t-body flex-1 ${erledigt ? "text-2 line-through" : ""}`}>{a.aufgabe}</span>
            <ChevronDown
              size={18}
              aria-hidden
              className={`text-3 mt-0.5 shrink-0 transition-transform ${offen ? "rotate-180" : ""}`}
            />
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {!erledigt && <PrioritaetPille p={p} />}
            {a.status !== "offen" && <StatusPille status={a.status} />}
            {a.partner.map((x) => (
              <MetaPille key={x}>{x}</MetaPille>
            ))}
            {a.umsatzhebel && <MetaPille>Hebel: {a.umsatzhebel}</MetaPille>}
            {a.faelligAm && <MetaPille warnung={ueberfaellig}>{ueberfaellig ? "überfällig " : "fällig "}{datumDeutsch(a.faelligAm)}</MetaPille>}
            {a.zustaendig && a.zustaendig !== "Danny" && <MetaPille>{a.zustaendig}</MetaPille>}
          </div>
          {a.naechsterSchritt && !offen && <p className="t-subhead text-2 mt-1.5 line-clamp-1">{a.naechsterSchritt}</p>}
        </button>
      </div>

      {offen && (
        <div id={detailId} className="einblenden grid gap-3 border-t border-[var(--separator)] bg-[var(--surface-2)]/40 px-4 py-4 sm:grid-cols-2 lg:grid-cols-4">
          <Auswahl label="Status" wert={a.status} optionen={[...STATUS]} onChange={(w) => speichere("status", w)} />
          <Auswahl label="Wichtig" wert={jaNein(a.wichtig)} optionen={["ja", "nein"]} leer="offen" onChange={(w) => speichere("wichtig", w)} />
          <Auswahl label="Dringend" wert={jaNein(a.dringend)} optionen={["ja", "nein"]} leer="offen" onChange={(w) => speichere("dringend", w)} />
          <Auswahl label="Umsatzhebel" wert={a.umsatzhebel ?? ""} optionen={[...UMSATZHEBEL]} leer="–" onChange={(w) => speichere("umsatzhebel", w)} />
          <label className="flex flex-col gap-1">
            <span className="t-footnote text-2">Fällig am</span>
            <input
              type="date"
              className="feld"
              defaultValue={a.faelligAm ?? ""}
              onChange={(e) => speichere("faelligAm", e.target.value)}
            />
          </label>
          <Auswahl label="Zuständig" wert={a.zustaendig ?? ""} optionen={[...ZUSTAENDIGE]} leer="–" onChange={(w) => speichere("zustaendig", w)} />
          <Auswahl label="Bereich" wert={a.bereich ?? ""} optionen={[...BEREICHE]} leer="–" onChange={(w) => speichere("bereich", w)} />
          <Textfeld label="Wartet auf / seit" wert={a.wartetAuf} onSave={(w) => speichere("wartetAuf", w)} />
          <div className="sm:col-span-2 lg:col-span-4">
            <Textfeld label="Nächster Schritt" wert={a.naechsterSchritt} mehrzeilig onSave={(w) => speichere("naechsterSchritt", w)} />
          </div>
          <p className="t-footnote text-2 sm:col-span-2 lg:col-span-4">
            {a.id} · Quelle: {a.quelle ?? "–"} · erstellt {datumDeutsch(a.erstelltAm)}
            {a.projekt ? ` · Projekt: ${a.projekt}` : ""}
          </p>
          {fehler && (
            <p role="alert" className="t-subhead sm:col-span-2 lg:col-span-4" style={{ color: "var(--red-text)" }}>
              {fehler}
            </p>
          )}
        </div>
      )}
    </li>
  );
}

function Auswahl({
  label,
  wert,
  optionen,
  leer,
  onChange,
}: {
  label: string;
  wert: string;
  optionen: string[];
  leer?: string;
  onChange: (w: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="t-footnote text-2">{label}</span>
      <select className="feld" value={wert} onChange={(e) => onChange(e.target.value)}>
        {leer !== undefined && <option value="">{leer}</option>}
        {optionen.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function Textfeld({
  label,
  wert,
  mehrzeilig,
  onSave,
}: {
  label: string;
  wert: string | null;
  mehrzeilig?: boolean;
  onSave: (w: string) => void;
}) {
  const speichern = (neu: string) => {
    if (neu.trim() !== (wert ?? "")) onSave(neu);
  };
  return (
    <label className="flex flex-col gap-1">
      <span className="t-footnote text-2">{label}</span>
      {mehrzeilig ? (
        <textarea
          className="feld min-h-[88px] py-2.5"
          defaultValue={wert ?? ""}
          onBlur={(e) => speichern(e.target.value)}
        />
      ) : (
        <input className="feld" defaultValue={wert ?? ""} onBlur={(e) => speichern(e.target.value)} />
      )}
    </label>
  );
}
