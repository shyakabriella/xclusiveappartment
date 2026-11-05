"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft, ArrowUpRight } from "lucide-react";

type Props = {
  images: string[];
};

const experiences = [
  {
    title: "Dining Spaces",
    description:
      "Explore the inviting spaces at Xclusive Apartment. " +
      "Contact our team to learn about the dining arrangements " +
      "and options available during your stay.",
    second:
      "We can help you find out what food and dining " +
      "facilities are available before you arrive.",
    imageIndex: 3,
  },
  {
    title: "Relaxing Moments",
    description:
      "Enjoy the welcoming surroundings of Xclusive Apartment, " +
      "with spaces designed for comfort and relaxation.",
    second:
      "Our team can provide more information about available " +
      "shared spaces and guest facilities.",
    imageIndex: 7,
  },
  {
    title: "Food & Refreshments",
    description:
      "Planning your meals is an important part of a " +
      "comfortable stay. Please contact us to confirm " +
      "the current food and refreshment options.",
    second:
      "Available services and arrangements can be confirmed " +
      "directly with the property.",
    imageIndex: 10,
  },
  {
    title: "Enjoy Your Stay",
    description:
      "Discover the atmosphere and surroundings of " +
      "Xclusive Apartment and make the most of your visit.",
    second:
      "Whether you are visiting for business or leisure, " +
      "we want your time with us to be enjoyable.",
    imageIndex: 14,
  },
];

function PhotoGallery({
  photos,
  title,
}: {
  photos: string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);

  if (!photos.length) return null;

  return (
    <div className="group relative aspect-[1.45/1] w-full overflow-hidden bg-[#e8e8e8]">
      {photos.map((photo, index) => (
        <Image
          key={photo}
          src={photo}
          alt={`${title} at Xclusive Apartment — photo ${index + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 48vw"
          className={`object-cover transition-[opacity,transform] duration-1000 ${
            current === index
              ? "opacity-100 group-hover:scale-105"
              : "pointer-events-none opacity-0"
          }`}
        />
      ))}

      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label={`Previous ${title} photograph`}
            onClick={() =>
              setCurrent((value) =>
                (value - 1 + photos.length) % photos.length
              )
            }
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-[#008f87] focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronLeft aria-hidden="true" size={24} />
          </button>

          <button
            type="button"
            aria-label={`Next ${title} photograph`}
            onClick={() =>
              setCurrent((value) => (value + 1) % photos.length)
            }
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition hover:bg-[#008f87] focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronRight aria-hidden="true" size={24} />
          </button>

          <div className="absolute bottom-4 right-5 rounded bg-black/45 px-3 py-1 text-xs tracking-widest text-white">
            {current + 1} / {photos.length}
          </div>
        </>
      )}
    </div>
  );
}

export default function DiningPageContent({ images }: Props) {
  useEffect(() => {
    const elements = document.querySelectorAll(
      "[data-dining-reveal]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("dining-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="overflow-hidden bg-white">

      {/* PAGE HERO */}
      <section className="relative isolate flex h-[430px] items-center justify-center overflow-hidden bg-[#173932] text-center text-white sm:h-[500px] lg:h-[540px]">
        {images[4] && (
          <Image
            src={images[4]}
            alt="Xclusive Apartment welcome"
            fill
            priority
            sizes="100vw"
            className="dining-hero-image -z-20 object-cover"
          />
        )}

        <div className="absolute inset-0 -z-10 bg-black/45" />

        <div className="dining-hero-title relative z-10 px-5 pt-24">
          <h1 className="font-serif text-[clamp(2.8rem,5vw,5rem)] leading-tight">
            Our Dining Experience
          </h1>

          <nav aria-label="Breadcrumb" className="mt-6">
            <ol className="flex items-center justify-center gap-3 text-base sm:text-lg">
              <li>
                <Link href="/" className="hover:text-[#e9cb98]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={19} />
              </li>
              <li aria-current="page">Dining</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        data-dining-reveal
        className="dining-reveal mx-auto grid max-w-[1540px] grid-cols-1 items-center gap-10 px-6 pb-12 pt-24 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:pt-28"
      >
        <div>
          <p className="mb-5 text-sm uppercase tracking-[0.26em] text-[#008f87]">
            COMFORT & HOSPITALITY
          </p>

          <h2 className="font-serif text-[clamp(2.7rem,4.4vw,4.6rem)] leading-[1.15] text-[#102232]">
            A Comfortable Stay, Your Way
          </h2>

          <p className="mt-7 max-w-2xl text-[16px] leading-[1.9] text-[#68717b] sm:text-[18px]">
            At Xclusive Apartment, we want every part of your
            stay to be relaxing and convenient. Contact us
            for details about dining facilities, available
            meal arrangements, and nearby options.
          </p>
        </div>

        <div className="flex lg:justify-center">
          <Link
            href="/contact"
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-md border-2 border-[#008f87] px-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#008f87] transition-all duration-300 hover:bg-[#008f87] hover:text-white"
          >
            VIEW MENU / ENQUIRE
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* EXPERIENCE SECTIONS */}
      <section className="mx-auto max-w-[1540px] px-6 pb-24 sm:px-10 lg:px-16 lg:pb-32">
        {experiences.map((item, index) => {
          const first = images[item.imageIndex % images.length];
          const second =
            images[(item.imageIndex + 1) % images.length];

          const photos = Array.from(
            new Set([first, second].filter(Boolean))
          );

          return (
            <article
              key={item.title}
              data-dining-reveal
              className="dining-reveal grid grid-cols-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-20 lg:py-20"
            >
              <div>
                <h2 className="font-serif text-[clamp(2.7rem,4.3vw,4.6rem)] font-normal leading-[1.15] text-[#102232]">
                  {item.title}
                </h2>

                <div className="mt-7 space-y-5 text-[16px] leading-[1.9] text-[#68717b] sm:text-[18px]">
                  <p>{item.description}</p>
                  <p>{item.second}</p>
                </div>
              </div>

              <PhotoGallery
                photos={photos}
                title={item.title}
              />
            </article>
          );
        })}
      </section>

      <style jsx global>{`
        .dining-reveal {
          opacity: 0;
          transform: translateY(38px);
          transition:
            opacity 900ms ease,
            transform 900ms ease;
        }

        .dining-reveal.dining-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .dining-hero-image {
          animation: diningZoom 13s ease-out both;
        }

        .dining-hero-title {
          animation: diningEntrance 1s ease-out both;
        }

        @keyframes diningZoom {
          from { transform: scale(1); }
          to { transform: scale(1.065); }
        }

        @keyframes diningEntrance {
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
          .dining-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .dining-hero-image,
          .dining-hero-title {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
