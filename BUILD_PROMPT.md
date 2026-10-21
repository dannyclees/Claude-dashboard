# Build-Prompt: „Cockpit“ – mein Agenten-Dashboard

> **So benutzt du diesen Prompt:** Öffne Claude Code in diesem Repository und füge alles ab der Linie unten ein (oder schreib: „Lies `BUILD_PROMPT.md` und starte mit Phase 0“). Claude baut das System Phase für Phase und fragt vor jeder neuen Phase nach deinem OK.

---

## Rolle & Arbeitsweise

Du bist mein Lead-Engineer und Systemarchitekt. Wir bauen zusammen **„Cockpit“**: ein persönliches, sprachgesteuertes Dashboard mit einem Team aus KI-Agenten, das mein komplettes Arbeitsleben (Marketing-Agentur, Partnerbetriebe, Mails, Termine, Dateien, Content-Produktion) an einem Ort bündelt.

Regeln für deine Arbeit:
1. **Langsam und gründlich.** Wir arbeiten in Phasen (siehe unten). Am Ende jeder Phase: Zusammenfassung, Demo/Screenshot, offene Fragen – dann wartest du auf mein OK. Keine Phase überspringen.
2. **Erst fragen, dann bauen**, wenn eine Entscheidung wirklich meine ist (z. B. Namen von Partnerbetrieben, Tonalität, Prioritätsregeln). Für technische Details triffst du sinnvolle Standardentscheidungen und nennst sie mir.
3. **Alles konfigurierbar statt hart codiert.** Neue Agenten (z. B. ein neuer Partnerbetrieb) sollen sich durch eine neue Konfigurationsdatei anlegen lassen – ohne Code-Änderung.
4. **Sicherheit vor Tempo.** Nichts wird ohne meine Freigabe nach außen geschickt (Mails, Posts, Freigaben in Drive, Löschungen).
5. Committe nach jedem abgeschlossenen Schritt mit einer klaren Commit-Message.
6. Sprache der Oberfläche und der Agenten: **Deutsch**.

## Das Problem

Wenn ich Claude öffne, ist alles durcheinander: Projekte liegen in der Seitenleiste, verschiedene MCP-Verbindungen sind aktiv, aber nichts ist übersichtlich. Ich will **einen** Ort, an dem ich morgens ins Büro komme und **alles ist ready**: Was ist wichtig, was steht an, was haben die Agenten über Nacht vorbereitet.

## Die Vision in einem Satz

Ich komme morgens rein, sage „Guten Morgen, Mark“, und Mark sagt mir in 60 Sekunden, was heute wirklich zählt – während das Dashboard daneben alles visuell zeigt: Termine, Prioritäten, Mails, Status jedes Agenten und jedes Partnerbetriebs.

---

## Das Team (die „Armee“)

### Ebene 1 – Mark (Stimme & Ausführung)
- **Mark** ist mein „Abarbeiter“: der Mitarbeiter, mit dem ich spreche. Umgesetzt als **ElevenLabs Conversational AI Agent** mit eigener, männlicher, ruhiger und kompetenter deutscher Stimme (per Voice Design erstellen, ich wähle aus Vorschlägen).
- Mark nimmt Aufträge per Sprache (und Text) entgegen, zerlegt sie, **delegiert an die zuständigen Agenten** und meldet zurück, wenn etwas erledigt ist.
- Mark kann im Gespräch Dashboard-Daten abfragen (Tools/Webhooks ins Backend): „Was steht heute an?“, „Was ist mit Partner X?“, „Schreib dem Mail-Assistenten, er soll …“.
- Mark ist im Dashboard als Sprach-Widget eingebunden (Push-to-talk-Button + Live-Transkript).

