import { site, mailtoHref } from "@/lib/site";

/**
 * Statement hero: one large sentence, left-aligned, with a metadata row.
 * No centered headline, no gradient, no two buttons fighting for attention.
 */
export default function Hero() {
  return (
    <header className="relative border-b border-line">
      <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-16 sm:px-8 lg:px-12 lg:pt-14 lg:pb-20">
        {/* top rail — agency mark + one link. Stacks on narrow screens: side
            by side, the wordmark wrapped onto three lines next to the email. */}
        <div className="flex flex-col items-start gap-y-2 border-b border-line pb-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-8">
          <span className="text-[0.72rem] font-medium tracking-[0.24em] text-ink uppercase">
            {site.name}
          </span>
          <a
            href={mailtoHref}
            className="link-draw -my-1 inline-block py-1 text-[0.72rem] tracking-[0.18em] text-muted uppercase hover:text-ink"
          >
            {site.email}
          </a>
        </div>

        {/* the statement */}
        <div className="grid grid-cols-1 gap-y-12 pt-14 lg:grid-cols-12 lg:gap-x-10 lg:pt-24">
          <div className="lg:col-span-9">
            <h1 className="text-[clamp(2.75rem,8.4vw,7.25rem)] leading-[0.92] text-ink">
              {site.headline}
            </h1>
          </div>

          {/* lede sits indented, opened by a short accent rule — asymmetry with intent */}
          <div className="max-w-[54ch] lg:col-start-4 lg:col-end-10">
            <div className="mb-10 h-px w-16 bg-accent" aria-hidden="true" />
            <p className="text-[1.0625rem] leading-relaxed text-muted sm:text-[1.15rem]">
              {site.lede}
            </p>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted sm:text-[1.15rem]">
              {site.sub}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={mailtoHref}
                className="group inline-flex items-center gap-3 bg-accent px-6 py-3.5 text-[0.9rem] font-medium text-accent-ink transition-opacity duration-300 hover:opacity-85"
              >
                {site.ctaPrimary}
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </a>
              <a
                href="#work"
                className="link-draw -my-1 inline-block py-1 text-[0.9rem] text-ink"
              >
                {site.ctaSecondary}
              </a>
            </div>
          </div>
        </div>

        {/* metadata row — the small facts, set like a colophon */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-line pt-6 lg:mt-20">
          {site.metadata.map((m) => (
            <span
              key={m}
              className="text-[0.7rem] tracking-[0.2em] text-muted uppercase"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
