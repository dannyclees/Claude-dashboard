# Cockpit

Dannys sprachgesteuertes Agenten-Dashboard für Clees & Ernster. Im Mittelpunkt steht **das Gehirn**: die eine Datenbank für Aufgaben, Ziele, Partner, Agenten, Freigaben und das Ereignis-Log (siehe [`brain/README.md`](brain/README.md)).

Stand: **Phase 1** (Fundament, Apple-Design, Gehirn). Plan und Phasen: [`BUILD_PROMPT.md`](BUILD_PROMPT.md), Architektur: [`docs/ARCHITEKTUR.md`](docs/ARCHITEKTUR.md).

## Starten (auf deinem Mac)

Einmalig:
1. **Node.js** installieren (Version 22 LTS oder neuer): <https://nodejs.org>
2. Terminal öffnen, in den Projektordner wechseln und die Pakete installieren:
   ```bash
   cd Claude-dashboard
   npm install
   ```

Jedes Mal:
```bash
npm run dev
```
Dann im Browser <http://localhost:3000> öffnen.

Beim ersten Start legt das Cockpit das Gehirn unter `data/gehirn.db` an und lädt die Startdaten aus `brain/seed/`: 25 Aufgaben, Ziele, 4 Partner und 14 Agenten.

Für den Dauerbetrieb, also schneller und ohne Entwicklermodus:
```bash
npm run build
npm start
```

## Nützliche Befehle

| Befehl | Was er tut |
|---|---|
| `npm run dev` | Cockpit im Entwicklungsmodus starten |
| `npm run build` und `npm start` | Cockpit gebaut starten |
| `npm run lint` | TypeScript prüfen |
| `npm run gehirn:reset` | **Löscht** das lokale Gehirn; beim nächsten Start wird es neu aus `brain/seed/` befüllt. Eigene Änderungen gehen dabei verloren. |

## Bedienung

- **⌘K**: Suchen, zu einer Seite springen, neue Aufgabe anlegen, Erscheinungsbild wechseln
- **⌘1 bis ⌘7**: Heute, Aufgaben, Mails, Partner, Content, Agenten, Einstellungen
- **Aufgaben**: Kreis anklicken erledigt eine Aufgabe; ein Klick auf die Zeile öffnet die Details mit Status, Wichtig/Dringend, Umsatzhebel, Fälligkeit, Zuständigkeit und nächstem Schritt. Alles wird sofort im Gehirn gespeichert und im Ereignis-Log festgehalten.
- **Ziele** (Seite „Heute“): Stift anklicken und den Ist-Wert eintragen.

## Technik

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · SQLite (better-sqlite3) mit Drizzle ORM · Apple-HIG-Tokens in `src/app/globals.css`.

```
brain/          Startdaten und Beschreibung des Gehirns
src/brain/      Gehirn: Schema, Datenbank, Regeln (Priorität), Abfragen, Aktionen
src/app/        Seiten (heute, aufgaben, mails, partner, content, agenten, einstellungen)
src/components/ Oberfläche (Seitenleiste, Befehlspalette, Aufgabenliste …)
docs/           Architektur, Analysen, Screenshots
```

Schlüssel für spätere Phasen kommen in `.env.local` (Vorlage: `.env.example`) und nie ins Repo.
