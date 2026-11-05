"use client";

import { useEffect, useState } from "react";
import BookingBar from "./BookingBar";

type HeroProps = {
  images: string[];
};

export default function Hero({ images }: HeroProps) {
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (images.length < 2 || reduceMotion) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [images.length, reduceMotion]);

  return (
    <main className="bg-white">
      <section
        aria-label="Xclusive Apartment welcome"
        className="relative isolate h-[660px] overflow-hidden bg-[#172b28] text-white sm:h-[720px] lg:h-[min(84vh,800px)] lg:min-h-[660px]"
      >
        {/* Apartment photography */}
        <div className="absolute inset-0 -z-20">
          {images.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
                active === index
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
              }`}
              aria-hidden="true"
            >
              <div
                className={`absolute inset-0 bg-cover bg-center ${
                  active === index && !reduceMotion
                    ? "maji-zoom"
                    : ""
                }`}
                style={{
                  backgroundImage: `url("${src}")`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Light cinematic overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-black/35" />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-transparent to-black/20" />

        {/* Centered welcome like reference */}
        <div className="absolute inset-x-0 top-[39%] z-10 -translate-y-1/2 px-5 text-center sm:top-[43%]">
          <div className="maji-content mx-auto max-w-[1400px]">
            <h1 className="font-serif text-[clamp(2rem,4vw,4.1rem)] font-medium uppercase leading-[1.2] tracking-[0.01em] text-white drop-shadow-md">
              XCLUSIVE APARTMENT
            </h1>

            <p className="mt-5 font-serif text-xl font-normal text-white sm:mt-6 sm:text-3xl md:text-4xl">
              Your Home Away From Home
            </p>
          </div>
        </div>

        {/* Subtle slideshow progress */}
        {images.length > 1 && (
          <div className="absolute bottom-24 right-5 z-10 flex items-center gap-3 text-white sm:right-10">
            <span className="text-xs tracking-widest">
              {String(active + 1).padStart(2, "0")}
              {" / "}
              {String(images.length).padStart(2, "0")}
            </span>

            <div className="h-px w-14 bg-white/50">
              <div
                key={active}
                className={`h-px bg-white ${
                  reduceMotion
                    ? "w-full"
                    : "maji-progress"
                }`}
              />
            </div>
          </div>
        )}
      </section>

      {/* Booking bar overlapping bottom of hero */}
      <div className="relative z-20 mx-auto -mt-8 w-[94%] pb-16 sm:-mt-12 lg:-mt-14 lg:w-[90%]">
        <BookingBar />
      </div>

      <style jsx>{`
        .maji-zoom {
          animation: majiZoom 8s ease-out both;
        }

        .maji-content {
          animation: majiReveal 1.2s ease-out both;
        }

        .maji-progress {
          animation: majiProgress 6.5s linear forwards;
          transform-origin: left;
        }

        @keyframes majiZoom {
          from { transform: scale(1); }
          to { transform: scale(1.07); }
        }

        @keyframes majiReveal {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes majiProgress {
          from { width: 0%; }
          to { width: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .maji-zoom,
          .maji-content,
          .maji-progress {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
