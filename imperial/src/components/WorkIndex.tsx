"use client";

import { useState } from "react";
import { work, workNote } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * Work index: an editorial list, not a card grid.
 *
 * Each row is title / blurb / tags / year. On pointer devices, hovering a row
 * fades in a preview of the live site on the right; on touch devices the
 * thumbnail is simply always visible under the row. Every row links to the
 * real deployed URL.
 */
export default function WorkIndex() {
  // Defaults to the first project so the preview column is never dead space;
  // hovering a row swaps it, and pointer-out returns to the first.
  const [active, setActive] = useState<string>(work[0].id);
  const activeItem = work.find((w) => w.id === active) ?? work[0];

  return (
    <section id="work" className="scroll-mt-4 border-b border-line">
      <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-20 sm:px-8 lg:px-12 lg:pb-24 lg:pt-28">
        {/* section label — oversized faint numeral behind the word */}
        <div className="relative pt-20 pb-10 lg:pt-28">
          <span
            aria-hidden="true"
            className="font-display absolute -top-4 -left-2 text-[7rem] leading-none text-ink opacity-[0.05] select-none lg:text-[10rem]"
          >
            01
          </span>
          <Reveal className="relative">
            <p className="text-[0.7rem] tracking-[0.24em] text-accent uppercase">
              01 / Selected work
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4.6vw,3.5rem)] text-ink">
              Three sites, one brief.
            </h2>
            <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-relaxed text-muted">
              {workNote}
            </p>
          </Reveal>
        </div>

        {/* the index */}
        <div className="relative">
          {/* preview panel — follows the hovered row, pointer devices only */}
          <div
            className="pointer-events-none absolute top-0 right-0 hidden h-full w-[34%] lg:block"
            aria-hidden="true"
          >
            <div
              className={`work-preview absolute top-1/2 right-0 w-full ${
                activeItem ? "is-on" : ""
              }`}
            >
              {activeItem && (
                <div className="overflow-hidden border border-line bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeItem.image}
                    alt=""
                    className="h-auto w-full"
                    loading="lazy"
                  />
                  <p className="border-t border-line px-4 py-3 text-[0.66rem] tracking-[0.18em] text-muted uppercase">
                    {activeItem.title} — live
                  </p>
                </div>
              )}
            </div>
          </div>

          <ul className="relative lg:w-[62%]">
            {work.map((w, i) => (
              <Reveal
                as="li"
                key={w.id}
                delay={i * 90}
                className="border-t border-line last:border-b"
              >
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onFocus={() => setActive(w.id)}
                  onBlur={() => setActive(work[0].id)}
                  onMouseEnter={() => setActive(w.id)}
                  onMouseLeave={() => setActive(work[0].id)}
                  className="work-row group grid grid-cols-1 items-start gap-x-6 gap-y-3 py-8 transition-colors duration-500 hover:bg-shade sm:grid-cols-[1fr_auto] sm:py-10"
                >
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-4">
                      <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] text-ink transition-transform duration-500 group-hover:translate-x-1.5">
                        {w.title}
                      </h3>
                      <span
                        className="work-arrow text-[1.1rem] text-accent"
                        aria-hidden="true"
                      >
                        ↗
                      </span>
                    </div>
                    <p className="mt-2 max-w-[46ch] text-[0.97rem] leading-relaxed text-muted">
                      {w.blurb}
                    </p>

                    {/* mobile / touch preview, always visible */}
                    <div className="mt-4 overflow-hidden border border-line lg:hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={w.image}
                        alt={`Screenshot of the ${w.title} build`}
                        className="h-auto w-full"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:gap-2.5">
                    {w.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-line px-3 py-1.5 text-[0.65rem] tracking-[0.14em] text-muted uppercase"
                      >
                        {t}
                      </span>
                    ))}
                    <span className="text-[0.7rem] tracking-[0.16em] text-muted tabular-nums">
                      {w.year}
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
