"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

export default function VariantSwitcher() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { number, label, direction, note, siblings } = site.variant;

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
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
        <div className="w-80 overflow-hidden border border-line bg-paper/95 shadow-[0_18px_50px_-24px_rgba(20,19,15,0.45)] backdrop-blur-md">
          <div className="border-b border-line p-5">
            <p className="eyebrow">Design preview</p>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
              Three directions for the same clinic. Compare them, then tell us which one you
              would like built properly.
            </p>
          </div>

          <ul>
            {all.map((v) => {
              const active = v.href === null;
              const inner = (
                <span className="flex items-baseline gap-4">
                  <span className="text-[0.6875rem] tracking-[0.18em] text-muted">
                    {v.number}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm">{v.label}</span>
                    {v.direction && (
                      <span className="mt-1 block text-[0.6875rem] leading-relaxed text-muted">
                        {v.note}
                      </span>
                    )}
                  </span>
                  {active && (
                    <span className="text-[0.625rem] tracking-[0.18em] text-sage">LIVE</span>
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
                      className="block p-4 transition-colors hover:bg-bone"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="bg-bone p-4">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-between gap-3 border-t border-line px-4 py-3 text-left text-[0.625rem] tracking-[0.16em] uppercase transition-colors hover:bg-bone"
          >
            <span>Close</span>
            <span aria-hidden>✕</span>
          </button>
        </div>
      ) : (
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          aria-label="Compare the three design variants"
          className="flex items-center gap-2.5 border border-line bg-paper/95 py-2.5 pr-4 pl-2.5 shadow-[0_10px_30px_-18px_rgba(20,19,15,0.5)] backdrop-blur-md transition-all duration-500 hover:border-ink"
        >
          <span className="bg-ink px-2 py-0.5 text-[0.5625rem] tracking-[0.16em] text-bone">
            {number}
          </span>
          <span className="text-[0.625rem] font-medium tracking-[0.16em] uppercase">{label}</span>
          <span aria-hidden className="text-[0.625rem] text-muted">
            ⇄
          </span>
        </button>
      )}
    </div>
  );
}