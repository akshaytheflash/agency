import { process } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * Process: a numbered vertical list with generous spacing.
 * Sticky left rail on wide screens, steps stacked on the right.
 */
export default function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-4 border-b border-line bg-surface"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-x-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-14">
              <p className="text-[0.7rem] tracking-[0.24em] text-accent uppercase">
                03 / How it runs
              </p>
              <h2
                id="process-heading"
                className="mt-4 text-[clamp(2rem,4.2vw,3.25rem)] text-ink"
              >
                Three days,
                <br />
                four moves.
              </h2>
              <p className="mt-5 max-w-[32ch] text-[1rem] leading-relaxed text-muted">
                The schedule is the product. Here is exactly what happens between
                the first call and the site being live.
              </p>
            </div>
          </div>

          <ol className="mt-12 lg:col-span-8 lg:mt-0">
            {process.map((p, i) => (
              <Reveal
                as="li"
                key={p.step}
                delay={i * 90}
                className="border-t border-line last:border-b"
              >
                <div className="grid grid-cols-1 gap-x-10 gap-y-3 py-9 sm:grid-cols-[auto_1fr] lg:py-12">
                  <div className="flex items-baseline gap-4 sm:block">
                    <span className="font-display block text-[2.5rem] leading-none text-accent tabular-nums lg:text-[3.25rem]">
                      {p.step}
                    </span>
                    <span className="mt-3 block text-[0.68rem] tracking-[0.2em] text-muted uppercase">
                      {p.when}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-[clamp(1.4rem,2.6vw,1.95rem)] text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-[60ch] text-[1.03rem] leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
