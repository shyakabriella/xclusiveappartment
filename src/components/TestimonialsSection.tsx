"use client";

import { useEffect, useRef, useState } from "react";
import { Quote, Star, UserRound } from "lucide-react";

type Review = {
  id: number;
  name: string;
  source: string;
  rating: number;
  text: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Guest Review Example 01",
    source: "Demonstration review",
    rating: 5,
    text:
      "The apartment was beautiful, comfortable, and welcoming. " +
      "The rooms were well arranged, and the atmosphere was " +
      "peaceful. It was a wonderful place to relax and enjoy " +
      "a comfortable stay.",
  },
  {
    id: 2,
    name: "Guest Review Example 02",
    source: "Demonstration review",
    rating: 5,
    text:
      "A lovely apartment with an elegant interior and a " +
      "relaxing environment. The space felt warm and inviting, " +
      "making the entire experience enjoyable. I would be " +
      "happy to visit again.",
  },
];

export default function TestimonialsSection() {
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
      {
        threshold: 0.12,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="overflow-hidden bg-[#f5f5f5] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1540px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Section heading */}
        <div
          className={`mb-12 text-center transition-all duration-1000 sm:mb-16 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-10 opacity-0"
          }`}
        >
          <p className="mb-7 text-xs font-medium uppercase tracking-[0.28em] text-[#008f87] sm:text-base">
            TESTIMONIALS
          </p>

          <h2
            id="testimonials-heading"
            className="font-serif text-[clamp(2.7rem,4.5vw,4.8rem)] font-normal leading-[1.15] tracking-[-0.025em] text-[#102232]"
          >
            Feedback From Our Guests
          </h2>

          <p className="mt-5 text-sm text-[#68717b]">
            Preview layout with sample feedback.
            Verified guest reviews will appear here.
          </p>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-9">
          {reviews.map((review, index) => (
            <article
              key={review.id}
              className={`group relative flex min-h-[440px] flex-col bg-white px-7 py-10 transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:min-h-[480px] sm:px-12 sm:py-12 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              } hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]`}
              style={{
                transitionDelay: visible
                  ? `${index * 150}ms`
                  : "0ms",
              }}
            >
              {/* Decorative quote */}
              <Quote
                size={43}
                strokeWidth={1.2}
                aria-hidden="true"
                className="absolute right-8 top-7 text-[#008f87]/15 sm:right-12"
              />

              {/* Review text */}
              <blockquote className="relative flex-1">
                <p className="text-[16px] italic leading-[1.9] text-[#74767c] sm:text-[19px] sm:leading-[1.9]">
                  &ldquo;{review.text}&rdquo;
                </p>
              </blockquote>

              {/* Rating */}
              <div
                className="mt-9 flex items-center gap-2 text-[#008f87]"
                role="img"
                aria-label={`${review.rating} out of 5 stars - sample rating`}
              >
                {Array.from({ length: review.rating }).map(
                  (_, starIndex) => (
                    <Star
                      key={starIndex}
                      size={19}
                      fill="currentColor"
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  )
                )}
              </div>

              {/* Guest information */}
              <div className="mt-7 flex items-center gap-5">
                <div className="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-full bg-[#e9f2f0] text-[#008f87]">
                  <UserRound
                    size={31}
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h3 className="text-[19px] font-medium text-[#102232] sm:text-[22px]">
                    {review.name}
                  </h3>

                  <p className="mt-2 text-[14px] text-[#7b7e85] sm:text-[16px]">
                    {review.source}
                  </p>
                </div>
              </div>

              {/* Bottom hover accent */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#008f87] transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
