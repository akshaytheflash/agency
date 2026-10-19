import Image from "next/image";
import Reveal from "@/components/Reveal";
import { PageHero, CtaBand, ArrowLink, Eyebrow, EyebrowQuiet } from "@/components/ui";
import { treatments } from "@/lib/site";

const categories = ["Diagnostics", "Protocols", "Aesthetics", "Recovery"] as const;

export const metadata = {
  title: "Treatments",
  description:
    "Diagnostics, longevity protocols, medical aesthetics and recovery at Aurelia — durations, prices and exactly what is included in each.",
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Treatments & diagnostics"
        title="Everything we do, with the price attached."
        lede="Nine services, each with its duration, its cost and the list of what is actually included. If a treatment is not on this page, we do not offer it."
        image="/images/exam-room.jpg"
        imageAlt="A private treatment room at Aurelia"
      />

      {/* category jump bar */}
      <div className="sticky top-[4.75rem] z-30 border-y border-line bg-noir/90 backdrop-blur-xl">
        <div className="shell flex items-center gap-7 overflow-x-auto py-4">
          <EyebrowQuiet className="shrink-0">Jump to</EyebrowQuiet>
          {categories.map((c) => (
            <a
              key={c}
              href={`#${c.toLowerCase()}`}
              className="link-rule shrink-0 py-2 -my-2 text-[0.6875rem] tracking-[0.24em] text-muted uppercase transition-colors duration-700 hover:text-brass"
            >
              {c}
            </a>
          ))}
          <span className="ml-auto hidden shrink-0 items-center gap-4 md:flex">
            <EyebrowQuiet>Not sure?</EyebrowQuiet>
            <ArrowLink href="/contact" brass>
              Ask a physician
            </ArrowLink>
          </span>
        </div>
      </div>

      {categories.map((category, ci) => {
        const items = treatments.filter((t) => t.category === category);
        if (!items.length) return null;

        return (
          <section
            key={category}
            id={category.toLowerCase()}
            className="shell scroll-mt-40 py-12 md:py-24"
          >
            <Reveal>
              <div className="flex flex-wrap items-baseline gap-6 border-b border-line pb-7">
                <span className="numeral text-sm text-brass">{String(ci + 1).padStart(2, "0")}</span>
                <h2 className="display-md">{category}</h2>
                <EyebrowQuiet>
                  {items.length} {items.length === 1 ? "service" : "services"}
                </EyebrowQuiet>
              </div>
            </Reveal>

            <div className="flex flex-col">
              {items.map((t, i) => {
                const flip = i % 2 === 1;
                return (
                  <article
                    key={t.slug}
                    id={t.slug}
                    className="grid grid-cols-[6.5rem_1fr] scroll-mt-40 gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-20 lg:py-28"
                  >
                    <Reveal className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                      <div className="relative h-32 w-full overflow-hidden bg-surface lg:h-auto lg:aspect-4/5">
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="img-cine object-cover"
                        />
                        <span
                          aria-hidden
                          className="absolute inset-0 bg-gradient-to-t from-noir/50 via-transparent to-transparent"
                        />
                      </div>
                    </Reveal>

                    <Reveal
                      delay={120}
                      className={`flex flex-col justify-center lg:col-span-6 ${
                        flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
                        <Eyebrow>{t.category}</Eyebrow>
                        <span aria-hidden className="h-px w-8 bg-line" />
                        <EyebrowQuiet>{t.duration}</EyebrowQuiet>
                        <span aria-hidden className="h-px w-8 bg-line" />
                        <EyebrowQuiet>{t.price}</EyebrowQuiet>
                      </div>

                      <h3 className="display-md mt-8 max-w-[16ch]">{t.name}</h3>
                      <p className="pull mt-7 max-w-xl text-xl text-brass/90">{t.summary}</p>
                      <p className="mt-7 max-w-xl leading-relaxed text-muted">{t.detail}</p>

                      <div className="mt-11">
                        <p className="eyebrow">Included</p>
                        <ul className="mt-6 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                          {t.includes.map((inc) => (
                            <li
                              key={inc}
                              className="flex gap-3.5 text-[0.9375rem] text-muted"
                            >
                              <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-brass-dim" />
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-line pt-8">
                        <a
                          href="/contact"
                          className="border border-brass bg-brass px-8 py-4 text-[0.6875rem] tracking-[0.24em] text-noir uppercase transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-transparent hover:text-brass"
                        >
                          Book this
                        </a>
                        <span className="text-[0.8125rem] text-muted">
                          Covered by most policies ·{" "}
                          <a href="/contact" className="link-rule text-brass">
                            Check your cover
                          </a>
                        </span>
                      </div>
                    </Reveal>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      <CtaBand
        eyebrow="Not on this page"
        title="If it is not listed, we do not do it."
        body="Send us what you are considering. If we do not offer it, or if we think you do not need it, we will say so — that answer is free and it is genuinely common."
        secondary={{ href: "/retreat", label: "See the retreat" }}
        image="/images/massage-therapy.jpg"
        imageAlt="Recovery suite two"
      />
    </>
  );
}