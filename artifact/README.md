# Cockpit als Claude-Artifact

`cockpit.html` ist die Version des Cockpits, die direkt in Claude läuft:
<https://claude.ai/artifact/FgbmgqzRqJnoMXwP1VGBwa> (privat, nur Danny).

- Das Gehirn liegt hier in der Datenbank des Artifacts, in den Sammlungen `aufgaben`, `ziele`, `partner`, `agenten`, `ereignisse`, `briefings`, `freigaben`, `gespraeche` und `system`. Claude kann diese Daten lesen und schreiben.
- Befüllt am 21.10.2026 aus `brain/seed/` mit 25 Aufgaben, 5 Zielen, 4 Partnern und 14 Agenten.
- Gleiche Ansichten und Regeln wie die lokale App (Eisenhower-Priorität, Top 3, Freigaberegeln).
- Bei einer Änderung: Datei bearbeiten und unter derselben URL neu veröffentlichen.
- Version 3 (21.10.2026): Briefing, Freigaben und Alex-Gespräche auf „Heute“, Steckbriefe bei den Partnern, letzte Aktion bei den Agenten.
- Version 8 (21.10.2026): Pipeline mit abgeschlossenem Umsatz pro Monat und Jahr, Beträge und Wahrscheinlichkeit änderbar, Abschlussdatum, „Neue Chance“, Auftrags-Knöpfe je Chance und je Agent; Aufträge an Agenten arbeitet der Morgenlauf ab.
- Version 9: Pipeline zählt jeden Abschluss fürs Ziel, außer er ist als Bestand markiert; „In Arbeit“, „Gewichtet“ und Wahrscheinlichkeit entfernt, dafür „Angebot vom“ änderbar.
- Version 10: Seite „Leads“ (33 Akquise-Ziele aus dem C&E Cockpit, Anruf-Ergebnis mit Verlauf), kompakte Anrufliste „Heute anrufen“ statt großer Empfehlungs-Entwürfe, Vertragsdaten und Bewertungen je Partner.
- Version 11: Reiter „Sales“ mit Ziel-Übersicht (Neuumsatz, kurz vor Abschluss, laufender Umsatz, Klumpenrisiko), Pipeline als Board mit Detail-Dialog, Umsatz pro Monat/Jahr, Wochenfokus, Aktivität und Trichter, Anrufliste, Bestandskunden, Verkaufsleitfaden (`system/sales`). Reiter „Pipeline“ ist darin aufgegangen.
- Version 12: Pipeline-Kacheln per Ziehen und Ablegen zwischen den Stufen verschieben (Maus direkt, Touch nach kurzem Halten).
- Version 13: „Wartet auf deine Freigabe“ als kompakte Liste, Text zum Aufklappen.
- Version 14: Startseite als Desktop-Übersicht: 6 Mini-Kennzahlen, Briefing und Top 3, „Wer macht was“ (Danny und Agenten mit Aufgaben, Freigaben, letzter Aktion), Anrufen, Freigaben (Dialog), Pipeline, Wochenfokus, Gespräche, Zuletzt passiert.
- Version 15: Anrufliste zeigt den Zweck jedes Anrufs als farbiges Etikett mit Farbstreifen (Empfehlung anfragen, Empfehlung, Termin fixieren/vorbereiten, Rückruf, Nachfassen, Unterlagen, Erstanruf).
- Version 16: „Mein Tag“ (Aufgaben-Board Als Nächstes/Heute/In Arbeit/Wartet/Erledigt, ziehen, Tag abschließen), „Kurz gefragt“ (Fragen zum Ankreuzen, Antwort wird direkt umgesetzt, Sammlung `fragen`), Kampagnenplan (Sammlung `kampagnen`, Vorbereitung wird 21 Tage vorher an Agenten verteilt), Partner-Kennzahlen beschriftet, Content-Seite entfernt.
- Version 17: Neue Anrufvorschläge aus der Leadliste erscheinen als „Neuer Vorschlag“ (türkis).
- Version 18: „Weiß nicht“ bei Datumsfragen legt keine Kampagne mehr an.
- Version 19: Agenten-Chat im Cockpit (Panel rechts, alle Agenten wählbar, kein Wechsel zu ElevenLabs). Die Agenten lesen Kunden, Leads, Sales, Aufgaben und das Lagebild über Werkzeuge und können Aufgaben anlegen. Fähigkeit `sample` dazu.
- Version 20: Sprachmodus (Mikrofon, wo die Ansicht es erlaubt; sonst Diktat mit Wispr Flow, das automatisch gesendet wird; Antworten werden vorgelesen). Jedes Gespräch wird vollständig in der Sammlung `chats` gespeichert und ist über „Gespeicherte Gespräche“ wieder abrufbar.
- Version 21: Augen-Knopf oben rechts verbirgt Zahlen und Namen zum Vorzeigen. Abend-Briefing mit Mark: Mark stellt die offenen Fragen nacheinander, trägt die Antworten ein, ändert Aufgaben und legt die Aufgaben für morgen an.
- Version 22: Jede Kennzahl und jeder Bereich hat ein eigenes Auge zum Verbergen; das große Auge oben rechts verbirgt alles, einzelne Bereiche lassen sich dann wieder zeigen. Die Auswahl bleibt gespeichert.