### Ebene 2 – Kern-Team
| Agent | Aufgabe | Zugriff |
|---|---|---|
| **Organisator** | Kennt mein Dashboard, macht To-do-Listen, erinnert mich, priorisiert nach „wirklich wichtig vs. nur dringend“ (Eisenhower), erstellt das Morgen-Briefing und den Tagesabschluss. | Kalender, Aufgaben, Agenten-Board, Wispr-Flow-Meetings |
| **Mail-Assistent** | Sortiert den Posteingang, fasst zusammen, markiert was eine Antwort braucht, schreibt **Entwürfe** in meinem Stil. Sendet **nie** ohne meine Freigabe. Leitet Aufgaben aus Mails an den Organisator weiter. | Gmail |
| **Drive-Agent** | Hütet den Ordner **`Dashboard`** in Google Drive: hält Struktur sauber, legt neue Dateien richtig ab, merkt sich, was wo liegt, und meldet neue Dateien an das Gehirn. | Google Drive, Docs, Sheets, Slides |

### Ebene 3 – Fach-Agenten (Marketing)
| Agent | Aufgabe | Werkzeuge |
|---|---|---|
| **Partner-Agent je Partnerbetrieb** | Ein eigener Agent pro Kunde/Partner: kennt dessen Marke, Zielgruppe, laufende Kampagnen, Deadlines, Ansprechpartner und Historie. Liefert morgens einen Status pro Partner. | Eigener Ordner in `Dashboard/Partner/<Name>/`, Mails mit dem Partner, Ads-Daten |
| **Text-Agent** | Ads, Hooks, Videoskripte, Landingpages, E-Mails, Akquise-Texte. | Skill `copywriter-cockpit` (Verkaufspsychologie für Clees & Ernster) |
| **Erklärvideo-Agent** | Plant und produziert Erklärvideos: Skript → Storyboard → Voiceover → Video. | Skill `motion-designer-cockpit`, HyperFrames, ElevenLabs (Voiceover) |
| **Motion-Design-Agent** | Animierte Ad-Creatives, Reels, Bauchbinden/Lower Thirds, Overlays für DaVinci Resolve, Hook-Varianten für A/B-Tests. | Skill `motion-designer-cockpit`, HyperFrames, Figma |
| **Performance-Agent** *(Vorschlag)* | Behält Kampagnen-Performance aller Partner im Blick und meldet Auffälligkeiten. Nur lesend, bis ich etwas freigebe. | Adspirer (Google/Meta/TikTok Ads etc.) |
| **Design-Agent** *(Vorschlag)* | Grafiken, Layouts, Brand-Kits pro Partner. | Figma |

> Die Liste soll beliebig wachsen. Jeder Agent ist eine Datei in `agents/` (Markdown mit Frontmatter: Name, Rolle, Ziele, erlaubte Tools, Freigaberegeln, Ton). Ein neuer Partner = eine neue Datei aus einer Vorlage.

---

## Wie die Agenten miteinander reden

- Zentrale ist **das Gehirn** im Cockpit. Für Dateien gibt es den Ordner **`Dashboard`** in Google Drive, verwaltet vom Drive-Agenten:
  ```
  Dashboard/
  ├── 00_Heute/            ← Morgen-Briefing, Tagesplan (wird jede Nacht neu erzeugt)
  ├── 02_Partner/<Name>/   ← je Partner: Steckbrief, Kampagnen, Assets, Protokolle
  ├── 03_Content/          ← Texte, Skripte, Videos, Motion – nach Status sortiert
  ├── 04_Mail/             ← Zusammenfassungen, Antwortentwürfe zur Freigabe
  ├── 05_Wissen/           ← Brand-Guidelines, Stilvorgaben, Vorlagen
  └── _System/             ← Sicherungen des Gehirns
  ```
- **Das Gehirn** (Datenbank im Cockpit, siehe `brain/README.md`) ist die einzige Quelle für Aufgaben, Ziele, Partner, Übergaben, Freigaben, Gespräche und das Ereignis-Log. Jede Aufgabe hat Besitzer-Agent, Status (offen / in Arbeit / wartet auf Freigabe / erledigt), Quelle (Mail, Sprache, Termin) und Verlauf. Übergaben laufen über das Gehirn, nicht „im Kopf“ eines Agenten.
- Google Drive speichert nur Dateien.

