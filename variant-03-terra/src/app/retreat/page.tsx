import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PageHero, CtaBand, ArrowLink, Eyebrow, Chip } from "@/components/ui";
import { suites, programmes, galleryImages } from "@/lib/site";

export const metadata = {
  title: "The Retreat",
  description:
    "Four suites and three programmes in New Delhi. Residential stays, half-day resets and a five-day programme built around diagnostics and recovery.",
};

export default function RetreatPage() {
  return (
    <>
      <PageHero
        eyebrow="The retreat"
        title="A clinic with bedrooms."
        lede="Four suites, a thermal wing and a clinical kitchen, ninety seconds apart. Guests stay for a night because everything that makes the programme work sits within a short walk of the bed."
        image="/images/bath-sunny.jpg"
        imageAlt="The Alpine Suite bathroom, morning light through the garden"
      />

      {/* suites */}
      <section className="bg-paper py-10 md:py-22">
        <div className="shell">
          <Reveal>
            <Eyebrow>Rooms &amp; rates</Eyebrow>
            <h2 className="display-lg mt-8 max-w-[14ch]">The suites</h2>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {suites.map((s, i) => (
              <Reveal key={s.name} delay={i * 70}>
                <article className="card card-lift group flex h-full flex-col overflow-hidden">
                  <div className="p-3 pb-0">
                    <div className="arch-wide relative aspect-16/10 w-full overflow-hidden bg-line">
                      <Image
                        src={s.image}
                        alt={s.name}
                        fill
                        sizes="(min-width: 1024px) 48vw, 100vw"
                        className="img-warm object-cover group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-9">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="display-md max-w-[14ch]">{s.name}</h3>
                      <Chip>{s.rate}</Chip>
                    </div>
                    <p className="mt-5 max-w-lg leading-relaxed text-muted">{s.detail}</p>
                    <p className="eyebrow mt-auto pt-8">{s.sleeps}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* programmes */}
      <section className="shell py-10 md:py-22">
        <Reveal>
          <Eyebrow>Programmes</Eyebrow>
          <h2 className="display-lg mt-8 max-w-[16ch]">Three ways to spend the time.</h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {programmes.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <article className="card card-lift flex h-full flex-col p-8">
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sun-soft font-display text-lg font-bold text-terra-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Chip tone="sun">{p.duration}</Chip>
                </div>
                <h3 className="display-md mt-6 max-w-[14ch]">{p.name}</h3>
                <p className="mt-4 leading-relaxed text-muted">{p.summary}</p>

                <ul className="mt-7 flex flex-col gap-2.5">
                  {p.includes.map((inc) => (
                    <li key={inc} className="flex gap-3 text-[0.9375rem] text-muted">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
                      {inc}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-4 border-t border-dashed border-line pt-7">
                  <span className="text-lg font-semibold">{p.price}</span>
                  <Link
                    href="/contact"
                    className="shrink-0 rounded-full bg-olive px-5 py-2.5 text-[0.8125rem] font-semibold text-cream transition-colors hover:bg-terra"
                  >
                    Reserve
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* what's always included */}
      <section className="bg-paper py-10 md:py-22">
        <div className="shell">
          <Reveal>
            <Eyebrow>Included with every stay</Eyebrow>
            <h2 className="display-lg mt-8 max-w-[18ch]">Four things you never have to pay for.</h2>
          </Reveal>

          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "The thermal wing",
                b: "Sauna, cold plunge, hammam and rest gallery. Open 06:00 to 22:00, included, no booking needed.",
                img: "/images/sauna-wood.jpg",
              },
              {
                t: "The clinical kitchen",
                b: "Breakfast, lunch and dinner built around your glucose profile and your actual week. Dietary requirements handled properly.",
                img: "/images/salads.jpg",
              },
              {
                t: "The apothecary bar",
                b: "Herbal infusions, loose-leaf tea and a pharmacist on call until midnight for the inevitable jet lag.",
                img: "/images/tea-closeup.jpg",
              },
              {
                t: "Dawn movement",
                b: "Optional mobility and breath class at 06:45 on the south terrace. Nobody has ever been made to attend.",
                img: "/images/meditation.jpg",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 80}>
                <div className="group">
                  <div className="arch relative aspect-4/5 w-full overflow-hidden bg-line shadow-warm-xs transition-all duration-500 ease-[var(--ease-spring)] group-hover:shadow-warm">
                    <Image
                      src={item.img}
                      alt={item.t}
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="img-warm object-cover group-hover:scale-[1.05]"
                    />
                  </div>
                  <h3 className="display-sm mt-6 text-xl">{item.t}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{item.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* the hill */}
      <section className="shell py-10 md:py-22">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Getting here</Eyebrow>
            <h2 className="display-lg mt-8 max-w-[12ch]">Twelve minutes from central Delhi.</h2>
            <p className="mt-7 max-w-md leading-relaxed text-muted">
              The neighbourhood is quieter than it looks, and the nearest metro station is nine minutes away. We
              collect from the airport and the railway station on arrival for any stay of three nights or
              more.
            </p>

            <dl className="mt-9 flex flex-col gap-2.5">
              {[
                ["Metro", "Nearest station six minutes away, car waiting at the door"],
                ["Airport", "25 minutes by car, collected on request"],
                ["Parking", "Six spaces on site, guests only"],
                ["Check-in", "From 14:00 · Check-out 11:00"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex flex-wrap items-center gap-4 rounded-full border border-line bg-paper px-5 py-3"
                >
                  <dt className="w-20 shrink-0 text-[0.8125rem] font-semibold text-terra-deep">
                    {k}
                  </dt>
                  <dd className="text-[0.9375rem] text-muted">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9">
              <ArrowLink href="/contact">Ask about availability</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-5">
              {galleryImages.slice(8, 12).map((g, i) => (
                <div
                  key={g.src}
                  className={`relative aspect-3/4 w-full overflow-hidden bg-line shadow-warm-xs ${
                    i % 2 === 0 ? "arch" : "rounded-3xl"
                  }`}
                >
                  <Image
                    src={g.src}
                    alt={g.caption}
                    fill
                    sizes="(min-width: 1024px) 24vw, 50vw"
                    className="img-warm object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Reservations"
        title="Tell us when, and we will hold a suite."
        body="Availability for the Executive Week runs about six months out. Everything else is usually available inside two weeks."
        primary={{ href: "/contact", label: "Check availability" }}
        secondary={{ href: "/treatments", label: "See treatments" }}
      />
    </>
  );
}
