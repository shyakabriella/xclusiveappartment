"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type HeroProps = {
  images: string[];
};

const SLIDE_DURATION = 7000;

export default function Hero({ images }: HeroProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);

  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (!total) return;
      setActive((index + total) % total);
    },
    [total]
  );

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setMotionReduced(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (total < 2 || paused || motionReduced) return;

    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % total);
    }, SLIDE_DURATION);

    return () => window.clearTimeout(timer);
  }, [active, total, paused, motionReduced]);

  return (
    <section
      aria-label="Welcome to Xclusive Apartment"
      className="relative isolate flex min-h-[680px] h-[100svh] items-center justify-center overflow-hidden bg-[#14211e] text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Full screen apartment slideshow */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {images.map((image, index) => (
          <div
            key={image}
            aria-hidden="true"
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms] ease-in-out ${
              active === index
                ? "z-10 opacity-100"
                : "z-0 opacity-0"
            } ${
              active === index && !motionReduced
                ? "hero-zoom"
                : ""
            }`}
            style={{
              backgroundImage: `url("${image}")`,
              backgroundPosition: "center center",
            }}
          />
        ))}
      </div>

      {/* Cinematic overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/35" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/10 to-black/65" />

      {/* Main welcome content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-36 text-center sm:px-8 lg:pt-40">
        <div key={active} className="hero-content-enter">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#f3d69f] sm:mb-7 sm:text-xs md:text-sm">
            A BEAUTIFUL PLACE TO STAY
          </p>

          <h1 className="mx-auto max-w-6xl font-serif text-[clamp(2.6rem,5.5vw,5.8rem)] font-medium uppercase leading-[1.12] tracking-[0.02em] text-white drop-shadow-lg">
            Welcome to
            <span className="mt-3 block">
              Xclusive Apartment
            </span>
          </h1>

          <div className="mx-auto my-7 h-px w-24 bg-[#e9cc94] sm:my-9" />

          <p className="mx-auto max-w-2xl text-sm leading-7 text-white/95 drop-shadow-md sm:text-lg sm:leading-9">
            Experience elegance, comfort and unforgettable
            moments in a place designed to feel like home.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:mt-11 sm:flex-row">
            <Link
              href="/apartments"
              className="inline-flex min-h-14 w-full items-center justify-center border border-[#dabb88] bg-[#dabb88] px-9 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#172b28] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl sm:w-auto"
            >
              Explore Apartments
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-14 w-full items-center justify-center border border-white/85 bg-white/5 px-9 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#172b28] sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Previous / next controls */}
      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous apartment photo"
            onClick={() => goTo(active - 1)}
            className="absolute bottom-24 left-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#173b36] sm:bottom-auto sm:left-8 sm:top-1/2 lg:left-12"
          >
            <span aria-hidden="true" className="text-2xl">
              ‹
            </span>
          </button>

          <button
            type="button"
            aria-label="Next apartment photo"
            onClick={() => goTo(active + 1)}
            className="absolute bottom-24 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white hover:text-[#173b36] sm:bottom-auto sm:right-8 sm:top-1/2 lg:right-12"
          >
            <span aria-hidden="true" className="text-2xl">
              ›
            </span>
          </button>
        </>
      )}

      {/* Slideshow progress */}
      {total > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex w-[min(85%,380px)] -translate-x-1/2 items-center gap-5">
          <span className="text-xs font-semibold tracking-widest text-white">
            {String(active + 1).padStart(2, "0")}
          </span>

          <div className="h-[2px] flex-1 overflow-hidden bg-white/40">
            <div
              key={active}
              className={`h-full bg-[#e9cc94] ${
                paused || motionReduced
                  ? "w-full"
                  : "hero-progress"
              }`}
            />
          </div>

          <span className="text-xs font-semibold tracking-widest text-white/75">
            {String(total).padStart(2, "0")}
          </span>
        </div>
      )}

      <style jsx>{`
        .hero-zoom {
          animation: cinematicZoom 8s ease-out both;
        }

        .hero-content-enter {
          animation: contentReveal 1.15s ease-out both;
        }

        .hero-progress {
          transform-origin: left;
          animation: progress ${SLIDE_DURATION}ms linear forwards;
        }

        @keyframes cinematicZoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.085);
          }
        }

        @keyframes contentReveal {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-zoom,
          .hero-content-enter,
          .hero-progress {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
