# Phase 1: Fundament, Design und Gehirn

> Abgeschlossen am 21.10.2026, wartet auf Dannys OK für Phase 2

## Ergebnis

| Bereich | Stand |
|---|---|
| Projekt | Next.js 16, React 19, TypeScript, Tailwind 4, eine App im Repo-Hauptordner |
| Gehirn | SQLite unter `data/gehirn.db` mit 9 Tabellen: Aufgaben, Ziele, Partner, Agenten, Übergaben, Freigaben, Gespräche, Ereignisse, Gedächtnis. Füllt sich beim ersten Start aus `brain/seed/`. |
| Design | Apple-HIG-Tokens: Systemschrift (SF auf Apple-Geräten), Typo-Skala iOS „Large“, Systemfarben, Hell/Dunkel automatisch oder fest, Glas-Seitenleiste, Karten mit 20-px-Radius |
| Navigation | Seitenleiste (Heute · Aufgaben · Mails · Partner · Content · Agenten · Einstellungen), auf dem Handy als Menü; ⌘K-Befehlspalette; ⌘1–⌘7 |
| **Aufgaben** | voll nutzbar: Top 3, Ansichten (Aktiv, Wartet, Prüfen, Später, Erledigt, Alle), Suche, Filter nach Partner und Zuständigkeit, Gruppen nach Eisenhower-Priorität, Bearbeiten direkt in der Zeile, neue Aufgabe, Überfällig-Markierung |
| Heute | Begrüßung nach Tageszeit, Top 3, Du wartest auf, Freigaben, Ziele mit Ist-Eingabe, Verlauf aus dem Ereignis-Log; Platzhalter für Briefing und Termine |
| Partner | 4 Kacheln mit offenen, sofortigen und wartenden Aufgaben je Partner |
| Agenten | 14 Agenten in 3 Ebenen mit Status und Phase |
| Mails, Content | Platzhalter mit Erklärung, was in Phase 4 bzw. 7 kommt |
| Einstellungen | Erscheinungsbild, Gehirn-Statistik, Freigaberegeln, Tastenkürzel |

## Geprüft

- `npm run lint` (TypeScript) und `npm run build`: fehlerfrei
- Bedienung automatisch getestet (Playwright): Aufgabe erledigen, Status ändern, Prio-Einschätzung, neue Aufgabe mit Überfällig-Markierung, Sprung aus der Befehlspalette, Ziel-Ist speichern; alle 8 Prüfungen bestanden, keine Fehler in der Browser-Konsole
- Hell, Dunkel und Handy-Breite (390 px, kein seitliches Scrollen)
- Bedienelemente mit mindestens 44×44 px, Tastaturbedienung, „Bewegung reduzieren“ und „Transparenz reduzieren“ werden beachtet, Bedeutung nie nur über Farbe (Priorität und Status immer mit Text)

## Bewusste Abweichungen

- **Figma-Entwürfe:** Da Danny dort nur einen View-Seat hat, habe ich die Ansichten direkt als echte, klickbare Oberfläche gebaut. Die Screenshots liegen in `docs/screenshots/`.
- **Agenten-Konfiguration als `agents/*.md`:** Die Agenten stehen in Phase 1 als Startdaten im Gehirn. Das Dateiformat mit Vorlage folgt wie geplant in Phase 2.
- **Eine App statt Monorepo:** Dashboard und spätere Agenten-Jobs laufen in einer Next.js-App. Das ist einfacher zu starten, und die Agenten greifen direkt auf das Gehirn zu.

## Offen für Danny

- Die 6 alten Aufgaben mit Status „prüfen“ in der Ansicht „Prüfen“ entscheiden
- Fälligkeitsdaten für die wichtigsten Aufgaben setzen
- Ist-Werte bei den Zielen eintragen
