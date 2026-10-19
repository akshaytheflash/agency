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
      <div className="columns-2 gap-3 sm:gap-5 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
        {images.map((img, i) => (
          <figure key={img.src + i}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group block w-full cursor-zoom-in"
              aria-label={`Open: ${img.caption}`}
            >
              <span className="relative block w-full overflow-hidden bg-line">
                <Image
                  src={img.src}
                  alt={img.caption}
                  width={1200}
                  height={1500}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                  className="img-editorial h-auto w-full object-cover group-hover:scale-[1.03]"
                />
              </span>
              <span className="eyebrow mt-3 block text-left">{img.caption}</span>
            </button>
          </figure>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[60] flex flex-col bg-ink/96 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between px-6 py-5 text-bone md:px-10">
            <p className="eyebrow text-bone/50">
              {String((index ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={close}
              className="text-[0.6875rem] tracking-[0.22em] uppercase transition-colors hover:text-bone/60"
              autoFocus
            >
              Close ✕
            </button>
          </div>

          <div
            className="relative flex-1 px-6 pb-4 md:px-10"
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
            className="flex items-center justify-between gap-6 px-6 py-5 text-bone md:px-10"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-bone/70">{current.caption}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="flex h-11 w-11 items-center justify-center border border-bone/25 transition-colors hover:border-bone"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next image"
                className="flex h-11 w-11 items-center justify-center border border-bone/25 transition-colors hover:border-bone"
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