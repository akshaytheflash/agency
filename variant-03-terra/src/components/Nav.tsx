"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
      <header
        className="fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-[var(--ease-spring)]"
        style={{ paddingBlock: scrolled ? 12 : 20 }}
      >
        <div className="mx-auto w-full max-w-[80rem] px-5 md:px-8">
          <div
            className={`flex items-center justify-between gap-6 rounded-full border transition-all duration-500 ease-[var(--ease-spring)] ${
              scrolled
                ? "h-16 border-line bg-paper/85 px-3 shadow-warm-lg backdrop-blur-xl md:px-5"
                : "h-20 border-transparent bg-transparent px-0"
            }`}
          >
            <Link
              href="/"
              className="group flex items-center gap-3 py-2"
              aria-label={`${site.name} home`}
            >
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terra transition-transform duration-500 ease-[var(--ease-spring)] group-hover:scale-105">
                <span aria-hidden className="h-3 w-3 rounded-full bg-olive" />
              </span>
              <span className="display-sm pt-1">{site.name}</span>
              <span className="eyebrow hidden pb-1 pl-1 sm:block">New Delhi</span>
            </Link>

            <nav
              className="hidden items-center gap-1 rounded-full border border-line/70 bg-cream/60 p-1.5 lg:flex"
              aria-label="Primary"
            >
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-all duration-400 ease-[var(--ease-spring)] ${
                    isActive(item.href)
                      ? "bg-olive text-cream shadow-warm-xs"
                      : "text-muted hover:bg-terra-soft hover:text-terra-deep"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="hidden text-[0.8125rem] text-muted transition-colors hover:text-terra xl:block"
              >
                {site.contact.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="hidden rounded-full bg-terra px-6 py-3 text-[0.8125rem] font-semibold text-paper shadow-warm transition-all duration-400 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:bg-terra-deep hover:shadow-warm-lg md:inline-block"
              >
                Book a consultation
              </Link>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-paper transition-colors hover:border-terra lg:hidden"
              >
                <span
                  className={`block h-[2px] w-5 rounded-full bg-ink transition-transform duration-400 ease-[var(--ease-spring)] ${
                    open ? "translate-y-[4px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-[2px] w-5 rounded-full bg-ink transition-transform duration-400 ease-[var(--ease-spring)] ${
                    open ? "-translate-y-[4px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-cream transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-5 pt-32 pb-8">
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {site.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex items-center justify-between gap-4 rounded-full border px-6 py-4 font-display text-2xl font-semibold tracking-[-0.03em] transition-all duration-500 ease-[var(--ease-spring)] ${
                  isActive(item.href)
                    ? "border-olive bg-olive text-cream"
                    : "border-line bg-paper text-ink"
                }`}
                style={{
                  transitionDelay: open ? `${100 + i * 55}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(14px)",
                }}
              >
                <span>{item.label}</span>
                <span className="font-sans text-[0.6875rem] tracking-[0.2em] text-terra">
                  0{i + 1}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-5">
            <Link
              href="/contact"
              className="rounded-full bg-terra py-4 text-center text-sm font-semibold text-paper shadow-warm"
            >
              Book a consultation
            </Link>
            <div className="flex flex-col gap-1.5 rounded-full border border-dashed border-line bg-paper/60 px-6 py-5 text-sm text-muted">
              <a href={`tel:${site.contact.phoneHref}`} className="hover:text-terra">
                {site.contact.phoneDisplay}
              </a>
              <a href={`mailto:${site.contact.email}`} className="break-all hover:text-terra">
                {site.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
