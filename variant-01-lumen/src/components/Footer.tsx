import Link from "next/link";
import { site, treatments } from "@/lib/site";
import VariantSwitcher from "./VariantSwitcher";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="shell py-14">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl tracking-[-0.03em]">{site.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
            <Link
              href="/contact"
              className="mt-8 inline-block border border-ink px-7 py-3.5 text-[0.8125rem] font-medium transition-colors hover:bg-ink hover:text-bone"
            >
              Book a consultation
            </Link>
          </div>

          <div>
            <p className="eyebrow">Navigate</p>
            <ul className="mt-5 space-y-3 text-sm">
              {site.nav.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="link-rule text-muted hover:text-ink">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Treatments</p>
            <ul className="mt-5 space-y-3 text-sm">
              {treatments.slice(0, 5).map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/treatments#${t.slug}`}
                    className="link-rule text-muted hover:text-ink"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Visit</p>
            <address className="mt-5 space-y-3 text-sm not-italic text-muted">
              <p>
                {site.contact.address.line1}
                <br />
                {site.contact.address.line2}
              </p>
              <p>
                <a href={`tel:${site.contact.phoneHref}`} className="link-rule hover:text-ink">
                  {site.contact.phoneDisplay}
                </a>
              </p>
              <p className="break-all">
                <a href={`mailto:${site.contact.email}`} className="link-rule hover:text-ink">
                  {site.contact.email}
                </a>
              </p>
            </address>

            <p className="eyebrow mt-8">Hours</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
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
            <Link href="/contact" className="link-rule py-2 -my-2 hover:text-ink">
              Privacy
            </Link>
            <Link href="/contact" className="link-rule py-2 -my-2 hover:text-ink">
              Terms
            </Link>
            <span>
              Built as design variant{" "}
              <span className="text-ink">
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