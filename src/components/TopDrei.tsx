import Link from "next/link";
import type { Aufgabe } from "@/brain/schema";
import { datumDeutsch } from "@/brain/regeln";

export function TopDrei({ aufgaben }: { aufgaben: Aufgabe[] }) {
  if (aufgaben.length === 0) {
    return <div className="card t-body text-2 p-6">Keine dringenden, wichtigen Aufgaben. Gute Zeit für „Planen“.</div>;
  }
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {aufgaben.map((a, i) => (
        <li key={a.id} className="einblenden" style={{ animationDelay: `${i * 60}ms` }}>
          <Link
            href={`/aufgaben#${a.id}`}
            className="card flex h-full flex-col gap-3 p-5 transition-shadow hover:shadow-[var(--shadow-hover)]"
          >
            <span
              className="t-headline flex h-8 w-8 items-center justify-center rounded-full text-white"
              style={{ background: "var(--red)" }}
              aria-label={`Platz ${i + 1}`}
            >
              {i + 1}
            </span>
            <span className="t-headline">{a.aufgabe}</span>
            {a.naechsterSchritt && <span className="t-subhead text-2 line-clamp-3">{a.naechsterSchritt}</span>}
            <span className="t-footnote text-2 mt-auto">
              {[a.partner.join(", "), a.umsatzhebel && `Hebel ${a.umsatzhebel}`, a.faelligAm && `fällig ${datumDeutsch(a.faelligAm)}`]
                .filter(Boolean)
                .join(" · ")}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
