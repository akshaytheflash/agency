# Aurelia — three design variants

Three complete, production-built websites for the **same** fictional business (a Zürich
longevity clinic & wellness retreat called *Aurelia*). They exist so a prospective client
can compare three visual directions side by side and tell you which one they want built
properly — then you swap in their real content, photos and brand.

| # | Variant | Direction | Live URL |
|---|---------|-----------|----------|
| 01 | **Lumen** | Minimal editorial — warm monochrome, wide serif, flat bento, hairline rules | https://aurelia-01-lumen.vercel.app |
| 02 | **Noir** | Dark cinematic luxury — near-black, brass hairlines, full-bleed photography | https://aurelia-02-noir.vercel.app |
| 03 | **Terra** | Warm boutique — terracotta & olive, chunky rounded type, arch imagery | https://aurelia-03-terra.vercel.app |

The same content, routes, features and photography appear in all three. **Only the design
system changes** — palette, type, shape language, layout rhythm and motion. That is the
point: the client is choosing taste, not features.

---

## What's in each site

Real, working pages — not a landing-page mockup:

- `/` home, `/treatments`, `/retreat`, `/about`, `/gallery`, `/contact`
- Sticky navbar, transparent over the hero then solidifying on scroll, with active-link state
- Full-screen mobile drawer with body scroll-lock that closes on navigation
- **Contact form** with per-field validation, `aria-invalid` / `aria-describedby`, focus
  jump to the first invalid field, a bot honeypot, and a success panel showing a generated
  reference plus a `mailto:` fallback
- FAQ accordion, gallery with a keyboard-navigable lightbox (Esc / ← / →)
- Per-page SEO metadata, Open Graph + Twitter cards, `sitemap.xml`, `robots.txt`, favicon,
  404 page, and `MedicalClinic` JSON-LD structured data
- Skip-to-content link, `prefers-reduced-motion` support, focus-visible rings, WebP/AVIF
  image optimisation

---

## Running locally

```powershell
cd variant-01-lumen
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Requires Node 18+. Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4
(CSS-first — the design tokens live in `src/app/globals.css`, there is no
`tailwind.config.js`).

## Deploying

```powershell
.\deploy.ps1                # all three
.\deploy.ps1 -Variant noir  # just one
```

Or manually, from any variant folder:

```powershell
vercel --prod --yes --name aurelia-01-lumen
```

---

## Changing the content

**Everything a client sees lives in one file:** `src/lib/site.ts` per variant.

It exports the business name, contact details, hours, treatments, suites, programmes, the
team, timeline, values, testimonials, FAQ and gallery captions. Edit it in one variant, then
either copy it across to the other two (recommended — you want identical content so the
comparison stays honest) or fork each into its own content.

Images live in `public/images/` (30 curated photos, named by subject — `hero-hammam.jpg`,
`sauna-wood.jpg`, `hotel-room-elegant.jpg`, `consult-clinic.jpg`, …).

## Removing the preview scaffolding

Each site has a floating "Compare" pill (bottom-left, hidden on mobile) that lets the
client jump between the three variants. It is the only non-client-facing element.

To remove it when a client commits to a direction:

1. Delete `src/components/VariantSwitcher.tsx`
2. Remove its import and usage from `src/components/Footer.tsx`
3. In `src/lib/site.ts`, delete the `variant` block from `site` and the
   "Built as design variant" line in the footer

## About the contact form

Per your brief the forms are **frontend-only demos**: they validate properly, trap bots,
show a realistic success state, and then hand the enquiry to the visitor's own mail client
via `mailto:` so nothing is silently lost. Nothing is stored on a server.

To make them deliver for real, the smallest upgrade is a form backend (Formspree, Resend +
a Next.js route, or a Vercel Function) — point the `handleSubmit` in
`src/components/ContactForm.tsx` at your endpoint and keep everything else.

---

## A note on the business

Aurelia is a fictional business. The **address is set to New Delhi, India** and the
**phone numbers are the placeholder `XXXX`** — swap in your real details in
`src/lib/site.ts` (the `contact` block) before showing a client.

Everything else is demo copy, including the staff, the statistics and the Swiss/clinical
claims. Prices are in CHF and all figures (9,400 guests, 94% renewal, CHF 9,400 protocol,
12-week courses, and so on) are illustrative. The photos are royalty-free from Pexels under
the Pexels licence, which permits commercial use without attribution.

## QA

Each site was checked in Chromium across 1440 / 1280 / 820 / 390 px on all six routes:

- no horizontal overflow, no broken images, no console or network errors
- one `<h1>` per page, no heading-level jumps, no duplicate IDs, no missing `alt` text
- every form control has an accessible label
- interactive elements (nav, drawer, FAQ, lightbox, contact form) verified working
- standalone links meet the WCAG 2.5.8 AA 24 px tap-target minimum; links that run inline
  inside a sentence are exempt and left as-is

To re-run the sweep after editing:

```powershell
# start a server per variant on 3101 / 3102 / 3103, then:
node audit-fast.mjs lumen=3101 noir=3102 terra=3103
```