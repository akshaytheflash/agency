"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
      frame = 0;
    };
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (!frame) frame = requestAnimationFrame(measure);
    };
    onScroll();
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* brass scroll progress hairline */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-px" aria-hidden>
        <div
          className="h-px origin-left bg-brass shadow-[0_0_14px_rgba(194,162,101,0.55)]"
          style={{ width: `${progress * 100}%`, transition: "width 90ms linear" }}
        />
      </div>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-b border-line bg-noir/88 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[4.75rem] items-center justify-between gap-8">
          <Link
            href="/"
            className="group flex items-baseline gap-4 py-2"
            aria-label={`${site.name} home`}
          >
            <span className="font-display text-[1.6rem] leading-none tracking-[0.06em]">
              {site.name.toUpperCase()}
            </span>
            <span
              aria-hidden
              className="hidden h-px w-6 bg-brass-dim transition-all duration-[900ms] group-hover:w-10 group-hover:bg-brass sm:block"
            />
            <span className="eyebrow hidden sm:block">New Delhi</span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative pb-1 text-[0.6875rem] tracking-[0.24em] uppercase transition-colors duration-700 ${
                    active ? "text-brass" : "text-muted hover:text-chalk"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-px left-0 h-px bg-brass transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="hidden text-[0.6875rem] tracking-[0.18em] text-muted transition-colors duration-700 hover:text-brass xl:block"
            >
              {site.contact.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="hidden border border-brass/45 px-6 py-3 text-[0.6875rem] tracking-[0.24em] text-brass uppercase transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-brass hover:text-noir md:inline-block"
            >
              Consultation
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span
                className={`absolute block h-px w-7 bg-chalk transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "translate-y-0 rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute block h-px w-7 bg-chalk transition-all duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? "translate-y-0 -rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-noir transition-[opacity,visibility] duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          aria-hidden
          className="rule-v absolute top-0 left-1/2 h-full -translate-x-1/2"
        />
        <div className="shell relative flex h-full flex-col justify-between pb-10 pt-32">
          <nav className="flex flex-col" aria-label="Mobile">
            {site.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-5 border-b border-line py-5 transition-opacity duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transitionDelay: open ? `${160 + i * 90}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(14px)",
                }}
              >
                <span className="numeral text-sm text-brass-dim">0{i + 1}</span>
                <span className="font-display text-4xl leading-none">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-7">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="border border-brass bg-brass py-4 text-center text-[0.6875rem] tracking-[0.24em] text-noir uppercase"
            >
              Book a consultation
            </Link>
            <div className="flex flex-col gap-1.5 text-[0.8125rem] text-muted">
              <a href={`tel:${site.contact.phoneHref}`} className="transition-colors hover:text-brass">
                {site.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="transition-colors hover:text-brass"
              >
                {site.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}