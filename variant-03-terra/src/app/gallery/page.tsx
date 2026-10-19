import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";
import { PageHero, CtaBand, Chip } from "@/components/ui";
import { galleryImages } from "@/lib/site";

export const metadata = {
  title: "Gallery",
  description:
    "The marble hammam, the thermal pool, the east wing and the clinical kitchen — a walk through the Aurelia building.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="The building"
        title="Marble, cedar, and very little else."
        lede="A hillside property from 1904, stripped back to its structure in 2021 and rebuilt with almost nothing that could not be justified by how the space feels to stand in."
        image="/images/hammam-ambiance.jpg"
        imageAlt="The marble hammam at Aurelia, evening light"
      />

      <section className="py-16 pb-24 md:pb-32">
        <div className="shell">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-center gap-3 rounded-full border border-dashed border-line bg-paper/70 px-6 py-4">
              <Chip tone="sun">{galleryImages.length} photographs</Chip>
              <span className="text-[0.8125rem] text-muted">
                Click any frame to enlarge · <kbd className="rounded-full bg-terra-soft px-2 py-0.5 font-sans text-[0.6875rem] text-terra-deep">←</kbd>{" "}
                <kbd className="rounded-full bg-terra-soft px-2 py-0.5 font-sans text-[0.6875rem] text-terra-deep">→</kbd>{" "}
                to move ·{" "}
                <kbd className="rounded-full bg-terra-soft px-2 py-0.5 font-sans text-[0.6875rem] text-terra-deep">esc</kbd>{" "}
                to close
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <GalleryGrid images={galleryImages} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Come in person"
        title="Pictures only get you so far."
        body="The tour takes forty minutes and ends in the rest gallery with a cup of something hot. No charge, no obligation, no sales presentation at the end of it."
      />
    </>
  );
}
