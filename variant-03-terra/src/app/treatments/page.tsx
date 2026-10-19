import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PageHero, CtaBand, ArrowLink, Chip } from "@/components/ui";
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
        image="/images/massage-therapeutic.jpg"
        imageAlt="Hands-on recovery therapy at Aurelia"
      />

      {/* category jump bar */}
      <div className="sticky top-[4.75rem] z-30 border-y border-line bg-cream/85 backdrop-blur-xl">
        <div className="shell flex items-center gap-3 overflow-x-auto py-4">
          <span className="eyebrow mr-1 hidden shrink-0 sm:inline-flex">Jump to</span>
          <div className="flex shrink-0 items-center gap-2">
            {categories.map((c) => (
              <a
                key={c}
                href={`#${c.toLowerCase()}`}
                className="inline-flex items-center rounded-full border border-line bg-paper px-4 py-2 text-[0.8125rem] font-medium text-muted transition-all duration-400 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:border-terra hover:bg-terra hover:text-paper hover:shadow-warm-sm"
              >
                {c}
              </a>
            ))}
          </div>
          <span className="ml-auto hidden shrink-0 items-center gap-3 md:flex">
            <span className="text-[0.8125rem] text-muted">Not sure?</span>
            <ArrowLink href="/contact">Ask a physician</ArrowLink>
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
            className="shell scroll-mt-36 py-10 md:py-22"
          >
            <Reveal>
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="display-lg">{category}</h2>
                <Chip tone="sun">
                  {items.length} {items.length === 1 ? "service" : "services"}
                </Chip>
                {ci === 0 && (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 border-t border-dashed border-line md:block"
                  />
                )}
              </div>
            </Reveal>

            <div className="mt-10 flex flex-col gap-6">
              {items.map((t, i) => (
                <Reveal key={t.slug} delay={i * 70}>
                  <article
                    id={t.slug}
                    className="card card-lift grid scroll-mt-36 grid-cols-[6rem_1fr] gap-4 overflow-hidden p-4 md:grid-cols-12 md:items-center md:gap-6 md:p-6"
                  >
                    <div
                      className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2 md:col-start-8" : ""}`}
                    >
                      <div
                        className={`relative h-28 w-full overflow-hidden bg-line md:h-auto md:aspect-4/5 ${
                          i % 2 === 1 ? "aspect-4/5 arch" : "aspect-4/5 arch-wide"
                        }`}
                      >
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          sizes="(min-width: 768px) 40vw, 100vw"
                          className="img-warm object-cover"
                        />
                      </div>
                    </div>

                    <div
                      className={`px-2 pb-4 md:col-span-6 md:px-6 md:pb-6 ${
                        i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-7"
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip tone="sun">{t.category}</Chip>
                        <Chip>{t.duration}</Chip>
                        <Chip>{t.price}</Chip>
                      </div>

                      <h3 className="display-md mt-6 max-w-[16ch]">{t.name}</h3>
                      <p className="mt-5 text-lg leading-relaxed font-medium">{t.summary}</p>
                      <p className="mt-4 max-w-xl leading-relaxed text-muted">{t.detail}</p>

                      <div className="mt-8">
                        <p className="eyebrow">Included</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {t.includes.map((inc) => (
                            <li
                              key={inc}
                              className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-3.5 py-1.5 text-[0.8125rem] text-muted"
                            >
                              <span
                                aria-hidden
                                className="flex h-4 w-4 items-center justify-center rounded-full bg-terra-soft text-terra"
                              >
                                <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                                  <path
                                    d="M1 4.2 3.6 6.8 9 1.2"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-9 flex flex-wrap items-center gap-5">
                        <Link
                          href="/contact"
                          className="rounded-full bg-terra px-8 py-3.5 text-[0.8125rem] font-semibold text-paper shadow-warm transition-all duration-400 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:bg-terra-deep hover:shadow-warm-lg"
                        >
                          Book this
                        </Link>
                        <span className="text-[0.8125rem] text-muted">
                          Covered by most policies ·{" "}
                          <a href="/contact" className="link-rule font-semibold text-ink">
                            Check your cover
                          </a>
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      <CtaBand
        eyebrow="Not on this page"
        title="If it is not listed, we do not do it."
        body="Send us what you are considering. If we do not offer it, or if we think you do not need it, we will say so — that answer is free and it is genuinely common."
        secondary={{ href: "/retreat", label: "See the retreat" }}
      />
    </>
  );
}
