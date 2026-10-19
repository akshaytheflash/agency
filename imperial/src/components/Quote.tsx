import { quote } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * One pull-quote in the display serif. No carousel, no avatars, no stars.
 */
export default function Quote() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 py-20 lg:grid-cols-12 lg:py-28">
          <Reveal className="lg:col-span-2">
            <span className="font-display block text-[4.5rem] leading-[0.6] text-accent select-none lg:text-[6rem]">
              “
            </span>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-9 lg:col-start-3">
            <blockquote>
              <p className="font-display text-[clamp(1.75rem,4.4vw,3.4rem)] leading-[1.08] text-ink italic">
                {quote.text}
              </p>
              <footer className="mt-7 flex items-center gap-4">
                <span className="h-px w-10 bg-accent" aria-hidden="true" />
                <cite className="text-[0.72rem] tracking-[0.2em] text-muted uppercase not-italic">
                  {quote.attribution}
                </cite>
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
