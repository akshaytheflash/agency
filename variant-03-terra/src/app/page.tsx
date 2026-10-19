import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import { CtaBand, ArrowLink, Eyebrow, Chip, Sticker, Squiggle, CurveTop, CurveBottom } from "@/components/ui";
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

/* bento rhythm for the treatments grid */
const bentoSpans = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4", "lg:col-span-3", "lg:col-span-3"];

export default function Home() {
  return (
    <>
      {/* ───────────────────────── hero ───────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-10 md:pt-36 md:pb-24">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase text-muted shadow-warm-xs">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-terra" />
                New Delhi · Est. 2014
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-terra/45 bg-terra-soft/40 px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase text-terra-deep">
                Physician-led
              </span>
            </div>

            <h1 className="display-xl mt-9 max-w-[11ch]">
              Medicine that keeps its <Squiggle>promises.</Squiggle>
            </h1>
          </Reveal>

          <div className="mt-14 grid items-center gap-14 lg:grid-cols-12">
            <Reveal delay={120} className="lg:col-span-6">
              <p className="max-w-lg text-lg leading-relaxed text-muted">{site.description}</p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-terra px-8 py-4 text-[0.8125rem] font-semibold text-paper shadow-warm transition-all duration-400 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:bg-terra-deep hover:shadow-warm-lg"
                >
                  Book a consultation
                </Link>
                <ArrowLink href="/treatments">Browse treatments</ArrowLink>
              </div>

              <dl className="mt-12 flex flex-wrap gap-3">
                {stats.slice(0, 3).map((s) => (
                  <div
                    key={s.label}
                    className="max-w-[11rem] rounded-3xl border border-line bg-paper px-5 py-4 shadow-warm-xs transition-all duration-400 ease-[var(--ease-spring)] hover:-translate-y-1 hover:shadow-warm"
                  >
                    <dt className="display-sm">
                      {s.value}
                      <span className="text-terra">{s.suffix}</span>
                    </dt>
                    <dd className="mt-1.5 text-[0.75rem] leading-snug text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={220} className="lg:col-span-5 lg:col-start-8">
              <div className="relative">
                <div className="arch relative aspect-4/5 w-full overflow-hidden bg-line shadow-warm-lg">
                  <Image
                    src="/images/herbal-tea.jpg"
                    alt="The Aurelia apothecary bar — herbal infusions in amber glass"
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="img-warm object-cover"
                  />
                </div>

                <Sticker tone="sun" className="absolute -left-5 bottom-10 hidden sm:inline-flex">
                  Ninety minutes
                </Sticker>

                <div className="absolute -right-4 -bottom-6 max-w-[15rem] rounded-3xl border border-line bg-paper p-5 shadow-warm-lg">
                  <p className="eyebrow">The apothecary bar</p>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                    Formulated against your panel, not a menu.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────── credentials marquee ───────────────────── */}
      <section className="marquee-pause border-y border-line bg-paper py-6">
        <div className="overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-3">
            {[...credentials, ...credentials, ...credentials, ...credentials].map((c, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-cream px-5 py-2.5 text-[0.8125rem] font-medium whitespace-nowrap text-muted"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-terra" />
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── positioning statement ───────────────────── */}
      <section className="shell py-14 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <Eyebrow>The premise</Eyebrow>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-9">
            <p className="display-md max-w-[32ch]">
              We measure eight things properly, ignore ninety we do not need, and spend the saved
              attention on the <Squiggle>eight.</Squiggle>
            </p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <div className="rounded-card border border-dashed border-line bg-paper/70 p-8">
                <p className="leading-relaxed text-muted">
                  Every guest begins with the same ninety-minute assessment. It ends with a written
                  plan you can argue with. Sometimes that plan is a great deal less than you
                  expected and considerably less than it would have cost you elsewhere.
                </p>
              </div>
              <div className="rounded-card bg-paper p-8 shadow-warm">
                <p className="leading-relaxed text-muted">
                  There is no commission structure on this floor and no treatment we sell that a
                  physician has not read the evidence for. Roughly one consultation in eight ends
                  with us recommending nothing at all.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── treatments bento ───────────────────── */}
      <section className="bg-paper py-12 md:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <Eyebrow>What we do</Eyebrow>
              <h2 className="display-lg mt-8 max-w-[12ch]">Treatments &amp; diagnostics</h2>
            </Reveal>
            <Reveal delay={100}>
              <ArrowLink href="/treatments">All nine</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 lg:gap-5 lg:grid-cols-6">
            {featuredTreatments.map((t, i) => {
              const wide = i % 3 !== 1;
              return (
                <Reveal key={t.slug} className={bentoSpans[i % bentoSpans.length]} delay={i * 60}>
                  <Link
                    href={`/treatments#${t.slug}`}
                    className="card card-lift group flex h-full flex-col overflow-hidden"
                  >
                    <div className="p-3 pb-0">
                      <div
                        className={`relative w-full overflow-hidden bg-line ${
                          wide ? "aspect-16/10 arch-wide" : "aspect-4/5 arch"
                        }`}
                      >
                        <Image
                          src={t.image}
                          alt={t.name}
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="img-warm object-cover group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-8">
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip tone="sun">{t.category}</Chip>
                        <Chip>{t.duration}</Chip>
                      </div>

                      <h3 className="display-md mt-5 max-w-[18ch] break-words hyphens-auto">{t.name}</h3>
                      <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                        {t.summary}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                        <span className="rounded-full bg-cream px-4 py-2 text-sm font-semibold">
                          {t.price}
                        </span>
                        <span
                          aria-hidden
                          className="flex h-11 w-11 items-center justify-center rounded-full bg-terra-soft text-terra transition-all duration-400 ease-[var(--ease-spring)] group-hover:bg-terra group-hover:text-paper"
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
      <section className="shell py-14 md:py-28">
        <Reveal>
          <Eyebrow>The method</Eyebrow>
          <h2 className="display-lg mt-8 max-w-[16ch]">Four steps, and only four.</h2>
        </Reveal>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute top-9 right-[12%] left-[12%] hidden border-t border-dashed border-terra/30 lg:block"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {method.map((m, i) => (
              <Reveal key={m.step} delay={i * 80}>
                <div className="card card-lift flex h-full flex-col bg-paper p-8">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-olive font-display text-xl font-bold text-cream">
                    {m.step}
                  </span>
                  <h3 className="display-sm mt-7 text-2xl">{m.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── retreat teaser ───────────────────── */}
      <section className="bg-paper py-12 md:py-24">
        <div className="shell">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="relative">
                <div className="arch relative aspect-3/4 w-full overflow-hidden bg-line shadow-warm-lg">
                  <Image
                    src="/images/robe-towel.jpg"
                    alt="Guest preparation — robe and towel, laid ready"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="img-warm object-cover"
                  />
                </div>
                <Sticker className="absolute -right-4 top-10 hidden sm:inline-flex">
                  Four suites
                </Sticker>
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
              <Eyebrow>Stay with us</Eyebrow>
              <h2 className="display-lg mt-8 max-w-[12ch]">A clinic with bedrooms.</h2>
              <p className="mt-8 max-w-md leading-relaxed text-muted">
                Not a hotel attached to a clinic — a clinic with bedrooms. Guests stay for a night
                because the thermal circuit, the sleep work and the kitchen all sit within ninety
                seconds of the bed.
              </p>

              <ul className="mt-10 flex flex-col gap-3">
                {suites.map((s) => (
                  <li
                    key={s.name}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-line bg-cream px-6 py-3.5 transition-colors hover:border-terra/40"
                  >
                    <span className="display-sm text-lg">{s.name}</span>
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

      {/* ───────────────────── stats — olive band ───────────────────── */}
      <section className="relative bg-olive text-cream">
        <CurveTop className="absolute inset-x-0 top-0 h-14 w-full text-cream md:h-24" />
        <div className="shell relative py-12 md:py-24">
          <Reveal className="max-w-[28ch]">
            <Eyebrow tone="dark">Twelve years on the hill</Eyebrow>
            <h2 className="display-md mt-6 text-cream">
              The numbers we are happy to be judged on.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="h-full rounded-3xl border border-cream/15 bg-cream/5 px-7 py-8">
                  <p className="font-display text-6xl leading-none font-bold tracking-[-0.045em] text-sun tabular-nums md:text-7xl">
                    {s.value}
                    <span className="text-cream/60">{s.suffix}</span>
                  </p>
                  <p className="mt-5 max-w-[18ch] text-[0.8125rem] leading-snug text-cream/65">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <CurveBottom className="absolute inset-x-0 bottom-0 h-14 w-full text-cream md:h-24" />
      </section>

      {/* ───────────────────── testimonials ───────────────────── */}
      <section className="shell py-14 md:py-28">
        <Reveal>
          <Eyebrow>In their words</Eyebrow>
          <h2 className="display-lg mt-8 max-w-[14ch]">Unedited, and unsolicited.</h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 lg:gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90}>
              <figure
                className={`flex h-full flex-col rounded-card p-8 md:p-10 ${
                  i === 1
                    ? "border border-dashed border-terra/40 bg-terra-soft/40"
                    : "border border-line bg-paper shadow-warm"
                }`}
              >
                <span aria-hidden className="font-display text-6xl leading-none font-bold text-sun">
                  “
                </span>
                <blockquote className="display-sm mt-4 text-[1.3rem] leading-snug">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto pt-10">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="eyebrow mt-2">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────────── gallery strip ───────────────────── */}
      <section className="bg-paper py-12 md:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <Eyebrow>The building</Eyebrow>
              <h2 className="display-lg mt-8 max-w-[14ch]">
                Marble, cedar, and very little else.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <ArrowLink href="/gallery">Full gallery</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {galleryImages.slice(0, 4).map((g, i) => (
              <Reveal key={g.src} delay={i * 70} className={i === 0 ? "sm:col-span-2 lg:col-span-2" : ""}>
                <Link href="/gallery" className="group block">
                  <div
                    className={`relative w-full overflow-hidden bg-line shadow-warm-xs transition-all duration-500 ease-[var(--ease-spring)] group-hover:shadow-warm ${
                      i === 0 ? "aspect-16/10 arch-wide" : "aspect-4/5 arch"
                    }`}
                  >
                    <Image
                      src={g.src}
                      alt={g.caption}
                      fill
                      sizes="(min-width: 1024px) 24vw, 50vw"
                      className="img-warm object-cover group-hover:scale-[1.05]"
                    />
                  </div>
                  <p className="mt-4 flex items-center gap-2.5 text-[0.8125rem] text-muted">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-terra" />
                    {g.caption}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── faq ───────────────────── */}
      <section className="shell py-14 md:py-28">
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
