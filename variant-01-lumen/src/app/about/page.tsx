import Image from "next/image";
import Reveal from "@/components/Reveal";
import { PageHero, CtaBand } from "@/components/ui";
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
      <section className="border-t border-line bg-paper">
        <div className="shell py-14 md:py-32">
          <Reveal>
            <p className="eyebrow">Four rules</p>
            <h2 className="display-lg mt-8 max-w-[16ch]">What we will not do.</h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-line sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="flex h-full flex-col bg-paper p-8 md:p-10">
                  <span className="font-display text-4xl leading-none text-sage tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 font-display text-2xl tracking-[-0.02em]">{v.title}</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-muted">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* founder note */}
      <section className="shell py-14 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow">From the founder</p>
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
              <p className="text-ink">
                That is the whole method. Measure what matters. Do less of what does not. Make the
                room good enough that people actually complete the plan.
              </p>
            </div>
            <p className="mt-8 text-sm">
              Dr. Elin Marchetti
              <span className="eyebrow mt-2 block">Medical Director, Founder</span>
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <div className="relative aspect-4/5 overflow-hidden bg-line">
              <Image
                src="/images/consult-clinic.jpg"
                alt="Consultation at Aurelia"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="img-editorial object-cover"
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-5">
              <div className="relative aspect-4/3 overflow-hidden bg-line">
                <Image
                  src="/images/treatment-room.jpg"
                  alt="A private treatment room"
                  fill
                  sizes="25vw"
                  className="img-editorial object-cover"
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden bg-line">
                <Image
                  src="/images/herbal-tea.jpg"
                  alt="The apothecary bar"
                  fill
                  sizes="25vw"
                  className="img-editorial object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* team */}
      <section className="border-y border-line bg-paper">
        <div className="shell py-14 md:py-32">
          <Reveal>
            <p className="eyebrow">The people</p>
            <h2 className="display-lg mt-8 max-w-[18ch]">Eighteen physicians. Four who run it.</h2>
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <article>
                  <div className="relative aspect-3/4 w-full overflow-hidden bg-line">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="img-editorial object-cover"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-xl tracking-[-0.02em]">{m.name}</h3>
                  <p className="eyebrow mt-2">{m.role}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{m.bio}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="shell py-14 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow">Since 2014</p>
              <h2 className="display-md mt-8 max-w-[12ch]">How the place grew.</h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ol className="border-t border-line">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 70} as="li">
                  <div className="grid gap-4 border-b border-line py-8 sm:grid-cols-[7rem_1fr] sm:gap-8">
                    <span className="font-display text-3xl leading-none tracking-[-0.03em] tabular-nums">
                      {t.year}
                    </span>
                    <span className="leading-relaxed text-muted">{t.text}</span>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* numbers */}
      <section className="bg-ink text-bone">
        <div className="shell py-10 md:py-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="border-t border-bone/15 pt-6">
                  <p className="font-display text-6xl leading-none tracking-[-0.04em] tabular-nums md:text-7xl">
                    {s.value}
                    <span className="text-bone/50">{s.suffix}</span>
                  </p>
                  <p className="mt-5 max-w-[18ch] text-[0.8125rem] leading-snug text-bone/55">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-14 text-xs text-bone/35">
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
      />
    </>
  );
}