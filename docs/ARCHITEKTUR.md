# Cockpit – Architektur (Phase 0, ENTWURF)

> Status: **Entwurf.** Wird nach Dannys Antworten auf die offenen Fragen (unten) finalisiert.
> Stand: 21.10.2026

## 1. Bestandsaufnahme der Verbindungen

Geprüft am 21.10.2026, ausschließlich lesend.

| Dienst | Status | Was gefunden wurde | Bedeutung für Cockpit |
|---|---|---|---|
| **Google Drive** | ✅ funktioniert | Ordner `Dashboard` existiert bereits (seit 04/2026) mit eigener Struktur, Kundenordnern und `TASKS/TASKS.md` | Drive-Agent baut auf der **bestehenden** Struktur auf, statt eine neue zu erzwingen |
| **Google Docs / Sheets / Slides** | ✅ verfügbar | Docs & Sheets im Dashboard lesbar | Aufgaben-Sheet, Briefings als Docs |
| **ElevenLabs** | ✅ funktioniert | 17 Agents vorhanden (u. a. „Alex“, Website-Agenten C&E/Hausman, Rezeptionisten). **Noch kein „Mark“.** | Mark wird neu angelegt; bestehende Agents bleiben unangetastet |
| **HyperFrames (HeyGen)** | ✅ funktioniert | Letztes Projekt: „Peinture de l'Est – Erklärvideo“ (19.10.) | Erklärvideo- & Motion-Agent nutzbar |
| **Figma** | ⚠️ eingeschränkt | Account Danny Clees, Teams „Clees&Ernster“ + „newq“ – jeweils nur **View-Seat** (Starter) | Entwürfe in Figma brauchen evtl. einen Edit-Seat → Alternative: klickbare HTML-Prototypen |
| **Adspirer (Ads)** | ⚠️ eingeschränkt | Nur **Meta Ads „Hausman“** verbunden; Kontingent **10 von 15** Abfragen diesen Monat verbraucht | Performance-Agent nur für Hausman möglich und sparsam einsetzen |
| **monday.com** | ✅ funktioniert | CRM (Standard, 2 Nutzer); Boards: Wärmepumpe+OneBase, Klima, Badezimmer, Innenausbau, Recruiting | Optional als Quelle für Leads/Pipeline |
| **Wispr Flow** | ✅ verbunden | Account Danny Clees; Kalender-Abfrage 21.–23.10. lieferte **0 Termine** | Kalender evtl. nicht synchronisiert → prüfen |
| **Gmail** | ❌ in dieser Session nicht verfügbar | Keine Gmail-Tools geladen | Für den Mail-Assistenten wird im Backend die **Gmail-API (OAuth)** direkt angebunden |
| **Google Calendar** | ❌ in dieser Session nicht verfügbar | Keine Kalender-Tools geladen | Backend nutzt die **Calendar-API (OAuth)** direkt |
| Slack, Notion, Asana, ClickUp, Linear, Atlassian, monday-Plugin | ❌ Verbindungsfehler (Proxy 403) | – | Für Cockpit aktuell nicht nötig |

**Wichtig:** Die MCP-Verbindungen oben gelten für Claude-Sitzungen. Das Cockpit-Backend läuft eigenständig und braucht eigene Zugänge (Google OAuth, ElevenLabs-API-Key, Anthropic-API-Key, HeyGen-Key). Diese kommen in `.env`.

## 2. Bestehende Drive-Struktur `Dashboard/`

```
Dashboard/
├── 01_Marketing/
├── 02_Ideenfindung/
├── 03_Analysen/
├── 04_Kunden/
│   ├── Hausman/
│   ├── Peinture_de_lEst/
│   ├── Berdorfer_Kaese/
│   ├── YtterDesign/
│   ├── Agence Foyer Leick/
│   ├── Karrenbrock_und_Partners/
│   ├── Source_Invest/
│   ├── cederic/
│   ├── Aktive_Projekte/
│   └── Angebote_Proposals/
├── 05_Strategie/
├── 06_Finanzen/
├── 07_Ressourcen/
├── 08_Datenbanken/
├── 09_Skills/
├── 10_Buchhaltung/
├── ClaudeCode/        (Rechner.sheet)
├── OnBoarding/
├── TASKS/             (TASKS.md – aktuelle Aufgabenliste)
└── lose Dateien: Master E-Mail, E-Mail Funnel Handwerker, CV, Angebotsvorlage KI-Beratung, Alex-Agent.sheet, 21.09.26 E-Mail Kamp.
```

