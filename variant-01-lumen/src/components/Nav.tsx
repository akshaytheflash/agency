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
    const onScroll = () => setScrolled(window.scrollY > 24);
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
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-bone/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-20 items-center justify-between gap-8">
          <Link href="/" className="group flex items-baseline gap-3 py-2" aria-label={`${site.name} home`}>
            <span className="font-display text-2xl leading-none tracking-[-0.03em]">
              {site.name}
            </span>
            <span className="eyebrow hidden sm:block">New Delhi</span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`link-rule text-[0.8125rem] transition-colors ${
                  isActive(item.href) ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${site.contact.phoneHref}`}
              className="hidden text-[0.8125rem] text-muted transition-colors hover:text-ink xl:block"
            >
              {site.contact.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="hidden border border-ink bg-ink px-6 py-3 text-[0.8125rem] font-medium text-bone transition-colors hover:bg-transparent hover:text-ink md:inline-block"
            >
              Book a consultation
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span
                className={`block h-px w-6 bg-ink transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-ink transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-bone transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="shell flex h-full flex-col justify-between pb-10 pt-32">
          <nav className="flex flex-col" aria-label="Mobile">
            {site.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-line py-5 font-display text-4xl tracking-[-0.03em] transition-opacity duration-500"
                style={{
                  transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(12px)",
                }}
              >
                <span className="mr-4 align-middle font-sans text-[0.6875rem] tracking-[0.22em] text-muted">
                  0{i + 1}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-6">
            <Link
              href="/contact"
              className="bg-ink py-4 text-center text-sm font-medium text-bone"
            >
              Book a consultation
            </Link>
            <div className="flex flex-col gap-1 text-sm text-muted">
              <a href={`tel:${site.contact.phoneHref}`} className="hover:text-ink">
                {site.contact.phoneDisplay}
              </a>
              <a href={`mailto:${site.contact.email}`} className="hover:text-ink">
                {site.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}