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
  client projects land, replace the objects in `work` (keep `image` pointing at
  a screenshot in `public/work/`).

### If you add a fourth project

`work` is an array — append an object with `id`, `title`, `tags`, `year`,
`blurb`, `href` and `image`. Drop the screenshot in `public/work/` as a
1200×750 WebP and run `npm run optimize-images` if you started from a PNG.
The preview panel re-measures itself, so a fourth row is handled automatically.

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
- `public/work/*.webp` — the three work screenshots, 1200×750 WebP
- `public/og.png` — the 1200×630 social share card

### Scripts

All of these need the site running (`npm run build && npm start -p 3111`) and
Playwright available.

| Script | What it does |
| ------ | ------------ |
| `npm run qa` | Screenshots every theme at 1440/820/390, checks console errors, horizontal overflow, heading structure, alt text, JS-off rendering |
| `npm run deep-audit` | Contrast per theme per token pair, tap-target sizes, image weight and CLS, marquee seamlessness, focus order, landmark sanity |
| `npm run interaction-check` | Theme switcher (open/apply/persist/Escape/outside-click), skip link, reduced-motion path, keyboard preview tracking |
| `npm run audit` | Full-page renders at 1440/1024/820/390 plus a gap report between sections |
| `npm run crop` | High-resolution crops of each section, so type defects are visible rather than guessed |
| `npm run shots` | Viewport-accurate shots (not full-page) so fixed overlays appear where they really sit |
| `npm run og` | Re-renders `public/og.png` from the live page — it cannot drift from the design system |
| `npm run capture` | Re-shoots the work screenshots from the live Aurelia demos and encodes them to WebP |
| `npm run optimize-images` | Re-encodes `public/work/*.png` to WebP in place |

### Notes on the work index

The preview in the right-hand column is **pinned to the centre line of the row
you are pointing at** — it measures the active row and translates to it, so the
screenshot and the title it belongs to are never in different places. A 2px
accent tick marks the active row in the left gutter. All three previews stay
mounted and cross-fade, so swapping them never blanks the frame.

Each row is a **band**: the hairline rules and the hover tint bleed out into
the container gutter by half its width (12px / 16px / 24px as the container
padding grows), and the text sits inside with the same margin. Without that
the title was flush against the tint's edge and read as a mis-registered box
rather than a highlight. The band and the rules share the same edges, so the
highlight never looks like it is poking out from under the rule, and the
list column is 60% (not 62%) so the band keeps a clean gutter to the preview
panel beside it.

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
