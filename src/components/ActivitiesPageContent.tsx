"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
} from "lucide-react";

type Props = {
  images: string[];
};

const activities = [
  {
    label: "DISCOVER YOUR SURROUNDINGS",
    title: "Explore The Area",
    description:
      "Make the most of your stay at Xclusive Apartment " +
      "by discovering the surrounding area. Whether you " +
      "enjoy sightseeing, local culture, or simply exploring " +
      "new places, there is always something to discover.",
    second:
      "Contact our team for more information about " +
      "the location and places you may wish to visit.",
    imageIndex: 3,
  },
  {
    label: "RELAX, REFRESH & ENJOY YOUR STAY",
    title: "Relaxation & Leisure",
    description:
      "Take time to unwind and enjoy a change of scenery. " +
      "Xclusive Apartment offers a welcoming setting " +
      "for guests looking for a comfortable place " +
      "to relax during their visit.",
    second:
      "Ask us about available leisure facilities " +
      "and activities in the surrounding area.",
    imageIndex: 7,
  },
  {
    label: "CONNECT, EXPLORE & EXPERIENCE",
    title: "Local Experiences",
    description:
      "Discover what makes your destination special. " +
      "Explore local experiences, places of interest, " +
      "and opportunities to enjoy your time away.",
    second:
      "Our team can help you find information about " +
      "nearby attractions and possible experiences.",
    imageIndex: 10,
  },
  {
    label: "MAKE EVERY MOMENT MEMORABLE",
    title: "Excursions & Adventures",
    description:
      "For guests who enjoy discovering new places, " +
      "excursions and sightseeing can be a wonderful " +
      "part of a memorable stay.",
    second:
      "Please contact us for information about local " +
      "attractions and any available recommendations.",
    imageIndex: 13,
  },
];

function ActivityGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  const next = () => {
    setActive((index) => (index + 1) % images.length);
  };

  const previous = () => {
    setActive(
      (index) => (index - 1 + images.length) % images.length
    );
  };

  return (
    <div className="group relative aspect-[1.45/1] w-full overflow-hidden bg-[#e9eeee]">
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={`${title} — Xclusive Apartment photograph ${index + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 48vw"
          className={`object-cover transition-[opacity,transform] duration-1000 ease-out ${
            active === index
              ? "opacity-100 motion-safe:group-hover:scale-105"
              : "pointer-events-none opacity-0"
          }`}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label={`Previous ${title} photograph`}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-all duration-300 hover:bg-[#008f87] focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronLeft size={25} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label={`Next ${title} photograph`}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-all duration-300 hover:bg-[#008f87] focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronRight size={25} aria-hidden="true" />
          </button>

          <span className="absolute bottom-4 right-5 rounded bg-black/40 px-3 py-1 text-xs tracking-widest text-white">
            {String(active + 1).padStart(2, "0")}
            {" / "}
            {String(images.length).padStart(2, "0")}
          </span>
        </>
      )}
    </div>
  );
}

export default function ActivitiesPageContent({
  images,
}: Props) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-activity-reveal]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("activity-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <main className="overflow-hidden bg-white">

      {/* HERO BANNER */}
      <section
        aria-labelledby="activities-title"
        className="relative isolate flex h-[430px] items-center justify-center overflow-hidden bg-[#163b35] text-center text-white sm:h-[500px] lg:h-[540px]"
      >
        {images[0] && (
          <Image
            src={images[0]}
            alt="Xclusive Apartment property and surroundings"
            fill
            priority
            sizes="100vw"
            className="activity-banner -z-20 object-cover"
          />
        )}

        <div className="absolute inset-0 -z-10 bg-black/40" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-transparent to-black/20" />

        <div className="activity-hero-content relative z-10 px-5 pt-24">
          <h1
            id="activities-title"
            className="font-serif text-[clamp(3.1rem,5vw,5.2rem)] font-normal leading-tight drop-shadow-md"
          >
            Activities
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="mt-6"
          >
            <ol className="flex items-center justify-center gap-3 text-base sm:text-lg">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#e9cb98]"
                >
                  Home
                </Link>
              </li>

              <li aria-hidden="true">
                <ChevronRight size={20} />
              </li>

              <li aria-current="page">
                Activities
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* ACTIVITIES CONTENT */}
      <section className="mx-auto max-w-[1540px] px-6 py-16 sm:px-10 sm:py-20 lg:px-16 lg:py-24">

        {activities.map((activity) => {
          const photo1 =
            images.length > 0
              ? images[activity.imageIndex % images.length]
              : undefined;

          const photo2 =
            images.length > 1
              ? images[
                  (activity.imageIndex + 1) % images.length
                ]
              : undefined;

          const photos = Array.from(
            new Set(
              [photo1, photo2].filter(
                (photo): photo is string => Boolean(photo)
              )
            )
          );

          return (
            <article
              key={activity.title}
              data-activity-reveal
              className="activity-reveal grid grid-cols-1 items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-20 lg:py-20"
            >
              {/* LEFT TEXT */}
              <div>
                <p className="mb-7 max-w-[650px] text-[12px] font-medium uppercase leading-relaxed tracking-[0.26em] text-[#008f87] sm:text-base">
                  {activity.label}
                </p>

                <h2 className="font-serif text-[clamp(2.7rem,4.3vw,4.6rem)] font-normal leading-[1.15] tracking-[-0.025em] text-[#102232]">
                  {activity.title}
                </h2>

                <div className="mt-7 max-w-[700px] space-y-5 text-[16px] leading-[1.9] text-[#68717b] sm:text-[18px]">
                  <p>{activity.description}</p>
                  <p>{activity.second}</p>
                </div>

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#008f87] transition-all duration-300 hover:gap-5"
                >
                  Ask For More Information
                  <ArrowUpRight
                    size={19}
                    aria-hidden="true"
                  />
                </Link>
              </div>

              {/* RIGHT IMAGE SLIDER */}
              <ActivityGallery
                images={photos}
                title={activity.title}
              />
            </article>
          );
        })}
      </section>

      <style jsx global>{`
        .activity-reveal {
          opacity: 0;
          transform: translateY(36px);
          transition:
            opacity 900ms ease,
            transform 900ms ease;
        }

        .activity-reveal.activity-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .activity-banner {
          animation: activityZoom 13s ease-out both;
        }

        .activity-hero-content {
          animation: activityEntrance 1s ease-out both;
        }

        @keyframes activityZoom {
          from { transform: scale(1); }
          to { transform: scale(1.065); }
        }

        @keyframes activityEntrance {
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
          .activity-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .activity-banner,
          .activity-hero-content {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
