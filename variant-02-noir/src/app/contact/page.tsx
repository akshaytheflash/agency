import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { PageHero, Eyebrow } from "@/components/ui";
import { site, faqs } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Book a consultation at Aurelia. Ninety minutes with a resident physician, a written summary, and a clear recommendation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact the concierge"
        title="Let us start with ninety minutes."
        lede="Tell us what you are looking for and a physician will reply within one working day. No deposit, no pressure, and no obligation to book anything afterwards."
        image="/images/doctor-report.jpg"
        imageAlt="A findings review in room four"
      />

      <section className="shell py-12 md:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* details */}
          <Reveal delay={120} className="lg:col-span-4">
            <div className="flex items-baseline gap-5">
              <span className="numeral text-sm text-brass">01</span>
              <Eyebrow>Direct</Eyebrow>
            </div>
            <div className="mt-8 space-y-14">
              <div>
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="block font-display text-3xl transition-colors duration-700 hover:text-brass"
                >
                  {site.contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-rule mt-3 inline-block break-all py-1.5 -my-1.5 text-[0.9375rem] text-muted transition-colors hover:text-brass"
                >
                  {site.contact.email}
                </a>
              </div>

              <div>
                <Eyebrow>Visit</Eyebrow>
                <address className="mt-5 not-italic leading-relaxed text-chalk/80">
                  {site.contact.address.line1}
                  <br />
                  {site.contact.address.line2}
                </address>
                <a
                  href={site.contact.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="link-rule mt-4 inline-block py-1.5 -my-1.5 text-[0.8125rem] tracking-[0.24em] text-muted uppercase transition-colors hover:text-brass"
                >
                  Open in Maps ↗
                </a>
              </div>

              <div>
                <Eyebrow>Hours</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {site.hours.map((h) => (
                    <li
                      key={h.days}
                      className="flex justify-between gap-6 border-b border-line pb-3 text-[0.9375rem]"
                    >
                      <span className="text-muted">{h.days}</span>
                      <span className="text-right text-chalk/80">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-line bg-surface p-7">
                <Eyebrow>What happens next</Eyebrow>
                <ol className="mt-6 space-y-5 text-[0.9375rem] leading-relaxed text-muted">
                  <li>
                    <span className="numeral mr-2 text-brass-dim">01 —</span> A physician reads your
                    enquiry and replies within one working day.
                  </li>
                  <li>
                    <span className="numeral mr-2 text-brass-dim">02 —</span> We find a slot, or
                    tell you the honest wait. No deposit to hold it.
                  </li>
                  <li>
                    <span className="numeral mr-2 text-brass-dim">03 —</span> Ninety minutes. Then a
                    written plan you can take away and argue with.
                  </li>
                </ol>
              </div>
            </div>
          </Reveal>

          {/* form */}
          <Reveal delay={200} className="lg:col-span-7 lg:col-start-6">
            <div className="flex items-baseline gap-5">
              <span className="numeral text-sm text-brass">02</span>
              <Eyebrow>Send an enquiry</Eyebrow>
            </div>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="shell py-12 md:py-26">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <Reveal>
                <div className="flex items-baseline gap-5">
                  <span className="numeral text-sm text-brass">03</span>
                  <Eyebrow>Before you write</Eyebrow>
                </div>
                <h2 className="display-md mt-8 max-w-[12ch]">
                  The things people <em className="italic-display">ask first.</em>
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <Reveal delay={140}>
                <Faq items={faqs} idPrefix="contact" />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}