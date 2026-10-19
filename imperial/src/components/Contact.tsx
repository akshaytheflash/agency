import { site, mailtoHref } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * Contact: one line of large type and one email link. No form, per brief.
 * This is the one place the page centres — the single deliberate moment.
 */
export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-4 border-b border-line bg-surface"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="py-24 lg:py-32">
          <Reveal>
            <p className="text-[0.7rem] tracking-[0.24em] text-accent uppercase">
              04 / Start
            </p>
            {/* max-width lives on the h2 so `ch` resolves against the display
                size (96px), not the wrapper's 17px body font. */}
            <h2
              id="contact-heading"
              className="mt-6 max-w-[15ch] text-[clamp(2.5rem,7vw,6rem)] text-ink"
            >
              Tell us what you need built.
            </h2>
          </Reveal>

          <Reveal delay={140} className="mt-10">
            <a
              href={mailtoHref}
              className="link-draw inline-block font-display text-[clamp(1.4rem,3.4vw,2.6rem)] leading-tight break-all text-accent"
            >
              {site.email}
            </a>
            <p className="mt-8 max-w-[52ch] text-[1.02rem] leading-relaxed text-muted">
              One email. A reply the same day, a fixed price within twenty-four
              hours, and a date your site goes live.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
