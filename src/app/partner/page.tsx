import Link from "next/link";
import { Building2, FolderOpen, Globe } from "lucide-react";
import { Seitenkopf } from "@/components/Seitenkopf";
import { alleAufgaben, allePartner } from "@/brain/abfragen";
import { prioritaet } from "@/brain/regeln";

export const metadata = { title: "Partner · Cockpit" };

const FARBEN = ["var(--blue)", "var(--green)", "var(--orange)", "var(--purple)", "var(--teal)", "var(--red)"];

export default function PartnerSeite() {
  const partner = allePartner();
  const aufgaben = alleAufgaben().filter((a) => a.status !== "erledigt");

  return (
    <>
      <Seitenkopf titel="Partner" untertitel={`${partner.length} aktive Partnerbetriebe`} />
      <ul className="grid gap-4 sm:grid-cols-2">
        {partner.map((p, i) => {
          const eigene = aufgaben.filter((a) => a.partner.includes(p.name) || a.partner.includes("Alle Partner"));
          const sofort = eigene.filter((a) => prioritaet(a) === 1).length;
          const wartet = eigene.filter((a) => a.status === "wartet").length;
          return (
            <li key={p.id} className="card einblenden flex flex-col gap-4 p-5" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex items-center gap-3">
                <span
                  className="t-title3 flex h-12 w-12 items-center justify-center rounded-[14px] text-white"
                  style={{ background: FARBEN[i % FARBEN.length] }}
                  aria-hidden
                >
                  {p.name.slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="t-title3">{p.name}</h2>
                  <p className="t-footnote text-2">Partner-Agent folgt in Phase 6</p>
                </div>
              </div>
              <dl className="grid grid-cols-3 gap-2 text-center">
                <Kennzahl wert={eigene.length} label="offen" />
                <Kennzahl wert={sofort} label="sofort" warnung={sofort > 0} />
                <Kennzahl wert={wartet} label="wartet" />
              </dl>
              {eigene.length > 0 && (
                <ul className="flex flex-col gap-1.5">
                  {eigene.slice(0, 3).map((a) => (
                    <li key={a.id}>
                      <Link href={`/aufgaben#${a.id}`} className="t-subhead flex min-h-[32px] items-center hover:underline">
                        {a.aufgabe}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <div className="t-footnote text-2 mt-auto flex flex-wrap gap-x-4 gap-y-1">
                {p.driveOrdner && (
                  <span className="flex items-center gap-1">
                    <FolderOpen size={14} aria-hidden /> Drive: {p.driveOrdner}
                  </span>
                )}
                {p.web && (
                  <span className="flex items-center gap-1">
                    <Globe size={14} aria-hidden /> {p.web}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="t-footnote text-2 mt-6 flex items-center gap-2">
        <Building2 size={14} aria-hidden /> Steckbriefe, Kampagnen und Verlauf je Partner kommen mit den Partner-Agenten.
      </p>
    </>
  );
}

function Kennzahl({ wert, label, warnung }: { wert: number; label: string; warnung?: boolean }) {
  return (
    <div className="rounded-[12px] bg-[var(--fill)] py-2">
      <dt className="t-caption1 text-2">{label}</dt>
      <dd className="t-title3 tabular-nums" style={warnung ? { color: "var(--red-text)" } : undefined}>
        {wert}
      </dd>
    </div>
  );
}
