import type { LucideIcon } from "lucide-react";

export function Leerzustand({
  icon: Icon,
  farbe,
  titel,
  text,
  phase,
}: {
  icon: LucideIcon;
  farbe: string;
  titel: string;
  text: string;
  phase?: string;
}) {
  return (
    <div className="card einblenden flex flex-col items-center px-6 py-14 text-center">
      <span
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-[18px] text-white"
        style={{ background: farbe }}
        aria-hidden
      >
        <Icon size={30} strokeWidth={2} />
      </span>
      <h2 className="t-title3">{titel}</h2>
      <p className="t-body text-2 mt-2 max-w-[520px]">{text}</p>
      {phase && <span className="pille mt-4 bg-[var(--tint-gray)] text-[var(--label-2)]">{phase}</span>}
    </div>
  );
}
