# Cockpit – Architektur (Phase 0, ENTWURF)

> Status: **Entwurf, weitgehend abgestimmt.** Offene Punkte siehe Abschnitt 6.
> Stand: 21.10.2026

## 1. Bestandsaufnahme der Verbindungen

Geprüft am 21.10.2026, ausschließlich lesend.

| Dienst | Status | Was gefunden wurde | Bedeutung für Cockpit |
|---|---|---|---|
| **Google Drive** | ✅ funktioniert | Ordner `Dashboard` existiert bereits (seit 04/2026) mit eigener Struktur, Kundenordnern und `TASKS/TASKS.md` | Drive-Agent baut auf der **bestehenden** Struktur auf, statt eine neue zu erzwingen |
| **Google Docs / Sheets / Slides** | ✅ verfügbar | Docs & Sheets im Dashboard lesbar | Briefings als lesbare Docs; Aufgaben liegen im Gehirn |
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
└── _System/           NEU – nur Sicherungen (Export des Gehirns)
```

Aufgaben, Agenten-Board, Übergaben und Ereignis-Log liegen **im Gehirn** (`brain/README.md`), nicht in Drive. `TASKS/TASKS.md` bleibt als Archiv; Drive ist nur Dateiablage.
Lose Dateien im Hauptordner sortiert der Drive-Agent erst nach Freigabe ein.

## 3. Agentenliste

| Ebene | Agent | Datenquellen |
|---|---|---|
| 1 | **Mark** – Stimme & Ausführung (ElevenLabs, neu) | Backend-Tools → alle Agenten; kann an Alex übergeben |
| 1 | **Alex** – Stratege & Sparringspartner (ElevenLabs, besteht, wird bereinigt) | Hormozi-Wissensbibliothek, C&E-Firmendaten |
| 2 | **Organisator** | Calendar-API, Gehirn (Aufgaben, Ziele, Übergaben), Wispr-Flow-Meetings, Alex-Gespräche |
| 2 | **Mail-Assistent** | Gmail-API (nur lesen + Entwürfe) – Zugang folgt |
| 2 | **Drive-Agent** | Drive-API, Ordner `Dashboard` |
| 3 | **Partner-Agent Hausmann** | `04_Kunden/Hausman`, Meta Ads (Adspirer), monday-Boards |
| 3 | **Partner-Agent Ytter Design** | `04_Kunden/YtterDesign` |
| 3 | **Partner-Agent Berdorfer Käse** | `04_Kunden/Berdorfer_Kaese` |
| 3 | **Partner-Agent Peinture de l'Est** | `04_Kunden/Peinture_de_lEst`, HyperFrames |
| 3 | **Akquise-Agent** (neu, bestätigt) | Hormozi-Wissensbibliothek, Ziele-Tab, Empfehlungen, LinkedIn, ggf. monday-CRM |
| 3 | **Text-Agent** | Skill `copywriter-cockpit`, `Master E-Mail`, `E-Mail Funnel Handwerker` |
| 3 | **Erklärvideo-Agent** | Skill `motion-designer-cockpit`, HyperFrames, ElevenLabs |
| 3 | **Motion-Design-Agent** | Skill `motion-designer-cockpit`, HyperFrames |
| 3 | **Performance-Agent** | Adspirer – nach Abo-Upgrade |
| 3 | **Design-Agent** (optional) | Figma – nur mit Edit-Seat |

Inaktiv (kein eigener Agent, Ordner bleiben): Agence Foyer Leick, Karrenbrock & Partners, Source Invest, cederic.

### Hormozi-Wissen: eine Quelle, mehrere Nutzer

```
Dashboard/07_Ressourcen/Hormozi-Wissen/      ← EINE bereinigte Quelle (Markdown, ohne Dubletten)
        │
        ├──► Alex (ElevenLabs)      Wissensbasis + RAG, für Sprachgespräche
        └──► Skill „hormozi-cockpit“ für Claude-Agenten
                 ├── Akquise-Agent    (Leads, Outreach, Angebote, Follow-ups)
                 ├── Text-Agent       (Hooks, Angebote in Texten)
                 └── Organisator      (Priorisierung nach Umsatzhebel)
