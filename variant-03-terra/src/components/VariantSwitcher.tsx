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
        <div className="w-[21rem] overflow-hidden rounded-[26px] border border-line bg-paper shadow-warm-lg">
          <div className="border-b border-dashed border-line bg-cream/70 p-5">
            <p className="eyebrow">Design preview</p>
            <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted">
              Three directions for the same clinic. Compare them, then tell us which one you
              would like built properly.
            </p>
          </div>

          <ul>
            {all.map((v) => {
              const active = v.href === null;
              const inner = (
                <span className="flex items-start gap-4">
                  <span className="mt-0.5 rounded-full bg-cream px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.12em] text-muted">
                    {v.number}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{v.label}</span>
                    {v.direction && (
                      <span className="mt-1.5 block text-[0.6875rem] leading-relaxed text-muted">
                        {v.note}
                      </span>
                    )}
                  </span>
                  {active && (
                    <span className="rounded-full bg-terra px-2 py-0.5 text-[0.5625rem] font-bold tracking-[0.14em] text-paper">
                      LIVE
                    </span>
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
                      className="block p-4 transition-colors hover:bg-terra-soft/60"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="bg-terra-soft/50 p-4">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-between gap-3 border-t border-line bg-paper p-4 text-left text-[0.6875rem] font-semibold tracking-[0.14em] uppercase transition-colors hover:bg-cream"
          >
            <span>Close</span>
            <span aria-hidden className="text-terra">
              ✕
            </span>
          </button>
        </div>
      ) : (
        <button
          ref={btnRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          aria-label="Compare the three design variants"
          className="flex items-center gap-2.5 rounded-full border border-line bg-paper/95 py-2.5 pr-4 pl-2.5 shadow-warm-sm backdrop-blur-md transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:border-terra hover:shadow-warm-lg"
        >
          <span className="rounded-full bg-terra-soft px-2 py-0.5 text-[0.5625rem] font-bold tracking-[0.12em] text-terra-deep">
            {number}
          </span>
          <span className="text-[0.6875rem] font-semibold tracking-[0.14em] uppercase">
            {label}
          </span>
          <span aria-hidden className="text-[0.625rem] text-muted">
            ⇄
          </span>
        </button>
      )}
    </div>
  );
}