"use client";

import { useState } from "react";

type Item = { q: string; a: string };

export default function Faq({ items, idPrefix = "faq" }: { items: Item[]; idPrefix?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`rounded-3xl border px-6 py-5 transition-all duration-500 ease-[var(--ease-spring)] sm:px-8 ${
              isOpen
                ? "border-terra/35 bg-paper shadow-warm"
                : "border-line bg-paper/60 hover:border-terra/25"
            }`}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-panel-${i}`}
                id={`${idPrefix}-button-${i}`}
                className="flex w-full items-start justify-between gap-8 text-left"
              >
                <span
                  className={`display-sm transition-colors duration-400 ${
                    isOpen ? "text-terra-deep" : "text-ink"
                  }`}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-terra transition-all duration-400 ease-[var(--ease-spring)] ${
                    isOpen ? "rotate-45 border-terra bg-terra text-paper" : "border-line"
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1v10M1 6h10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`${idPrefix}-panel-${i}`}
              role="region"
              aria-labelledby={`${idPrefix}-button-${i}`}
              className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-spring)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pt-4 pb-1 text-[0.9375rem] leading-relaxed text-muted">
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
