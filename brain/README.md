# Das Gehirn

Das Gehirn ist die zentrale Datenbank des Cockpits. Alles, was Danny und die Agenten wissen, planen und tun, steht hier und nur hier. Das Cockpit ist die Oberfläche dafür, und alle Agenten lesen und schreiben ausschließlich über das Gehirn.

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

## Wo das Gehirn liegt (Entscheidung vom 21.10.2026)

**Hauptgehirn ist die Datenbank des Cockpit-Artifacts:** <https://claude.ai/artifact/FgbmgqzRqJnoMXwP1VGBwa>

- Sammlungen: `aufgaben`, `ziele`, `partner` (mit `steckbrief`), `agenten`, `ereignisse`, `briefings`, `freigaben`, `gespraeche`, `system` (z. B. Stand des Alex-Imports); später kommt `gedaechtnis` dazu
- Das Cockpit im Artifact liest und schreibt dort live.
- Claude (diese Sitzung und später die Agenten als geplante Claude-Aufgaben) liest und schreibt über das Artifact-Datenwerkzeug.
- Die lokale App (`src/`, SQLite unter `data/gehirn.db`) bleibt als Entwicklungsstand im Repo, ist aber **nicht** die Quelle. Bei Bedarf wird sie später an das Hauptgehirn angebunden.
- Sicherung: regelmäßiger Export nach `Dashboard/_System/Backup` (Google Drive), ab Phase 8
