"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { gehirn } from "./db";
import { aufgaben, ereignisse, ziele } from "./schema";
import { naechsteAufgabenId } from "./abfragen";
import { BEREICHE, STATUS, UMSATZHEBEL } from "./regeln";

type AufgabenFeld =
  | "status"
  | "wichtig"
  | "dringend"
  | "umsatzhebel"
  | "faelligAm"
  | "zustaendig"
  | "naechsterSchritt"
  | "wartetAuf"
  | "bereich"
  | "aufgabe";

const FELD_NAME: Record<AufgabenFeld, string> = {
  status: "Status",
  wichtig: "Wichtig",
  dringend: "Dringend",
  umsatzhebel: "Umsatzhebel",
  faelligAm: "Fällig am",
  zustaendig: "Zuständig",
  naechsterSchritt: "Nächster Schritt",
  wartetAuf: "Wartet auf",
  bereich: "Bereich",
  aufgabe: "Aufgabe",
};

function protokolliere(aktion: string, objekt: string, details?: string) {
  gehirn()
    .insert(ereignisse)
    .values({ zeit: new Date().toISOString(), akteur: "Danny", aktion, objekt, details })
    .run();
}

function leerZuNull(wert: string | null | undefined) {
  const t = (wert ?? "").trim();
  return t === "" ? null : t;
}

function bool(wert: string | null) {
  if (wert === "ja") return true;
  if (wert === "nein") return false;
  return null;
}

export async function aendereAufgabe(id: string, feld: AufgabenFeld, rohwert: string | null) {
  let wert: string | boolean | null;
  switch (feld) {
    case "wichtig":
    case "dringend":
      wert = bool(rohwert);
      break;
    case "status":
      if (!STATUS.includes(rohwert as (typeof STATUS)[number])) throw new Error("Unbekannter Status");
      wert = rohwert;
      break;
    case "umsatzhebel":
      wert = leerZuNull(rohwert);
      if (wert && !UMSATZHEBEL.includes(wert as (typeof UMSATZHEBEL)[number])) throw new Error("Unbekannter Umsatzhebel");
      break;
    case "bereich":
      wert = leerZuNull(rohwert);
      if (wert && !BEREICHE.includes(wert as (typeof BEREICHE)[number])) throw new Error("Unbekannter Bereich");
      break;
    case "faelligAm":
      wert = leerZuNull(rohwert);
      if (wert && !/^\d{4}-\d{2}-\d{2}$/.test(wert)) throw new Error("Datum im Format JJJJ-MM-TT");
      break;
    case "aufgabe":
      wert = leerZuNull(rohwert);
      if (!wert) throw new Error("Aufgabe darf nicht leer sein");
      break;
    default:
      wert = leerZuNull(rohwert);
  }

  gehirn()
    .update(aufgaben)
    .set({ [feld]: wert, aktualisiertAm: new Date().toISOString() })
    .where(eq(aufgaben.id, id))
    .run();

  const anzeige = typeof wert === "boolean" ? (wert ? "ja" : "nein") : (wert ?? "leer");
  protokolliere("Aufgabe geändert", id, `${FELD_NAME[feld]}: ${anzeige}`);
  revalidatePath("/", "layout");
}

export async function legeAufgabeAn(formular: FormData): Promise<string | null> {
  const titel = leerZuNull(formular.get("aufgabe") as string);
  if (!titel) return null;
  const id = naechsteAufgabenId();
  const zeit = new Date().toISOString();
  const partnerWert = leerZuNull(formular.get("partner") as string);

  gehirn()
    .insert(aufgaben)
    .values({
      id,
      aufgabe: titel,
      partner: partnerWert ? [partnerWert] : [],
      bereich: leerZuNull(formular.get("bereich") as string),
      wichtig: bool(formular.get("wichtig") as string),
      dringend: bool(formular.get("dringend") as string),
      umsatzhebel: leerZuNull(formular.get("umsatzhebel") as string),
      faelligAm: leerZuNull(formular.get("faelligAm") as string),
      zustaendig: leerZuNull(formular.get("zustaendig") as string) ?? "Danny",
      status: "offen",
      naechsterSchritt: leerZuNull(formular.get("naechsterSchritt") as string),
      quelle: "Cockpit",
      erstelltAm: zeit.slice(0, 10),
      aktualisiertAm: zeit,
    })
    .run();

  protokolliere("Aufgabe angelegt", id, titel);
  revalidatePath("/", "layout");
  return id;
}

export async function setzeZielIst(id: number, rohwert: string) {
  const t = rohwert.trim().replace(/\./g, "").replace(",", ".");
  const wert = t === "" ? null : Number(t);
  if (wert !== null && Number.isNaN(wert)) throw new Error("Bitte eine Zahl eingeben");
  gehirn().update(ziele).set({ ist: wert }).where(eq(ziele.id, id)).run();
  protokolliere("Ziel aktualisiert", `Ziel ${id}`, `Ist: ${wert ?? "leer"}`);
  revalidatePath("/", "layout");
}
