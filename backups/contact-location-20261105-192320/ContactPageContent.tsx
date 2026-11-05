"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";

type Props = {
  image?: string;
  email: string;
  phone: string;
  address: string;
};

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initialForm: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactPageContent({
  image,
  email,
  phone,
  address,
}: Props) {
  const [form, setForm] = useState<FormValues>(initialForm);
  const [prepared, setPrepared] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(
      "[data-contact-reveal]"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("contact-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  function updateField(
    field: keyof FormValues,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setPrepared("");
    setCopied(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "Not provided"}`,
      `Subject: ${form.subject}`,
      "",
      form.message,
    ].join("\n");

    setPrepared(message);
    setCopied(false);

    // Open the visitor's email application only
    // when the real business email is configured.
    if (email) {
      const subject = encodeURIComponent(
        `Xclusive Apartment Enquiry: ${form.subject}`
      );

      const body = encodeURIComponent(message);

      window.location.href =
        `mailto:${email}?subject=${subject}&body=${body}`;
    }
  }

  async function copyMessage() {
    if (!prepared) return;

    try {
      await navigator.clipboard.writeText(prepared);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const phoneHref = phone.replace(/[^\d+]/g, "");

  return (
    <main className="overflow-hidden bg-white">

      {/* SECTION 1 — BANNER */}
      <section
        aria-labelledby="contact-heading"
        className="relative isolate flex h-[430px] items-center justify-center overflow-hidden bg-[#163b35] text-center text-white sm:h-[500px] lg:h-[540px]"
      >
        {image && (
          <Image
            src={image}
            alt="Xclusive Apartment property"
            fill
            priority
            sizes="100vw"
            className="contact-banner -z-20 object-cover"
          />
        )}

        <div className="absolute inset-0 -z-10 bg-black/45" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-transparent to-black/20" />

        <div className="contact-hero-text relative z-10 px-5 pt-24">
          <h1
            id="contact-heading"
            className="font-serif text-[clamp(3.2rem,5vw,5.3rem)] font-normal leading-tight"
          >
            Contact Us
          </h1>

          <nav aria-label="Breadcrumb" className="mt-6">
            <ol className="flex items-center justify-center gap-3 text-base sm:text-lg">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-[#e8cb97]"
                >
                  Home
                </Link>
              </li>

              <li aria-hidden="true">
                <ChevronRight size={20} />
              </li>

              <li aria-current="page">
                Contact Us
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* SECTION 2 — CONTACT INTRODUCTION */}
      <section
        data-contact-reveal
        className="contact-reveal mx-auto grid max-w-[1540px] grid-cols-1 gap-8 px-6 pb-12 pt-20 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:pt-28"
      >
        <div>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-[#008f87] sm:text-base">
            GET IN TOUCH
          </p>

          <h2 className="font-serif text-[clamp(2.8rem,4.5vw,4.8rem)] leading-[1.15] text-[#102232]">
            We Would Love
            <span className="block">To Hear From You</span>
          </h2>
        </div>

        <p className="text-[16px] leading-[1.9] text-[#68717b] sm:text-[18px]">
          Have questions about Xclusive Apartment,
          accommodation options, or your upcoming stay?
          Get in touch with us for more information,
          reservation enquiries, and assistance.
          We look forward to welcoming you.
        </p>
      </section>

      {/* SECTION 3 — CONTACT DETAILS & FORM */}
      <section className="mx-auto grid max-w-[1540px] grid-cols-1 gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-16 lg:pb-28">

        {/* LEFT: INFORMATION */}
        <div data-contact-reveal className="contact-reveal">
          <h2 className="mb-9 font-serif text-[clamp(2.2rem,3vw,3.3rem)] text-[#102232]">
            Contact Information
          </h2>

          <div className="space-y-9">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#d7dfdd] text-[#008f87]">
                <Phone size={25} strokeWidth={1.6} />
              </div>

              <div className="pt-1">
                <h3 className="mb-2 text-xl font-medium text-[#102232]">
                  Reservations
                </h3>

                {phone ? (
                  <a
                    href={`tel:${phoneHref}`}
                    className="text-[#68717b] transition-colors hover:text-[#008f87]"
                  >
                    {phone}
                  </a>
                ) : (
                  <p className="text-[#68717b]">
                    Contact number coming soon.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#d7dfdd] text-[#008f87]">
                <Mail size={25} strokeWidth={1.6} />
              </div>

              <div className="min-w-0 pt-1">
                <h3 className="mb-2 text-xl font-medium text-[#102232]">
                  Email Address
                </h3>

                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="break-all text-[#68717b] transition-colors hover:text-[#008f87]"
                  >
                    {email}
                  </a>
                ) : (
                  <p className="text-[#68717b]">
                    Official email coming soon.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#d7dfdd] text-[#008f87]">
                <MapPin size={25} strokeWidth={1.6} />
              </div>

              <div className="pt-1">
                <h3 className="mb-2 text-xl font-medium text-[#102232]">
                  Our Location
                </h3>

                <p className="leading-7 text-[#68717b]">
                  {address || "Property address coming soon."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-l-[3px] border-[#008f87] bg-[#f5f8f7] px-7 py-8">
            <h3 className="mb-3 font-serif text-2xl text-[#102232]">
              Planning Your Stay?
            </h3>

            <p className="text-[15px] leading-8 text-[#68717b]">
              Explore our accommodation photographs
              and send us an enquiry about your
              preferred dates and requirements.
            </p>

            <Link
              href="/apartments"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#008f87]"
            >
              Explore Apartments
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* RIGHT: CONTACT FORM */}
        <div
          data-contact-reveal
          className="contact-reveal bg-[#f7f7f7] px-6 py-10 sm:px-10 sm:py-12 lg:px-12"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-[#008f87]">
            SEND AN ENQUIRY
          </p>

          <h2 className="font-serif text-[clamp(2.2rem,3vw,3.3rem)] text-[#102232]">
            Leave Us A Message
          </h2>

          <p className="mt-4 text-[15px] leading-7 text-[#68717b]">
            Fill in the form below to prepare your enquiry.
          </p>

          <form onSubmit={handleSubmit} className="mt-9 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium text-[#102232]"
                >
                  Full Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) =>
                    updateField("name", e.target.value)
                  }
                  placeholder="Your full name"
                  className="h-14 w-full border border-[#e1e5e4] bg-white px-4 text-sm text-[#102232] outline-none transition-colors focus:border-[#008f87]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-medium text-[#102232]"
                >
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  placeholder="Your email address"
                  className="h-14 w-full border border-[#e1e5e4] bg-white px-4 text-sm text-[#102232] outline-none transition-colors focus:border-[#008f87]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-2 block text-sm font-medium text-[#102232]"
                >
                  Phone Number
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  maxLength={30}
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value)
                  }
                  placeholder="Your phone number"
                  className="h-14 w-full border border-[#e1e5e4] bg-white px-4 text-sm text-[#102232] outline-none transition-colors focus:border-[#008f87]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-medium text-[#102232]"
                >
                  Subject *
                </label>
                <select
                  id="contact-subject"
                  required
                  value={form.subject}
                  onChange={(e) =>
                    updateField("subject", e.target.value)
                  }
                  className="h-14 w-full border border-[#e1e5e4] bg-white px-4 text-sm text-[#102232] outline-none focus:border-[#008f87]"
                >
                  <option value="">Select enquiry</option>
                  <option value="Reservation Enquiry">
                    Reservation Enquiry
                  </option>
                  <option value="Apartment Information">
                    Apartment Information
                  </option>
                  <option value="Amenities & Services">
                    Amenities & Services
                  </option>
                  <option value="General Enquiry">
                    General Enquiry
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-medium text-[#102232]"
              >
                Your Message *
              </label>
              <textarea
                id="contact-message"
                rows={6}
                required
                minLength={10}
                maxLength={3000}
                value={form.message}
                onChange={(e) =>
                  updateField("message", e.target.value)
                }
                placeholder="Write your message here..."
                className="w-full resize-y border border-[#e1e5e4] bg-white px-4 py-4 text-sm leading-7 text-[#102232] outline-none focus:border-[#008f87]"
              />
            </div>

            <button
              type="submit"
              className="group inline-flex min-h-14 w-full items-center justify-center gap-3 bg-[#008f87] px-9 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#006e68] hover:shadow-lg sm:w-auto"
            >
              PREPARE MESSAGE
              <Send
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {prepared && (
            <div
              role="status"
              className="mt-8 border border-[#c4d9d5] bg-white p-5"
            >
              <p className="font-medium text-[#102232]">
                Your message is prepared, not yet sent.
              </p>

              <p className="mt-2 text-sm leading-6 text-[#68717b]">
                {email
                  ? "Your email application should open. Please confirm sending the email there."
                  : "An email recipient is not configured yet. You can copy your enquiry below."}
              </p>

              <textarea
                aria-label="Prepared enquiry message"
                readOnly
                rows={7}
                value={prepared}
                className="mt-4 w-full border border-gray-200 bg-[#fafafa] p-3 text-sm text-[#102232]"
              />

              <button
                type="button"
                onClick={copyMessage}
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#008f87]"
              >
                {copied ? (
                  <Check size={18} />
                ) : (
                  <Copy size={18} />
                )}
                {copied ? "Copied" : "Copy message"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4 — LOCATION */}
      <section
        data-contact-reveal
        className="contact-reveal bg-[#f5f5f5] px-6 py-20 sm:px-10 lg:px-16 lg:py-24"
      >
        <div className="mx-auto max-w-[1540px] text-center">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-[#008f87] sm:text-base">
            FIND US
          </p>

          <h2 className="font-serif text-[clamp(2.7rem,4.4vw,4.5rem)] text-[#102232]">
            Visit Xclusive Apartment
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-8 text-[#68717b]">
            {address
              ? `Find us at ${address}. Contact us if you need assistance with directions.`
              : "Our exact address and map will appear here once the property location is confirmed."}
          </p>

          {address && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex min-h-14 items-center gap-3 bg-[#008f87] px-8 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#006e68]"
            >
              GET DIRECTIONS
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </section>

      <style jsx global>{`
        .contact-reveal {
          opacity: 0;
          transform: translateY(32px);
          transition:
            opacity 900ms ease,
            transform 900ms ease;
        }

        .contact-reveal.contact-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .contact-banner {
          animation: contactZoom 13s ease-out both;
        }

        .contact-hero-text {
          animation: contactEnter 1s ease-out both;
        }

        @keyframes contactZoom {
          from { transform: scale(1); }
          to { transform: scale(1.06); }
        }

        @keyframes contactEnter {
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
          .contact-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .contact-banner,
          .contact-hero-text {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
