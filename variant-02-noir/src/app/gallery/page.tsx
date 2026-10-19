import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";
import { PageHero, CtaBand, Eyebrow } from "@/components/ui";
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
        image="/images/hero-hammam.jpg"
        imageAlt="The marble hammam at Aurelia"
      />

      <section className="shell pb-16 pt-14 md:pb-28 md:pt-24">
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-5 border-b border-line pb-8">
            <span className="numeral text-sm text-brass">01</span>
            <Eyebrow>
              {String(galleryImages.length).padStart(2, "0")} plates · click any frame to enlarge
            </Eyebrow>
          </div>
        </Reveal>

        <div className="mt-16">
          <Reveal delay={100}>
            <GalleryGrid images={galleryImages} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Come in person"
        title="Pictures only get you so far."
        body="The tour takes forty minutes and ends in the rest gallery with a cup of something hot. No charge, no obligation, no sales presentation at the end of it."
        image="/images/ceiling-curve.jpg"
        imageAlt="Circulation, main atrium"
      />
    </>
  );
}