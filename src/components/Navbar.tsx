"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

const navigation = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about" },
  { name: "APARTMENTS", href: "/apartments" },
  { name: "DINING", href: "/dining" },
  { name: "AMENITIES", href: "/amenities" },
  { name: "ACTIVITIES", href: "/activities" },
  { name: "CONTACT US", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const menuOpen = openOnPath === pathname;

  const setMenuOpen = (open: boolean) => {
    setOpenOnPath(open ? pathname : null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const solidHeader = scrolled || menuOpen;

  return (
    <header
      className={`${montserrat.className} fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solidHeader
          ? "bg-white shadow-md"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div
        className={`mx-auto flex w-full max-w-[1600px] items-center justify-between gap-5 px-5 transition-all duration-300 sm:px-8 lg:px-10 xl:px-16 ${
          scrolled ? "h-20" : "h-24 lg:h-28"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="relative z-10 flex shrink-0 flex-col"
          aria-label="Xclusive Apartment home"
        >
          <span
            className={`font-serif text-2xl font-semibold tracking-[0.08em] transition-colors sm:text-3xl ${
              solidHeader ? "text-[#163d39]" : "text-white"
            }`}
          >
            XCLUSIVE
          </span>

          <span
            className={`mt-1 text-[9px] font-medium tracking-[0.4em] transition-colors sm:text-[10px] ${
              solidHeader ? "text-[#a88c60]" : "text-white/90"
            }`}
          >
            APARTMENT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden flex-1 items-center justify-center gap-6 xl:flex 2xl:gap-8"
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative whitespace-nowrap py-3 xclusive-nav-enter group text-[13px] font-medium tracking-[0.10em] transition-all duration-300 hover:-translate-y-0.5 2xl:text-[14px] ${
                  active
                    ? solidHeader
                      ? "text-[#008f87] font-semibold"
                      : "text-[#e9ca91] font-semibold"
                    : solidHeader
                      ? "text-[#263d3b] hover:text-[#008f87]"
                      : "text-white hover:text-[#e9ca91]"
                }`}
              >
                {item.name}

                <span
                  className={`absolute bottom-1 left-0 h-[2px] origin-left transition-transform duration-300 ease-out ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  } ${
                    solidHeader ? "bg-[#008f87]" : "bg-[#e9ca91]"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/apartments"
            className={`hidden rounded-md border px-5 py-3 text-[12px] font-semibold tracking-[0.18em] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:inline-flex lg:px-7 ${
              solidHeader
                ? "border-[#087e79] bg-[#087e79] text-white hover:bg-[#05645f]"
                : "border-white bg-white text-[#087e79] hover:bg-[#087e79] hover:text-white"
            }`}
          >
            BOOK NOW
          </Link>

          {/* Mobile/Tablet Menu Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-md border transition-colors xl:hidden ${
              solidHeader
                ? "border-gray-200 text-[#163d39]"
                : "border-white/40 text-white"
            }`}
          >
            <span className="sr-only">
              {menuOpen ? "Close navigation" : "Open navigation"}
            </span>

            {menuOpen ? (
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M5 5L19 19M19 5L5 19" />
              </svg>
            ) : (
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M3 6H21M3 12H21M3 18H21" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile and Tablet Navigation */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="xclusive-mobile-enter max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-gray-100 bg-white px-5 py-5 shadow-xl sm:px-8 xl:hidden"
        >
          <div className="mx-auto flex max-w-lg flex-col">
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href ||
                    pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`border-b border-gray-100 px-3 py-4 text-[13px] font-semibold tracking-[0.12em] transition-all duration-300 hover:translate-x-2 ${
                    active
                      ? "border-l-4 border-[#008f87] bg-[#edf8f6] text-[#008f87] font-bold"
                      : "text-[#263d3b] hover:bg-gray-50 hover:text-[#087e79]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <Link
              href="/apartments"
              onClick={() => setMenuOpen(false)}
              className="mt-6 flex w-full items-center justify-center rounded-md bg-[#087e79] px-6 py-4 text-xs font-semibold tracking-[0.25em] text-white transition-colors hover:bg-[#05645f]"
            >
              BOOK NOW
            </Link>
          </div>
        </nav>
      )}
    
    </header>
  );
}


<style jsx>{`
  @keyframes navEnter {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes mobileEnter {
    from {
      opacity: 0;
      transform: translateY(-12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  :global(.xclusive-nav-enter) {
    animation: navEnter 0.55s ease-out both;
  }

  :global(.xclusive-mobile-enter) {
    animation: mobileEnter 0.3s ease-out both;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.xclusive-nav-enter),
    :global(.xclusive-mobile-enter) {
      animation: none;
    }
  }
`}</style>