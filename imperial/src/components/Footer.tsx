import { site, footer, mailtoHref } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
            <span className="text-[0.72rem] tracking-[0.24em] text-ink uppercase">
              {site.name}
            </span>
            <span className="text-[0.85rem] text-muted">{footer.line}</span>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="link-draw inline-block py-1.5 text-[0.78rem] tracking-[0.14em] text-muted uppercase hover:text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[0.72rem] tracking-[0.14em] text-muted uppercase">
            © {year} {site.name}
          </p>
          <a
            href={mailtoHref}
            className="-my-1 inline-block py-1 text-[0.72rem] tracking-[0.14em] text-muted uppercase hover:text-accent"
          >
            {site.email}
          </a>
          {/* one accent detail — the mark */}
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-1.5 bg-accent" />
            <span className="h-1.5 w-1.5 bg-line" />
            <span className="h-1.5 w-1.5 bg-line" />
          </span>
        </div>
      </div>
    </footer>
  );
}
