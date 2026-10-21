import { AlertCircle, ArrowDownCircle, CalendarClock, Clock, Flame, Hourglass, ShieldCheck } from "lucide-react";
import { PRIORITAET_NAME, type Prioritaet } from "@/brain/regeln";

const PRIO_STIL: Record<Prioritaet, { bg: string; fg: string; icon: typeof Flame }> = {
  1: { bg: "var(--tint-red)", fg: "var(--red-text)", icon: Flame },
  2: { bg: "var(--tint-blue)", fg: "var(--blue-text)", icon: CalendarClock },
  3: { bg: "var(--tint-orange)", fg: "var(--orange-text)", icon: Clock },
  4: { bg: "var(--tint-gray)", fg: "var(--label-2)", icon: ArrowDownCircle },
};

export function PrioritaetPille({ p }: { p: Prioritaet | null }) {
  if (p === null) {
    return (
      <span className="pille" style={{ background: "var(--tint-gray)", color: "var(--label-2)" }}>
        <AlertCircle size={12} aria-hidden /> Einschätzen
      </span>
    );
  }
  const s = PRIO_STIL[p];
  const Icon = s.icon;
  return (
    <span className="pille" style={{ background: s.bg, color: s.fg }}>
      <Icon size={12} aria-hidden /> {p} {PRIORITAET_NAME[p]}
    </span>
  );
}

const STATUS_STIL: Record<string, { bg: string; fg: string; icon?: typeof Flame }> = {
  offen: { bg: "var(--tint-gray)", fg: "var(--label-2)" },
  "in Arbeit": { bg: "var(--tint-blue)", fg: "var(--blue-text)" },
  wartet: { bg: "var(--tint-orange)", fg: "var(--orange-text)", icon: Hourglass },
  "wartet auf Freigabe": { bg: "var(--tint-purple)", fg: "var(--purple-text)", icon: ShieldCheck },
  prüfen: { bg: "var(--tint-orange)", fg: "var(--orange-text)", icon: AlertCircle },
  später: { bg: "var(--tint-gray)", fg: "var(--label-2)" },
  erledigt: { bg: "var(--tint-green)", fg: "var(--green-text)" },
};

export function StatusPille({ status }: { status: string }) {
  const s = STATUS_STIL[status] ?? STATUS_STIL.offen;
  const Icon = s.icon;
  return (
    <span className="pille" style={{ background: s.bg, color: s.fg }}>
      {Icon && <Icon size={12} aria-hidden />} {status}
    </span>
  );
}

export function MetaPille({ children, warnung }: { children: React.ReactNode; warnung?: boolean }) {
  return (
    <span
      className="pille"
      style={{
        background: warnung ? "var(--tint-red)" : "var(--fill)",
        color: warnung ? "var(--red-text)" : "var(--label-2)",
        fontWeight: warnung ? 600 : 500,
      }}
    >
      {children}
    </span>
  );
}
