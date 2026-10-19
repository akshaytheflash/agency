import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

/** Brass micro-label. The signature of every section in this build. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/** Muted variant for dense metadata rows where brass would shout. */
export function EyebrowQuiet({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow-quiet ${className}`}>{children}</p>;
}

/** Large serif section number, e.g. `03 —`. */
export function SectionNumber({ n, label }: { n: string; label?: string }) {
  return (
    <div className="flex items-center gap-5">
      <span className="numeral text-sm text-brass">{n}</span>
      {label ? <span className="eyebrow">{label}</span> : null}
    </div>
  );
}

export function ArrowLink({
  href,
  children,
  brass = false,
}: {
  href: string;
  children: ReactNode;
  brass?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 py-2.5 -my-2.5 text-[0.6875rem] tracking-[0.24em] uppercase transition-colors duration-700 ${
        brass ? "text-brass hover:text-chalk" : "text-chalk hover:text-brass"
      }`}
    >
      <span className="link-rule">{children}</span>
      <span
        aria-hidden
        className="text-brass transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2"
      >
        →
      </span>
    </Link>
  );
}

/** Hairline button — the only interactive shape in the build. */
export function HairlineButton({
  href,
  children,
  tone = "outline",
}: {
  href: string;
  children: ReactNode;
  tone?: "outline" | "solid" | "ghost";
}) {
  const base =
    "inline-block border px-8 py-4 text-[0.6875rem] tracking-[0.24em] uppercase transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]";
  const tones = {
    outline: "border-brass/45 text-brass hover:bg-brass hover:text-noir",
    solid: "border-brass bg-brass text-noir hover:bg-transparent hover:text-brass",
    ghost:
      "border-line text-muted hover:border-brass hover:text-brass",
  } as const;
  return (
    <Link href={href} className={`${base} ${tones[tone]}`}>
      {children}
    </Link>
  );
}

/**
 * Shared hero for every inner page: full-bleed photography under a heavy
 * noir gradient, so the rhythm never drifts between routes.
 */
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
    <section className="relative isolate flex min-h-[76vh] items-end overflow-hidden pt-28 pb-12 md:min-h-[78vh] md:pt-44 md:pb-28">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="img-cine-deep -z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-noir via-noir/72 to-noir/35" />
      <div aria-hidden className="vignette -z-10 absolute inset-0" />

      <div className="shell w-full">
        <Reveal>
          <div className="flex items-center gap-5">
            <span aria-hidden className="h-px w-12 bg-brass/70" />
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <h1 className="display-xl mt-8 max-w-[15ch] text-chalk">{title}</h1>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:items-start">
          <Reveal delay={140} className="lg:col-span-5">
            <p className="max-w-md text-[1.0625rem] leading-relaxed text-muted">{lede}</p>
          </Reveal>
          <Reveal delay={240} className="lg:col-span-4 lg:col-start-9">
            <div className="lg:text-right">
              <ArrowLink href="/contact" brass>
                Book a consultation
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Full-bleed cinematic interlude between two content sections. */
export function FilmBand({
  image,
  alt,
  caption,
  align = "center",
}: {
  image: string;
  alt: string;
  caption: string;
  align?: "center" | "left" | "right";
}) {
  const placement = {
    center: "items-center justify-center text-center",
    left: "items-end justify-start text-left",
    right: "items-end justify-end text-right",
  }[align];

  return (
    <Reveal>
      <figure className="relative h-[58vh] min-h-[340px] w-full overflow-hidden bg-surface md:h-[76vh]">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="100vw"
          className="img-cine object-cover"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-noir via-black/35 to-noir/30" />
        <div aria-hidden className="grain absolute inset-0" />
        <div aria-hidden className="vignette absolute inset-0" />
        <figcaption
          className={`absolute inset-x-0 bottom-0 flex flex-col px-6 pb-10 md:px-14 md:pb-14 ${placement}`}
        >
          <span aria-hidden className="mb-5 h-px w-16 bg-brass/70" />
          <span className="eyebrow">{caption}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

/**
 * Editorial pull quote. Serif italic is the signature accent of this build.
 */
export function PullQuote({
  quote,
  attribution,
  role,
}: {
  quote: string;
  attribution: string;
  role?: string;
}) {
  return (
    <Reveal>
      <figure className="relative border-l border-brass/50 pl-8 md:pl-12">
        <blockquote className="pull text-3xl text-chalk md:text-[3.25rem]">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="mt-9 flex items-center gap-4">
          <span aria-hidden className="h-px w-10 bg-brass/60" />
          <span className="text-[0.8125rem] tracking-[0.06em]">{attribution}</span>
          {role ? <span className="eyebrow-quiet">{role}</span> : null}
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function CtaBand({
  eyebrow = "Next step",
  title = "Book a consultation",
  body = "Ninety minutes, a written summary, and a clear recommendation — including the option of being told you do not need anything.",
  primary = { href: "/contact", label: "Book a consultation" },
  secondary = { href: "/treatments", label: "See all treatments" },
  image = "/images/hammam-ambiance.jpg",
  imageAlt = "The marble hammam at Aurelia",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-y border-line">
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="img-cine-deep -z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-noir/86" />
      <div aria-hidden className="grain absolute inset-0 -z-10" />

      <div className="shell py-14 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-5">
              <span aria-hidden className="h-px w-12 bg-brass/70" />
              <p className="eyebrow">{eyebrow}</p>
            </div>
            <h2 className="display-lg mt-9 max-w-[16ch]">{title}</h2>
          </Reveal>

          <Reveal delay={160} className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
            <div aria-hidden className="rule-v mb-8 hidden h-20 lg:block" />
            <p className="max-w-md leading-relaxed text-muted">{body}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <HairlineButton href={primary.href} tone="solid">
                {primary.label}
              </HairlineButton>
              <HairlineButton href={secondary.href} tone="ghost">
                {secondary.label}
              </HairlineButton>
            </div>
            <p className="mt-9 text-[0.6875rem] tracking-[0.14em] text-muted/70 uppercase">
              {site.contact.address.line2} · {site.contact.phoneDisplay}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}