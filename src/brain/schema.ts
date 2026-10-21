import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

// Das Gehirn: die einzige Quelle für alles, was Danny und die Agenten wissen und tun.

export const aufgaben = sqliteTable("aufgaben", {
  id: text("id").primaryKey(),
  aufgabe: text("aufgabe").notNull(),
  partner: text("partner", { mode: "json" }).$type<string[]>().notNull().default([]),
  bereich: text("bereich"),
  wichtig: integer("wichtig", { mode: "boolean" }),
  dringend: integer("dringend", { mode: "boolean" }),
  umsatzhebel: text("umsatzhebel"),
  faelligAm: text("faellig_am"),
  zustaendig: text("zustaendig"),
  status: text("status").notNull().default("offen"),
  wartetAuf: text("wartet_auf"),
  naechsterSchritt: text("naechster_schritt"),
  quelle: text("quelle"),
  projekt: text("projekt"),
  erstelltAm: text("erstellt_am").notNull(),
  aktualisiertAm: text("aktualisiert_am").notNull(),
});

export const ziele = sqliteTable("ziele", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  ziel: text("ziel").notNull(),
  einheit: text("einheit").notNull(),
  soll: real("soll").notNull(),
  ist: real("ist"),
  zeitraum: text("zeitraum"),
  quelle: text("quelle"),
});

export const partner = sqliteTable("partner", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status").notNull().default("aktiv"),
  driveOrdner: text("drive_ordner"),
  web: text("web"),
  quellen: text("quellen", { mode: "json" }).$type<string[]>().notNull().default([]),
  notizen: text("notizen"),
});

export const agenten = sqliteTable("agenten", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ebene: integer("ebene").notNull(),
  rolle: text("rolle").notNull(),
  beschreibung: text("beschreibung").notNull(),
  werkzeuge: text("werkzeuge", { mode: "json" }).$type<string[]>().notNull().default([]),
  status: text("status").notNull().default("geplant"),
  phase: integer("phase"),
  letzteAktion: text("letzte_aktion"),
  aktualisiertAm: text("aktualisiert_am"),
});

export const uebergaben = sqliteTable("uebergaben", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  vonAgent: text("von_agent").notNull(),
  anAgent: text("an_agent").notNull(),
  auftrag: text("auftrag").notNull(),
  status: text("status").notNull().default("offen"),
  aufgabeId: text("aufgabe_id"),
  erstelltAm: text("erstellt_am").notNull(),
  erledigtAm: text("erledigt_am"),
});

export const freigaben = sqliteTable("freigaben", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  agent: text("agent").notNull(),
  art: text("art").notNull(),
  titel: text("titel").notNull(),
  inhalt: text("inhalt"),
  status: text("status").notNull().default("wartet"),
  erstelltAm: text("erstellt_am").notNull(),
  entschiedenAm: text("entschieden_am"),
});

export const gespraeche = sqliteTable("gespraeche", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  agent: text("agent").notNull(),
  datum: text("datum").notNull(),
  zusammenfassung: text("zusammenfassung").notNull(),
  todos: text("todos"),
  quelle: text("quelle"),
});

export const ereignisse = sqliteTable("ereignisse", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  zeit: text("zeit").notNull(),
  akteur: text("akteur").notNull(),
  aktion: text("aktion").notNull(),
  objekt: text("objekt"),
  details: text("details"),
});

export const gedaechtnis = sqliteTable("gedaechtnis", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  art: text("art").notNull(),
  inhalt: text("inhalt").notNull(),
  bezug: text("bezug"),
  erstelltAm: text("erstellt_am").notNull(),
});

export type Aufgabe = typeof aufgaben.$inferSelect;
export type Ziel = typeof ziele.$inferSelect;
export type Partner = typeof partner.$inferSelect;
export type Agent = typeof agenten.$inferSelect;
export type Ereignis = typeof ereignisse.$inferSelect;
