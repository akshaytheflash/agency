import { services } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * Capability narrative: prose in a narrow column with a sticky label.
 * This deliberately is not a 3-up icon grid.
 */
export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-4 border-b border-line"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-x-12 py-20 lg:grid-cols-12 lg:py-28">
          {/* sticky label column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-14">
              <div className="relative">
                <p className="text-[0.7rem] tracking-[0.24em] text-accent uppercase">
                  02 / Capabilities
                </p>
                <h2
                  id="services-heading"
                  className="mt-4 text-[clamp(2rem,4.2vw,3.25rem)] text-ink"
                >
                  Three things,
                  <br />
                  done properly.
                </h2>
                <p className="mt-5 max-w-[34ch] text-[1rem] leading-relaxed text-muted">
                  We do not take on work we cannot finish. That is the entire
                  business model — four people, short engagements, everything
                  shipped.
                </p>
              </div>
              {/* oversized numeral anchors the column's lower stretch —
                  desktop only: stacked (mobile/tablet) it would just be
                  dead space between the paragraph and the first item */}
              <span
                aria-hidden="true"
                className="font-display mt-10 hidden text-[7rem] leading-none text-ink opacity-[0.05] select-none lg:mt-14 lg:block"
              >
                02
              </span>
            </div>
          </div>

          {/* narrative column */}
          <div className="mt-14 lg:col-span-8 lg:mt-0">
            {services.map((s, i) => (
              <Reveal
                key={s.index}
                delay={i * 80}
                className={[
                  "border-t border-line py-10 lg:py-14",
                  i === services.length - 1 ? "border-b" : "",
                ].join(" ")}
              >
                <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-[auto_1fr]">
                  <span className="font-display text-[1.6rem] leading-none text-accent tabular-nums sm:pt-2">
                    {s.index}
                  </span>
                  <div>
                    <h3 className="text-[clamp(1.5rem,2.8vw,2.1rem)] text-ink">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-[62ch] text-[1.05rem] leading-relaxed text-muted">
                      {s.body}
                    </p>
                    <p className="mt-5 text-[0.7rem] tracking-[0.18em] text-muted uppercase">
                      {s.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