```

- Der Skill enthält die verdichteten Frameworks (Value Equation, Grand Slam Offer, Core Four, Lead Getters, Money Models, Preis/Garantie/Bonus) plus Verweise auf die Volltexte.
- Eigene C&E-Fälle (Hausmann-Zahlen, Angebote, Preise) kommen dazu. Sie machen das Wissen erst spezifisch.
- Rechtlicher Rahmen wie in der bestehenden Compliance-Notiz: offizielle Acquisition.com-Materialien und eigene Zusammenfassungen, keine kopierten Buch-Volltexte.
- Rollen: **Alex denkt mit** (Sparring per Sprache), **der Akquise-Agent setzt um** (Listen, Entwürfe, Nachfassen). Mark kann dich per Sprache an Alex übergeben.

Details: `docs/ALEX_ANALYSE.md`, `docs/AUFGABEN_SYSTEM.md`.

## 4. Technische Standardentscheidungen

- Monorepo: `apps/web` (Next.js App Router, TypeScript, Tailwind) + `apps/agents` (Claude Agent SDK, TypeScript) + `agents/*.md` (Agenten-Konfiguration).
- **Gehirn:** SQLite über Drizzle ORM als einzige Quelle für Aufgaben, Ziele, Partner, Agenten, Übergaben, Freigaben, Gespräche, Ereignis-Log und Gedächtnis. Drive speichert nur Dateien; das Gehirn wird täglich nach `_System/Backup` gesichert.
- Zeitsteuerung: Node-Scheduler im Backend (`node-cron`), Zeitzone `Europe/Luxembourg`.
- Mark: ElevenLabs Conversational AI mit Client-Tools, die das Backend über eine gesicherte API aufrufen.
- Hosting zunächst lokal auf deinem Rechner (läuft morgens, wenn der Rechner an ist); später optional ein kleiner Server, damit 06:30 auch bei ausgeschaltetem Rechner klappt.

## 5. Entscheidungen (21.10.2026)

| Thema | Entscheidung |
|---|---|
| Aktive Partner | Hausmann, Ytter Design, Berdorfer Käse, Peinture de l'Est |
| Schreibweise | **Hausmann** (mit zwei n) |
| Morgen-Briefing | fertig um **06:30**, Danny im Büro ab 07:00 |
| Tagesabschluss | **18:00** |
| Zeitzone | Europe/Luxembourg |
| Ziel | +140.000 € Neuumsatz in 12 Monaten, Priorisierung nach Umsatzhebel |
| Akquise-Agent | ja, mit Hormozi-Wissen |
| Alex | bleibt und wird genutzt |
| Adspirer | Abo-Upgrade folgt durch Danny |
| Gmail | Zugang folgt, Danny stellt intern noch etwas um |
| Betrieb | zunächst lokal auf Dannys Rechner |
| Figma | Standard: klickbare HTML-Prototypen (View-Seat) |

## 6. Umgesetzt am 21.10.2026

- **ElevenLabs bereinigt:** 39 Dokumente gelöscht (Dubletten, Link- und Quellenlisten, Meta-Notizen, verwaiste Dokumente). Ordnerstruktur: „Alex – Hormozi-Wissen“, „C&E – Firmendaten“, „Kunden-Agenten“.
- **Alex:** Modell `claude-sonnet-5-5`, RAG an (`multilingual_e5_large_instruct`), Zeitzone Europe/Luxembourg, Prompt neu (Tool-Name `Alex-Agent` korrigiert), Begrüßung korrigiert, Wissen von 199 auf 92 Seiten.
- **Drive:** `Dashboard/07_Ressourcen/Hormozi-Wissen/00_Übersicht Hormozi-Wissen`.
- **Aufgaben:** Entscheidung von Danny: Aufgaben leben im Gehirn des Cockpits, nicht in einem Sheet. Startdaten (25 Aufgaben, Ziele, Partner) liegen in `brain/seed/`. `TASKS.md` bleibt als Archiv. Das am 21.10. angelegte Sheet `_System/Cockpit-Aufgaben` wird nicht weitergeführt.

## 7. Noch offen

- Drive-Ordner „Hausman“ in „Hausmann“ umbenennen? (Domain ist hausman.lu)
- 6 Aufgaben mit Status „prüfen“ (aus Alex-Gesprächen im Mai) entscheiden
- Fälligkeitsdaten ergänzen (im Dashboard, sobald es steht)
- Gmail-Zugang, Adspirer-Abo
