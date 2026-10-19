import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center py-24">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="eyebrow">Error 404</p>
            <h1 className="display-xl mt-8 max-w-[12ch]">
              This page is not on the <span className="squiggle text-terra">schedule.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
              The link may be old, or we may have moved something. The concierge can point you at
              it.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/"
                className="rounded-full bg-terra px-8 py-4 text-[0.8125rem] font-semibold text-paper shadow-warm transition-all duration-400 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:bg-terra-deep hover:shadow-warm-lg"
              >
                Back to the homepage
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-line bg-paper px-8 py-4 text-[0.8125rem] font-semibold transition-all duration-400 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:border-terra hover:text-terra-deep hover:shadow-warm"
              >
                Contact the concierge
              </Link>
            </div>

            <p className="mt-12 inline-block rounded-full border border-dashed border-line bg-paper px-6 py-3 text-xs text-muted">
              Or call {site.contact.phoneDisplay} ·{" "}
              <a href={`mailto:${site.contact.email}`} className="link-rule font-semibold text-ink">
                {site.contact.email}
              </a>
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="arch relative aspect-4/5 w-full overflow-hidden bg-line shadow-warm-lg">
              <Image
                src="/images/tea-closeup.jpg"
                alt="Herbal infusions at the Aurelia apothecary bar"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="img-warm object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
