"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { work, workNote } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * Work index: an editorial list, not a card grid.
 *
 * Each row is title / blurb / tags / year. On pointer devices a preview of
 * the live site floats in the right-hand column and *travels to the row you
 * are pointing at* — the preview is pinned to the active row's centre line,
 * so the picture and the title it belongs to are never in different places.
 * On touch devices the thumbnail sits permanently under the row instead.
 *
 * Which row is "current" is derived from two signals: the pointer wins while
 * it is over the list, keyboard focus is the fallback, and the first project
 * is the default so the preview column is never dead space.
 *
 * Every row links to the real deployed URL.
 */
export default function WorkIndex() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const active = hovered ?? focused ?? work[0].id;
  const activeItem = work.find((w) => w.id === active) ?? work[0];

  const listRef = useRef<HTMLUListElement | null>(null);
  const rowRefs = useRef<Record<string, HTMLElement | null>>({});
  const previewRef = useRef<HTMLDivElement | null>(null);

  // Vertical centre of the active row, measured in the list's own coordinate
  // space. Null until measured (and on touch layouts, where there is no
  // preview column to align to).
  const [anchor, setAnchor] = useState<number | null>(null);

  // `measure` reads the current active row through a ref so the function
  // itself stays stable — otherwise every hover would tear down and rebuild
  // the ResizeObserver.
  const activeRef = useRef(active);
  activeRef.current = active;

  const measure = useCallback(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    const row = rowRefs.current[activeRef.current];
    if (!list || !preview || !row) return;

    // `display: none` on small screens — nothing to align to.
    if (preview.offsetParent === null) {
      setAnchor(null);
      return;
    }

    const listBox = list.getBoundingClientRect();
    const rowBox = row.getBoundingClientRect();
    const previewBox = preview.getBoundingClientRect();

    let centre = rowBox.top - listBox.top + rowBox.height / 2;

    // Keep the whole preview inside the list, so it never rides out over the
    // section above or the one below.
    const half = previewBox.height / 2;
    centre = Math.max(half, Math.min(centre, listBox.height - half));

    setAnchor((prev) =>
      prev === null || Math.abs(prev - centre) > 0.5 ? centre : prev,
    );
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [active, measure]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-4 border-b border-line"
    >
      <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-20 sm:px-8 lg:px-12 lg:pb-24 lg:pt-28">
        {/* section label — oversized faint numeral behind the word.
            The numeral hangs from the top of the section, clear of the eyebrow
            below it: at 10rem its ink ran 3px into "01 / Selected work". */}
        <div className="relative pt-20 pb-10 lg:pt-28">
          <span
            aria-hidden="true"
            className="font-display absolute -top-10 left-0 text-[7rem] leading-none text-ink opacity-[0.05] select-none lg:-top-14 lg:text-[10rem]"
          >
            01
          </span>
          <Reveal className="relative">
            <p className="text-[0.7rem] tracking-[0.24em] text-accent uppercase">
              01 / Selected work
            </p>
            <h2
              id="work-heading"
              className="mt-4 text-[clamp(2rem,4.6vw,3.5rem)] text-ink"
            >
              Three sites, one brief.
            </h2>
            <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-relaxed text-muted">
              {workNote}
            </p>
          </Reveal>
        </div>

        {/* the index */}
        <div className="relative">
          {/* preview panel — travels to the active row's centre line.
              Pointer devices only; touch gets the inline thumbnail below. */}
          <div
            className="pointer-events-none absolute top-0 right-0 hidden w-[34%] lg:block"
            aria-hidden="true"
          >
            <div
              ref={previewRef}
              className="work-preview absolute top-0 right-0 w-full"
              style={
                anchor === null
                  ? undefined
                  : {
                      transform: `translate3d(0, ${anchor}px, 0) translateY(-50%)`,
                    }
              }
            >
              <div className="overflow-hidden border border-line bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
                {/* All three are mounted and cross-faded. Swapping `src` on a
                    single <Image> blanks the frame for a frame while the new
                    file decodes; stacking them means the swap is a fade. */}
                <div className="relative aspect-[1200/750] w-full bg-surface">
                  {work.map((w) => (
                    <Image
                      key={w.id}
                      src={w.image}
                      alt=""
                      width={1200}
                      height={750}
                      sizes="(min-width: 1280px) 403px, (min-width: 1024px) 34vw, 0px"
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                        active === w.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
                <p className="flex items-center gap-2.5 border-t border-line px-4 py-3 text-[0.66rem] tracking-[0.18em] text-muted uppercase">
                  <span className="live-dot" aria-hidden="true" />
                  {activeItem.title} — live
                </p>
              </div>
            </div>
          </div>

          <ul
            ref={listRef}
            /* 60% rather than 62% so the hover band below keeps a clean 47px
                gutter to the preview column once it bleeds outward. */
            className="relative lg:w-[60%]"
            /* The pointer owns the preview while it is over the list; once it
               leaves, keyboard focus takes over, and the first project is the
               final fallback. */
            onMouseLeave={() => setHovered(null)}
            onFocus={(e) => {
              const row = (e.target as HTMLElement).closest<HTMLElement>(
                "[data-work-id]",
              );
              if (row?.dataset.workId) setFocused(row.dataset.workId);
            }}
            onBlur={(e) => {
              // only clear when focus leaves the list entirely
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setFocused(null);
              }
            }}
          >
            {work.map((w, i) => (
              <Reveal
                as="li"
                key={w.id}
                delay={i * 90}
                ref={(node) => {
                  rowRefs.current[w.id] = node;
                }}
                /* The row is a band: the rules and the hover tint bleed out
                   into the container gutter (half of it, so they never reach
                   the viewport edge) and the text sits inside with margin.
                   Without this the title was flush against the tint's edge. */
                className="relative -mx-3 border-t border-line last:border-b sm:-mx-4 lg:-mx-6"
              >
                <span
                  aria-hidden="true"
                  className={`work-tick absolute top-0 left-0 hidden h-full w-[2px] origin-top bg-accent lg:left-3 lg:block ${
                    active === w.id ? "is-on" : ""
                  }`}
                />
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-work-id={w.id}
                  onMouseEnter={() => setHovered(w.id)}
                  className="work-row group grid grid-cols-1 items-start gap-x-6 gap-y-3 px-3 py-8 transition-colors duration-500 hover:bg-shade sm:grid-cols-[1fr_auto] sm:px-4 sm:py-10 lg:px-6"
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
                      <Image
                        src={w.image}
                        alt={`Screenshot of the ${w.title} build`}
                        width={1200}
                        height={750}
                        sizes="(min-width: 1024px) 0px, 92vw"
                        className="h-auto w-full"
                      />
                      <p className="border-t border-line px-4 py-2.5 text-[0.62rem] tracking-[0.18em] text-muted uppercase">
                        {w.title} — live
                      </p>
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
                <span className="sr-only">
                  {w.title} — opens in a new tab
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
