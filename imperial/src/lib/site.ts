/*
 * Every word a visitor reads lives in this file.
 * Edit here, redeploy — you never have to touch a component.
 */

export const site = {
  name: "Imperial Development Agency",
  shortName: "Imperial",
  email: "akshaytheflash@gmail.com",
  location: "New Delhi, India",
  founded: "2026",
  headline: "Real websites, live in three days.",
  lede:
    "Imperial Development Agency is four engineers in New Delhi — frontend, backend, AI and DevOps — building web apps, storefronts and brand sites. Fifty projects shipped. Support answers around the clock, including the 3am ones.",
  sub:
    "We build the best websites we can at rates that leave room for everything else you have to fund. One team, one price, no account managers between you and the person writing the code.",
  metadata: ["Est. 2026", "New Delhi, India", "Frontend / Backend / AI / DevOps"],
  ctaPrimary: "Start a project",
  ctaSecondary: "See the work",
} as const;

/* ---------- The numbers. Big, few, and true. ---------- */
export const numbers = [
  { figure: "3", unit: "days", label: "Average time from kickoff to a live site." },
  { figure: "50", unit: "projects", label: "Shipped across SaaS, storefronts and brand." },
  { figure: "24/7", unit: "support", label: "Weekends included. Someone always picks up." },
  { figure: "4", unit: "engineers", label: "No subcontractors, no juniors learning on your budget." },
] as const;

/* ---------- Work index. Three demo builds, one brief. ---------- */
export const work = [
  {
    id: "lumen",
    title: "Lumen",
    tags: ["Brand site", "Editorial"],
    year: "2026",
    blurb: "Warm monochrome, wide serif, flat bento, hairline rules.",
    href: "https://aurelia-01-lumen.vercel.app",
    image: "/work/lumen.png",
  },
  {
    id: "noir",
    title: "Noir",
    tags: ["Brand site", "Luxury"],
    year: "2026",
    blurb: "Near-black, brass hairlines, full-bleed photography, slow reveals.",
    href: "https://aurelia-02-noir.vercel.app",
    image: "/work/noir.png",
  },
  {
    id: "terra",
    title: "Terra",
    tags: ["Brand site", "Boutique"],
    year: "2026",
    blurb: "Terracotta and olive, chunky rounded type, arched imagery.",
    href: "https://aurelia-03-terra.vercel.app",
    image: "/work/terra.png",
  },
] as const;

export const workNote =
  "Demo builds, live and fully interactive — six routes, validated forms, keyboard-navigable lightbox, per-page metadata and a WCAG pass. Same content, three entirely different design systems. We ship yours next.";

/* ---------- Services: prose, not an icon grid. ---------- */
export const services = [
  {
    index: "01",
    title: "Web apps & SaaS",
    body:
      "Multi-tenant products, dashboards, billing, auth and admin tooling. We design the data model before the screens, so the thing still makes sense at your hundredth customer instead of your tenth.",
    detail: "Next.js · Postgres · Stripe · auth + roles",
  },
  {
    index: "02",
    title: "E-commerce & storefronts",
    body:
      "Storefronts built to convert and fast enough to keep paid traffic on the page. Cart, checkout, payments, tax, order flows and the analytics to tell you which half of your spend works.",
    detail: "Shopify · Hydrogen · Stripe · Core Web Vitals",
  },
  {
    index: "03",
    title: "Brand sites & design",
    body:
      "Identity carried through to the browser: type systems, layout, motion and copy that says something specific. The site is usually the first thing a prospect sees, so it does not get the leftover time.",
    detail: "Design systems · Motion · Art direction",
  },
] as const;

/* ---------- Process: how three days actually works. ---------- */
export const process = [
  {
    step: "01",
    when: "Day zero",
    title: "Scope in thirty minutes",
    body:
      "One call, a fixed price, one contract. If it cannot honestly be done in three days we say so before you pay anything — no discovery phase, no slide deck.",
  },
  {
    step: "02",
    when: "Day one",
    title: "Structure first",
    body:
      "Content, information architecture and the data model. You see the skeleton by evening and redirect us while it is cheap to change.",
  },
  {
    step: "03",
    when: "Day two",
    title: "Design and build, together",
    body:
      "Not design handed over a wall — the same four people doing both. You review at noon and at six, and we fold the notes in the same day.",
  },
  {
    step: "04",
    when: "Day three",
    title: "Ship, then stay on",
    body:
      "Deploy, DNS, analytics, a handover doc and a walkthrough recorded for whoever inherits it. Then the support line stays open.",
  },
] as const;

/* ---------- One quote. No carousel. ---------- */
export const quote = {
  text:
    "10/10 service, best design sense and helped me boost sales by 600%.",
  // Replace with the client's real name and role once they clear you to use it.
  attribution: "Founder, e-commerce brand",
} as const;

export const footer = {
  line: "Four engineers in New Delhi. Building since 2026.",
  links: [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Email", href: `mailto:${site.email}` },
  ],
} as const;

export const mailtoHref = `mailto:${site.email}?subject=Project%20enquiry%20%E2%80%94%20Imperial%20Development%20Agency`;
