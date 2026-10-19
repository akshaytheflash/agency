import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { Eyebrow, Chip } from "@/components/ui";
import { site, faqs } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Book a consultation at Aurelia. Ninety minutes with a resident physician, a written summary, and a clear recommendation.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-12 md:pt-36 md:pb-24">
        <div className="shell">
          <Reveal>
            <Eyebrow>Contact the concierge</Eyebrow>
            <h1 className="display-xl mt-8 max-w-[12ch]">
              Let us start with <span className="squiggle text-terra">ninety minutes.</span>
            </h1>
          </Reveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            {/* details */}
            <Reveal delay={120} className="lg:col-span-4">
              <div className="flex flex-col gap-5">
                <div className="rounded-card bg-paper p-7 shadow-warm-sm">
                  <p className="eyebrow">Direct</p>
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="display-md mt-4 block transition-colors hover:text-terra"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-rule mt-3 inline-block break-all py-1.5 -my-1.5 text-[0.9375rem] text-muted hover:text-terra-deep"
                  >
                    {site.contact.email}
                  </a>
                </div>

                <div className="rounded-card border border-dashed border-line bg-paper/70 p-7">
                  <p className="eyebrow">Visit</p>
                  <address className="mt-4 not-italic leading-relaxed">
                    {site.contact.address.line1}
                    <br />
                    {site.contact.address.line2}
                  </address>
                  <a
                    href={site.contact.mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center rounded-full bg-terra-soft px-4 py-2 text-[0.8125rem] font-semibold text-terra-deep transition-colors hover:bg-terra hover:text-paper"
                  >
                    Open in Maps ↗
                  </a>
                </div>

                <div className="rounded-card bg-paper p-7 shadow-warm-sm">
                  <p className="eyebrow">Hours</p>
                  <ul className="mt-4 flex flex-col gap-2">
                    {site.hours.map((h) => (
                      <li
                        key={h.days}
                        className="flex items-center justify-between gap-4 rounded-full border border-line bg-cream px-4 py-2.5 text-[0.8125rem]"
                      >
                        <span className="text-muted">{h.days}</span>
                        <span className="text-right font-medium">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-card border border-line bg-olive p-7 text-cream">
                  <p className="eyebrow text-sun">What happens next</p>
                  <ol className="mt-5 flex flex-col gap-4 text-[0.9375rem] leading-relaxed text-cream/75">
                    {[
                      "A physician reads your enquiry and replies within one working day.",
                      "We find a slot, or tell you the honest wait. No deposit to hold it.",
                      "Ninety minutes. Then a written plan you can take away and argue with.",
                    ].map((step, i) => (
                      <li key={step} className="flex gap-4">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sun text-[0.6875rem] font-bold text-ink">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>

            {/* form */}
            <Reveal delay={200} className="lg:col-span-7 lg:col-start-6">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Chip tone="sun">Replies within one working day</Chip>
                <Chip>Reviewed by a physician</Chip>
              </div>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-paper py-10 md:py-22">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Before you write</Eyebrow>
                <h2 className="display-md mt-8 max-w-[12ch]">The things people ask first.</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={120}>
                <Faq items={faqs} idPrefix="contact" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
