// Löscht das lokale Gehirn, damit es beim nächsten Start neu aus brain/seed befüllt wird.
import fs from "node:fs";
import path from "node:path";

const pfad = process.env.GEHIRN_PFAD || path.join(process.cwd(), "data", "gehirn.db");
for (const datei of [pfad, `${pfad}-wal`, `${pfad}-shm`]) {
  if (fs.existsSync(datei)) fs.rmSync(datei);
}
console.log(`Gehirn zurückgesetzt: ${pfad}`);
