"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Shot = { src: string; caption: string };

export default function GalleryGrid({ images }: { images: Shot[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length]
  );

  useEffect(() => {
    if (index === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const current = index === null ? null : images[index];

  return (
    <>
      <div className="columns-2 gap-3 sm:gap-5 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
        {images.map((img, i) => {
          // Every third tile gets the arch top — the motif that carries the page.
          const arched = i % 3 === 0;
          return (
            <figure key={img.src + i}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group block w-full cursor-zoom-in"
                aria-label={`Open: ${img.caption}`}
              >
                <span
                  className={`relative block w-full overflow-hidden bg-line shadow-warm-xs transition-all duration-500 ease-[var(--ease-spring)] group-hover:shadow-warm ${
                    arched ? "arch" : "rounded-3xl"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    width={1200}
                    height={1500}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                    className="img-warm h-auto w-full object-cover group-hover:scale-[1.04]"
                  />
                </span>
                <span className="mt-4 flex items-center gap-3 text-left">
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-terra" />
                  <span className="text-[0.8125rem] leading-snug text-muted">{img.caption}</span>
                </span>
              </button>
            </figure>
          );
        })}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[60] flex flex-col bg-olive/95 backdrop-blur-md"
          onClick={close}
        >
          <div className="flex items-center justify-between px-5 py-4 text-cream md:px-8">
            <p className="eyebrow text-sun">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-cream/25 px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-sun hover:bg-sun hover:text-ink"
              autoFocus
            >
              Close ✕
            </button>
          </div>

          <div
            className="relative flex-1 px-4 pb-3 md:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-olive-light shadow-olive">
              <Image
                src={current.src}
                alt={current.caption}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
          </div>

          <div
            className="flex flex-wrap items-center justify-between gap-5 px-5 py-4 text-cream md:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="max-w-sm text-sm text-cream/75">{current.caption}</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 transition-all duration-400 ease-[var(--ease-spring)] hover:border-sun hover:bg-sun hover:text-ink"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 transition-all duration-400 ease-[var(--ease-spring)] hover:border-sun hover:bg-sun hover:text-ink"
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
