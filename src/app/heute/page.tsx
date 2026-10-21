import Link from "next/link";
import { CalendarDays, ShieldCheck, Hourglass, Mic, Newspaper } from "lucide-react";
import { Seitenkopf } from "@/components/Seitenkopf";
import { TopDrei } from "@/components/TopDrei";
import { ZielKarte } from "@/components/ZielKarte";
import { alleAufgaben, alleZiele, letzteEreignisse, offeneFreigaben } from "@/brain/abfragen";
import { topDrei } from "@/brain/regeln";

export const metadata = { title: "Heute · Cockpit" };

function begruessung(stunde: number) {
  if (stunde < 11) return "Guten Morgen, Danny";
  if (stunde < 18) return "Hallo Danny";
  return "Guten Abend, Danny";
}

function jetztLuxemburg() {
  const d = new Date();
  const stunde = Number(new Intl.DateTimeFormat("de-DE", { hour: "numeric", hour12: false, timeZone: "Europe/Luxembourg" }).format(d));
  const datum = new Intl.DateTimeFormat("de-DE", { weekday: "long", day: "numeric", month: "long", timeZone: "Europe/Luxembourg" }).format(d);
  return { stunde, datum };
}

const zeitFormat = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Luxembourg" });

export default function HeuteSeite() {
  const { stunde, datum } = jetztLuxemburg();
  const aufgaben = alleAufgaben();
  const top = topDrei(aufgaben);
  const wartet = aufgaben.filter((a) => a.status === "wartet");
  const pruefen = aufgaben.filter((a) => a.status === "prüfen").length;
  const freigaben = offeneFreigaben();
  const ziele = alleZiele().filter((z) => !z.ziel.startsWith("Bestand"));
  const ereignisse = letzteEreignisse(6);

  return (
    <>
      <Seitenkopf titel={begruessung(stunde)} untertitel={datum} />

      <section aria-labelledby="briefing" className="card mb-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[var(--orange)] text-white" aria-hidden>
          <Newspaper size={24} />
        </span>
        <div className="flex-1">
          <h2 id="briefing" className="t-headline">
            Morgen-Briefing
          </h2>
          <p className="t-subhead text-2">
            Ab Phase 3 schreibt der Organisator hier jeden Morgen um 06:30 dein Briefing; ab Phase 5 liest Mark es dir vor.
            {pruefen > 0 && ` Bis dahin: ${pruefen} alte Aufgaben warten auf deine Entscheidung.`}
          </p>
        </div>
        {pruefen > 0 && (
          <Link href="/aufgaben" className="knopf knopf-sekundaer">
            Prüfen
          </Link>
        )}
      </section>

      <section aria-labelledby="top3" className="mb-10">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 id="top3" className="t-title2">
            Top 3 heute
          </h2>
          <Link href="/aufgaben" className="t-subhead font-semibold text-[var(--blue-text)]">
            Alle Aufgaben
          </Link>
        </div>
        <TopDrei aufgaben={top} />
      </section>

      <div className="mb-10 grid gap-4 lg:grid-cols-3">
        <section aria-labelledby="termine" className="card p-5">
          <h2 id="termine" className="t-headline mb-3 flex items-center gap-2">
            <CalendarDays size={18} className="text-[var(--red-text)]" aria-hidden /> Termine
          </h2>
          <p className="t-subhead text-2">Der Kalender wird in Phase 3 angebunden.</p>
        </section>
        <section aria-labelledby="freigaben" className="card p-5">
          <h2 id="freigaben" className="t-headline mb-3 flex items-center gap-2">
            <ShieldCheck size={18} className="text-[var(--purple-text)]" aria-hidden /> Wartet auf deine Freigabe
          </h2>
          {freigaben.length === 0 ? (
            <p className="t-subhead text-2">Nichts offen. Hier landen später Mail-Entwürfe, Posts und Dateiaktionen der Agenten.</p>
          ) : (
            <ul className="t-subhead">{freigaben.map((f) => <li key={f.id}>{f.titel}</li>)}</ul>
          )}
        </section>
        <section aria-labelledby="wartet" className="card p-5">
          <h2 id="wartet" className="t-headline mb-3 flex items-center gap-2">
            <Hourglass size={18} className="text-[var(--orange-text)]" aria-hidden /> Du wartest auf
          </h2>
          {wartet.length === 0 ? (
            <p className="t-subhead text-2">Nichts.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {wartet.map((a) => (
                <li key={a.id}>
                  <Link href={`/aufgaben#${a.id}`} className="t-subhead block hover:underline">
                    {a.aufgabe} <span className="text-2">· {a.partner.join(", ")}</span>
                  </Link>
                  {a.wartetAuf && <span className="t-footnote text-2">{a.wartetAuf}</span>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section aria-labelledby="ziele" className="mb-10">
        <h2 id="ziele" className="t-title2 mb-3">
          Ziele
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ziele.map((z) => (
            <ZielKarte key={z.id} z={z} />
          ))}
        </div>
      </section>

      <section aria-labelledby="verlauf" className="mb-6">
        <h2 id="verlauf" className="t-title2 mb-3">
          Zuletzt im Gehirn
        </h2>
        <ul className="gruppe card">
          {ereignisse.map((e) => (
            <li key={e.id} className="flex flex-wrap items-baseline gap-x-3 px-4 py-3">
              <span className="t-footnote text-2 tabular-nums">{zeitFormat.format(new Date(e.zeit))}</span>
              <span className="t-subhead font-semibold">{e.akteur}</span>
              <span className="t-subhead">
                {e.aktion}
                {e.objekt ? ` · ${e.objekt}` : ""}
              </span>
              {e.details && <span className="t-footnote text-2 basis-full">{e.details}</span>}
            </li>
          ))}
        </ul>
      </section>

      <p className="t-footnote text-2 flex items-center gap-2">
        <Mic size={14} aria-hidden /> „Guten Morgen, Mark“ funktioniert ab Phase 5.
      </p>
    </>
  );
}
