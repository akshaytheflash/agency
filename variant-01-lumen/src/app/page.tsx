import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import { CtaBand, ArrowLink, Eyebrow } from "@/components/ui";
import {
  site,
  credentials,
  stats,
  method,
  featuredTreatments,
  testimonials,
  faqs,
  galleryImages,
  suites,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* ───────────────────────── hero ───────────────────────── */}
      <section className="pt-28 pb-10 md:pt-44 md:pb-20">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
              <Eyebrow>New Delhi · Est. 2014</Eyebrow>
              <span className="hidden h-px w-16 bg-line sm:block" />
              <Eyebrow>Physician-led</Eyebrow>
            </div>
            <h1 className="display-xl mt-10 max-w-[13ch]">
              Medicine that keeps its promises.
            </h1>
          </Reveal>

          <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal delay={120} className="lg:col-span-5">
              <p className="max-w-md text-lg leading-relaxed text-muted">{site.description}</p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  href="/contact"
                  className="bg-ink px-8 py-4 text-[0.8125rem] font-medium text-bone transition-colors hover:bg-transparent hover:text-ink"
                >
                  Book a consultation
                </Link>
                <ArrowLink href="/treatments">Browse treatments</ArrowLink>
              </div>
            </Reveal>

            <Reveal delay={240} className="lg:col-span-4 lg:col-start-7">
              <dl className="border-t border-line">
                {stats.slice(0, 3).map((s) => (
                  <div key={s.label} className="flex items-baseline gap-6 border-b border-line py-5">
                    <dt className="shrink-0 font-display text-4xl tracking-[-0.03em] tabular-nums">
                      {s.value}
                      <span className="text-muted">{s.suffix}</span>
                    </dt>
                    <dd className="text-[0.8125rem] leading-snug text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <Reveal delay={160} className="mt-20 md:mt-28">
          <div className="relative h-[58vh] min-h-[380px] w-full overflow-hidden bg-line md:h-[76vh]">
            <Image
              src="/images/minimal-marble-wood.jpg"
              alt="The east wing of Aurelia — marble, oak and daylight"
              fill
              priority
              sizes="100vw"
              className="img-editorial object-cover"
            />
          </div>
          <div className="shell">
            <p className="eyebrow mt-5">The east wing, rebuilt 2021</p>
          </div>
        </Reveal>
      </section>

      {/* ───────────────────── credentials marquee ───────────────────── */}
      <section className="border-y border-line bg-paper py-5">
        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center">
            {[...credentials, ...credentials, ...credentials, ...credentials].map((c, i) => (
              <span key={i} className="eyebrow flex shrink-0 items-center whitespace-nowrap px-8">
                {c}
                <span aria-hidden className="ml-8 text-sage">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── positioning statement ───────────────────── */}
      <section className="shell py-16 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <Eyebrow>The premise</Eyebrow>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-9">
            <p className="display-md max-w-[30ch] text-balance">
              We measure eight things properly, ignore ninety we do not need, and spend the saved
              attention on the eight.
            </p>
            <div className="mt-12 grid gap-10 border-t border-line pt-10 sm:grid-cols-2">
              <p className="leading-relaxed text-muted">
                Every guest begins with the same ninety-minute assessment. It ends with a written
                plan you can argue with. Sometimes that plan is a great deal less than you expected
                and considerably less than it would have cost you elsewhere.
              </p>
              <p className="leading-relaxed text-muted">
                There is no commission structure on this floor and no treatment we sell that a
                physician has not read the evidence for. Roughly one consultation in eight ends
                with us recommending nothing at all.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── treatments bento ───────────────────── */}
      <section className="border-t border-line bg-paper">
        <div className="shell py-14 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <Eyebrow>What we do</Eyebrow>
              <h2 className="display-lg mt-8 max-w-[12ch]">Treatments & diagnostics</h2>
            </Reveal>
            <Reveal delay={100}>
              <ArrowLink href="/treatments">All nine</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-px bg-line lg:grid-cols-6">
            {featuredTreatments.map((t, i) => {
              const wide = i % 3 !== 1;
              return (
                <Reveal
                  key={t.slug}
                  className={wide ? "lg:col-span-4" : "lg:col-span-2"}
                  delay={i * 60}
                >
                  <Link
                    href={`/treatments#${t.slug}`}
                    className="group flex h-full flex-row bg-paper transition-colors hover:bg-bone md:flex-col"
                  >
                    <div className="relative w-28 shrink-0 overflow-hidden bg-line md:aspect-16/10 md:w-full">
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="(min-width: 1024px) 60vw, 100vw"
                        className="img-editorial object-cover group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 md:p-9">
                      <div className="flex items-center gap-4">
                        <span className="eyebrow">{t.category}</span>
                        <span className="h-px flex-1 bg-line" />
                        <span className="text-xs text-muted tabular-nums">
                          {t.duration}
                        </span>
                      </div>
                      <h3 className="display-md mt-5 max-w-[18ch]">{t.name}</h3>
                      <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                        {t.summary}
                      </p>
                      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                        <span className="text-sm">{t.price}</span>
                        <span
                          aria-hidden
                          className="text-lg transition-transform duration-500 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────────── method ───────────────────── */}
      <section className="shell py-16 md:py-32">
        <Reveal>
          <Eyebrow>The method</Eyebrow>
          <h2 className="display-lg mt-8 max-w-[16ch]">Four steps, and only four.</h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-px border border-line bg-line min-[420px]:grid-cols-2 lg:grid-cols-4">
          {method.map((m, i) => (
            <Reveal key={m.step} delay={i * 80}>
              <div className="flex h-full flex-col bg-bone p-8">
                <span className="font-display text-5xl leading-none tracking-[-0.04em] text-sage tabular-nums">
                  {m.step}
                </span>
                <h3 className="mt-8 font-display text-2xl tracking-[-0.02em]">{m.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────────── retreat teaser ───────────────────── */}
      <section className="bg-paper">
        <div className="shell py-14 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-6">
              <div className="relative aspect-3/4 overflow-hidden bg-line">
                <Image
                  src="/images/hotel-room-elegant.jpg"
                  alt="The Cedar Suite, west-facing"
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="img-editorial object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
              <Eyebrow>Stay with us</Eyebrow>
              <h2 className="display-lg mt-8">Four suites, one hill.</h2>
              <p className="mt-8 max-w-md leading-relaxed text-muted">
                Not a hotel attached to a clinic — a clinic with bedrooms. Guests stay for a night
                because the thermal circuit, the sleep work and the kitchen all sit within ninety
                seconds of the bed.
              </p>

              <ul className="mt-12 border-t border-line">
                {suites.slice(0, 3).map((s) => (
                  <li
                    key={s.name}
                    className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                  >
                    <span className="font-display text-xl tracking-[-0.02em]">{s.name}</span>
                    <span className="shrink-0 text-[0.8125rem] text-muted">{s.rate}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <ArrowLink href="/retreat">See the retreat</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────── stats ───────────────────── */}
      <section className="border-y border-line">
        <div className="shell py-10 md:py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="border-t border-line pt-6">
                  <p className="font-display text-6xl leading-none tracking-[-0.04em] tabular-nums md:text-7xl">
                    {s.value}
                    <span className="text-muted">{s.suffix}</span>
                  </p>
                  <p className="mt-5 max-w-[18ch] text-[0.8125rem] leading-snug text-muted">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── testimonials ───────────────────── */}
      <section className="shell py-16 md:py-32">
        <Reveal>
          <Eyebrow>In their words</Eyebrow>
        </Reveal>
        <div className="mt-16 grid gap-px bg-line lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure className="flex h-full flex-col bg-bone p-8 md:p-10">
                <blockquote className="font-display text-xl leading-snug tracking-[-0.02em] md:text-[1.375rem]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-auto pt-10">
                  <p className="text-sm">{t.name}</p>
                  <p className="eyebrow mt-2">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────────── gallery strip ───────────────────── */}
      <section className="bg-paper">
        <div className="shell py-14 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <Eyebrow>The building</Eyebrow>
              <h2 className="display-lg mt-8 max-w-[14ch]">Marble, cedar, and very little else.</h2>
            </Reveal>
            <Reveal delay={100}>
              <ArrowLink href="/gallery">Full gallery</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {galleryImages.slice(0, 4).map((g, i) => (
              <Reveal
                key={g.src}
                delay={i * 70}
                className={i % 4 === 0 ? "lg:row-span-2" : ""}
              >
                <Link href="/gallery" className="group block">
                  <div
                    className={`relative w-full overflow-hidden bg-line ${
                      i % 4 === 0 ? "aspect-3/4" : "aspect-4/3"
                    }`}
                  >
                    <Image
                      src={g.src}
                      alt={g.caption}
                      fill
                      sizes="(min-width: 1024px) 24vw, 50vw"
                      className="img-editorial object-cover group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="eyebrow mt-4">{g.caption}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── faq ───────────────────── */}
      <section className="shell py-16 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Practicalities</Eyebrow>
              <h2 className="display-md mt-8 max-w-[12ch]">Questions, answered straight.</h2>
              <div className="mt-10">
                <ArrowLink href="/contact">Ask us something else</ArrowLink>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={120}>
              <Faq items={faqs} idPrefix="home" />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}