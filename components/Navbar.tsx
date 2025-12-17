"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { Menu, X } from "lucide-react";

export default function Navbar({ active = "index" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const getActiveState = () => {
    if (pathname === "/") return "index";
    if (pathname === "/About") return "about";
    if (pathname === "/Activities") return "activities";
    if (pathname === "/Events") return "events";
    if (pathname === "/Sermons") return "sermons";
    if (pathname === "/News") return "blog";
    if (pathname === "/Team") return "team";
    if (pathname === "/Testimonial") return "testimonial";
    if (pathname === "/Contact") return "contact";
    return active;
  };

  const currentActive = getActiveState();
  const pagesActive = ["Blog", "Team", "Testimonial"].includes(currentActive);

  return (
    <div className="border-b border-white/50">
      <nav className="flex items-center justify-between py-3 px-5 bg-[#61CE70]">
        <Link href="/" className="inline-block">
          <h1 className="mb-0 text-white font-bold font-sans text-2xl">
            ORIASC
          </h1>
        </Link>

        {/* Mobile menu button - hidden on lg screens and above */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden shadow-none bg-black p-2 rounded-lg text-white focus:outline-none cursor-pointer"
          type="button"
          aria-label="Toggle navigation"
        >
          <Menu className={`${mobileMenuOpen ? 'hidden': 'block'}`}/>
          <X className={`${mobileMenuOpen ? 'block': 'hidden'}`}/>
        </button>

        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:justify-between lg:flex-1 transition-all duration-300 absolute lg:relative top-full left-0 w-full bg-[#61CE70] lg:bg-transparent shadow-lg lg:shadow-none z-50 max-h-[80vh] overflow-y-auto no-scrollbar`}
        >
          <div className="flex flex-col gap-0 lg:flex-row lg:ml-auto lg:mx-auto">
            <Link
              href="/"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "index"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Home
            </Link>

            <Link
              href="/About"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "about"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              About
            </Link>

            <Link
              href="/Activities"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "activities"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Activities
            </Link>

            <Link
              href="/Events"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "events"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Events
            </Link>

            <Link
              href="/Services"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "events"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Services
            </Link>

            <Link
              href="/Partners"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "events"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Partners
            </Link>

            <Link
              href="/Sermons"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "sermons"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Sermons
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full text-left p-3 text-[17px] font-semibold transition-all duration-500 flex gap-1 items-center ${
                  pagesActive
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
                } hover:cursor-pointer`}
                type="button"
              >
                Pages
                <Icon icon="gridicons:dropdown" width="24" height="24" />
              </button>

              <div
                className={`${
                  dropdownOpen ? "block" : "hidden"
                } absolute lg:top-full lg:left-0 bg-black border-0 lg:min-w-[200px] z-50 lg:shadow-lg origin-top transition-all duration-300`}
                style={{ transformOrigin: "0% 0%" }}
              >
                <Link
                  href="/News"
                  className={`block px-4 py-2 transition-all duration-500 ${
                    currentActive === "blog"
                    ? "text-red-500"
                    : "text-white hover:text-red-500"
                  }`}
                >
                  Latest News
                </Link>

                <Link
                  href="/Team"
                  className={`block px-4 py-2 transition-all duration-500 ${
                    currentActive === "team"
                    ? "text-red-500"
                    : "text-white hover:text-red-500"
                  }`}
                >
                  Our Management
                </Link>

                <Link
                  href="/Testimonial"
                  className={`block px-4 py-2 transition-all duration-500 ${
                    currentActive === "testimonial"
                    ? "text-red-500"
                    : "text-white hover:text-red-500"
                  }`}
                >
                  Testimonial
                </Link>
              </div>
            </div>

            <Link
              href="/Contact"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "contact"
                  ? "text-red-500"
                  : "text-white hover:text-red-500"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
