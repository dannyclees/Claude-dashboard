# Das Gehirn

Das Gehirn ist die zentrale Datenbank des Cockpits. Alles, was Danny und die Agenten wissen, planen und tun, steht hier und nur hier. Das Dashboard ist die Oberfläche dafür, Mark und Alex sprechen über das Backend mit ihm, und alle Agenten lesen und schreiben ausschließlich über das Gehirn.

## Was im Gehirn liegt

| Bereich | Inhalt |
|---|---|
| Aufgaben | jede Aufgabe mit Partner, Bereich, Wichtig/Dringend, Umsatzhebel, Fälligkeit, Zuständigkeit, Status, Verlauf |
| Ziele | Soll/Ist für Neuumsatz, Abschlüsse, Pipeline |
| Partner | Steckbrief je Partnerbetrieb, Ansprechpartner, Kampagnen, Verweise auf Drive-Ordner |
| Agenten | Konfiguration, Status, letzte Aktion |
| Übergaben | Aufträge zwischen Agenten (wer an wen, was, Status) |
| Freigaben | alles, was auf Dannys OK wartet (Mails, Posts, Dateiaktionen) |
| Gespräche | Zusammenfassungen und ToDos aus Gesprächen mit Mark und Alex |
| Ereignis-Log | jede Aktion: wer, was, wann, warum |
| Gedächtnis | Notizen, Entscheidungen, Vorlieben, Kontext, der sich ansammelt |

## Was nicht im Gehirn liegt

- **Dateien** (Videos, Bilder, PDFs, Angebote) bleiben in Google Drive. Das Gehirn speichert nur, wo sie liegen.
- **Langes Fachwissen** (Hormozi-Wissen) liegt in ElevenLabs und als Skill im Repo. Das Gehirn verweist darauf.

## Startdaten

`seed/` enthält die Daten, mit denen das Gehirn beim ersten Start befüllt wird:
- `aufgaben.json`: 25 Aufgaben aus `TASKS.md` (Stand 13.10.2026) und dem Alex-Sheet (Mai 2026, Status „prüfen“)
- `ziele.json`: Ziele aus `TASKS.md`
- `partner.json`: die 4 aktiven Partnerbetriebe

## Technik (Phase 1/2)

- SQLite-Datei lokal auf Dannys Rechner, Zugriff über Drizzle ORM
- Backend-API, über die Dashboard, Mark, Alex und die Agenten lesen und schreiben
- Tägliche Sicherung als Export in `Dashboard/_System/Backup` (Google Drive)
