// Erscheinungsbild: "auto" folgt dem System, sonst fest hell oder dunkel.
export type Theme = "auto" | "hell" | "dunkel";

const SCHLUESSEL = "cockpit-theme";

export function liesTheme(): Theme {
  try {
    const t = localStorage.getItem(SCHLUESSEL);
    if (t === "hell" || t === "dunkel") return t;
  } catch {}
  return "auto";
}

export function setzeTheme(t: Theme | "wechseln") {
  const reihe: Theme[] = ["auto", "hell", "dunkel"];
  const neu = t === "wechseln" ? reihe[(reihe.indexOf(liesTheme()) + 1) % reihe.length] : t;
  try {
    if (neu === "auto") localStorage.removeItem(SCHLUESSEL);
    else localStorage.setItem(SCHLUESSEL, neu);
  } catch {}
  wendeAn(neu);
  window.dispatchEvent(new CustomEvent("cockpit:theme", { detail: neu }));
}

export function wendeAn(t: Theme) {
  const el = document.documentElement;
  if (t === "hell") el.dataset.theme = "light";
  else if (t === "dunkel") el.dataset.theme = "dark";
  else delete el.dataset.theme;
}

// Läuft vor dem ersten Zeichnen, damit nichts aufblitzt.
export const THEME_SKRIPT = `try{var t=localStorage.getItem("${SCHLUESSEL}");if(t==="hell")document.documentElement.dataset.theme="light";else if(t==="dunkel")document.documentElement.dataset.theme="dark";}catch(e){}`;
