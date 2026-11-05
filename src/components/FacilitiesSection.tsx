"use client";

import {
  Wifi,
  UtensilsCrossed,
  CarFront,
  WashingMachine,
  BedDouble,
  Snowflake,
  CookingPot,
  ShieldCheck,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const facilities = [
  {
    name: "High-Speed WiFi",
    icon: Wifi,
  },
  {
    name: "Dining Area",
    icon: UtensilsCrossed,
  },
  {
    name: "Parking Space",
    icon: CarFront,
  },
  {
    name: "Laundry",
    icon: WashingMachine,
  },
  {
    name: "Comfortable Bedrooms",
    icon: BedDouble,
  },
  {
    name: "Air Conditioning",
    icon: Snowflake,
  },
  {
    name: "Kitchen Facilities",
    icon: CookingPot,
  },
  {
    name: "Secure Environment",
    icon: ShieldCheck,
  },
];

export default function FacilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="facilities"
      aria-labelledby="facilities-heading"
      className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Heading and description */}
        <div className="mb-14 grid grid-cols-1 items-start gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-16">

          <div
            className={`transition-all duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="mb-7 text-[13px] font-medium uppercase tracking-[0.28em] text-[#008f87] sm:text-base">
              OUR FACILITIES
            </p>

            <h2
              id="facilities-heading"
              className="font-serif text-[clamp(2.8rem,4.5vw,4.7rem)] font-normal leading-[1.15] tracking-[-0.025em] text-[#102232]"
            >
              Our Apartment
              <span className="block">
                Facilities
              </span>
            </h2>
          </div>

          <div
            className={`transition-all delay-150 duration-1000 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <p className="max-w-[700px] text-[16px] leading-[1.85] text-[#69717b] sm:text-[18px]">
              Discover the comfort and convenience of
              Xclusive Apartment. Explore the facilities
              and thoughtful features designed to make
              your stay relaxing, enjoyable, and memorable.
            </p>
          </div>
        </div>

        {/* Facilities checkerboard */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;

            // Alternating pattern for desktop
            const desktopGrey =
              Math.floor(index / 4) % 2 === index % 2;

            return (
              <div
                key={facility.name}
                className={`group relative flex min-h-[185px] flex-col items-center justify-center overflow-hidden px-3 py-8 text-center transition-all duration-700 ease-out sm:min-h-[230px] lg:min-h-[250px] ${
                  desktopGrey
                    ? "md:bg-[#f5f5f5]"
                    : "md:bg-white"
                } ${
                  index % 4 === 0 || index % 4 === 3
                    ? "bg-white"
                    : "bg-[#f5f5f5]"
                } ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: visible
                    ? `${index * 70}ms`
                    : "0ms",
                }}
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-[#008f87] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon circle */}
                <div className="relative z-10 mb-6 flex h-[82px] w-[82px] items-center justify-center rounded-full border border-[#d3d7dd] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-white/70 sm:h-[105px] sm:w-[105px]">
                  <Icon
                    aria-hidden="true"
                    size={38}
                    strokeWidth={1.6}
                    className={`transition-colors duration-500 group-hover:text-white ${
                      index % 2 === 0
                        ? "text-[#102232]"
                        : "text-[#008f87]"
                    }`}
                  />
                </div>

                {/* Facility name */}
                <h3 className="relative z-10 text-[15px] font-medium leading-snug text-[#102232] transition-colors duration-500 group-hover:text-white sm:text-[20px] lg:text-[22px]">
                  {facility.name}
                </h3>

                {/* Bottom decorative line */}
                <div className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 bg-[#d8c08b] transition-all duration-500 group-hover:w-20" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
