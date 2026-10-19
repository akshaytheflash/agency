import Link from "next/link";
import { site, treatments } from "@/lib/site";
import VariantSwitcher from "./VariantSwitcher";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative rounded-t-[44px] border-t border-line bg-paper md:rounded-t-[64px]">
      <div className="shell py-10 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-terra">
                <span aria-hidden className="h-3 w-3 rounded-full bg-olive" />
              </span>
              <p className="display-md">{site.name}</p>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-olive px-7 py-3.5 text-[0.8125rem] font-semibold text-cream transition-all duration-400 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:bg-terra hover:shadow-warm"
            >
              Book a consultation
            </Link>
          </div>

          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-6 flex flex-col gap-1.5">
              {site.nav.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="inline-block rounded-full px-3 py-1 text-sm text-muted transition-colors hover:bg-terra-soft hover:text-terra-deep"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Treatments</p>
            <ul className="mt-6 flex flex-col gap-1.5">
              {treatments.slice(0, 5).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments#${t.slug}`}
                    className="inline-block rounded-full px-3 py-1 text-sm text-muted transition-colors hover:bg-terra-soft hover:text-terra-deep"
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
                  className="link-rule inline-block hover:text-terra"
                >
                  {site.contact.phoneDisplay}
                </a>
              </p>
              <p className="break-all">
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-rule inline-block hover:text-terra"
                >
                  {site.contact.email}
                </a>
              </p>
            </address>

            <p className="eyebrow mt-8">Hours</p>
            <ul className="mt-5 flex flex-col gap-2">
              {site.hours.map((h) => (
                <li
                  key={h.days}
                  className="flex items-center justify-between gap-4 rounded-full border border-line bg-cream px-4 py-2 text-xs text-muted"
                >
                  <span>{h.days}</span>
                  <span className="text-right">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 rounded-full border border-dashed border-line bg-cream/70 px-6 py-5 text-[0.75rem] text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. A fictional demonstration site.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/contact" className="link-rule py-2 -my-2 hover:text-terra">
              Privacy
            </Link>
            <Link href="/contact" className="link-rule py-2 -my-2 hover:text-terra">
              Terms
            </Link>
            <span>
              Built as design variant{" "}
              <span className="font-semibold text-ink">
                {site.variant.number} — {site.variant.label}
              </span>
            </span>
          </div>
        </div>
      </div>

      <VariantSwitcher />
    </footer>
  );
}
