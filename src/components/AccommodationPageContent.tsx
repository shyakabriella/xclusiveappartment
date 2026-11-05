"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowUpRight } from "lucide-react";

type Props = {
  images: string[];
};

export default function AccommodationPageContent({
  images,
}: Props) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      "[data-accommodation-reveal]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("accommodation-visible");
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

  const banner = images[0];
  const gallery = images.slice(0, 6);

  return (
    <main className="overflow-hidden bg-white">

      {/* SECTION 1 — ACCOMMODATION BANNER */}
      <section
        aria-labelledby="apartments-page-title"
        className="relative isolate flex h-[430px] items-center justify-center overflow-hidden bg-[#163b35] text-center text-white sm:h-[500px] lg:h-[540px]"
      >
        {banner && (
          <Image
            src={banner}
            alt="Xclusive Apartment accommodation"
            fill
            priority
            sizes="100vw"
            className="accommodation-banner-image -z-20 object-cover"
          />
        )}

        <div className="absolute inset-0 -z-10 bg-black/40" />

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-transparent to-black/25" />

        <div className="accommodation-title relative z-10 px-5 pt-24">
          <h1
            id="apartments-page-title"
            className="font-serif text-[clamp(3rem,5vw,5.2rem)] font-normal leading-tight drop-shadow-md"
          >
            Our Apartments
          </h1>

          <nav aria-label="Breadcrumb" className="mt-6">
            <ol className="flex items-center justify-center gap-3 text-base sm:text-lg">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#e8ce9a]"
                >
                  Home
                </Link>
              </li>

              <li aria-hidden="true">
                <ChevronRight size={20} />
              </li>

              <li aria-current="page">
                Apartments
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* SECTION 2 — ACCOMMODATION GALLERY */}
      <section
        aria-labelledby="luxury-accommodation-title"
        className="bg-white px-5 pb-24 pt-24 sm:px-8 sm:pt-28 lg:px-12 lg:pb-32 lg:pt-32"
      >
        <div className="mx-auto max-w-[1540px]">

          <div
            data-accommodation-reveal
            className="accommodation-reveal mb-14 text-center sm:mb-16"
          >
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[#008f87] sm:text-base">
              DISCOVER OUR BEAUTIFUL APARTMENTS
            </p>

            <h2
              id="luxury-accommodation-title"
              className="font-serif text-[clamp(2.6rem,4.3vw,4.6rem)] font-normal leading-[1.2] tracking-[-0.025em] text-[#102232]"
            >
              Luxury Accommodation At
              <span className="block">
                Xclusive Apartment
              </span>
            </h2>
          </div>

          {/* Six accommodation photo cards */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-9">
            {gallery.map((image, index) => (
              <article
                key={image}
                data-accommodation-reveal
                className="accommodation-reveal group relative isolate aspect-[1.05/1] overflow-hidden bg-[#283a35]"
                style={{
                  transitionDelay: `${(index % 3) * 100}ms`,
                }}
              >
                <Image
                  src={image}
                  alt={`Xclusive Apartment accommodation photograph ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1100ms] ease-out motion-safe:group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-all duration-500 group-hover:from-black/80" />

                <div className="pointer-events-none absolute inset-5 border border-white/0 transition-all duration-500 group-hover:border-white/60" />

                <div className="absolute inset-x-0 bottom-0 z-10 px-7 pb-9 sm:px-9 sm:pb-10">
                  <div className="mb-4 h-[2px] w-0 bg-[#e4c590] transition-all duration-500 group-hover:w-14" />

                  <h3 className="font-serif text-[clamp(1.8rem,2.5vw,2.7rem)] font-normal leading-tight text-white drop-shadow-md">
                    Apartment View{" "}
                    {String(index + 1).padStart(2, "0")}
                  </h3>

                  <span className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-white/90 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    Explore Photograph
                    <ArrowUpRight
                      size={17}
                      aria-hidden="true"
                    />
                  </span>
                </div>

                {/* Open the original property photograph */}
                <a
                  href={image}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View apartment photograph ${index + 1}`}
                  className="absolute inset-0 z-20 focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e4c590]"
                />
              </article>
            ))}
          </div>

          {/* More property photographs */}
          {images.length > 6 && (
            <div
              data-accommodation-reveal
              className="accommodation-reveal mt-14 text-center"
            >
              <p className="mx-auto max-w-2xl text-base leading-8 text-[#68717b]">
                Take a closer look at Xclusive Apartment
                and discover more of our welcoming spaces.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex min-h-14 items-center justify-center bg-[#008f87] px-10 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#006e69] hover:shadow-lg"
              >
                Enquire About Your Stay
              </Link>
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        .accommodation-reveal {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity 850ms ease,
            transform 850ms ease;
        }

        .accommodation-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .accommodation-banner-image {
          animation: accommodationZoom 12s ease-out both;
        }

        .accommodation-title {
          animation: accommodationFade 1s ease-out both;
        }

        @keyframes accommodationZoom {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }

        @keyframes accommodationFade {
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
          .accommodation-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .accommodation-banner-image,
          .accommodation-title {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
