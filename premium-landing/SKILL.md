---
name: premium-landing
description: >-
  Design and build premium, luxury landing pages for a development agency in
  React + Tailwind. Use this whenever the user asks for a landing page, hero
  section, marketing site, portfolio site, product page, "agency website",
  "SaaS landing", or any client-facing web page — even if they don't say
  "premium" or "luxury". Also use when they say a page "looks AI-generated",
  "looks generic", "looks sloppy", or "looks like every other website", or ask
  for a redesign that should feel expensive. This is the default frontend skill
  for any new web page in this workspace.
---

# Premium Landing Pages

You are building the public face of a development agency. The job is not to
make something that "looks good." The job is to make something that could never
have been auto-generated — a page a skeptical creative director would accept
without changes.

The enemy is the default AI output: centered hero, three feature cards, a
testimonial carousel, purple-blue gradients, stock photos of people shaking
hands, and a CTA button that says "Get Started". Your output must be
structurally incapable of producing that.

---

## The three things that make a page look AI-generated

Read these before writing a line of code. Every rule below exists to kill one
of them.

**1. Predictable layout.** If the page is hero → 3 cards → features → logos →
testimonials → pricing → FAQ → CTA, it is dead on arrival. Real agency sites
break their own rhythm: full-bleed sections next to quiet text columns, content
that bleeds off-canvas, sections with no heading at all, asymmetric grids where
the second column is offset by a full row.

**2. Generic imagery and color.** Stock photos of diverse teams at whiteboards,
and the purple-to-cyan gradient, are the fingerprint of a generated page. Use
specific photography (or none), and a restrained palette built around neutrals
with at most one deliberate accent.

**3. Vague copy.** "We help businesses grow through innovative solutions" is
AI copy. Real copy names a specific outcome, a specific client, or a specific
number. "We rebuilt the checkout flow for a fintech doing $40M ARR" is real.

If any of the three shows up in a draft, it does not ship.

---

## Design system

### Palette

Premium work is quiet. Build on warm or cool neutrals and spend color
deliberately.

```
bg:        #0E0E0C   (near-black, warm)
surface:   #161614
border:    #26261F
text:      #EDEAE2   (warm off-white, never pure #FFFFFF)
muted:     #8A877E
accent:    #C8FF3D   (electric lime — use sparingly, ~5% of the page)
```

Rotate the accent per project from a small set that reads as expensive, never
synthetic:

| Accent        | Mood                |
| ------------- | ------------------- |
| `#C8FF3D`     | Electric, technical |
| `#D97706`     | Warm editorial      |
| `#E8E3D6`     | Bone / gallery      |
| `#7DD3FC`     | Cold studio         |

Rule: one accent per page. Never combine two. Never use a blue-to-purple or
pink-to-orange gradient anywhere.

Typography is where the luxury lives. Use two typefaces maximum:

- **Display:** a high-contrast serif or grotesque with real character. Good
  defaults: `Instrument Serif`, `Fraunces`, `Playfair Display`, `Space Grotesk`.
- **Body / UI:** a clean grotesque. `Inter`, `Instrument Sans`, `Geist`.

Load from Google Fonts in `index.html`, never system fonts alone.

Scale: display headings are large and tight (`clamp(2.5rem, 7vw, 6.5rem)`,
line-height `0.95`, letter-spacing `-0.03em`). Body is comfortable
(`1.05–1.25rem`, `1.6`). Do not center everything — left-align the majority of
text and reserve centering for one deliberate moment per page.

### Space and structure

- Generous vertical rhythm: sections are `py-24` to `py-40`, not `py-8`.
- Max content width `max-w-6xl` / `max-w-7xl`, but let some elements escape the
  container (negative margins, full-bleed).
- Thin borders (`border-border`) instead of cards with shadows. Premium work
  separates with hairlines, not boxes.
- Shadow use is rare and soft. A heavy drop shadow reads as cheap.

### Texture and detail

Add one layer of physicality that generated pages never have:

- A subtle grain/noise overlay (SVG `feTurbulence` as a fixed, low-opacity
  background).
- Oversized, faint numerals for section labels (`01 / Capabilities`) in a
  display font at low opacity.
