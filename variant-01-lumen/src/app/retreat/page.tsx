import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PageHero, CtaBand, ArrowLink } from "@/components/ui";
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
        image="/images/bath-tropical.jpg"
        imageAlt="The Garden Pavilion bathroom, morning light"
      />

      {/* suites */}
      <section className="border-t border-line bg-paper">
        <div className="shell py-14 md:py-32">
          <Reveal>
            <EyebrowBlock />
            <h2 className="display-lg mt-8 max-w-[14ch]">The suites</h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-line lg:grid-cols-2">
            {suites.map((s, i) => (
              <Reveal key={s.name} delay={i * 70}>
                <article className="group flex h-full flex-col bg-paper">
                  <div className="relative aspect-3/2 w-full overflow-hidden bg-line">
                    <Image
                      src={s.image}
                      alt={s.name}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="img-editorial object-cover group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8 md:p-10">
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="display-md">{s.name}</h3>
                      <span className="shrink-0 text-sm text-muted">{s.rate}</span>
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
      <section className="shell py-14 md:py-32">
        <Reveal>
          <p className="eyebrow">Programmes</p>
          <h2 className="display-lg mt-8 max-w-[16ch]">Three ways to spend the time.</h2>
        </Reveal>

        <div className="mt-16 flex flex-col">
          {programmes.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <article className="grid gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-4">
                  <p className="eyebrow">{p.duration}</p>
                  <h3 className="display-md mt-5">{p.name}</h3>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-lg leading-relaxed text-ink/80">{p.summary}</p>
                </div>

                <div className="lg:col-span-3">
                  <ul className="space-y-3">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex gap-3 text-[0.9375rem] text-muted">
                        <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-sage" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center justify-between gap-6 border-t border-line pt-6">
                    <span className="font-display text-2xl tracking-[-0.02em]">{p.price}</span>
                    <Link
                      href="/contact"
                      className="shrink-0 py-2 -my-2 text-[0.8125rem] font-medium transition-colors hover:text-sage"
                    >
                      Reserve →
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* what's always included */}
      <section className="border-y border-line">
        <div className="shell py-14 md:py-32">
          <Reveal>
            <p className="eyebrow">Included with every stay</p>
          </Reveal>
          <div className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
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
                img: "/images/herbal-tea.jpg",
              },
              {
                t: "Dawn movement",
                b: "Optional mobility and breath class at 06:45 on the south terrace. Nobody has ever been made to attend.",
                img: "/images/meditation.jpg",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 80}>
                <div>
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-line">
                    <Image
                      src={item.img}
                      alt={item.t}
                      fill
                      sizes="(min-width: 1024px) 22vw, 50vw"
                      className="img-editorial object-cover"
                    />
                  </div>
                  <h3 className="mt-6 font-display text-2xl tracking-[-0.02em]">{item.t}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{item.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* the hill */}
      <section className="shell py-14 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Getting here</p>
            <h2 className="display-lg mt-8">Twelve minutes from central Delhi.</h2>
            <p className="mt-8 max-w-md leading-relaxed text-muted">
              The neighbourhood is quieter than it looks, and the nearest metro station is nine minutes away. We
              collect from the airport and the railway station on arrival for any stay of three nights or
              more.
            </p>
            <dl className="mt-10 border-t border-line text-[0.9375rem]">
              {[
                ["Metro", "Nearest station six minutes away, car waiting at the door"],
                ["Airport", "25 minutes by car, collected on request"],
                ["Parking", "Six spaces on site, guests only"],
                ["Check-in", "From 14:00 · Check-out 11:00"],
              ].map(([k, v]) => (
                <div key={k} className="flex gap-6 border-b border-line py-4">
                  <dt className="w-24 shrink-0 text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10">
              <ArrowLink href="/contact">Ask about availability</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-5">
              {galleryImages.slice(8, 12).map((g) => (
                <div
                  key={g.src}
                  className="relative aspect-3/4 w-full overflow-hidden bg-line"
                >
                  <Image
                    src={g.src}
                    alt={g.caption}
                    fill
                    sizes="(min-width: 1024px) 24vw, 50vw"
                    className="img-editorial object-cover"
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

function EyebrowBlock() {
  return <p className="eyebrow">Rooms & rates</p>;
}