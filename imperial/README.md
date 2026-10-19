# Imperial Development Agency — website

Single-page site for **Imperial Development Agency** (New Delhi). Next.js 16 App
Router + Tailwind CSS v4, static output, deploys to Vercel with no configuration.

## Deploy on Vercel

**From the Vercel dashboard:** New Project → import the repo → set
**Root Directory** to `imperial/` → Deploy. Build command `next build`, output
auto-detected.

**From the CLI:**

```powershell
cd imperial
npm install
vercel --prod --yes --name imperial-development
```

No environment variables, no database, no API keys. The site is fully static.

## Editing the content

**Every word on the page lives in `src/lib/site.ts`.** Change it, redeploy — you
never touch a component.

```ts
site.email      // CTA + every mailto link
site.headline   // the hero statement
numbers         // the four figures
work            // the work index + live URLs
services        // the three capabilities
process         // the four steps
quote           // the pull-quote + attribution
```

### Things you said you'd swap in later

- **The quote attribution** — currently `quote.attribution` reads
  "Founder, e-commerce brand". Replace with the client's real name and role once
  they clear you to use it. The quote text itself is yours verbatim.
- **The work index** — the three entries are your live Aurelia demos. As real
  client projects land, replace the objects in `work` (keep `image` pointing at a
  screenshot in `public/work/`).

## Choosing the art direction

Four complete themes ship in this build — each is a full palette (background,
surface, hairlines, text, muted, accent), not an accent recolour. The floating
**Theme** pill is bottom-left; your pick persists in `localStorage`.

| Theme    | Direction                     | Tokens                |
| -------- | ----------------------------- | --------------------- |
| `lime`   | Electric — warm black, lime   | default, technical    |
| `amber`  | Editorial — charcoal, amber   | warm, print-led       |
| `bone`   | Gallery — warm paper, pine    | the light direction   |
| `ice`    | Studio — blue-black, glacier  | cold, engineering-led |

**To lock one theme** (do this before going public — a production site should
not ship a switcher):

1. Delete `<ThemeSwitcher />` from `src/app/page.tsx` and its import.
2. In `src/app/layout.tsx`, add `data-theme="bone"` (or whichever) to `<html>`.
3. Delete `src/components/ThemeSwitcher.tsx` and the `themeInit` script in
   `layout.tsx`.

The active theme is also what the favicon shows (lime mark on black) — if you
lock `bone`, the favicon is the one visual that will not follow.

## What's in here

- `src/app/` — layout, page, globals (all design tokens), sitemap, robots, favicon
- `src/components/` — Hero, Marquee, Numbers, WorkIndex, Services, Process,
  Quote, Contact, Footer, Reveal (scroll reveal), ThemeSwitcher
- `src/lib/site.ts` — all copy and data
- `scripts/capture.mjs` — re-shoots the work-index screenshots from the live
  demo URLs (`node scripts/capture.mjs`, needs Playwright)
- `scripts/qa.mjs` — visual sweep: screenshots every theme at 1440/820/390,
  checks console errors, horizontal overflow, heading structure, alt text

## Design system

Two typefaces: **Instrument Serif** (display, via `next/font`) and **Inter**
(body). Tokens are CSS custom properties in `src/app/globals.css` — palette and
fonts flow into Tailwind through `@theme inline`, so every component pulls from
the system rather than hardcoded hex.

Texture and detail: fixed film grain overlay, oversized faint section numerals,
hairline rules between sections, accent-coloured `::selection`.

Motion: slow fade + rise on scroll (IntersectionObserver, no animation library),
one CSS marquee (pauses on hover), underline-draw links. All of it respects
`prefers-reduced-motion`.
