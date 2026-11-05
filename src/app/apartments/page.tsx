import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import AccommodationPageContent from "@/components/AccommodationPageContent";

export const metadata: Metadata = {
  title: "Apartments & Accommodation | Xclusive Apartment",
  description:
    "Explore Xclusive Apartment accommodation through our " +
    "property photo gallery. Discover welcoming spaces and " +
    "enquire about your next stay.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ApartmentsPage() {
  const directory = path.join(
    process.cwd(),
    "public",
    "images"
  );

  const images = fs
    .readdirSync(directory)
    .filter((file) =>
      /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
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
    <AccommodationPageContent images={images} />
  );
}
