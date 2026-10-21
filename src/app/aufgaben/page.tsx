import { Suspense } from "react";
import { Seitenkopf } from "@/components/Seitenkopf";
import { TopDrei } from "@/components/TopDrei";
import { AufgabenAnsicht } from "@/components/aufgaben/AufgabenAnsicht";
import { alleAufgaben, allePartner } from "@/brain/abfragen";
import { heuteIso, topDrei } from "@/brain/regeln";

export const metadata = { title: "Aufgaben · Cockpit" };

export default function AufgabenSeite() {
  const aufgaben = alleAufgaben();
  const partner = allePartner().map((p) => p.name);
  const offen = aufgaben.filter((a) => a.status !== "erledigt").length;
  const pruefen = aufgaben.filter((a) => a.status === "prüfen").length;

  return (
    <>
      <Seitenkopf
        titel="Aufgaben"
        untertitel={`${offen} offen${pruefen ? ` · ${pruefen} zum Prüfen aus früheren Gesprächen` : ""}`}
      />
      <section aria-labelledby="top3" className="mb-10">
        <h2 id="top3" className="t-title2 mb-3">
          Top 3 heute
        </h2>
        <TopDrei aufgaben={topDrei(aufgaben)} />
      </section>
      <Suspense>
        <AufgabenAnsicht aufgaben={aufgaben} partner={partner} heute={heuteIso()} />
      </Suspense>
    </>
  );
}
