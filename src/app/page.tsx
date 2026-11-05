import TestimonialsSection from "@/components/TestimonialsSection";
import BookingBanner from "@/components/BookingBanner";
import AmenitiesSection from "@/components/AmenitiesSection";
import ExperienceSection from "@/components/ExperienceSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import AccommodationSection from "@/components/AccommodationSection";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import fs from "node:fs";
import path from "node:path";

export default function Home() {
  const imageDirectory = path.join(
    process.cwd(),
    "public",
    "images"
  );

  const images = fs
    .readdirSync(imageDirectory)
    .filter((file) =>
      /\.(jpe?g|png|webp|avif)$/i.test(file)
    )
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
      })
    )
    .map(
      (file) => `/images/${encodeURIComponent(file)}`
    );

  return (
    <main>
      <Hero images={images} />
      <AboutSection
        images={[
          images[1] || images[0],
          images[7] || images[0],
        ].filter((image): image is string => Boolean(image))}
      />
      <AccommodationSection images={images} />
      <FacilitiesSection />
      <ExperienceSection images={images} />
      <AmenitiesSection images={images} />
      <BookingBanner images={images} />
      <TestimonialsSection />
    </main>
  );
}
