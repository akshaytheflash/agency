import { numbers } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * Outcome band: four figures, full-bleed, separated by hairlines.
 * Not cards. No icons. The numbers are the design.
 */
export default function Numbers() {
  return (
    <section
      aria-label="By the numbers"
      className="border-b border-line bg-surface"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* gap-px over a line-coloured parent = true hairline rules between the
            figures at every breakpoint, with no conflicting border utilities. */}
        <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {numbers.map((n, i) => (
            <Reveal
              key={n.unit}
              delay={i * 110}
              className={[
                "bg-surface py-14 sm:pr-6 lg:py-20 lg:pr-8",
                i > 0 ? "sm:pl-6 lg:pl-8" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[clamp(3rem,6vw,4.75rem)] leading-none text-ink tabular-nums">
                  {n.figure}
                </span>
                <span className="font-display text-[1.35rem] leading-none text-accent italic">
                  {n.unit}
                </span>
              </div>
              <p className="mt-5 max-w-[28ch] text-[0.94rem] leading-relaxed text-muted">
                {n.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
