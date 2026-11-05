import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import AmenitiesPageContent from "@/components/AmenitiesPageContent";

export const metadata: Metadata = {
  title: "Amenities & Facilities | Xclusive Apartment",
  description:
    "Explore the comfortable accommodation, living spaces, " +
    "and guest experience at Xclusive Apartment. " +
    "Contact us for details about available amenities.",
};

export default function AmenitiesPage() {
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
      a.localeCompare(b, undefined, { numeric: true })
    )
    .map((file) => `/images/${encodeURIComponent(file)}`);

  return <AmenitiesPageContent images={images} />;
}