- Hairline rules between major sections.
- A custom selection color matching the accent.

---

## Motion

Motion is a luxury signal only when it is slow and intentional. Default to:

- Content reveals on scroll with a slow fade + small upward translate
  (`opacity 0→1`, `y 24px→0`, `800ms`, `ease-out`). Never springy, never bouncy.
- One marquee for a client/press logo strip (`animation: marquee 40s linear infinite`).
- Subtle parallax on one hero image or element at most.
- Hover states that are quiet: underline draws in, image scales `1.02`, border
  color shifts.

Never animate everything. If every element moves, nothing feels expensive.

---

## Section library (build from these, not from the generic template)

Compose a page from a mix. A strong page uses 5–7 of these, in an order that
fits the client story, not the default order.

1. **Statement hero** — one large sentence, left-aligned, with a small metadata
   row (client, year, role). Not a headline + subhead + two buttons centered in
   a gradient.
2. **Work index** — an editorial list of projects, each row with title, tags,
   year. Hover reveals an image. No grid of cards.
3. **Capability narrative** — prose paragraphs in a narrow column with a sticky
   label, not a 3-up icon grid.
4. **Outcome / numbers** — a few large figures with tight labels, set on a
   full-bleed dark band. Specific numbers only.
5. **Process** — a numbered vertical list with generous spacing, or a sticky
   left label with right-aligned steps. Avoid circular diagrams.
6. **Selected client list** — plain text, small, in a row or two. Not logo
   boxes with borders.
7. **Quote** — one large pull-quote in the display serif, with attribution.
   Never a 3-card testimonial carousel.
8. **Contact / CTA** — a single line of large type and one email link. No form
   unless asked.
9. **Footer** — minimal: agency name, a few links, a copyright line, one
   accent detail.

---

## Copy rules

- Write in the first person, specific and confident. "We design and build" not
  "Solutions for your needs."
- Every claim needs a number, a client, or a concrete detail to be allowed on
  the page.
- Headlines are short. Prefer a fragment over a sentence.
- Never use: *seamlessly, cutting-edge, innovative, empower, unlock,
  next-generation, world-class, leverage.* These are AI tells.
- Label buttons with the action: "Start a project", "View the case study" —
  not "Learn more", "Get started", "Submit".

---

## Implementation

Default to **React + Tailwind**. Set up with Vite unless the user says
otherwise.

- Configure the palette and fonts as Tailwind theme tokens in
  `tailwind.config.js` / `index.css` so every component pulls from the system,
  not hardcoded hex.
- Build small, single-purpose components (`Hero`, `WorkIndex`, `Capability`,
  `Numbers`, `Quote`, `Footer`). Keep them in `src/components/`.
- Reveal-on-scroll: a tiny `Reveal` wrapper using `IntersectionObserver`. Do
  not pull in a heavy animation library.
- Marquee: pure CSS keyframes, duplicated content for a seamless loop.
- Grain: an inline SVG data-URI as a fixed `pointer-events-none` overlay at
  `opacity: 0.04`.

When the user gives you a real client or project, ask for (or invent plausible)
specifics and bake them into the copy — real names, real numbers, real
deliverables. A page with invented-but-specific details reads as real; a page
with placeholder copy reads as generated.

---

## Pre-ship checklist

Before you call it done, verify against this list. If any item fails, fix it.

- [ ] No centered hero with two buttons on a gradient.
- [ ] No 3-card feature grid with icons.
- [ ] No purple/blue or pink/orange gradient anywhere.
- [ ] No stock photography of people at whiteboards or shaking hands.
- [ ] No words: seamlessly, innovative, cutting-edge, empower, unlock,
      leverage, next-generation, world-class.
- [ ] At least one section breaks the container or uses an asymmetric grid.
- [ ] Palette is neutrals + at most one accent.
- [ ] Two typefaces max, loaded from Google Fonts, display is distinctive.
- [ ] Vertical spacing is generous (sections `py-24`+).
- [ ] Motion is slow, sparse, and purposeful.
- [ ] One texture/detail layer present (grain, numerals, hairlines).
- [ ] Every headline and claim is specific, not generic.

Ship only when the page could pass as a boutique agency's own site.
