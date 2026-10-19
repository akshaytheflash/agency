"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

export default function VariantSwitcher() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { number, label, direction, note, siblings } = site.variant;

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const all = [
    { number, label, href: null as string | null, direction, note },
    ...siblings.map((s) => ({ ...s, href: s.href, direction: "", note: "" })),
  ];

  // Collapsed this is a single small pill. The full list only exists while open,
  // so the widget never sits on top of page content the client needs to read.
  return (
    <div ref={wrapRef} className="fixed bottom-5 left-5 z-40 hidden font-sans sm:block">
      {open ? (
        <div className="w-[21rem] overflow-hidden border border-line bg-noir/94 backdrop-blur-xl">
          <div className="border-b border-line p-5">
            <p className="eyebrow">Design preview</p>
            <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
              Three directions for the same clinic. Compare them, then tell us which one you
              would like built properly.
            </p>
          </div>

          <ul>
            {all.map((v) => {
              const active = v.href === null;
              const inner = (
                <span className="flex items-baseline gap-4">
                  <span className="numeral text-[0.6875rem] text-brass-dim">{v.number}</span>
                  <span className="flex-1">
                    <span className="block text-sm">{v.label}</span>
                    {v.direction && (
                      <span className="mt-1.5 block text-[0.6875rem] leading-relaxed text-muted">
                        {v.note}
                      </span>
                    )}
                  </span>
                  {active && (
                    <span className="text-[0.625rem] tracking-[0.24em] text-brass">LIVE</span>
                  )}
                </span>
              );

              return (
                <li key={v.label} className="border-b border-line last:border-b-0">
                  {v.href ? (
                    <a
                      href={v.href}
                      target="_blank"
                      rel="noreferrer"
                      className="block p-4 transition-colors duration-700 hover:bg-raised"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="bg-raised p-4">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-between gap-3 border-t border-line p-4 text-left text-[0.6875rem] tracking-[0.24em] uppercase transition-colors duration-700 hover:bg-raised"
          >
            <span className="text-muted">Close</span>
            <span aria-hidden className="text-brass">
              ✕
            </span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          aria-label="Compare the three design variants"
          className="flex items-center gap-2.5 border border-line bg-noir/94 py-2.5 pr-4 pl-2.5 backdrop-blur-xl transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-brass/50"
        >
          <span className="numeral bg-brass px-2 py-0.5 text-[0.5625rem] tracking-[0.16em] text-noir">
            {number}
          </span>
          <span className="text-[0.625rem] tracking-[0.2em] text-chalk uppercase">{label}</span>
          <span aria-hidden className="text-[0.625rem] text-brass-dim">
            ⇄
          </span>
        </button>
      )}
    </div>
  );
}