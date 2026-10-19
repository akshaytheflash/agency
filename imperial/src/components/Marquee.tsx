"use client";

/**
 * One marquee: the capabilities strip that runs under the hero.
 * Pure CSS, content duplicated once so the loop is seamless.
 * Pauses on hover so it can actually be read.
 */

const ITEMS = [
  "Web apps",
  "SaaS platforms",
  "E-commerce",
  "Brand sites",
  "Design systems",
  "Next.js",
  "Postgres",
  "Stripe",
  "DevOps",
  "AI integration",
  "Core Web Vitals",
  "24/7 support",
];

function Row() {
  return (
    <>
      {ITEMS.map((item) => (
        <span key={item} className="flex shrink-0 items-center">
          <span className="px-7 text-[0.72rem] tracking-[0.22em] text-muted uppercase whitespace-nowrap">
            {item}
          </span>
          <span className="h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
        </span>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <div className="marquee-mask overflow-hidden border-b border-line bg-surface py-5 select-none">
      <div className="marquee-track">
        <div className="flex shrink-0 items-center">
          <Row />
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          <Row />
        </div>
      </div>
    </div>
  );
}
