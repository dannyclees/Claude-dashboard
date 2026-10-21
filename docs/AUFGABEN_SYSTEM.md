# Aufgaben-System: Bestand und Vorschlag

> Stand: 21.10.2026

## Was es heute gibt: drei Listen parallel

| System | Inhalt | Zustand |
|---|---|---|
| `Dashboard/TASKS/TASKS.md` (Google Doc) | 12 aktive Aufgaben, 3 „Waiting On“, 2 „Someday“, 1 erledigt | Inhalt gut, aber ohne Fälligkeit, Priorität, Partner oder Zuständigkeit |
| Google Sheet „Alex-Agent“ → `02_TASKS` | Aufgaben aus Alex-Gesprächen (Mai/Juni), teils mit Owner „Manus“ | seit 12.06. nicht mehr gepflegt |
| monday.com CRM | Boards Wärmepumpe, Klima, Badezimmer, Innenausbau, Recruiting | Leads und Projekte, keine persönlichen To-dos |

**Problem:** Keine Liste ist die eine Wahrheit. Der Organisator kann nicht sauber priorisieren, solange Aufgaben an drei Stellen liegen.

## Bewertung der `TASKS.md`

**Gut:**
- Die Aufgaben sind konkret und gut beschrieben, mit Unterpunkten wie beim Förder-Rechner.
- Die Gliederung Active / Waiting On / Someday / Done ist sinnvoll.
- Das Jahresziel steht drin.

**Was fehlt:**
1. **Kein Fälligkeitsdatum.** So kann dich niemand rechtzeitig erinnern.
2. **Keine Priorität.** Alles in „Active“ wirkt gleich wichtig.
3. **Kein Partner-Bezug als Feld.** Hausmann steckt im Text, ist aber nicht filterbar.
4. **Keine Zuständigkeit.** Unklar, was du machst und was ein Agent vorbereiten kann.
5. **„Waiting On“ ohne Details.** Es fehlt, auf wen du wartest, seit wann und wann du nachfasst.
6. **Ziel und Aufgaben sind vermischt.** „+140.000 € Neuumsatz“ ist ein Ziel mit Kennzahlen, keine Aufgabe.
7. **Zu große Brocken.** „Förder-Rechner bauen“ ist ein Projekt und gehört in Teilschritte zerlegt.
8. **Es ist ein Google Doc namens „.md“.** Für Agenten ist das schwer strukturiert zu lesen und zu schreiben.

## Vorschlag: ein Master-Sheet, das Cockpit als Oberfläche

**Google Sheet `Dashboard/_System/Cockpit-Aufgaben`** wird die einzige Aufgabenliste. Du siehst sie hübsch im Cockpit und kannst sie notfalls direkt in Drive öffnen.

### Tab „Aufgaben“
| Spalte | Beispiel |
|---|---|
| ID | AUF-0012 |
| Aufgabe | Ergebniszahlen Hausmann dokumentieren |
| Partner | Hausmann / Ytter Design / Berdorfer Käse / Peinture de l'Est / C&E intern |
| Bereich | Akquise · Kunde · Content · Finanzen · System |
| Wichtig (ja/nein) | ja |
| Dringend (ja/nein) | nein |
| Umsatzhebel | hoch / mittel / niedrig |
| Fällig am | 24.10.2026 |
| Zuständig | Danny · Organisator · Text-Agent · … |
| Status | offen · in Arbeit · wartet · wartet auf Freigabe · erledigt |
| Wartet auf / seit | Kunde, seit 13.10. |
| Nächster Schritt | Zahlen bei J. Heinen anfragen |
| Quelle | TASKS.md · Mail · Alex-Gespräch · Sprache |
| Projekt (optional) | Förder-Rechner |

### Tab „Ziele“
| Ziel | Kennzahl | Soll | Ist |
|---|---|---|---|
| +140.000 € Neuumsatz bis 10/2027 | Neuumsatz € | 140.000 | – |
| Pipeline | qualifizierte Gespräche / Monat | 5–6 | – |
| Website-Projekte | Abschlüsse | 4 | – |
| Jahresverträge Marketing | Abschlüsse | 4 | – |

### Priorisierungslogik des Organisators
1. **Wichtig + dringend + hoher Umsatzhebel** kommt nach oben, maximal 3 Aufgaben pro Tag als „Top 3“.
2. **Wichtig, aber nicht dringend** bekommt einen festen Zeitblock in der Woche. Dort entsteht das Wachstum.
3. **Dringend, aber nicht wichtig** wird an Agenten delegiert, wo möglich.
4. **Weder noch** wandert nach „Someday“ oder fliegt raus.
5. „Wartet“-Aufgaben bekommen automatisch einen **Nachfass-Termin**.

### Was mit den alten Listen passiert
- `TASKS.md`: Die Inhalte werden ins Sheet übernommen. Danach erzeugt der Organisator jeden Montag eine **lesbare Wochenübersicht** als Doc in `00_Heute`. Das Doc bleibt also als Ansicht, ist aber nicht mehr die Quelle.
- Alex-Sheet `02_TASKS`: Die offenen Punkte werden übernommen, Manus-Spalten entfallen.
- monday bleibt **CRM für Leads und Projekte**. Ob der Akquise-Agent dort seine Pipeline führt, entscheiden wir in der Akquise-Phase.

## Erste Einschätzung deiner aktuellen Aufgaben (Hormozi-Brille)

**Top 3 mit dem größten Hebel aufs 140k-Ziel:**
1. **Ergebniszahlen Hausmann + Video-Testimonial.** Beweise sind das Fundament jeder Akquise. Ohne Zahlen keine starken Angebote.
2. **Empfehlungen aktiv anfragen.** Warm Outreach ist laut $100M Leads die günstigste Lead-Quelle. 4 Kunden mal 2–3 Namen ergeben 8–12 warme Kontakte.
3. **Förderablauf klären.** Zwei Websites à ca. 25.000 € hängen daran, das ist Liquidität.

**Danach:** Marketing-Testabo definieren (das ist dein Angebot), Google-Bewertungen, Förder-Rechner als Lead-Magnet.
**Kann warten:** LinkedIn-Profil (wichtig, aber nicht dringend), E-Mail-Liste.
