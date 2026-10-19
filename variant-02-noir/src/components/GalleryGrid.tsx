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
      <div className="columns-2 gap-3 sm:gap-5 lg:columns-3 [&>*]:mb-12 [&>*]:break-inside-avoid">
        {images.map((img, i) => (
          <figure key={img.src + i}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full cursor-zoom-in text-left"
              aria-label={`Open: ${img.caption}`}
            >
              <span className="relative block w-full overflow-hidden bg-surface">
                <Image
                  src={img.src}
                  alt={img.caption}
                  width={1200}
                  height={1500}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                  className="img-cine h-auto w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/55 via-transparent to-transparent opacity-0 transition-opacity duration-[1200ms] group-hover:opacity-100"
                />
              </span>
              <span className="mt-5 flex items-baseline gap-4 border-t border-line pt-4">
                <span className="numeral text-[0.625rem] text-brass-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="eyebrow-quiet transition-colors duration-700 group-hover:text-brass">
                  {img.caption}
                </span>
              </span>
            </button>
          </figure>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[60] flex flex-col bg-noir/97 backdrop-blur-md"
          onClick={close}
        >
          <div className="flex items-center justify-between px-6 py-6 text-chalk md:px-10">
            <p className="numeral text-[0.6875rem] text-brass">
              {String((index ?? 0) + 1).padStart(2, "0")}
              <span className="mx-2 text-brass-dim">/</span>
              <span className="text-muted">{String(images.length).padStart(2, "0")}</span>
            </p>
            <button
              type="button"
              onClick={close}
              className="text-[0.6875rem] tracking-[0.24em] uppercase text-muted transition-colors duration-700 hover:text-brass"
              autoFocus
            >
              Close ✕
            </button>
          </div>

          <div
            className="relative flex-1 px-4 pb-4 md:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
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
            className="flex items-center justify-between gap-6 border-t border-line px-6 py-6 text-chalk md:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-muted">{current.caption}</p>
            <div className="flex">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="flex h-11 w-11 items-center justify-center border border-line text-muted transition-all duration-700 hover:border-brass hover:text-brass"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="-ml-px flex h-11 w-11 items-center justify-center border border-line text-muted transition-all duration-700 hover:border-brass hover:text-brass"
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