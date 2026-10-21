import { Mail } from "lucide-react";
import { Seitenkopf } from "@/components/Seitenkopf";
import { Leerzustand } from "@/components/Leerzustand";

export const metadata = { title: "Mails · Cockpit" };

export default function MailsSeite() {
  return (
    <>
      <Seitenkopf titel="Mails" untertitel="Zusammenfassungen und Antwortentwürfe" />
      <Leerzustand
        icon={Mail}
        farbe="var(--teal)"
        titel="Der Mail-Assistent kommt in Phase 4"
        text="Er sortiert deinen Posteingang, fasst zusammen und schreibt Entwürfe. Jeder Entwurf landet hier mit „Freigeben, Bearbeiten, Verwerfen“; ohne dein OK geht nichts raus."
        phase="Wartet auf Gmail-Zugang"
      />
    </>
  );
}
