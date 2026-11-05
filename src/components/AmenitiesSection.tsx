import Image from "next/image";

type AmenitiesSectionProps = {
  images: string[];
};

const amenities = [
  {
    title: "Elegant Interiors",
    subtitle: "Discover Our Spaces",
    imageIndex: 2,
  },
  {
    title: "Rest & Relaxation",
    subtitle: "Feel At Home",
    imageIndex: 5,
  },
  {
    title: "Apartment Views",
    subtitle: "Explore The Property",
    imageIndex: 9,
  },
  {
    title: "Comfortable Living",
    subtitle: "Enjoy Your Stay",
    imageIndex: 13,
  },
];

export default function AmenitiesSection({
  images,
}: AmenitiesSectionProps) {
  if (images.length === 0) return null;

  return (
    <section
      id="amenities"
      aria-labelledby="amenities-heading"
      className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Heading and introduction */}
        <div className="mb-12 grid grid-cols-1 items-start gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-16">

          <div>
            <p className="mb-6 text-[12px] font-medium uppercase tracking-[0.28em] text-[#008f87] sm:text-base">
              LUXURY, COMFORT & TAILOR-MADE SERVICES
            </p>

            <h2
              id="amenities-heading"
              className="font-serif text-[clamp(2.7rem,4.4vw,4.7rem)] font-normal leading-[1.15] tracking-[-0.025em] text-[#102232]"
            >
              Amenities & Services
            </h2>
          </div>

          <div>
            <p className="max-w-[700px] text-[15px] leading-[1.9] text-[#69717b] sm:text-[18px]">
              At Xclusive Apartment, we believe every stay
              should be comfortable and memorable.
              Discover welcoming spaces, elegant interiors,
              and a relaxing atmosphere designed to
              make your experience feel special.
            </p>
          </div>
        </div>

        {/* Four tall image cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {amenities.map((amenity, index) => {
            const image =
              images[amenity.imageIndex % images.length];

            return (
              <article
                key={amenity.title}
                className="group relative isolate aspect-[3/4] overflow-hidden bg-[#1f3430] sm:aspect-[3/4.5] lg:aspect-[3/5.3]"
              >
                {/* Property photograph */}
                <Image
                  src={image}
                  alt={`${amenity.title} at Xclusive Apartment`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out motion-safe:group-hover:scale-110"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-all duration-500 group-hover:from-black/85 group-hover:via-black/25" />

                {/* Subtle border animation */}
                <div className="pointer-events-none absolute inset-5 border border-white/0 transition-all duration-500 group-hover:inset-4 group-hover:border-white/50" />

                {/* Bottom content */}
                <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-10 text-center sm:px-5">

                  <div className="mx-auto mb-5 h-[2px] w-0 bg-[#e2c18a] transition-all duration-500 group-hover:w-14" />

                  <h3 className="font-serif text-[clamp(1.7rem,2.25vw,2.4rem)] font-normal leading-tight text-white drop-shadow-md">
                    {amenity.title}
                  </h3>

                  <p className="mt-3 text-[13px] font-normal tracking-wide text-white/90 sm:text-[15px]">
                    {amenity.subtitle}
                  </p>
                </div>

                {/* Decorative number */}
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-6 text-xs font-medium tracking-widest text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
