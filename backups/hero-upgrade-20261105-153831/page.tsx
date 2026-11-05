import Hero from "@/components/Hero";
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
      /\.(jpg|jpeg|png|webp|avif)$/i.test(file)
    )
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
      })
    )
    .map((file) => `/images/${encodeURIComponent(file)}`);

  return (
    <main>
      <Hero images={images} />
    </main>
  );
}
