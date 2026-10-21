import "server-only";
import { asc, desc, sql } from "drizzle-orm";
import { gehirn } from "./db";
import { agenten, aufgaben, ereignisse, freigaben, partner, ziele } from "./schema";
import { vergleicheAufgaben } from "./regeln";

export function alleAufgaben() {
  return gehirn().select().from(aufgaben).all().sort(vergleicheAufgaben);
}

export function alleZiele() {
  return gehirn().select().from(ziele).orderBy(asc(ziele.id)).all();
}

export function allePartner() {
  return gehirn().select().from(partner).orderBy(asc(partner.name)).all();
}

export function alleAgenten() {
  return gehirn().select().from(agenten).orderBy(asc(agenten.ebene), sql`rowid`).all();
}

export function offeneFreigaben() {
  return gehirn().select().from(freigaben).where(sql`${freigaben.status} = 'wartet'`).all();
}

export function letzteEreignisse(anzahl = 20) {
  return gehirn().select().from(ereignisse).orderBy(desc(ereignisse.id)).limit(anzahl).all();
}

export function naechsteAufgabenId() {
  const zeile = gehirn()
    .select({ max: sql<string | null>`max(${aufgaben.id})` })
    .from(aufgaben)
    .get();
  const zahl = zeile?.max ? Number(zeile.max.replace(/\D/g, "")) + 1 : 1;
  return `AUF-${String(zahl).padStart(4, "0")}`;
}
