"use client";

import { useState } from "react";

type Item = { q: string; a: string };

export default function Faq({ items, idPrefix = "faq" }: { items: Item[]; idPrefix?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-line">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-panel-${i}`}
                id={`${idPrefix}-button-${i}`}
                className="group flex w-full items-start justify-between gap-8 py-7 text-left"
              >
                <span
                  className={`font-display text-xl leading-snug tracking-[-0.02em] transition-colors sm:text-2xl ${
                    isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink"
                  }`}
                >
                  {item.q}
                </span>
                <span className="relative mt-2.5 block h-3 w-3 shrink-0" aria-hidden>
                  <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-ink" />
                  <span
                    className={`absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-ink transition-transform duration-500 ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`${idPrefix}-panel-${i}`}
              role="region"
              aria-labelledby={`${idPrefix}-button-${i}`}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-8 pr-10 text-[0.9375rem] leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}