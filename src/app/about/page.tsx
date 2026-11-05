import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About Us | Xclusive Apartment",
  description:
    "Discover Xclusive Apartment, our welcoming accommodation, " +
    "comfortable living spaces, and commitment to memorable stays.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
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
    .map((file) => `/images/${encodeURIComponent(file)}`);

  return <AboutPageContent images={images} />;
}
