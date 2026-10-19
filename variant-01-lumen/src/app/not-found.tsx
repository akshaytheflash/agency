import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-24">
      <div className="shell">
        <p className="eyebrow">Error 404</p>
        <h1 className="display-xl mt-8 max-w-[14ch]">This page is not on the schedule.</h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
          The link may be old, or we may have moved something. The concierge can point you at it.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/"
            className="bg-ink px-8 py-4 text-[0.8125rem] font-medium text-bone transition-colors hover:bg-transparent hover:text-ink"
          >
            Back to the homepage
          </Link>
          <Link
            href="/contact"
            className="border border-line px-8 py-4 text-[0.8125rem] font-medium transition-colors hover:border-ink"
          >
            Contact the concierge
          </Link>
        </div>

        <p className="mt-16 text-xs text-muted">
          Or call {site.contact.phoneDisplay} ·{" "}
          <a href={`mailto:${site.contact.email}`} className="link-rule text-ink">
            {site.contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}