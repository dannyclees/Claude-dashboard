"use client";

import { useEffect, useRef, useTransition } from "react";
import { X } from "lucide-react";
import { legeAufgabeAn } from "@/brain/aktionen";
import { BEREICHE, UMSATZHEBEL, ZUSTAENDIGE } from "@/brain/regeln";

export function NeueAufgabe({
  partner,
  onSchliessen,
  onAngelegt,
}: {
  partner: string[];
  onSchliessen: () => void;
  onAngelegt: (id: string) => void;
}) {
  const [laeuft, starte] = useTransition();
  const titel = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titel.current?.focus();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onSchliessen();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onSchliessen]);

  const absenden = (daten: FormData) =>
    starte(async () => {
      const id = await legeAufgabeAn(daten);
      onSchliessen();
      if (id) onAngelegt(id);
    });

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/30 sm:items-center sm:px-4" onClick={onSchliessen}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="neu-titel"
        className="einblenden w-full max-w-[560px] rounded-t-[24px] bg-[var(--surface)] p-6 shadow-[var(--shadow-hover)] sm:rounded-[24px]"
        style={{ paddingBottom: "max(24px, env(safe-area-inset-bottom))" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="neu-titel" className="t-title2">
            Neue Aufgabe
          </h2>
          <button className="knopf -mr-3" aria-label="Schließen" onClick={onSchliessen}>
            <X size={22} />
          </button>
        </div>
        <form action={absenden} className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="t-footnote text-2">Aufgabe</span>
            <input ref={titel} name="aufgabe" required className="feld" placeholder="Was ist zu tun?" />
          </label>
          <Feld name="partner" label="Partner" optionen={[...partner, "C&E intern", "Alle Partner"]} />
          <Feld name="bereich" label="Bereich" optionen={[...BEREICHE]} />
          <Feld name="wichtig" label="Wichtig" optionen={["ja", "nein"]} />
          <Feld name="dringend" label="Dringend" optionen={["ja", "nein"]} />
          <Feld name="umsatzhebel" label="Umsatzhebel" optionen={[...UMSATZHEBEL]} />
          <label className="flex flex-col gap-1">
            <span className="t-footnote text-2">Fällig am</span>
            <input type="date" name="faelligAm" className="feld" />
          </label>
          <Feld name="zustaendig" label="Zuständig" optionen={[...ZUSTAENDIGE]} standard="Danny" />
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className="t-footnote text-2">Nächster Schritt</span>
            <textarea name="naechsterSchritt" className="feld min-h-[80px] py-2.5" />
          </label>
          <div className="flex justify-end gap-3 sm:col-span-2">
            <button type="button" className="knopf knopf-sekundaer" onClick={onSchliessen}>
              Abbrechen
            </button>
            <button type="submit" className="knopf knopf-primaer" disabled={laeuft}>
              {laeuft ? "Speichert …" : "Anlegen"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Feld({ name, label, optionen, standard }: { name: string; label: string; optionen: string[]; standard?: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="t-footnote text-2">{label}</span>
      <select name={name} className="feld" defaultValue={standard ?? ""}>
        <option value="">–</option>
        {optionen.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
