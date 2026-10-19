"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from "react";

/**
 * Slow fade + rise on scroll, via IntersectionObserver.
 * No animation library — this is the whole thing.
 *
 * `reveal` is present in the server HTML; hiding it is gated on the .js class
 * set pre-paint in layout.tsx. So JS-off visitors see all content, and there
 * is no hydration flash of visible-then-hidden.
 *
 * A backstop runs alongside the observer: every 700ms it asks "is this node
 * inside the viewport?" and reveals it if the observer somehow missed it.
 * That is the difference between a fade and content stranded at opacity 0.
 * It never reveals anything that is off screen, so the scroll effect stays.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  ref,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header" | "footer";
  delay?: number;
  ref?: Ref<HTMLElement>;
}) {
  const inner = useRef<HTMLElement | null>(null);
  const shown = useRef(false);
  const [visible, setVisible] = useState(false);

  // One node, two owners: the observer and any ref handed in from outside.
  const attach = useCallback(
    (node: HTMLElement | null) => {
      inner.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as { current: HTMLElement | null }).current = node;
    },
    [ref],
  );

  useEffect(() => {
    const node = inner.current;
    if (!node) return;

    const mark = () => {
      if (shown.current) return;
      shown.current = true;
      setVisible(true);
    };

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      mark();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            mark();
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
    );

    io.observe(node);

    // Backstop. Reveals only what is actually on screen, so the scroll
    // choreography is untouched — it just cannot get stuck.
    const backstop = window.setInterval(() => {
      if (shown.current) {
        window.clearInterval(backstop);
        return;
      }
      const r = node.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) mark();
    }, 700);

    return () => {
      window.clearInterval(backstop);
      io.disconnect();
    };
  }, []);

  const classes = ["reveal", visible ? "is-visible" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={attach as never}
      className={classes}
      style={delay ? ({ transitionDelay: `${delay}ms` } as never) : undefined}
    >
      {children}
    </Tag>
  );
}
