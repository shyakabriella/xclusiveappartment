"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type BookingBannerProps = {
  images: string[];
};

export default function BookingBanner({
  images,
}: BookingBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (images.length === 0) return null;

  // Select an existing apartment photograph.
  const backgroundImage = images[8] || images[0];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="booking-banner-heading"
      className="bg-white px-4 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="relative isolate mx-auto flex min-h-[480px] max-w-[1680px] items-center justify-center overflow-hidden bg-[#182c28] px-6 py-20 text-center text-white sm:min-h-[570px] lg:min-h-[680px]">

        {/* Background apartment photograph */}
        <Image
          src={backgroundImage}
          alt="Xclusive Apartment property"
          fill
          sizes="(max-width: 768px) 100vw, 95vw"
          className="absolute -z-20 object-cover transition-transform duration-[2000ms] ease-out motion-safe:hover:scale-105"
        />

        {/* Dark overlay */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-black/45" />

        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

        {/* Booking content */}
        <div
          className={`relative z-10 mx-auto max-w-[850px] transition-all duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.3em] text-white sm:text-base">
            BOOK NOW!
          </p>

          <h2
            id="booking-banner-heading"
            className="font-serif text-[clamp(2.5rem,4.2vw,4.8rem)] font-normal leading-[1.2] tracking-[0.01em] text-white drop-shadow-md"
          >
            Welcome To Xclusive Apartment.
            <span className="mt-2 block">
              Book Your Stay Today.
            </span>
          </h2>

          <Link
            href="/apartments"
            className="mt-11 inline-flex min-h-14 items-center justify-center bg-[#008f87] px-9 text-xs font-semibold uppercase tracking-[0.24em] text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#006d68] hover:shadow-xl sm:px-12"
          >
            BOOK YOUR APARTMENT
          </Link>
        </div>
      </div>
    </section>
  );
}
