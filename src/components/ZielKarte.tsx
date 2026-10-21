"use client";

import { useState, useTransition } from "react";
import { Pencil } from "lucide-react";
import type { Ziel } from "@/brain/schema";
import { setzeZielIst } from "@/brain/aktionen";

const zahl = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });

function format(wert: number, einheit: string) {
  return einheit === "EUR" ? `${zahl.format(wert)} €` : zahl.format(wert);
}

export function ZielKarte({ z }: { z: Ziel }) {
  const [bearbeiten, setBearbeiten] = useState(false);
  const [laeuft, starte] = useTransition();
  const ist = z.ist ?? 0;
  const anteil = z.soll > 0 ? Math.min(ist / z.soll, 1) : 0;

  return (
    <div className="card flex flex-col gap-3 p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="t-headline">{z.ziel}</div>
          <div className="t-footnote text-2">{z.einheit === "EUR" ? z.zeitraum : `${z.einheit} · ${z.zeitraum}`}</div>
        </div>
        <button className="knopf -mr-3 -mt-2 text-[var(--blue-text)]" aria-label={`Ist-Wert für ${z.ziel} eintragen`} onClick={() => setBearbeiten((b) => !b)}>
          <Pencil size={17} />
        </button>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="t-title1 tabular-nums">{format(ist, z.einheit)}</span>
        <span className="t-subhead text-2">von {format(z.soll, z.einheit)}</span>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full bg-[var(--fill)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(anteil * 100)}
        aria-label={`${z.ziel}: ${Math.round(anteil * 100)} Prozent`}
      >
        <div className="h-full rounded-full bg-[var(--green)] transition-[width] duration-500" style={{ width: `${anteil * 100}%` }} />
      </div>
      {bearbeiten && (
        <form
          className="flex gap-2"
          action={(d) =>
            starte(async () => {
              await setzeZielIst(z.id, String(d.get("ist") ?? ""));
              setBearbeiten(false);
            })
          }
        >
          <label className="flex-1">
            <span className="sr-only">Ist-Wert</span>
            <input name="ist" className="feld" inputMode="decimal" defaultValue={z.ist ?? ""} autoFocus />
          </label>
          <button className="knopf knopf-primaer" disabled={laeuft}>
            Sichern
          </button>
        </form>
      )}
    </div>
  );
}
