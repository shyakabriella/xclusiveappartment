"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ExperienceSectionProps = {
  images: string[];
};

export default function ExperienceSection({
  images,
}: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const selectedImages = [
    images[3],
    images[9],
    images[12],
  ].filter((image): image is string => Boolean(image));

  if (selectedImages.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="overflow-hidden bg-white pt-20 pb-24 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32"
    >
      {/* Heading */}
      <div
        className={`mx-auto mb-14 max-w-[1500px] px-5 text-center transition-all duration-1000 sm:mb-16 sm:px-8 ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <p className="mb-7 text-xs font-medium uppercase tracking-[0.3em] text-[#008f87] sm:text-base">
          RELAXATION & COMFORT
        </p>

        <h2
          id="experience-heading"
          className="font-serif text-[clamp(2.4rem,4.2vw,4.5rem)] font-normal leading-[1.2] tracking-[-0.025em] text-[#102232]"
        >
          Xclusive Apartment Awaits Your Arrival!
        </h2>
      </div>

      {/* Three large photographs */}
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-5 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:gap-8 lg:px-8">
        {selectedImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className={`group relative aspect-[1.5/1] overflow-hidden bg-[#e5e5e5] transition-all duration-1000 ease-out sm:aspect-[1.25/1] lg:aspect-[1.5/1] ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            style={{
              transitionDelay: visible
                ? `${index * 170}ms`
                : "0ms",
            }}
          >
            <Image
              src={image}
              alt={`Experience Xclusive Apartment - photograph ${index + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
            />

            {/* Subtle hover overlay */}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

            {/* Decorative gold frame */}
            <div className="pointer-events-none absolute inset-5 border border-white/0 transition-all duration-500 group-hover:border-white/65" />
          </div>
        ))}
      </div>
    </section>
  );
}