### Vorschlag: behutsam ergänzen statt umbauen

Die bestehenden Nummern bleiben. Neu dazu kommen nur:

```
Dashboard/
├── 00_Heute/          NEU – Morgen-Briefing + Tagesabschluss
├── 04_Kunden/<Name>/  bleibt – je Partner zusätzlich eine Datei „_Steckbrief“
├── 11_Content/        NEU – Texte, Skripte, Videos, Motion (Unterordner nach Status)
├── 12_Mail/           NEU – Mail-Zusammenfassungen + Entwürfe zur Freigabe
└── _System/           NEU – Agenten-Board (Sheet), Ereignis-Log, Übergaben
```

`TASKS/TASKS.md` wird zum Master-To-do (oder in ein Sheet `_System/Aufgaben` überführt – Entscheidung offen).
Lose Dateien im Hauptordner sortiert der Drive-Agent erst nach Freigabe ein.

## 3. Agentenliste (Entwurf)

| Ebene | Agent | Datenquellen |
|---|---|---|
| 1 | **Mark** (Stimme, ElevenLabs) | Backend-Tools → alle Agenten |
| 2 | **Organisator** | Calendar-API, TASKS, Agenten-Board, Wispr-Flow-Meetings |
| 2 | **Mail-Assistent** | Gmail-API (nur lesen + Entwürfe) |
| 2 | **Drive-Agent** | Drive-API, Ordner `Dashboard` |
| 3 | **Partner-Agent Hausman** | `04_Kunden/Hausman`, Meta Ads (Adspirer), monday-Boards |
| 3 | **Partner-Agent Peinture de l'Est** | `04_Kunden/Peinture_de_lEst`, HyperFrames |
| 3 | **Partner-Agent Berdorfer Käse** | `04_Kunden/Berdorfer_Kaese` |
| 3 | **Partner-Agent Ytter Design** | `04_Kunden/YtterDesign` |
| 3 | weitere Partner (offen) | Agence Foyer Leick, Karrenbrock & Partners, Source Invest, cederic |
| 3 | **Text-Agent** | Skill `copywriter-cockpit`, `Master E-Mail`, `E-Mail Funnel Handwerker` |
| 3 | **Erklärvideo-Agent** | Skill `motion-designer-cockpit`, HyperFrames, ElevenLabs |
| 3 | **Motion-Design-Agent** | Skill `motion-designer-cockpit`, HyperFrames |
| 3 | **Performance-Agent** (optional) | Adspirer – aktuell nur Hausman |
| 3 | **Design-Agent** (optional) | Figma – abhängig vom Seat |
| 3 | **Akquise-/Vertriebs-Agent** (Vorschlag) | Ziel +140.000 €, Pipeline 5–6 Gespräche/Monat, Empfehlungen, LinkedIn |

## 4. Technische Standardentscheidungen

- Monorepo: `apps/web` (Next.js App Router, TypeScript, Tailwind) + `apps/agents` (Claude Agent SDK, TypeScript) + `agents/*.md` (Agenten-Konfiguration).
- Datenbank: SQLite über Drizzle ORM (Cache, Agenten-Board, Ereignis-Log); Drive bleibt die sichtbare Wahrheit.
- Zeitsteuerung: Node-Scheduler im Backend (`node-cron`), Zeitzone `Europe/Luxembourg`.
- Mark: ElevenLabs Conversational AI mit Client-Tools, die das Backend über eine gesicherte API aufrufen.
- Hosting zunächst lokal auf deinem Rechner (läuft morgens, wenn der Rechner an ist); später optional ein kleiner Server, damit 06:30 auch bei ausgeschaltetem Rechner klappt.

## 5. Offene Fragen an Danny

Siehe Chat. Antworten werden hier eingearbeitet.
