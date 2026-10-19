import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

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
      className={`group inline-flex items-center gap-3 py-2 -my-2 text-[0.8125rem] font-medium transition-colors ${
        light ? "text-bone hover:text-bone/70" : "text-ink hover:text-sage"
      }`}
    >
      <span className="link-rule">{children}</span>
      <span
        aria-hidden
        className="transition-transform duration-500 group-hover:translate-x-1.5"
      >
        →
      </span>
    </Link>
  );
}

/** Shared hero for every inner page so the rhythm never drifts. */
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
    <section className="pt-28 pb-10 md:pt-40 md:pb-24">
      <div className="shell">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="display-xl mt-8 max-w-[14ch]">{title}</h1>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal delay={120} className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-muted">{lede}</p>
            <div className="mt-10">
              <ArrowLink href="/contact">Book a consultation</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={220} className="lg:col-span-7">
            <div className="relative aspect-4/3 overflow-hidden bg-line md:aspect-16/10">
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="img-editorial object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

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
    <section className="bg-ink text-bone">
      <div className="shell py-14 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-bone/50">{eyebrow}</p>
            <h2 className="display-lg mt-8 max-w-[16ch] text-bone">{title}</h2>
          </Reveal>

          <Reveal delay={140} className="flex flex-col justify-end lg:col-span-5">
            <p className="max-w-md leading-relaxed text-bone/60">{body}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={primary.href}
                className="border border-bone bg-bone px-8 py-4 text-[0.8125rem] font-medium text-ink transition-colors hover:bg-transparent hover:text-bone"
              >
                {primary.label}
              </Link>
              <Link
                href={secondary.href}
                className="border border-bone/25 px-8 py-4 text-[0.8125rem] font-medium text-bone transition-colors hover:border-bone"
              >
                {secondary.label}
              </Link>
            </div>
            <p className="mt-8 text-xs text-bone/40">
              {site.contact.address.line2} · {site.contact.phoneDisplay}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}