---

## Der Morgen-Ablauf („Wenn ich ins Büro komme, ist alles ready“)

Jeden Werktag automatisch um **06:30 Uhr** (Zeit konfigurierbar):
1. **Mail-Assistent** verarbeitet alle neuen Mails seit gestern Abend → Zusammenfassung, Antwortentwürfe, extrahierte Aufgaben.
2. **Partner-Agenten** erstellen je einen Kurzstatus (Was ist offen? Deadlines? Performance-Auffälligkeiten?).
3. **Drive-Agent** räumt neue Dateien ein und meldet, was neu ist.
4. **Organisator** fasst alles zusammen: Termine heute, Top-3-Prioritäten, Fristen dieser Woche, was auf meine Freigabe wartet → `00_Heute/Briefing_<Datum>`.
5. Wenn ich das Dashboard öffne: Briefing ist da, Mark kann es mir vorlesen.

Abends optional: **Tagesabschluss** (Was wurde erledigt? Was rutscht auf morgen?).

---

## Design: Apple Human Interface Guidelines

Das Dashboard soll aussehen und sich anfühlen wie eine native Apple-App (macOS/iPadOS-Stil). Nutze den Skill `apple-cockpit` für die exakten Werte.
- **Schrift:** SF Pro (Systemschrift, Fallback `-apple-system, BlinkMacSystemFont`), Apple-Typo-Skala (Large Title, Title 1–3, Headline, Body, Callout, Footnote, Caption).
- **Farben:** Apple-Systemfarben (systemBlue, systemGreen, systemOrange, systemRed …), semantische Farben (label, secondaryLabel, systemBackground, secondarySystemBackground), **Hell- und Dunkelmodus** automatisch.
- **Materialien:** Glas-/Blur-Effekte (vibrancy, „Liquid Glass“-Stil) für Seitenleiste und Widgets, sanfte Schatten, große Eckenradien.
- **Layout:** Seitenleiste links (Heute · Aufgaben · Mails · Partner · Content · Agenten · Einstellungen), Inhalt in Karten/Widgets wie das iOS-Widget-System. 8-pt-Raster, großzügiger Weißraum.
- **Interaktion:** Mindestgröße 44×44 pt für Bedienelemente, flüssige Spring-Animationen, Respekt vor „Bewegung reduzieren“, gute Kontraste (WCAG AA), komplett per Tastatur bedienbar, ⌘K-Befehlspalette.
- **Agenten-Ansicht:** Jeder Agent als Karte mit Avatar, Status-Ampel, letzter Aktion und „Was macht er gerade?“. Visuelle Darstellung der Agenten-Hierarchie (Mark → Kern-Team → Fach-Agenten).
- Vor dem Bauen: erste Entwürfe der Hauptansichten in **Figma** erstellen und mit mir abstimmen.

### Ansichten
1. **Heute** – Begrüßung, Briefing, Termine als Timeline, Top-3-Prioritäten, „Wartet auf deine Freigabe“.
2. **Aufgaben** – Liste/Kanban, gefiltert nach Wichtigkeit, Partner, Agent.
3. **Mails** – Zusammenfassungen und Entwürfe mit „Freigeben / Bearbeiten / Verwerfen“.
4. **Partner** – Kachel pro Partnerbetrieb, Detailseite mit Status, Kampagnen, Assets, Verlauf.
5. **Content-Studio** – Pipeline für Texte, Erklärvideos, Motion (Idee → Skript → Produktion → Freigabe → Live).
6. **Agenten** – Team-Übersicht, Logs, Einstellungen pro Agent.
7. **Mark** – immer erreichbar als schwebendes Sprach-Widget.

---

## Technik (Vorschlag – in Phase 0 bestätigen)

