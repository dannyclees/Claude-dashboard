# Analyse: ElevenLabs-Agent „Alex“ (Hormozi-Wissen)

> Stand: 21.10.2026 · Analyse; die Bereinigung wurde am selben Tag umgesetzt (siehe unten)

## Kurzfazit

Alex ist **inhaltlich gut gedacht**: klare Rolle (Angebote, Leads, Skripte nach Hormozi), guter No-BS-Ton und eine Speicherung ins Google Sheet. **Technisch** bremsen ihn aber mehrere Dinge aus: Dubletten im Wissen, RAG ist aus, ein sehr kleines Modell, ein falscher Tool-Name im Prompt und eine Auswertungskette, die seit Juni stillsteht. Zuletzt benutzt wurde Alex am **20.05.2026**.

## Konfiguration

| Punkt | Ist | Bewertung |
|---|---|---|
| Sprache / Stimme | Deutsch, Stimme `JiW03c2Gt43XNUQAumRP`, `eleven_flash_v2_5` | ✅ gut |
| Modell | `gemini-3.1-flash-lite` | ⚠️ kleinstes und schnellstes Modell, für strategische Tiefe zu schwach |
| Wissensbasis | 29 Dokumente, ca. 445 KB, **199 Seiten** | ⚠️ zu groß und mit Dubletten |
| RAG (gezielte Suche im Wissen) | **aus** | ❌ Ohne RAG muss das Modell mit dem ganzen Wissensblock arbeiten statt gezielt die passenden Stellen zu finden |
| Tools | `Alex-Agent` (Make-Webhook → Google Sheet, 11 Aufrufe), `whatsapp_send_message` (1 Aufruf) | ⚠️ siehe Prompt |
| Erste Nachricht | „Hey Alex hier. Lass loslegen“ | Tippfehler: „Lass **uns** loslegen“ |

## Prompt: Was auffällt

1. **Falscher Tool-Name:** Im Prompt heißt das Speicher-Tool `save_lead_to_google_sheets` bzw. „webhook alex agent“, tatsächlich heißt es **`Alex-Agent`**. Das ist ein wahrscheinlicher Grund, warum nur 11 Gespräche gespeichert wurden.
2. **Doppelte Abschnitte:** Die Guardrails stehen zweimal fast wortgleich drin, dazu kommen Reste aus einer Lead-Vorlage („Nachname unbekannt“).
3. **WhatsApp-Tool** hängt dran, wird im Prompt aber nicht erklärt.

## Wissensbasis: Dokument für Dokument

### Dubletten (je 2×, eine Version reicht)
| Dokument | Hinweis |
|---|---|
| Hormozi – Offizielle Acquisition.com-Ressourcen | 3,2 KB / 4,5 KB |
| Hormozi-Agenten-Framework-Playbook | 8,6 KB / 10,0 KB |
| Hormozi – Podcast- und Audiobook-Quellenindex | 74 KB / 78 KB, **eine Version mit kaputten Umlauten** („‚Äì“) |
| Hormozi – Community-Ressourcen-Prüfung | 7,1 KB / 7,5 KB |
| Compliance- und Nutzungsnotiz | eine Version mit abgeschnittenem Namen |
| Alex-Hormozi-Wissensbasis – Lieferpaket | 2,3 KB / 2,9 KB |
| Clees & Ernster – Firmendaten | 4,7 KB / 2,2 KB |

### Wenig Nutzen im Gespräch (Meta-Dokumente)
- **Quellenindex** (zusammen ca. 152 KB, also ein Drittel des Wissens): nur eine Liste von Podcast-Folgen und Links, kein umsetzbares Wissen.
- **Lieferpaket, Compliance-Notiz, Community-Prüfung:** Dokumentation *über* die Wissensbasis. Sie gehören in den Drive-Ordner, nicht in Alex' Kopf.

### Kernwissen (behalten)
- $100M Leads – vollständige Buchanalyse (27 KB)
- 100M Offers Analyse (37 KB)
- Offizielle Acquisition.com-Workbooks: Big Picture, Create Your Core Offer, Picking the Right Market, Pricing, Bonuses, Scarcity & Urgency, Guarantee, M-A-G-I-C Naming, Workshop Black Book, Affiliate Black Book
- Messenger „Setter“ Script, „Script:“
- „e New Secret Chapter“: Das ist das **Bonuskapitel aus $100M Money Models** (Free-, Discount- und Premium-Angebote). Sehr wertvoll, aber schlecht benannt.
- Hormozi-Agenten-Framework-Playbook (1× behalten)
- Clees & Ernster – Firmendaten (1× behalten, aktuelle Version)

