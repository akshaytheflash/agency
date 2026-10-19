import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { Eyebrow } from "@/components/ui";
import { site, faqs } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Book a consultation at Aurelia. Ninety minutes with a resident physician, a written summary, and a clear recommendation.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-28 pb-12 md:pt-40 md:pb-28">
        <div className="shell">
          <Reveal>
            <Eyebrow>Contact the concierge</Eyebrow>
            <h1 className="display-xl mt-8 max-w-[12ch]">Let us start with ninety minutes.</h1>
          </Reveal>

          <div className="mt-16 grid gap-16 lg:grid-cols-12">
            {/* details */}
            <Reveal delay={120} className="lg:col-span-4">
              <div className="space-y-12">
                <div>
                  <p className="eyebrow">Direct</p>
                  <a
                    href={`tel:${site.contact.phoneHref}`}
                    className="mt-4 block font-display text-3xl tracking-[-0.03em] transition-colors hover:text-sage"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="link-rule mt-3 inline-block break-all py-1.5 -my-1.5 text-[0.9375rem] text-muted hover:text-ink"
                  >
                    {site.contact.email}
                  </a>
                </div>

                <div>
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
                    className="link-rule mt-3 inline-block py-1.5 -my-1.5 text-[0.9375rem] text-muted hover:text-ink"
                  >
                    Open in Maps ↗
                  </a>
                </div>

                <div>
                  <p className="eyebrow">Hours</p>
                  <ul className="mt-4 space-y-3">
                    {site.hours.map((h) => (
                      <li
                        key={h.days}
                        className="flex justify-between gap-6 border-b border-line pb-3 text-[0.9375rem]"
                      >
                        <span className="text-muted">{h.days}</span>
                        <span className="text-right">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-line bg-paper p-6">
                  <p className="eyebrow">What happens next</p>
                  <ol className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-muted">
                    <li>
                      <span className="mr-2 text-ink">01 —</span> A physician reads your enquiry
                      and replies within one working day.
                    </li>
                    <li>
                      <span className="mr-2 text-ink">02 —</span> We find a slot, or tell you the
                      honest wait. No deposit to hold it.
                    </li>
                    <li>
                      <span className="mr-2 text-ink">03 —</span> Ninety minutes. Then a written
                      plan you can take away and argue with.
                    </li>
                  </ol>
                </div>
              </div>
            </Reveal>

            {/* form */}
            <Reveal delay={200} className="lg:col-span-7 lg:col-start-6">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper">
        <div className="shell py-14 md:py-32">
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