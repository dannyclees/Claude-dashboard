import { Clapperboard } from "lucide-react";
import { Seitenkopf } from "@/components/Seitenkopf";
import { Leerzustand } from "@/components/Leerzustand";

export const metadata = { title: "Content · Cockpit" };

const STUFEN = ["Idee", "Skript", "Produktion", "Freigabe", "Live"];

export default function ContentSeite() {
  return (
    <>
      <Seitenkopf titel="Content-Studio" untertitel="Texte, Erklärvideos und Motion Design" />
      <ol className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-5" aria-label="Stufen der Pipeline">
        {STUFEN.map((s, i) => (
          <li key={s} className="card p-4">
            <div className="t-caption1 text-2">Stufe {i + 1}</div>
            <div className="t-headline">{s}</div>
            <div className="t-footnote text-2">0 Projekte</div>
          </li>
        ))}
      </ol>
      <Leerzustand
        icon={Clapperboard}
        farbe="var(--purple)"
        titel="Die Content-Agenten kommen in Phase 7"
        text="Text-Agent, Erklärvideo-Agent und Motion-Design-Agent arbeiten mit deinen Skills copywriter-cockpit und motion-designer-cockpit sowie HyperFrames. Jedes Projekt läuft hier durch die fünf Stufen."
      />
    </>
  );
}
