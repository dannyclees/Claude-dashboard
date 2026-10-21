import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Seitenleiste } from "@/components/Seitenleiste";
import { Befehlspalette } from "@/components/Befehlspalette";
import { THEME_SKRIPT } from "@/components/theme";
import { alleAufgaben } from "@/brain/abfragen";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cockpit",
  description: "Dannys Agenten-Dashboard für Clees & Ernster",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f2f7" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const aufgaben = alleAufgaben().map(({ id, aufgabe, status, partner, naechsterSchritt }) => ({
    id,
    aufgabe,
    status,
    suchtext: [...partner, naechsterSchritt ?? ""].join(" "),
  }));
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SKRIPT }} />
      </head>
      <body>
        <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] knopf knopf-primaer">
          Zum Inhalt springen
        </a>
        <div className="lg:flex">
          <Seitenleiste />
          <main
            id="inhalt"
            className="min-w-0 flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-10 lg:pt-10"
            style={{ paddingLeft: "max(16px, env(safe-area-inset-left))", paddingRight: "max(16px, env(safe-area-inset-right))" }}
          >
            <div className="mx-auto max-w-[1180px]">{children}</div>
          </main>
        </div>
        <Befehlspalette aufgaben={aufgaben} />
      </body>
    </html>
  );
}
