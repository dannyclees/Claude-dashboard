// Fachregeln des Gehirns ohne Datenbankzugriff, damit Server und Oberfläche sie teilen.
import type { Aufgabe } from "./schema";

export const STATUS = [
  "offen",
  "in Arbeit",
  "wartet",
  "wartet auf Freigabe",
  "prüfen",
  "später",
  "erledigt",
] as const;

export const BEREICHE = ["Akquise", "Kunde", "Content", "Finanzen", "Strategie", "System"] as const;

export const UMSATZHEBEL = ["hoch", "mittel", "niedrig"] as const;

export const ZUSTAENDIGE = [
  "Danny",
  "Mark",
  "Alex",
  "Organisator",
  "Mail-Assistent",
  "Drive-Agent",
  "Akquise-Agent",
  "Text-Agent",
  "Erklärvideo-Agent",
  "Motion-Design-Agent",
  "Partner-Agent",
  "Claude Code",
] as const;

export type Prioritaet = 1 | 2 | 3 | 4;

export const PRIORITAET_NAME: Record<Prioritaet, string> = {
  1: "Sofort",
  2: "Planen",
  3: "Delegieren",
  4: "Später",
};

export const PRIORITAET_ERKLAERUNG: Record<Prioritaet, string> = {
  1: "wichtig und dringend",
  2: "wichtig, nicht dringend",
  3: "dringend, nicht wichtig",
  4: "weder wichtig noch dringend",
};

// Eisenhower: null heißt „noch nicht eingeschätzt“ oder erledigt.
export function prioritaet(a: Pick<Aufgabe, "wichtig" | "dringend" | "status">): Prioritaet | null {
  if (a.status === "erledigt") return null;
  if (a.wichtig == null || a.dringend == null) return null;
  if (a.wichtig && a.dringend) return 1;
  if (a.wichtig) return 2;
  if (a.dringend) return 3;
  return 4;
}

const HEBEL_GEWICHT: Record<string, number> = { hoch: 0, mittel: 1, niedrig: 2 };
const AKTIV = new Set(["offen", "in Arbeit"]);

// Sortierung für die Liste: Priorität, Umsatzhebel, Fälligkeit, ID.
export function vergleicheAufgaben(a: Aufgabe, b: Aufgabe) {
  const pa = prioritaet(a) ?? 9;
  const pb = prioritaet(b) ?? 9;
  if (pa !== pb) return pa - pb;
  const ha = HEBEL_GEWICHT[a.umsatzhebel ?? ""] ?? 3;
  const hb = HEBEL_GEWICHT[b.umsatzhebel ?? ""] ?? 3;
  if (ha !== hb) return ha - hb;
  const fa = a.faelligAm ?? "9999";
  const fb = b.faelligAm ?? "9999";
  if (fa !== fb) return fa < fb ? -1 : 1;
  return a.id.localeCompare(b.id);
}

// Top 3 des Tages: nur aktive Aufgaben, die eingeschätzt sind.
export function topDrei(liste: Aufgabe[]) {
  return liste
    .filter((a) => AKTIV.has(a.status) && prioritaet(a) !== null)
    .sort(vergleicheAufgaben)
    .slice(0, 3);
}

export function istUeberfaellig(a: Aufgabe, heute: string) {
  return a.status !== "erledigt" && a.faelligAm != null && a.faelligAm < heute;
}

export function heuteIso(zeitzone = "Europe/Luxembourg") {
  return new Intl.DateTimeFormat("sv-SE", { timeZone: zeitzone }).format(new Date());
}

export function datumDeutsch(iso: string | null | undefined) {
  if (!iso) return "";
  const [j, m, t] = iso.slice(0, 10).split("-");
  return `${t}.${m}.${j}`;
}
