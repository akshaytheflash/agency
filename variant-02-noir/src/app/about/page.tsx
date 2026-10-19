import Image from "next/image";
import Reveal from "@/components/Reveal";
import { PageHero, CtaBand, Eyebrow, PullQuote } from "@/components/ui";
import { team, timeline, values, stats, site } from "@/lib/site";

export const metadata = {
  title: "About",
  description:
    "Who runs Aurelia, how the clinic works, and the four rules that decide what we offer and what we refuse.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Aurelia"
        title="A clinic run by physicians, not by a growth team."
        lede="Aurelia has been on this hill since 2014. Everything about how it works — what we measure, what we sell, who is allowed to sell it — comes down to four rules written on the wall in the consulting room."
        image="/images/portrait-bw.jpg"
        imageAlt="Dr. Elin Marchetti, Medical Director"
      />

      {/* rules */}
      <section className="bg-surface">
        <div className="shell py-12 md:py-26">
          <Reveal>
            <div className="flex items-baseline gap-5">
              <span className="numeral text-sm text-brass">01</span>
              <Eyebrow>Four rules</Eyebrow>
            </div>
            <h2 className="display-lg mt-8 max-w-[16ch]">What we will not do.</h2>
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90}>
                <div className="group flex h-full flex-col border border-line bg-noir p-9 transition-colors duration-[900ms] hover:border-brass/40 md:p-11">
                  <span className="numeral text-4xl text-brass-dim transition-colors duration-[900ms] group-hover:text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-10 font-display text-2xl">{v.title}</h3>
                  <p className="mt-5 max-w-md leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* founder note */}
      <section className="shell py-12 md:py-26">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="flex items-baseline gap-5">
              <span className="numeral text-sm text-brass">02</span>
              <Eyebrow>From the founder</Eyebrow>
            </div>
            <div className="mt-10 space-y-6 text-[1.0625rem] leading-relaxed text-muted">
              <p>
                I spent eleven years in sports medicine watching competent physicians sell patients
                things that did not work, because the incentives were arranged that way. When I
                opened Aurelia I wrote one line into the founding documents: nobody on the clinical
                floor is paid a commission, ever.
              </p>
              <p>
                It cost us a great deal of revenue in the first two years. It also meant that when a
                guest walks in and asks about a treatment, the first question is whether it helps —
                and roughly one time in eight the honest answer ends the consultation there.
              </p>
              <p>
                The other thing I got wrong early was over-testing. We used to order everything.
                Then we noticed that two thirds of what we were measuring changed nothing about any
                decision we made. We threw most of it out. What remains is shorter, cheaper and far
                more useful.
              </p>
              <p className="pull text-xl text-chalk">
                That is the whole method. Measure what matters. Do less of what does not. Make the
                room good enough that people actually complete the plan.
              </p>
            </div>
            <p className="mt-10 border-t border-line pt-7 text-sm tracking-[0.04em]">
              Dr. Elin Marchetti
              <span className="eyebrow mt-2.5 block">Medical Director, Founder</span>
            </p>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-4/5 w-full overflow-hidden bg-surface">
              <Image
                src="/images/consult-clinic.jpg"
                alt="Consultation at Aurelia"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="img-cine object-cover"
              />
              <span aria-hidden className="vignette absolute inset-0" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-5">
              <div className="relative aspect-4/3 overflow-hidden bg-surface">
                <Image
                  src="/images/treatment-room.jpg"
                  alt="A private treatment room"
                  fill
                  sizes="25vw"
                  className="img-cine object-cover"
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden bg-surface">
                <Image
                  src="/images/herbal-tea.jpg"
                  alt="The apothecary bar"
                  fill
                  sizes="25vw"
                  className="img-cine object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* pull quote band */}
      <section className="border-y border-line bg-raised">
        <div className="shell py-14 md:py-28">
          <PullQuote
            quote="I came in expecting a spa and left with a diagnosis. The difference in how seriously they took the numbers changed how I think about my own health."
            attribution="Henrik Bauer"
            role="Managing Partner, Basel"
          />
        </div>
      </section>

      {/* team */}
      <section className="bg-surface">
        <div className="shell py-12 md:py-26">
          <Reveal>
            <div className="flex items-baseline gap-5">
              <span className="numeral text-sm text-brass">03</span>
              <Eyebrow>The people</Eyebrow>
            </div>
            <h2 className="display-lg mt-8 max-w-[18ch]">
              Eighteen physicians. <em className="italic-display">Four who run it.</em>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 90}>
                <article className="group">
                  <div className="relative aspect-3/4 w-full overflow-hidden bg-raised">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="img-cine object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-noir/65 via-transparent to-transparent"
                    />
                  </div>
                  <h3 className="mt-7 font-display text-xl">{m.name}</h3>
                  <p className="eyebrow mt-3">{m.role}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{m.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="shell py-12 md:py-26">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-baseline gap-5">
                <span className="numeral text-sm text-brass">04</span>
                <Eyebrow>Since 2014</Eyebrow>
              </div>
              <h2 className="display-md mt-8 max-w-[12ch]">How the place grew.</h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ol className="border-t border-line">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 80} as="li">
                  <div className="grid gap-5 border-b border-line py-9 sm:grid-cols-[7rem_1fr] sm:gap-10">
                    <span className="numeral text-3xl text-brass">{t.year}</span>
                    <span className="leading-relaxed text-muted">{t.text}</span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* numbers */}
      <section className="border-y border-line bg-noir">
        <div className="shell py-10 md:py-22">
          <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
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
          <p className="mt-16 border-t border-line pt-8 text-[0.6875rem] tracking-[0.2em] text-muted/70 uppercase">
            {site.legalName} · Registered with the NMC · A fictional demonstration site.
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="Come and see"
        title="The tour takes about forty minutes."
        body="Walk the clinical floor, sit in the rest gallery, ask anything. If you are not comfortable with the place, that is useful information for both of us."
        primary={{ href: "/contact", label: "Arrange a visit" }}
        secondary={{ href: "/treatments", label: "See treatments" }}
        image="/images/minimal-marble-wood.jpg"
        imageAlt="The east wing, rebuilt 2021"
      />
    </>
  );
}