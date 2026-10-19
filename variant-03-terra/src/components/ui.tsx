import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

/* ------------------------------------------------------------------ */
/*  Primitives                                                         */
/* ------------------------------------------------------------------ */

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <span className={`eyebrow ${tone === "dark" ? "text-sun" : ""}`}>
      <span
        aria-hidden
        className={`inline-block h-1.5 w-1.5 rounded-full ${tone === "dark" ? "bg-sun" : "bg-terra"}`}
      />
      {children}
    </span>
  );
}

export function Chip({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "sun";
  className?: string;
}) {
  const tones = {
    light: "border-line bg-cream text-muted",
    dark: "border-cream/25 bg-cream/10 text-cream/80",
    sun: "border-sun/40 bg-sun-soft text-terra-deep",
  } as const;
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.75rem] font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Small rotated "sticker" — the playful accent that keeps Terra from reading generic. */
export function Sticker({
  children,
  tone = "terra",
  className = "",
}: {
  children: ReactNode;
  tone?: "terra" | "sun" | "olive" | "paper";
  className?: string;
}) {
  const tones = {
    terra: "bg-terra text-paper border-terra",
    sun: "bg-sun text-ink border-sun",
    olive: "bg-olive text-cream border-olive",
    paper: "bg-paper text-ink border-line",
  } as const;
  return (
    <span
      className={`sticker pointer-events-none inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.14em] uppercase shadow-warm-sm ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Hand-drawn style underline for an emphasised word. */
export function Squiggle({ children }: { children: ReactNode }) {
  return <span className="squiggle text-terra">{children}</span>;
}

/* ------------------------------------------------------------------ */
/*  Organic section dividers                                           */
/* ------------------------------------------------------------------ */

export function CurveTop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 110"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path
        fill="currentColor"
        d="M0,0 H1440 V30 C1256,94 1096,112 892,84 C664,54 486,8 302,40 C180,62 78,92 0,72 Z"
      />
    </svg>
  );
}

export function CurveBottom({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 110"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path
        fill="currentColor"
        d="M0,110 H1440 V80 C1262,16 1102,0 898,26 C672,56 490,102 306,70 C186,48 84,18 0,38 Z"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Links                                                              */
/* ------------------------------------------------------------------ */

export function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group/link inline-flex items-center gap-3 rounded-full border px-6 py-3 text-[0.8125rem] font-semibold transition-all duration-400 ease-[var(--ease-spring)] ${
        light
          ? "border-cream/30 text-cream hover:border-sun hover:bg-sun hover:text-ink"
          : "border-line bg-paper text-ink hover:-translate-y-0.5 hover:border-terra hover:bg-terra hover:text-paper hover:shadow-warm"
      }`}
    >
      <span className="link-rule">{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-400 ease-[var(--ease-spring)] group-hover/link:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared hero for every inner page                                   */
/* ------------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="pt-28 pb-10 md:pt-36 md:pb-20">
      <div className="shell">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display-xl mt-8 max-w-[15ch]">{title}</h1>
        </Reveal>

        <div className="mt-14 grid items-end gap-12 lg:grid-cols-12">
          <Reveal delay={120} className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-muted">{lede}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-terra px-8 py-4 text-[0.8125rem] font-semibold text-paper shadow-warm transition-all duration-400 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:bg-terra-deep hover:shadow-warm-lg"
              >
                Book a consultation
              </Link>
              <ArrowLink href="/treatments">See treatments</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={220} className="lg:col-span-6 lg:col-start-7">
            <div className="relative">
              <div className="arch md:arch-wide relative aspect-4/5 w-full overflow-hidden bg-line shadow-warm-lg md:aspect-4/3">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 52vw, 100vw"
                  className="img-warm object-cover"
                />
              </div>
              <Sticker className="absolute -bottom-3 -left-3 hidden sm:inline-flex">New Delhi · Est. 2014</Sticker>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Full-bleed olive CTA band                                          */
/* ------------------------------------------------------------------ */

export function CtaBand({
  eyebrow = "Next step",
  title = "Book a consultation",
  body = "Ninety minutes, a written summary, and a clear recommendation — including the option of being told you do not need anything.",
  primary = { href: "/contact", label: "Book a consultation" },
  secondary = { href: "/treatments", label: "See all treatments" },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative bg-olive text-cream">
      <CurveTop className="absolute inset-x-0 top-0 h-14 w-full text-cream md:h-24" />
      <div className="shell relative py-16 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h2 className="display-lg mt-8 max-w-[16ch] text-cream">{title}</h2>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-cream/70">{body}</p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={primary.href}
                className="rounded-full bg-sun px-8 py-4 text-[0.8125rem] font-semibold text-ink shadow-warm-lg transition-all duration-400 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:bg-cream"
              >
                {primary.label}
              </Link>
              <ArrowLink href={secondary.href} light>
                {secondary.label}
              </ArrowLink>
            </div>

            <p className="mt-10 text-xs text-cream/45">
              {site.contact.address.line2} · {site.contact.phoneDisplay}
            </p>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-4 lg:col-start-9">
            <div className="arch relative aspect-3/4 w-full overflow-hidden bg-olive-light shadow-olive">
              <Image
                src="/images/herbal-tea.jpg"
                alt="The Aurelia apothecary bar"
                fill
                sizes="(min-width: 1024px) 30vw, 60vw"
                className="img-warm object-cover"
              />
            </div>
            <Sticker tone="sun" className="absolute -top-2 right-3">
              No obligation
            </Sticker>
          </Reveal>
        </div>
      </div>
      <CurveBottom className="absolute inset-x-0 bottom-0 h-14 w-full text-cream md:h-24" />
    </section>
  );
}
