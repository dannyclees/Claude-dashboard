import { Seitenkopf } from "@/components/Seitenkopf";
import { alleAgenten } from "@/brain/abfragen";
import type { Agent } from "@/brain/schema";

export const metadata = { title: "Agenten · Cockpit" };

const EBENEN: Record<number, { titel: string; text: string }> = {
  1: { titel: "Stimme", text: "Mit ihnen sprichst du." },
  2: { titel: "Kern-Team", text: "Halten den Alltag zusammen." },
  3: { titel: "Fach-Agenten", text: "Partnerbetriebe, Akquise und Content." },
};

const STATUS: Record<string, { farbe: string; text: string }> = {
  aktiv: { farbe: "var(--green)", text: "aktiv" },
  pausiert: { farbe: "var(--orange)", text: "pausiert" },
  geplant: { farbe: "var(--gray)", text: "geplant" },
};

export default function AgentenSeite() {
  const agenten = alleAgenten();
  const aktiv = agenten.filter((a) => a.status === "aktiv").length;

  return (
    <>
      <Seitenkopf titel="Agenten" untertitel={`${agenten.length} Agenten · ${aktiv} aktiv`} />
      <div className="flex flex-col gap-10">
        {[1, 2, 3].map((ebene) => (
          <section key={ebene} aria-labelledby={`ebene-${ebene}`}>
            <h2 id={`ebene-${ebene}`} className="mb-1 px-1">
              <span className="t-title2">
                Ebene {ebene}: {EBENEN[ebene].titel}
              </span>
            </h2>
            <p className="t-subhead text-2 mb-3 px-1">{EBENEN[ebene].text}</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {agenten
                .filter((a) => a.ebene === ebene)
                .map((a) => (
                  <AgentKarte key={a.id} a={a} />
                ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

function AgentKarte({ a }: { a: Agent }) {
  const s = STATUS[a.status] ?? STATUS.geplant;
  return (
    <li className="card flex flex-col gap-3 p-5">
      <div className="flex items-center gap-3">
        <span
          className="t-headline flex h-11 w-11 items-center justify-center rounded-full bg-[var(--fill)]"
          aria-hidden
        >
          {a.name.replace("Partner-Agent ", "").slice(0, 1)}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="t-headline">{a.name}</h3>
          <p className="t-footnote text-2">{a.rolle}</p>
        </div>
        <span className="t-footnote flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.farbe }} aria-hidden />
          {s.text}
        </span>
      </div>
      <p className="t-subhead text-2">{a.beschreibung}</p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {a.werkzeuge.map((w) => (
          <span key={w} className="pille bg-[var(--fill)] font-medium text-[var(--label-2)]">
            {w}
          </span>
        ))}
      </div>
      <p className="t-footnote text-2">
        {a.status === "aktiv"
          ? a.letzteAktion ?? "Läuft in ElevenLabs"
          : a.phase
            ? `Wird in Phase ${a.phase} gebaut`
            : "Wartet auf Freischaltung"}
      </p>
    </li>
  );
}
