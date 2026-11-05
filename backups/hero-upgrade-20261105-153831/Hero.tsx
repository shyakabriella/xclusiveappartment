"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type HeroProps = {
  images: string[];
};

export default function Hero({ images }: HeroProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const timer = window.setInterval(() => {
      setActive((previous) => (previous + 1) % images.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <section
      aria-label="Welcome to Xclusive Apartment"
      className="relative flex min-h-[760px] items-center justify-center overflow-hidden bg-[#14221f] pt-28 text-white sm:min-h-screen"
    >
      {/* Apartment background slideshow */}
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1800ms] ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url("${encodeURI(image)}")`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* Welcome content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-24 text-center sm:px-8">
        <div className="animate-[fadeInUp_1s_ease-out_both]">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#e7d1a7] sm:text-sm">
            Discover Comfort & Elegance
          </p>

          <h1 className="font-serif text-5xl font-medium leading-[1.12] tracking-wide sm:text-6xl md:text-7xl lg:text-[82px]">
            WELCOME TO
            <span className="mt-3 block">
              XCLUSIVE APARTMENT
            </span>
          </h1>

          <div className="mx-auto my-8 h-[2px] w-20 bg-[#e5c694]" />

          <p className="mx-auto max-w-2xl text-base leading-8 text-white/90 sm:text-lg md:text-xl">
            Experience comfortable living, elegant spaces,
            and memorable stays in an exclusive apartment
            designed for relaxation.
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/apartments"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-sm border border-[#d4b582] bg-[#d4b582] px-9 text-xs font-semibold tracking-[0.2em] text-[#172a27] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl sm:w-auto"
            >
              EXPLORE APARTMENTS
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-14 w-full items-center justify-center rounded-sm border border-white px-9 text-xs font-semibold tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#172a27] sm:w-auto"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>

      {/* Slideshow indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show apartment photo ${index + 1}`}
              aria-current={index === active ? "true" : undefined}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === index
                  ? "w-9 bg-[#d4b582]"
                  : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          section :global(*) {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
