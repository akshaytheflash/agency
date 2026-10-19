"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Slow fade + rise on scroll, via IntersectionObserver.
 * No animation library — this is the whole thing.
 *
 * `reveal` is present in the server HTML; hiding it is gated on the .js class
 * set pre-paint in layout.tsx. So JS-off visitors see all content, and there
 * is no hydration flash of visible-then-hidden.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const classes = ["reveal", visible ? "is-visible" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref as never}
      className={classes}
      style={delay ? ({ transitionDelay: `${delay}ms` } as never) : undefined}
    >
      {children}
    </Tag>
  );
}
