"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Accent switcher — previews all four art directions live.
 *
 * Each theme is a complete palette (bg, surface, hairline, ink, muted, accent),
 * not an accent recolour; setting the attribute re-skins every token on the page.
 * The choice persists in localStorage and is applied before first paint by the
 * inline script in layout.tsx, so there is no flash of the wrong theme.
 *
 * TO LOCK ONE THEME: delete <ThemeSwitcher /> from page.tsx, set
 * data-theme="lime" (or amber / bone / ice) on <html> in layout.tsx, and
 * delete this file plus the themeInit script.
 */

const THEME_DEFAULT = "lime";

const THEMES = [
  {
    id: "lime",
    name: "Electric",
    swatch: "#C8FF3D",
    bg: "#0E0E0C",
    note: "Warm near-black, electric lime",
  },
  {
    id: "amber",
    name: "Editorial",
    swatch: "#D97706",
    bg: "#131110",
    note: "Charcoal, burnt amber",
  },
  {
    id: "bone",
    name: "Gallery",
    swatch: "#2E5A3E",
    bg: "#EDE7DA",
    note: "Warm paper, imperial pine",
  },
  {
    id: "ice",
    name: "Studio",
    swatch: "#7DD3FC",
    bg: "#0A0D11",
    note: "Blue-black, glacier blue",
  },
] as const;

const STORAGE_KEY = "imperial-theme";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>(THEME_DEFAULT);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEMES.some((t) => t.id === saved)) setTheme(saved);
    } catch {
      /* private mode — defaults are fine */
    }
    setReady(true);
  }, []);

  const choose = useCallback((id: string) => {
    setTheme(id);
    document.documentElement.setAttribute("data-theme", id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  if (!ready) return null;

  return (
    // Desktop-only: on small screens the fixed pill lands on top of body copy
    // (it covered the hero metadata and a work title at 390px). Picking an art
    // direction is a desktop decision anyway.
    <div className="fixed bottom-5 left-5 z-50 hidden items-end gap-2 lg:flex">
      {open && (
        <div className="border border-line bg-surface shadow-[0_20px_50px_-25px_rgba(0,0,0,0.7)]">
          <p className="border-b border-line px-3.5 py-2 text-[0.6rem] tracking-[0.2em] text-muted uppercase">
            Art direction
          </p>
          <ul>
            {THEMES.map((t) => {
              const isActive = theme === t.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => choose(t.id)}
                    aria-pressed={isActive}
                    className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left transition-colors duration-300 hover:bg-shade"
                    title={t.note}
                  >
                    <span
                      className="h-3.5 w-3.5 shrink-0 border border-line"
                      style={{ backgroundColor: t.swatch }}
                      aria-hidden="true"
                    />
                    <span className="flex flex-col">
                      <span
                        className={`text-[0.74rem] ${
                          isActive ? "text-accent" : "text-ink"
                        }`}
                      >
                        {t.name}
                      </span>
                      <span className="text-[0.62rem] leading-tight text-muted">
                        {t.note}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close theme picker" : "Open theme picker"}
        className="flex items-center gap-2 border border-line bg-surface px-3 py-2.5 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.7)] transition-colors duration-300 hover:border-accent"
      >
        <span
          className="h-3 w-3 border border-line"
          style={{
            backgroundColor:
              THEMES.find((t) => t.id === theme)?.swatch ?? "#C8FF3D",
          }}
          aria-hidden="true"
        />
        <span className="text-[0.62rem] tracking-[0.18em] text-muted uppercase">
          {open ? "Close" : "Theme"}
        </span>
      </button>
    </div>
  );
}
