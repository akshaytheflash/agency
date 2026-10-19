import Link from "next/link";
import { site } from "@/lib/site";
import { HairlineButton } from "@/components/ui";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_70%_20%,rgba(194,162,101,0.10),transparent_60%)]"
      />
      <div className="shell">
        <div className="flex items-center gap-5">
          <span aria-hidden className="h-px w-12 bg-brass/70" />
          <p className="eyebrow">Error 404</p>
        </div>

        <h1 className="display-xl mt-9 max-w-[14ch]">
          This page is not <em className="italic-display">on the schedule.</em>
        </h1>

        <p className="mt-9 max-w-md text-lg leading-relaxed text-muted">
          The link may be old, or we may have moved something. The concierge can point you at it.
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <HairlineButton href="/" tone="solid">
            Back to the homepage
          </HairlineButton>
          <HairlineButton href="/contact" tone="ghost">
            Contact the concierge
          </HairlineButton>
        </div>

        <p className="mt-16 text-xs text-muted">
          Or call {site.contact.phoneDisplay} ·{" "}
          <a href={`mailto:${site.contact.email}`} className="link-rule text-brass">
            {site.contact.email}
          </a>
        </p>

        <div aria-hidden className="mt-20 border-t border-line pt-10">
          <Link
            href="/treatments"
            className="link-rule text-[0.6875rem] tracking-[0.24em] text-muted uppercase transition-colors hover:text-brass"
          >
            Browse the nine treatments →
          </Link>
        </div>
      </div>
    </section>
  );
}