### Qualitätsprobleme in den Texten
- Bei den PDF-Umwandlungen sind die Buchstabenverbindungen „fi“, „fl“ und „Th“ verloren gegangen. Statt „first“, „offer“ oder „The“ steht dort ein Steuerzeichen. Das Modell versteht es meist trotzdem, aber Suche und Zitate leiden.
- Das Lieferpaket-PDF ist zerstückelt (Tabellenzellen wurden als Überschriften erkannt).

### Lücken
- **$100M Money Models** fehlt, bis auf das Bonuskapitel (Attraction-, Upsell-, Downsell- und Continuity-Angebote).
- Ein klares **Verkaufsgespräch-Framework** (z. B. CLOSER) fehlt als eigenes Dokument.
- Eigene **C&E-Fälle** fehlen: Hausmann-Zahlen, Angebote, Preise. Gerade die machen Alex für dich spezifisch.

## Google Sheet „Alex-Agent“

- Ablauf: Gespräch → Make-Webhook → `Tabellenblatt1` → Manus ordnet zu (`01_ROUTER` → `02_TASKS` / `03_DECISIONS` / `05_CAMPAIGNS` / `06_MANUS_QUEUE`).
- **Die Zuordnung steht seit 12.06.2026 still.** `08_DASHBOARD` ist seitdem nicht aktualisiert. Eine Rohdatenzeile hat keine ID.
- Die Struktur selbst ist gut (IDs, Quelle, Status, Owner). Sie wird im Cockpit übernommen: Der **Organisator** ersetzt Manus und sortiert Alex' ToDos in die Master-Aufgabenliste.

## ElevenLabs-Workspace allgemein

**21 Wissensdokumente hängen an keinem Agenten**, darunter „Hier ist die detaillierte Liste…“ (6×), „Wir erstellen ein neues Hauptdokument…“ (6×), „#Knowledge Base: Marketing“ (2×), „Dienstleistungen DataBase“ (2×), alte Karrenbrock-Versionen (2×) und Viessmann, CONFIGURATION, Niz'Art (je 1×). Auch beim Website-Agent-C&E hängen Dubletten.

## Vorschlag (nur nach Freigabe)

1. Alex' Wissen bereinigen: 7 Dubletten und 4 Meta-Dokumente entfernen, unklare Namen umbenennen. Damit schrumpft das Wissen von ca. 445 KB auf ca. 230 KB.
2. **RAG einschalten.**
3. **Stärkeres Modell wählen.** Kostet etwas mehr pro Minute, bringt aber deutlich mehr strategische Tiefe.
4. Prompt aufräumen: Tool-Namen korrigieren, Dubletten raus, erste Nachricht korrigieren.
5. Speicherung künftig ins Cockpit-Backend statt über Make. Der Organisator übernimmt die Zuordnung.
6. Die 21 verwaisten Dokumente im Workspace löschen.

## Umsetzung (21.10.2026, freigegeben von Danny)

- **Behalten (15 Dokumente):** $100M Leads, $100M Offers, Money-Models-Bonuskapitel, Money-Models-Launch-Handbuch, Setter- & Warm-Outreach-Skripte, Messenger-Setter-Skript, Core Offer, Niche, Pricing, Bonuses, Scarcity & Urgency, Guarantee, MAGIC Naming, Agenten-Framework-Playbook, neue Firmendaten (Stand 10/2026)
- **Gelöscht aus Alex' Wissen:** Quellenindex (2×), Offizielle Ressourcen (2×), Community-Prüfung (2×), Compliance-Notiz (2×), Lieferpaket (2×), ältere Playbook-Version, alte Firmendaten (2×), Affiliate Black Book und Workshop Black Book (Event-Werbematerial)
- **Workspace:** 21 verwaiste Dokumente gelöscht. Beim Website-Agent-C&E 3 identische Doppel entfernt, je eine Kopie bleibt angehängt.
- **Konfiguration:** Modell `claude-sonnet-5-5`, Temperatur 0,3, RAG an, Zeitzone Europe/Luxembourg, neuer Prompt, Begrüßung „Hey Danny, Alex hier. Lass uns loslegen – woran arbeiten wir?“
- **Ergebnis:** 199 → 92 Seiten Wissen.
- **Nicht angefasst:** die anderen Agenten (Website-, Rezeptions-, Pizzeria-Agenten) und deren Prompts. Die Test-/Demo-Agenten („test cederic“, „receptionist“, „Tassa“, „Agents v3 Demo“) bestehen weiter.
