import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us | Xclusive Apartment",
  description:
    "Contact Xclusive Apartment for reservation enquiries, " +
    "accommodation information, guest services, and directions.",
};

export default function ContactPage() {
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
    );

  const image = images[0]
    ? `/images/${encodeURIComponent(images[0])}`
    : undefined;

  return (
    <ContactPageContent
      image={image}
      email={process.env.NEXT_PUBLIC_CONTACT_EMAIL || ""}
      phone={process.env.NEXT_PUBLIC_CONTACT_PHONE || ""}
      address={process.env.NEXT_PUBLIC_CONTACT_ADDRESS || ""}
    />
  );
}