- **Frontend:** Next.js (App Router) + TypeScript + Tailwind mit Apple-Design-Tokens, als PWA (später optional als Mac-App via Tauri).
- **Backend / Agenten:** Claude Agent SDK (TypeScript). Jeder Agent = konfigurierter Sub-Agent mit eigenem System-Prompt und eigener Tool-Freigabe. Neueste Claude-Modelle verwenden.
- **Anbindungen (MCP/APIs):** Gmail, Google Calendar, Google Drive/Docs/Sheets/Slides, ElevenLabs, HyperFrames (HeyGen), Figma, Adspirer, Wispr Flow, optional monday.com.
- **Stimme:** ElevenLabs Conversational AI für Mark (Agent + Client-Tools, die das Backend aufrufen), Widget im Frontend.
- **Zeitsteuerung:** Geplante Jobs für Morgen-Briefing und Tagesabschluss.
- **Daten:** das Gehirn (SQLite) als einzige Quelle; Google Drive `Dashboard` nur für Dateien und Sicherungen.
- **Geheimnisse:** Alle Schlüssel in `.env`, nie im Code oder im Repo. `.env.example` mit Platzhaltern pflegen.

## Freigaberegeln (nicht verhandelbar)

- Mails **senden**, Dateien **teilen/löschen**, Kampagnen **ändern**, Inhalte **veröffentlichen** → immer erst „Wartet auf Freigabe“, ich bestätige.
- Lesen, zusammenfassen, Entwürfe schreiben, Dateien einsortieren → dürfen Agenten selbstständig.
- Jede Aktion eines Agenten wird im Ereignis-Log festgehalten (wer, was, wann, warum).

---

## Phasen

**Phase 0 – Bestandsaufnahme & Plan**
Prüfe, welche Verbindungen (MCPs/APIs) tatsächlich funktionieren. Frag mich nach: meinen Partnerbetrieben, meinem Arbeitsrhythmus, meinen wichtigsten Prioritäten, gewünschter Ordnerstruktur. Ergebnis: `docs/ARCHITEKTUR.md` + finale Agentenliste.

**Phase 1 – Fundament & Design**
Projekt-Setup, Apple-Design-Tokens, Seitenleiste und leere Ansichten, Hell/Dunkel. Figma-Entwürfe der Hauptansichten zur Abstimmung.

**Phase 2 – Drive-Agent & Ordnerstruktur**
`Dashboard`-Ordner anlegen/aufräumen, Agenten-Board und Ereignis-Log, Agenten-Konfigurationsformat (`agents/*.md`) inkl. Vorlage.

**Phase 3 – Organisator & Ansicht „Heute“**
Kalender + Aufgaben anbinden, Priorisierungslogik, erstes manuelles Morgen-Briefing.

**Phase 4 – Mail-Assistent**
Posteingang-Triage, Zusammenfassungen, Entwürfe, Freigabe-Workflow im Dashboard.

**Phase 5 – Mark (Stimme)**
Stimme mit ElevenLabs designen (ich wähle aus), Conversational Agent anlegen, Tools ins Backend, Sprach-Widget im Dashboard, Delegation an andere Agenten.

**Phase 6 – Partner-Agenten**
Vorlage, ein Agent pro Partnerbetrieb, Partner-Ansicht, Kurzstatus im Briefing.

**Phase 7 – Content-Agenten**
Text-Agent, Erklärvideo-Agent, Motion-Design-Agent, Content-Studio-Pipeline.

**Phase 8 – Automatisierung „Alles ready am Morgen“**
Geplanter Morgen-Ablauf 06:30, Tagesabschluss, Benachrichtigungen.

**Phase 9 – Feinschliff bis ins letzte Detail**
Animationen, Barrierefreiheit, Performance, Fehlerfälle, Tests, Dokumentation, Erweiterung um weitere Agenten.

---

**Starte jetzt mit Phase 0.** Fang mit der Prüfung der Verbindungen an und stell mir danach deine Fragen gesammelt in einer Liste.
