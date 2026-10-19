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
                className="group flex w-full items-start justify-between gap-8 py-8 text-left md:py-9"
              >
                <span className="flex items-baseline gap-5 md:gap-8">
                  <span className="numeral shrink-0 text-[0.6875rem] text-brass-dim transition-colors duration-700 group-hover:text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-xl leading-snug transition-colors duration-700 sm:text-2xl ${
                      isOpen ? "text-chalk" : "text-chalk/75 group-hover:text-chalk"
                    }`}
                  >
                    {item.q}
                  </span>
                </span>
                <span className="relative mt-2.5 block h-3 w-3 shrink-0" aria-hidden>
                  <span className="absolute top-1/2 left-0 h-px w-3 -translate-y-1/2 bg-brass" />
                  <span
                    className={`absolute top-0 left-1/2 h-3 w-px -translate-x-1/2 bg-brass transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
              className={`grid transition-[grid-template-rows] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-9 pl-0 text-[0.9375rem] leading-relaxed text-muted md:pl-[4.5rem]">
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