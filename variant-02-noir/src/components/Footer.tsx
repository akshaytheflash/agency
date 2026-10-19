import Link from "next/link";
import { site, treatments } from "@/lib/site";
import VariantSwitcher from "./VariantSwitcher";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-noir">
      <div className="shell py-12 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div aria-hidden className="rule-v mb-8 h-16" />
            <p className="font-display text-3xl tracking-[0.04em]">
              {site.name.toUpperCase()}
            </p>
            <p className="italic-display mt-4 max-w-xs text-lg text-muted">{site.tagline}</p>
            <Link
              href="/contact"
              className="mt-9 inline-block border border-brass/50 px-7 py-3.5 text-[0.6875rem] tracking-[0.24em] text-brass uppercase transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-brass hover:text-noir"
            >
              Book a consultation
            </Link>
          </div>

          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-6 space-y-3.5 text-sm">
              {site.nav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="link-rule text-muted transition-colors hover:text-chalk">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Treatments</p>
            <ul className="mt-6 space-y-3.5 text-sm">
              {treatments.slice(0, 5).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments#${t.slug}`}
                    className="link-rule text-muted transition-colors hover:text-chalk"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Visit</p>
            <address className="mt-6 space-y-3 text-sm not-italic text-muted">
              <p>
                {site.contact.address.line1}
                <br />
                {site.contact.address.line2}
              </p>
              <p>
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="link-rule transition-colors hover:text-chalk"
                >
                  {site.contact.phoneDisplay}
                </a>
              </p>
              <p className="break-all">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-rule transition-colors hover:text-chalk"
                >
                  {site.contact.email}
                </a>
              </p>
            </address>

            <p className="eyebrow mt-9">Hours</p>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="text-right">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-line pt-8 text-[0.75rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. A fictional demonstration site.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <Link href="/contact" className="link-rule py-2 -my-2 transition-colors hover:text-chalk">
              Privacy
            </Link>
            <Link href="/contact" className="link-rule py-2 -my-2 transition-colors hover:text-chalk">
              Terms
            </Link>
            <span>
              Built as design variant{" "}
              <span className="text-brass">
                {site.variant.number} — {site.variant.label}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* ghosted wordmark */}
      <div aria-hidden className="pointer-events-none relative select-none">
        <p className="font-display text-[22vw] leading-[0.78] font-light tracking-[0.02em] text-chalk/[0.035]">
          {site.name.toUpperCase()}
        </p>
      </div>

      <VariantSwitcher />
    </footer>
  );
}