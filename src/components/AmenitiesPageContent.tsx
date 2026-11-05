"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  images: string[];
};

const amenities = [
  {
    label: "REST & RELAXATION",
    title: "Comfortable Bedrooms",
    description:
      "Discover the welcoming bedroom spaces at " +
      "Xclusive Apartment. Our accommodation is designed " +
      "to offer a comfortable atmosphere where you can " +
      "unwind after a busy day.",
    imageIndex: 2,
  },
  {
    label: "SPACE TO FEEL AT HOME",
    title: "Elegant Living Spaces",
    description:
      "Explore the inviting interiors of Xclusive Apartment. " +
      "Our living spaces bring together comfort, style, " +
      "and a relaxing environment for your stay.",
    imageIndex: 5,
  },
  {
    label: "ENJOY YOUR SURROUNDINGS",
    title: "Apartment Environment",
    description:
      "Take a closer look at the property and its surroundings. " +
      "Our aim is to provide a welcoming place for guests " +
      "to enjoy their time away from home.",
    imageIndex: 9,
  },
  {
    label: "COMFORT & CONVENIENCE",
    title: "Guest Experience",
    description:
      "At Xclusive Apartment, we value a comfortable " +
      "and memorable stay. Contact us to learn about " +
      "available amenities, guest services, and " +
      "arrangements before your visit.",
    imageIndex: 13,
  },
];

export default function AmenitiesPageContent({
  images,
}: Props) {
  useEffect(() => {
    const elements = document.querySelectorAll(
      "[data-amenity-reveal]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("amenity-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="overflow-hidden bg-white">

      {/* PAGE BANNER */}
      <section className="relative isolate flex h-[430px] items-center justify-center overflow-hidden bg-[#183b34] text-center text-white sm:h-[500px] lg:h-[540px]">
        {images[0] && (
          <Image
            src={images[0]}
            alt="Xclusive Apartment property"
            fill
            priority
            sizes="100vw"
            className="amenity-banner -z-20 object-cover"
          />
        )}

        <div className="absolute inset-0 -z-10 bg-black/45" />

        <div className="amenity-hero-text relative z-10 px-5 pt-24">
          <h1 className="font-serif text-[clamp(3rem,5vw,5.2rem)] font-normal">
            Our Amenities
          </h1>

          <nav aria-label="Breadcrumb" className="mt-6">
            <ol className="flex items-center justify-center gap-3 text-base sm:text-lg">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#e6c997]"
                >
                  Home
                </Link>
              </li>

              <li aria-hidden="true">
                <ChevronRight size={19} />
              </li>

              <li aria-current="page">Amenities</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        data-amenity-reveal
        className="amenity-reveal mx-auto grid max-w-[1540px] grid-cols-1 gap-8 px-6 pb-12 pt-24 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:pt-28"
      >
        <h2 className="font-serif text-[clamp(2.8rem,4.5vw,4.7rem)] leading-[1.15] text-[#102232]">
          Our Apartment Amenities
        </h2>

        <p className="text-[16px] leading-[1.9] text-[#68717b] sm:text-[18px]">
          Experience the welcoming atmosphere of Xclusive
          Apartment, where comfortable spaces and thoughtful
          design come together. Explore our accommodation
          and contact us to confirm available facilities
          for your stay.
        </p>
      </section>

      {/* AMENITY DETAILS */}
      <section className="mx-auto max-w-[1540px] px-6 pb-24 sm:px-10 lg:px-16 lg:pb-32">
        {amenities.map((amenity) => {
          const image =
            images.length > 0
              ? images[amenity.imageIndex % images.length]
              : undefined;

          return (
            <article
              key={amenity.title}
              data-amenity-reveal
              className="amenity-reveal grid grid-cols-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-20 lg:py-20"
            >
              <div>
                <p className="mb-7 text-xs font-medium uppercase tracking-[0.26em] text-[#008f87] sm:text-base">
                  {amenity.label}
                </p>

                <h2 className="font-serif text-[clamp(2.8rem,4.3vw,4.6rem)] leading-[1.15] text-[#102232]">
                  {amenity.title}
                </h2>

                <p className="mt-7 max-w-[700px] text-[16px] leading-[1.9] text-[#68717b] sm:text-[18px]">
                  {amenity.description}
                </p>
              </div>

              {image && (
                <div className="group relative aspect-[1.45/1] overflow-hidden bg-[#e9eeee]">
                  <Image
                    src={image}
                    alt={`${amenity.title} at Xclusive Apartment`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover transition-transform duration-[1100ms] ease-out motion-safe:group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-5 border border-white/0 transition-colors duration-500 group-hover:border-white/70" />
                </div>
              )}
            </article>
          );
        })}
      </section>

      <style jsx global>{`
        .amenity-reveal {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity 900ms ease,
            transform 900ms ease;
        }

        .amenity-reveal.amenity-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .amenity-banner {
          animation: amenityZoom 13s ease-out both;
        }

        .amenity-hero-text {
          animation: amenityEnter 1s ease-out both;
        }

        @keyframes amenityZoom {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }

        @keyframes amenityEnter {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .amenity-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .amenity-banner,
          .amenity-hero-text {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
