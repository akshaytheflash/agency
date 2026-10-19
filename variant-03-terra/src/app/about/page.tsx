import Image from "next/image";
import Reveal from "@/components/Reveal";
import {
  PageHero,
  CtaBand,
  Eyebrow,
  Chip,
  CurveTop,
  CurveBottom,
} from "@/components/ui";
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
        image="/images/doctor-senior.jpg"
        imageAlt="Dr. Elin Marchetti, Medical Director"
      />

      {/* rules */}
      <section className="bg-paper py-10 md:py-22">
        <div className="shell">
          <Reveal>
            <Eyebrow>Four rules</Eyebrow>
            <h2 className="display-lg mt-8 max-w-[16ch]">What we will not do.</h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card card-lift flex h-full flex-col p-8 md:p-10">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terra font-display text-xl font-bold text-paper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-md mt-7 max-w-[18ch]">{v.title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* founder note */}
      <section className="shell py-10 md:py-22">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>From the founder</Eyebrow>
            <div className="mt-9 rounded-card border border-dashed border-line bg-paper/70 p-8 md:p-10">
              <div className="space-y-6 text-[1.0625rem] leading-relaxed text-muted">
                <p>
                  I spent eleven years in sports medicine watching competent physicians sell patients
                  things that did not work, because the incentives were arranged that way. When I
                  opened Aurelia I wrote one line into the founding documents: nobody on the
                  clinical floor is paid a commission, ever.
                </p>
                <p>
                  It cost us a great deal of revenue in the first two years. It also meant that when
                  a guest walks in and asks about a treatment, the first question is whether it
                  helps — and roughly one time in eight the honest answer ends the consultation
                  there.
                </p>
                <p>
                  The other thing I got wrong early was over-testing. We used to order everything.
                  Then we noticed that two thirds of what we were measuring changed nothing about
                  any decision we made. We threw most of it out. What remains is shorter, cheaper
                  and far more useful.
                </p>
                <p className="font-semibold text-ink">
                  That is the whole method. Measure what matters. Do less of what does not. Make the
                  room good enough that people actually complete the plan.
                </p>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-line">
                <Image
                  src="/images/doctor-senior.jpg"
                  alt=""
                  fill
                  sizes="56px"
                  className="img-warm object-cover"
                />
              </div>
              <p className="text-sm font-semibold">
                Dr. Elin Marchetti
                <span className="eyebrow mt-1.5 block">Medical Director, Founder</span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <div className="blob relative aspect-square w-full overflow-hidden bg-line shadow-warm-lg">
              <Image
                src="/images/consult-clinic.jpg"
                alt="Consultation at Aurelia"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="img-warm scale-[1.06] object-cover"
              />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-5">
              <div className="arch relative aspect-4/5 overflow-hidden bg-line shadow-warm-sm">
                <Image
                  src="/images/treatment-room.jpg"
                  alt="A private treatment room"
                  fill
                  sizes="25vw"
                  className="img-warm object-cover"
                />
              </div>
              <div className="arch relative aspect-4/5 overflow-hidden bg-line shadow-warm-sm">
                <Image
                  src="/images/aromatherapy.jpg"
                  alt="Aromatherapy oils in the treatment room"
                  fill
                  sizes="25vw"
                  className="img-warm object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* team */}
      <section className="bg-paper py-10 md:py-22">
        <div className="shell">
          <Reveal>
            <Eyebrow>The people</Eyebrow>
            <h2 className="display-lg mt-8 max-w-[18ch]">Eighteen physicians. Four who run it.</h2>
          </Reveal>

          <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <article className="group">
                  <div className="arch relative aspect-3/4 w-full overflow-hidden bg-line shadow-warm-xs transition-all duration-500 ease-[var(--ease-spring)] group-hover:shadow-warm">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="img-warm object-cover group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="display-sm mt-6 text-xl">{m.name}</h3>
                  <p className="eyebrow mt-2">{m.role}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{m.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="shell py-10 md:py-22">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Since 2014</Eyebrow>
              <h2 className="display-md mt-8 max-w-[12ch]">How the place grew.</h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ol className="relative flex flex-col gap-4 border-l border-dashed border-line pl-8">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 70} as="li" className="relative">
                  <span
                    aria-hidden
                    className="absolute top-7 -left-[2.4rem] h-4 w-4 rounded-full border-4 border-cream bg-terra"
                  />
                  <div className="rounded-card card-lift bg-paper px-7 py-6">
                    <Chip tone="sun">{t.year}</Chip>
                    <p className="mt-4 leading-relaxed text-muted">{t.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* numbers */}
      <section className="relative bg-olive text-cream">
        <CurveTop className="absolute inset-x-0 top-0 h-14 w-full text-cream md:h-24" />
        <div className="shell relative py-12 md:py-24">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
          <p className="mt-12 text-xs text-cream/40">
            {site.legalName} · Registered with the NMC · A fictional demonstration site.
          </p>
        </div>
        <CurveBottom className="absolute inset-x-0 bottom-0 h-14 w-full text-cream md:h-24" />
      </section>

      <CtaBand
        eyebrow="Come and see"
        title="The tour takes about forty minutes."
        body="Walk the clinical floor, sit in the rest gallery, ask anything. If you are not comfortable with the place, that is useful information for both of us."
        primary={{ href: "/contact", label: "Arrange a visit" }}
        secondary={{ href: "/treatments", label: "See treatments" }}
      />
    </>
  );
}
