import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PageHero, CtaBand, ArrowLink } from "@/components/ui";
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
      <div className="sticky top-20 z-30 border-y border-line bg-bone/90 backdrop-blur-md">
        <div className="shell flex items-center gap-6 overflow-x-auto py-4">
          <span className="eyebrow shrink-0">Jump to</span>
          {categories.map((c) => (
            <a
              key={c}
              href={`#${c.toLowerCase()}`}
              className="shrink-0 py-2 -my-2 text-[0.8125rem] text-muted transition-colors hover:text-ink"
            >
              {c}
            </a>
          ))}
          <span className="ml-auto hidden shrink-0 items-center gap-3 md:flex">
            <span className="eyebrow">Not sure?</span>
            <ArrowLink href="/contact">Ask a physician</ArrowLink>
          </span>
        </div>
      </div>

      {categories.map((category) => {
        const items = treatments.filter((t) => t.category === category);
        if (!items.length) return null;

        return (
          <section
            key={category}
            id={category.toLowerCase()}
            className="shell scroll-mt-40 py-12 md:py-24"
          >
            <Reveal>
              <div className="flex items-baseline gap-6 border-b border-line pb-6">
                <h2 className="display-md">{category}</h2>
                <span className="eyebrow">
                  {items.length} {items.length === 1 ? "service" : "services"}
                </span>
              </div>
            </Reveal>

            <div>
              {items.map((t, i) => (
                <article
                  key={t.slug}
                  id={t.slug}
                  className="grid grid-cols-[6.5rem_1fr] scroll-mt-40 gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-16 lg:py-24"
                >
                  <Reveal
                    className={`lg:col-span-5 ${i % 2 === 1 ? "lg:order-2 lg:col-start-8" : ""}`}
                  >
                    <div className="relative h-32 w-full overflow-hidden bg-line lg:h-auto lg:aspect-4/5">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="img-editorial object-cover"
                      />
                    </div>
                  </Reveal>

                  <Reveal
                    delay={100}
                    className={`flex flex-col justify-center lg:col-span-6 ${
                      i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                      <span className="eyebrow">{t.category}</span>
                      <span className="eyebrow">{t.duration}</span>
                      <span className="eyebrow">{t.price}</span>
                    </div>

                    <h3 className="display-md mt-7 max-w-[16ch]">{t.name}</h3>
                    <p className="mt-6 text-lg leading-relaxed text-ink/80">{t.summary}</p>
                    <p className="mt-5 max-w-xl leading-relaxed text-muted">{t.detail}</p>

                    <div className="mt-10">
                      <p className="eyebrow">Included</p>
                      <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {t.includes.map((inc) => (
                          <li key={inc} className="flex gap-3 text-[0.9375rem] text-muted">
                            <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-sage" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-12 flex flex-wrap items-center gap-8">
                      <Link
                        href="/contact"
                        className="bg-ink px-8 py-4 text-[0.8125rem] font-medium text-bone transition-colors hover:bg-transparent hover:text-ink"
                      >
                        Book this
                      </Link>
                      <span className="text-sm text-muted">
                        Covered by most policies ·{" "}
                        <a
                          href="/contact"
                          className="link-rule text-ink hover:text-sage"
                        >
                          Check your cover
                        </a>
                      </span>
                    </div>
                  </Reveal>
                </article>
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