import { Bot, Building2, Clapperboard, ListChecks, Mail, Settings, Sun, type LucideIcon } from "lucide-react";

export type NavPunkt = {
  href: string;
  titel: string;
  icon: LucideIcon;
  farbe: string;
  kurzbefehl: string;
};

export const NAVIGATION: NavPunkt[] = [
  { href: "/heute", titel: "Heute", icon: Sun, farbe: "var(--orange)", kurzbefehl: "1" },
  { href: "/aufgaben", titel: "Aufgaben", icon: ListChecks, farbe: "var(--blue)", kurzbefehl: "2" },
  { href: "/mails", titel: "Mails", icon: Mail, farbe: "var(--teal)", kurzbefehl: "3" },
  { href: "/partner", titel: "Partner", icon: Building2, farbe: "var(--green)", kurzbefehl: "4" },
  { href: "/content", titel: "Content", icon: Clapperboard, farbe: "var(--purple)", kurzbefehl: "5" },
  { href: "/agenten", titel: "Agenten", icon: Bot, farbe: "var(--red)", kurzbefehl: "6" },
  { href: "/einstellungen", titel: "Einstellungen", icon: Settings, farbe: "var(--gray)", kurzbefehl: "7" },
];
