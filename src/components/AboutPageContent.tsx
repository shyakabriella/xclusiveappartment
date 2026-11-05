"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type Props = {
  images: string[];
};

const values = [
  {
    title: "Our Hospitality",
    description:
      "We believe a memorable stay begins with a warm welcome, " +
      "thoughtful service, and attention to the details " +
      "that matter to our guests.",
    icon: HeartHandshake,
  },
  {
    title: "Our Commitment",
    description:
      "Our goal is to offer a comfortable and welcoming " +
      "environment where guests can relax, enjoy their " +
      "stay, and feel at home.",
    icon: ShieldCheck,
  },
  {
    title: "Our Experience",
    description:
      "We aim to create enjoyable stays through inviting " +
      "spaces, a relaxing atmosphere, and a focus on " +
      "guest satisfaction.",
    icon: Sparkles,
  },
];

export default function AboutPageContent({ images }: Props) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-about-reveal]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("about-visible");
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

  const banner = images[0];
  const primary = images[3] || images[0];
  const secondary = images[6] || images[0];

  return (
    <main className="overflow-hidden bg-white">

      {/* SECTION 1 — PAGE BANNER */}
      <section
        aria-labelledby="about-page-heading"
        className="relative isolate flex h-[430px] items-center justify-center overflow-hidden bg-[#153732] text-center text-white sm:h-[500px] lg:h-[540px]"
      >
        {banner && (
          <Image
            src={banner}
            alt="Xclusive Apartment property exterior"
            fill
            priority
            sizes="100vw"
            className="about-banner-zoom -z-20 object-cover"
          />
        )}

        <div className="absolute inset-0 -z-10 bg-black/40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-transparent to-black/20" />

        <div className="relative z-10 px-5 pt-24">
          <h1
            id="about-page-heading"
            className="about-banner-enter font-serif text-[clamp(3.2rem,5vw,5rem)] font-normal leading-tight"
          >
            About Us
          </h1>

          <nav
            aria-label="Breadcrumb"
            className="about-banner-enter mt-6"
          >
            <ol className="flex items-center justify-center gap-4 text-[15px] sm:text-lg">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#e7c795]"
                >
                  Home
                </Link>
              </li>

              <li aria-hidden="true">
                <ArrowRight size={18} />
              </li>

              <li aria-current="page">
                About Us
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* SECTION 2 — OUR STORY */}
      <section
        aria-labelledby="about-story-heading"
        className="bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div className="mx-auto grid max-w-[1550px] grid-cols-1 items-start gap-12 lg:grid-cols-[1.32fr_0.95fr] lg:gap-14 xl:gap-20">

          {/* LEFT CONTENT */}
          <div data-about-reveal className="about-reveal">
            <p className="mb-7 text-[13px] font-medium uppercase tracking-[0.3em] text-[#008f87] sm:text-base">
              ABOUT US
            </p>

            <h2
              id="about-story-heading"
              className="max-w-[780px] font-serif text-[clamp(2.8rem,4.4vw,4.7rem)] font-normal leading-[1.13] tracking-[-0.025em] text-[#102232]"
            >
              Enhance Your Experience
              <span className="block">With Us Now</span>
            </h2>

            <div className="mt-8 max-w-[800px] space-y-7 text-[15px] leading-[1.95] text-[#68717b] sm:text-[17px]">
              <p>
                Welcome to Xclusive Apartment, where
                elegance, comfort, and a welcoming
                atmosphere come together to make every
                stay special. Our apartments are designed
                to offer guests an inviting place to
                relax and enjoy their time away from home.
              </p>

              <p>
                Whether you are travelling for business,
                enjoying a holiday, or looking for a
                peaceful escape, we want your stay to
                be comfortable and memorable. Our approach
                combines beautiful living spaces with
                a focus on convenience, privacy, and
                thoughtful hospitality.
              </p>
            </div>

            {/* SECOND IMAGE + DESCRIPTION */}
            <div className="mt-12 grid grid-cols-1 items-center gap-7 sm:grid-cols-2 sm:gap-9 lg:mt-16">
              {secondary && (
                <div className="group relative aspect-[4/3] overflow-hidden bg-[#e9eeee]">
                  <Image
                    src={secondary}
                    alt="Comfortable living spaces at Xclusive Apartment"
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
              )}

              <div className="text-[15px] leading-[1.95] text-[#68717b] sm:text-[17px]">
                <p>
                  At Xclusive Apartment, our focus is
                  on creating a relaxing experience
                  where you can feel at home and
                  enjoy the beauty of your surroundings.
                </p>

                <Link
                  href="/apartments"
                  className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#008f87] transition-all hover:gap-4"
                >
                  Explore Our Apartments
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT TALL PHOTO */}
          <div
            data-about-reveal
            className="about-reveal group relative h-[470px] overflow-hidden bg-[#e9eeee] sm:h-[650px] lg:sticky lg:top-28 lg:h-[750px] xl:h-[830px]"
          >
            {primary && (
              <Image
                src={primary}
                alt="Xclusive Apartment accommodation and surroundings"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
            )}

            <div className="absolute inset-4 border border-white/0 transition-colors duration-500 group-hover:border-white/70" />
          </div>
        </div>
      </section>

      {/* SECTION 3 — OUR VALUES */}
      <section
        aria-labelledby="our-values-heading"
        className="bg-[#f5f5f5] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-[1550px]">

          <div
            data-about-reveal
            className="about-reveal mb-14 text-center sm:mb-16"
          >
            <p className="mb-6 text-[13px] font-medium uppercase tracking-[0.3em] text-[#008f87] sm:text-base">
              OUR STORY
            </p>

            <h2
              id="our-values-heading"
              className="font-serif text-[clamp(2.7rem,4.3vw,4.6rem)] font-normal leading-[1.17] text-[#102232]"
            >
              The Values Behind Our Hospitality
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-3 lg:gap-9">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  data-about-reveal
                  className="about-reveal group flex min-h-[360px] flex-col items-center bg-white px-8 py-12 text-center shadow-[0_12px_35px_rgba(0,0,0,0.035)] transition-[box-shadow,background-color] duration-500 hover:bg-[#fffefd] hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)] sm:px-10"
                  style={{
                    transitionDelay: `${index * 120}ms`,
                  }}
                >
                  <div className="mb-7 flex h-[105px] w-[105px] items-center justify-center rounded-full border border-[#d5d9de] text-[#008f87] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[#008f87] group-hover:bg-[#008f87] group-hover:text-white">
                    <Icon
                      size={41}
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mb-5 text-[23px] font-medium text-[#102232] sm:text-[25px]">
                    {value.title}
                  </h3>

                  <p className="max-w-[350px] text-[15px] leading-[1.9] text-[#69717b] sm:text-[17px]">
                    {value.description}
                  </p>

                  <div className="mt-auto pt-7">
                    <div className="mx-auto h-[2px] w-0 bg-[#008f87] transition-all duration-500 group-hover:w-16" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .about-reveal {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity 900ms ease,
            transform 900ms ease;
        }

        .about-reveal.about-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .about-banner-enter {
          animation: aboutFadeUp 1000ms ease-out both;
        }

        .about-banner-zoom {
          animation: aboutZoom 14s ease-out both;
        }

        @keyframes aboutFadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes aboutZoom {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .about-banner-enter,
          .about-banner-zoom {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
