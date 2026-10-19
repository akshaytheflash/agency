import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Faq from "@/components/Faq";
import {
  CtaBand,
  ArrowLink,
  Eyebrow,
  EyebrowQuiet,
  FilmBand,
  HairlineButton,
  PullQuote,
} from "@/components/ui";
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
      {/* ─────────────────────── 00 · hero ─────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <Image
          src="/images/hammam-ambiance.jpg"
          alt="The marble hammam at Aurelia, evening light"
          fill
          priority
          sizes="100vw"
          className="img-cine-deep -z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-noir via-noir/70 to-noir/40" />
        <div aria-hidden className="grain absolute inset-0 -z-10" />
        <div aria-hidden className="vignette absolute inset-0 -z-10" />

        <div className="shell w-full pt-28 pb-10 md:pb-20">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <Eyebrow>New Delhi · Est. 2014</Eyebrow>
              <span aria-hidden className="hidden h-px w-14 bg-brass/50 sm:block" />
              <EyebrowQuiet>Physician-led</EyebrowQuiet>
            </div>

            <h1 className="display-xl mt-10 max-w-[14ch]">
              Medicine that keeps
              <br className="hidden sm:block" />{" "}
              <em className="italic-display">its promises.</em>
            </h1>
          </Reveal>

          <div className="mt-14 grid gap-12 border-t border-line pt-10 lg:grid-cols-12">
            <Reveal delay={140} className="lg:col-span-5">
              <p className="max-w-md text-[1.0625rem] leading-relaxed text-muted">
                {site.description}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-7">
                <HairlineButton href="/contact" tone="solid">
                  Book a consultation
                </HairlineButton>
                <ArrowLink href="/treatments">Browse treatments</ArrowLink>
              </div>
            </Reveal>

            <Reveal delay={260} className="lg:col-span-4 lg:col-start-9">
              <dl className="border-t border-line">
                {stats.slice(0, 3).map((s) => (
                  <div
                    key={s.label}
                    className="flex items-baseline gap-6 border-b border-line py-5"
                  >
                    <dt className="numeral shrink-0 text-4xl text-chalk">
                      {s.value}
                      <span className="text-brass-dim">{s.suffix}</span>
                    </dt>
                    <dd className="text-[0.8125rem] leading-snug text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────── credentials marquee ───────────────────── */}
      <section className="border-y border-line bg-surface py-6">
        <div className="flex overflow-hidden">
          <div className="marquee-track flex shrink-0 items-center">
            {[...credentials, ...credentials, ...credentials, ...credentials].map((c, i) => (
              <span key={i} className="eyebrow flex shrink-0 items-center whitespace-nowrap px-8">
                {c}
                <span aria-hidden className="ml-8 text-brass-dim">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── 01 · premise ─────────────────────── */}
      <section className="shell py-14 md:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-3">
            <div className="flex items-baseline gap-5">
              <span className="numeral text-sm text-brass">01</span>
              <Eyebrow>The premise</Eyebrow>
            </div>
            <div
              aria-hidden
              className="draw-line-y mt-10 hidden h-32 w-px bg-line lg:block"
              data-shown="true"
            />
          </Reveal>

          <Reveal delay={120} className="lg:col-span-9">
            <p className="display-lg max-w-[22ch]">
              We measure <em className="italic-display text-brass">eight</em> things properly,
              ignore ninety we do not need, and spend the saved attention on the eight.
            </p>

            <div className="mt-16 grid gap-x-16 gap-y-10 border-t border-line pt-12 sm:grid-cols-2">
              <p className="leading-relaxed text-muted">
                Every guest begins with the same ninety-minute assessment. It ends with a written
                plan you can argue with. Sometimes that plan is a great deal less than you expected
                and considerably less than it would have cost you elsewhere.
              </p>
              <p className="leading-relaxed text-muted">
                There is no commission structure on this floor and no treatment we sell that a
                physician has not read the evidence for. Roughly one consultation in eight ends with
                us recommending nothing at all.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <FilmBand
        image="/images/indoor-pool.jpg"
        alt="The thermal pool at dawn"
        caption="The thermal pool · 06:00 — 22:00"
        align="left"
      />

      {/* ─────────────────────── 02 · treatments ─────────────────────── */}
      <section className="bg-surface">
        <div className="shell py-14 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-8 border-b border-line pb-10">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="numeral text-sm text-brass">02</span>
                <Eyebrow>What we do</Eyebrow>
              </div>
              <h2 className="display-lg mt-8 max-w-[14ch]">
                Treatments <em className="italic-display">&amp; diagnostics</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <ArrowLink href="/treatments">All nine</ArrowLink>
            </Reveal>
          </div>

          <div className="flex flex-col">
            {featuredTreatments.map((t, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={t.slug} delay={i * 60}>
                  <article
                    id={t.slug}
                    className="grid grid-cols-[6.5rem_1fr] scroll-mt-36 gap-6 border-b border-line py-10 lg:grid-cols-12 lg:gap-20 lg:py-24"
                  >
                    <Link
                      href={`/treatments#${t.slug}`}
                      className={`group relative block h-32 w-full overflow-hidden bg-raised lg:h-auto lg:aspect-4/5 lg:col-span-5 ${
                        flip ? "lg:order-2 lg:col-start-8" : ""
                      }`}
                    >
                      <Image
                        src={t.image}
                        alt={t.name}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="img-cine object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent"
                      />
                      <span className="numeral absolute bottom-5 left-6 text-[0.6875rem] text-brass">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>

                    <div
                      className={`flex flex-col justify-center lg:col-span-6 ${
                        flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
                        <Eyebrow>{t.category}</Eyebrow>
                        <span aria-hidden className="h-px w-8 bg-line" />
                        <EyebrowQuiet>{t.duration}</EyebrowQuiet>
                      </div>

                      <h3 className="display-md mt-7 max-w-[16ch]">{t.name}</h3>
                      <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-chalk/75">
                        {t.summary}
                      </p>

                      <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-7">
                        <span className="font-display text-2xl">{t.price}</span>
                        <ArrowLink href={`/treatments#${t.slug}`} brass>
                          Read more
                        </ArrowLink>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────── 03 · method ─────────────────────── */}
      <section className="shell py-14 md:py-32">
        <Reveal>
          <div className="flex items-baseline gap-5">
            <span className="numeral text-sm text-brass">03</span>
            <Eyebrow>The method</Eyebrow>
          </div>
          <h2 className="display-lg mt-8 max-w-[16ch]">
            Four steps, and <em className="italic-display">only</em> four.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {method.map((m, i) => (
            <Reveal key={m.step} delay={i * 90}>
              <div className="group flex h-full flex-col bg-noir p-9 transition-colors duration-[900ms] hover:bg-raised">
                <span className="numeral text-5xl text-brass-dim transition-colors duration-[900ms] group-hover:text-brass">
                  {m.step}
                </span>
                <h3 className="mt-10 font-display text-2xl">{m.title}</h3>
                <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─────────────────────── pull quote ─────────────────────── */}
      <section className="border-y border-line bg-raised">
        <div className="shell py-14 md:py-28">
          <PullQuote
            quote="They talked me out of a second treatment I had already paid for. That is the single reason my company sends every executive here."
            attribution="Amara Osei"
            role="Chief of Staff, New Delhi"
          />
        </div>
      </section>

      {/* ─────────────────────── 04 · retreat ─────────────────────── */}
      <section>
        <div className="shell py-14 md:py-32">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-6">
              <div className="relative aspect-3/4 w-full overflow-hidden bg-surface">
                <Image
                  src="/images/hotel-room-elegant.jpg"
                  alt="The Cedar Suite, west-facing"
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="img-cine object-cover"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-noir/55 via-transparent to-transparent"
                />
                <span aria-hidden className="vignette absolute inset-0" />
              </div>
            </Reveal>

            <Reveal delay={140} className="lg:col-span-5 lg:col-start-8">
              <div className="flex items-baseline gap-5">
                <span className="numeral text-sm text-brass">04</span>
                <Eyebrow>Stay with us</Eyebrow>
              </div>
              <h2 className="display-lg mt-8">
                Four suites,
                <br />
                <em className="italic-display">one hill.</em>
              </h2>
              <p className="mt-8 max-w-md leading-relaxed text-muted">
                Not a hotel attached to a clinic — a clinic with bedrooms. Guests stay for a night
                because the thermal circuit, the sleep work and the kitchen all sit within ninety
                seconds of the bed.
              </p>

              <ul className="mt-14 border-t border-line">
                {suites.slice(0, 3).map((s) => (
                  <li key={s.name} className="border-b border-line">
                    <div className="flex items-baseline justify-between gap-6 py-5">
                      <span className="font-display text-xl">{s.name}</span>
                      <span className="shrink-0 text-[0.8125rem] text-muted">{s.rate}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <ArrowLink href="/retreat">See the retreat</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────── stats ─────────────────────── */}
      <section className="border-y border-line bg-surface">
        <div className="shell py-10 md:py-22">
          <div className="grid grid-cols-2 gap-5 sm:gap-14 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className="border-t border-line pt-7">
                  <p className="numeral text-6xl leading-none text-chalk md:text-7xl">
                    {s.value}
                    <span className="text-brass">{s.suffix}</span>
                  </p>
                  <p className="mt-6 max-w-[18ch] text-[0.8125rem] leading-snug text-muted">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────── 05 · voices ─────────────────────── */}
      <section className="shell py-14 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <div className="flex items-baseline gap-5">
              <span className="numeral text-sm text-brass">05</span>
              <Eyebrow>In their words</Eyebrow>
            </div>
            <h2 className="display-md mt-8 max-w-[14ch]">Three guests, unhurried.</h2>
          </Reveal>
          <Reveal delay={120}>
            <ArrowLink href="/about">About the clinic</ArrowLink>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px bg-line lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="flex h-full flex-col bg-noir p-9 md:p-11">
                <span aria-hidden className="font-display text-5xl leading-none text-brass-dim">
                  &ldquo;
                </span>
                <blockquote className="pull mt-6 text-[1.375rem] text-chalk md:text-[1.5rem]">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto pt-12">
                  <p className="text-sm tracking-[0.04em]">{t.name}</p>
                  <p className="eyebrow-quiet mt-2">{t.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <FilmBand
        image="/images/sauna-wood.jpg"
        alt="The cedar sauna on the third floor"
        caption="Cedar sauna · third floor"
        align="right"
      />

      {/* ─────────────────────── 06 · the building ─────────────────────── */}
      <section className="bg-surface">
        <div className="shell py-14 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-8 border-b border-line pb-10">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="numeral text-sm text-brass">06</span>
                <Eyebrow>The building</Eyebrow>
              </div>
              <h2 className="display-lg mt-8 max-w-[15ch]">
                Marble, cedar, and <em className="italic-display">very little else.</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <ArrowLink href="/gallery">Full gallery</ArrowLink>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
            {galleryImages.slice(0, 5).map((g, i) => {
              const spans = [
                "sm:col-span-2 lg:col-span-7",
                "lg:col-span-5",
                "lg:col-span-5",
                "sm:col-span-2 lg:col-span-7",
                "sm:col-span-2 lg:col-span-12",
              ];
              const ratios = ["aspect-3/2", "aspect-4/3", "aspect-4/3", "aspect-3/2", "aspect-3/1"];
              return (
                <Reveal key={g.src} delay={i * 80} className={spans[i]}>
                  <Link href="/gallery" className="group block">
                    <div
                      className={`relative w-full overflow-hidden bg-raised ${ratios[i]}`}
                    >
                      <Image
                        src={g.src}
                        alt={g.caption}
                        fill
                        sizes="(min-width: 1024px) 55vw, 50vw"
                        className="img-cine object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-noir/65 via-transparent to-transparent"
                      />
                    </div>
                    <p className="eyebrow-quiet mt-5 border-t border-line pt-4 transition-colors duration-700 group-hover:text-brass">
                      {g.caption}
                    </p>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────── 07 · faq ─────────────────────── */}
      <section className="shell py-14 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="numeral text-sm text-brass">07</span>
                <Eyebrow>Practicalities</Eyebrow>
              </div>
              <h2 className="display-md mt-8 max-w-[12ch]">
                Questions, answered <em className="italic-display">straight.</em>
              </h2>
              <div className="mt-10">
                <ArrowLink href="/contact" brass>
                  Ask us something else
                </ArrowLink>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={140}>
              <Faq items={faqs} idPrefix="home" />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand image="/images/bath-sunny.jpg" imageAlt="Morning light in the Alpine Suite" />
    </>
  );
}