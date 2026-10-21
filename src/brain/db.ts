import "server-only";
import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import { CREATE_TABLES, SCHEMA_VERSION } from "./sql";

type Gehirn = BetterSQLite3Database<typeof schema>;

const globalFuer = globalThis as unknown as { gehirn?: Gehirn };

function gehirnPfad() {
  return process.env.GEHIRN_PFAD || path.join(process.cwd(), "data", "gehirn.db");
}

function jetzt() {
  return new Date().toISOString();
}

function liesSeed<T>(datei: string): T {
  const pfad = path.join(process.cwd(), "brain", "seed", datei);
  return JSON.parse(fs.readFileSync(pfad, "utf8")) as T;
}

type SeedAufgabe = {
  id: string;
  aufgabe: string;
  partner: string[];
  bereich: string | null;
  wichtig: boolean | null;
  dringend: boolean | null;
  umsatzhebel: string | null;
  faellig_am: string | null;
  zustaendig: string | null;
  status: string;
  wartet_auf: string | null;
  naechster_schritt: string | null;
  quelle: string | null;
  projekt: string | null;
  erstellt_am: string;
};

// Füllt ein leeres Gehirn einmalig mit den Startdaten aus brain/seed.
function befuelleBeimErstenStart(roh: Database.Database, db: Gehirn) {
  const schonBefuellt = roh.prepare("SELECT wert FROM meta WHERE schluessel = 'seed'").get();
  if (schonBefuellt) return;

  const zeit = jetzt();
  roh.transaction(() => {
    for (const a of liesSeed<SeedAufgabe[]>("aufgaben.json")) {
      db.insert(schema.aufgaben)
        .values({
          id: a.id,
          aufgabe: a.aufgabe,
          partner: a.partner,
          bereich: a.bereich,
          wichtig: a.wichtig,
          dringend: a.dringend,
          umsatzhebel: a.umsatzhebel,
          faelligAm: a.faellig_am,
          zustaendig: a.zustaendig,
          status: a.status,
          wartetAuf: a.wartet_auf,
          naechsterSchritt: a.naechster_schritt,
          quelle: a.quelle,
          projekt: a.projekt,
          erstelltAm: a.erstellt_am,
          aktualisiertAm: zeit,
        })
        .run();
    }
    for (const z of liesSeed<Omit<schema.Ziel, "id">[]>("ziele.json")) {
      db.insert(schema.ziele).values(z).run();
    }
    for (const p of liesSeed<(Omit<schema.Partner, "quellen" | "notizen" | "web"> & {
      drive_ordner: string;
      web?: string;
      quellen?: string[];
    })[]>("partner.json")) {
      db.insert(schema.partner)
        .values({
          id: p.id,
          name: p.name,
          status: p.status,
          driveOrdner: p.drive_ordner,
          web: p.web ?? null,
          quellen: p.quellen ?? [],
        })
        .run();
    }
    for (const ag of liesSeed<Omit<schema.Agent, "letzteAktion" | "aktualisiertAm">[]>("agenten.json")) {
      db.insert(schema.agenten).values({ ...ag, aktualisiertAm: zeit }).run();
    }
    db.insert(schema.ereignisse)
      .values({
        zeit,
        akteur: "System",
        aktion: "Gehirn angelegt",
        details: "Startdaten aus brain/seed geladen (Aufgaben, Ziele, Partner, Agenten)",
      })
      .run();
    roh.prepare("INSERT INTO meta (schluessel, wert) VALUES ('seed', ?)").run(zeit);
  })();
}

export function gehirn(): Gehirn {
  if (globalFuer.gehirn) return globalFuer.gehirn;

  const pfad = gehirnPfad();
  fs.mkdirSync(path.dirname(pfad), { recursive: true });
  const roh = new Database(pfad);
  roh.pragma("journal_mode = WAL");
  roh.pragma("foreign_keys = ON");
  roh.exec(CREATE_TABLES);
  roh
    .prepare("INSERT INTO meta (schluessel, wert) VALUES ('schema_version', ?) ON CONFLICT(schluessel) DO UPDATE SET wert = excluded.wert")
    .run(String(SCHEMA_VERSION));

  const db = drizzle(roh, { schema });
  befuelleBeimErstenStart(roh, db);
  globalFuer.gehirn = db;
  return db;
}
