// Tabellen des Gehirns. Muss zu schema.ts passen; jede Änderung erhöht SCHEMA_VERSION.
export const SCHEMA_VERSION = 1;

export const CREATE_TABLES = `
CREATE TABLE IF NOT EXISTS meta (
  schluessel TEXT PRIMARY KEY,
  wert TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS aufgaben (
  id TEXT PRIMARY KEY,
  aufgabe TEXT NOT NULL,
  partner TEXT NOT NULL DEFAULT '[]',
  bereich TEXT,
  wichtig INTEGER,
  dringend INTEGER,
  umsatzhebel TEXT,
  faellig_am TEXT,
  zustaendig TEXT,
  status TEXT NOT NULL DEFAULT 'offen',
  wartet_auf TEXT,
  naechster_schritt TEXT,
  quelle TEXT,
  projekt TEXT,
  erstellt_am TEXT NOT NULL,
  aktualisiert_am TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS ziele (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ziel TEXT NOT NULL,
  einheit TEXT NOT NULL,
  soll REAL NOT NULL,
  ist REAL,
  zeitraum TEXT,
  quelle TEXT
);
CREATE TABLE IF NOT EXISTS partner (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'aktiv',
  drive_ordner TEXT,
  web TEXT,
  quellen TEXT NOT NULL DEFAULT '[]',
  notizen TEXT
);
CREATE TABLE IF NOT EXISTS agenten (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  ebene INTEGER NOT NULL,
  rolle TEXT NOT NULL,
  beschreibung TEXT NOT NULL,
  werkzeuge TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'geplant',
  phase INTEGER,
  letzte_aktion TEXT,
  aktualisiert_am TEXT
);
CREATE TABLE IF NOT EXISTS uebergaben (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  von_agent TEXT NOT NULL,
  an_agent TEXT NOT NULL,
  auftrag TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'offen',
  aufgabe_id TEXT,
  erstellt_am TEXT NOT NULL,
  erledigt_am TEXT
);
CREATE TABLE IF NOT EXISTS freigaben (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent TEXT NOT NULL,
  art TEXT NOT NULL,
  titel TEXT NOT NULL,
  inhalt TEXT,
  status TEXT NOT NULL DEFAULT 'wartet',
  erstellt_am TEXT NOT NULL,
  entschieden_am TEXT
);
CREATE TABLE IF NOT EXISTS gespraeche (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent TEXT NOT NULL,
  datum TEXT NOT NULL,
  zusammenfassung TEXT NOT NULL,
  todos TEXT,
  quelle TEXT
);
CREATE TABLE IF NOT EXISTS ereignisse (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  zeit TEXT NOT NULL,
  akteur TEXT NOT NULL,
  aktion TEXT NOT NULL,
  objekt TEXT,
  details TEXT
);
CREATE TABLE IF NOT EXISTS gedaechtnis (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  art TEXT NOT NULL,
  inhalt TEXT NOT NULL,
  bezug TEXT,
  erstellt_am TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS aufgaben_status ON aufgaben(status);
CREATE INDEX IF NOT EXISTS ereignisse_zeit ON ereignisse(zeit);
`;
