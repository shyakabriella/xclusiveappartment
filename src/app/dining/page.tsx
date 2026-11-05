import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import DiningPageContent from "@/components/DiningPageContent";

export const metadata: Metadata = {
  title: "Dining Experience | Xclusive Apartment",
  description:
    "Explore Xclusive Apartment's welcoming atmosphere " +
    "and enquire about dining arrangements and food options " +
    "for your stay.",
};

export default function DiningPage() {
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

  return <DiningPageContent images={images} />;
}
