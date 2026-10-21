# Aufgaben-System

> Stand: 21.10.2026

## Entscheidung

Aufgaben leben **im Gehirn des Cockpits** (siehe `brain/README.md`), nicht in einem Sheet und nicht in einem Doc. Das Dashboard ist die Oberfläche, Mark und die Agenten lesen und schreiben dort.

## Woher die Aufgaben kommen

| Alt | Was passiert damit |
|---|---|
| `Dashboard/TASKS/TASKS.md` (Google Doc) | Inhalte übernommen nach `brain/seed/aufgaben.json`. Das Doc bleibt als Archiv. |
| Google Sheet „Alex-Agent“ → `02_TASKS` | 6 offene Punkte übernommen, Status „prüfen“ |
| monday.com CRM | bleibt CRM für Leads und Projekte, keine persönlichen Aufgaben |
| `Dashboard/_System/Cockpit-Aufgaben` (Sheet vom 21.10.) | bleibt liegen, falls es gebraucht wird; wird nicht gepflegt |

## Felder einer Aufgabe

ID, Aufgabe, Partner (mehrere möglich), Bereich, Wichtig, Dringend, Umsatzhebel, Fällig am, Zuständig, Status, Wartet auf / seit, Nächster Schritt, Quelle, Projekt, Erstellt am, Verlauf.

**Status:** offen · in Arbeit · wartet · wartet auf Freigabe · prüfen · später · erledigt

## Priorisierung durch den Organisator

1. **Wichtig + dringend + hoher Umsatzhebel** kommt nach oben, maximal 3 pro Tag als „Top 3“.
2. **Wichtig, nicht dringend** bekommt einen festen Zeitblock in der Woche.
3. **Dringend, nicht wichtig** wird an einen Agenten delegiert, wo möglich.
4. **Weder noch** wandert nach „später“ oder fliegt raus.
5. „Wartet“-Aufgaben bekommen automatisch einen Nachfass-Termin.

## Ziele

Neuumsatz +140.000 €, 4 Website-Projekte, 4 Jahresverträge, Pipeline 5–6 qualifizierte Gespräche pro Monat (`brain/seed/ziele.json`).

## Erste Einschätzung (Hormozi-Brille)

**Top 3 mit dem größten Hebel aufs 140k-Ziel:**
1. **Ergebniszahlen Hausman + Video-Testimonial:** Beweise sind die Grundlage jeder Akquise.
2. **Empfehlungen aktiv anfragen:** Warm Outreach ist die günstigste Lead-Quelle.
3. **Förderablauf klären:** Zwei Websites à ca. 25.000 € hängen daran.

Wichtig/Dringend in den Startdaten ist meine Ersteinschätzung. Fälligkeitsdaten fehlen noch, weil `TASKS.md` keine hatte.
