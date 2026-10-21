import path from "node:path";
import { sql } from "drizzle-orm";
import { Seitenkopf } from "@/components/Seitenkopf";
import { ThemeWahl } from "@/components/ThemeWahl";
import { gehirn } from "@/brain/db";
import { agenten, aufgaben, ereignisse, partner, ziele } from "@/brain/schema";
import { SCHEMA_VERSION } from "@/brain/sql";

export const metadata = { title: "Einstellungen · Cockpit" };

const REGELN = [
  ["Mails senden", "nur nach Freigabe"],
  ["Dateien teilen oder löschen", "nur nach Freigabe"],
  ["Kampagnen ändern", "nur nach Freigabe"],
  ["Inhalte veröffentlichen", "nur nach Freigabe"],
  ["Lesen, zusammenfassen, Entwürfe schreiben", "selbstständig"],
  ["Dateien einsortieren", "selbstständig"],
];

function anzahl(tabelle: typeof aufgaben | typeof ziele | typeof partner | typeof agenten | typeof ereignisse) {
  return gehirn().select({ n: sql<number>`count(*)` }).from(tabelle).get()?.n ?? 0;
}

export default function EinstellungenSeite() {
  const pfad = process.env.GEHIRN_PFAD || path.join("data", "gehirn.db");
  const zahlen = [
    ["Aufgaben", anzahl(aufgaben)],
    ["Ziele", anzahl(ziele)],
    ["Partner", anzahl(partner)],
    ["Agenten", anzahl(agenten)],
    ["Ereignisse", anzahl(ereignisse)],
  ] as const;

  return (
    <>
      <Seitenkopf titel="Einstellungen" />

      <section aria-labelledby="aussehen" className="mb-10">
        <h2 id="aussehen" className="t-title3 mb-3">
          Erscheinungsbild
        </h2>
        <ThemeWahl />
      </section>

      <section aria-labelledby="gehirn" className="mb-10">
        <h2 id="gehirn" className="t-title3 mb-1">
          Gehirn
        </h2>
        <p className="t-subhead text-2 mb-3">
          Datenbank auf diesem Rechner: <code className="t-footnote">{pfad}</code> · Schema-Version {SCHEMA_VERSION}
        </p>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {zahlen.map(([titel, n]) => (
            <div key={titel} className="card p-4">
              <dt className="t-footnote text-2">{titel}</dt>
              <dd className="t-title2 tabular-nums">{n}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="regeln" className="mb-10">
        <h2 id="regeln" className="t-title3 mb-3">
          Freigaberegeln
        </h2>
        <ul className="gruppe card">
          {REGELN.map(([was, wie]) => (
            <li key={was} className="flex min-h-[48px] items-center justify-between gap-4 px-4 py-2">
              <span className="t-body">{was}</span>
              <span className="t-subhead text-2">{wie}</span>
            </li>
          ))}
        </ul>
        <p className="t-footnote text-2 mt-2">Jede Aktion eines Agenten landet im Ereignis-Log des Gehirns.</p>
      </section>

      <section aria-labelledby="tasten">
        <h2 id="tasten" className="t-title3 mb-3">
          Tastenkürzel
        </h2>
        <ul className="gruppe card">
          {[
            ["Suchen und Befehle", "⌘K"],
            ["Heute … Einstellungen", "⌘1 … ⌘7"],
            ["Dialog schließen", "esc"],
          ].map(([was, taste]) => (
            <li key={was} className="flex min-h-[48px] items-center justify-between px-4">
              <span className="t-body">{was}</span>
              <kbd className="t-subhead text-2">{taste}</kbd>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
