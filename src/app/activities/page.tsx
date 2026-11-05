import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import ActivitiesPageContent from "@/components/ActivitiesPageContent";

export const metadata: Metadata = {
  title: "Activities & Experiences | Xclusive Apartment",
  description:
    "Discover Xclusive Apartment and explore ideas for " +
    "relaxation, sightseeing, and local experiences. " +
    "Contact our team for more information.",
};

export default function ActivitiesPage() {
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
    .map((file) =>
      `/images/${encodeURIComponent(file)}`
    );

  return (
    <ActivitiesPageContent images={images} />
  );
}
