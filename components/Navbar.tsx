"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

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
    if (pathname === "/Blog") return "blog";
    if (pathname === "/Team") return "team";
    if (pathname === "/Testimonial") return "testimonial";
    if (pathname === "/Contact") return "contact";
    return active;
  };

  const currentActive = getActiveState();
  const pagesActive = ["Blog", "Team", "Testimonial"].includes(currentActive);

  return (
    <div className="container mx-auto px-4 border-b border-white/50">
      <nav className="flex items-center justify-between py-3 px-5 bg-linear-to-r from-[#9d5e43] to-[#10b982]">
        <Link href="/" className="inline-block">
          <h1 className="mb-0 text-[#10b982] font-bold font-sans text-2xl">
            ORIASC
          </h1>
        </Link>

        {/* Mobile menu button - hidden on lg screens and above */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden px-5 py-2.5 border-2 shadow-none bg-[#6C757D] text-[#F8F9FA] border-[#F1C152] focus:outline-none"
          type="button"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-bars text-2xl"></span>
        </button>

        {/* Navigation menu - hidden on mobile, visible on lg and above */}
        <div
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:justify-between lg:flex-1 transition-all duration-300 absolute lg:relative top-full left-0 w-full bg-white lg:bg-transparent shadow-lg lg:shadow-none z-50`}
        >
          <div className="flex flex-col lg:flex-row lg:ml-auto lg:mx-auto">
            <Link
              href="/"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "index"
                  ? "text-[#10b982]"
                  : "text-[#0C1214] hover:text-[#10b982]"
              }`}
            >
              Home
            </Link>

            <Link
              href="/About"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "about"
                  ? "text-[#10b982]"
                  : "text-[#0C1214] hover:text-[#10b982]"
              }`}
            >
              About
            </Link>

            <Link
              href="/Activities"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "activities"
                  ? "text-[#10b982]"
                  : "text-[#0C1214] hover:text-[#10b982]"
              }`}
            >
              Activities
            </Link>

            <Link
              href="/Events"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "events"
                  ? "text-[#10b982]"
                  : "text-[#0C1214] hover:text-[#10b982]"
              }`}
            >
              Events
            </Link>

            <Link
              href="/Sermons"
              className={`block p-3 text-[17px] font-semibold transition-all duration-500 ${
                currentActive === "sermons"
                  ? "text-[#10b982]"
                  : "text-[#0C1214] hover:text-[#10b982]"
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
                    ? "text-[#10b982]"
                    : "text-[#0C1214] hover:text-[#10b982]"
                } hover:cursor-pointer`}
                type="button"
              >
                Pages
                <Icon icon="gridicons:dropdown" width="24" height="24" />
              </button>

              <div
                className={`${
                  dropdownOpen ? "block" : "hidden"
                } lg:absolute lg:top-full lg:left-0 lg:bg-[#F8F9FA] lg:border-0 lg:min-w-[200px] lg:z-50 lg:shadow-lg origin-top transition-all duration-300`}
                style={{ transformOrigin: "0% 0%" }}
              >
                <Link
                  href="/Blog"
                  className={`block px-4 py-2 transition-all duration-500 ${
                    currentActive === "blog"
                      ? "text-[#10b982] font-semibold"
                      : "text-[#0C1214] hover:text-[#10b982] hover:bg-gray-50"
                  }`}
                >
                  Latest Blog
                </Link>

                <Link
                  href="/Team"
                  className={`block px-4 py-2 transition-all duration-500 ${
                    currentActive === "team"
                      ? "text-[#10b982] font-semibold"
                      : "text-[#0C1214] hover:text-[#10b982] hover:bg-gray-50"
                  }`}
                >
                  Our Team
                </Link>

                <Link
                  href="/Testimonial"
                  className={`block px-4 py-2 transition-all duration-500 ${
                    currentActive === "testimonial"
                      ? "text-[#10b982] font-semibold"
                      : "text-[#0C1214] hover:text-[#10b982] hover:bg-gray-50"
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
                  ? "text-[#10b982]"
                  : "text-[#0C1214] hover:text-[#10b982]"
              }`}
            >
              Contact
            </Link>
          </div>

          <Link
            href="/Admin"
            className="block xl:inline-flex items-center justify-center bg-[#001100] text-white py-3 px-4 font-semibold transition-all duration-500 hover:bg-black hover:text-[#10b982] hover:border-[#0C1214] rounded-xl m-3 lg:m-0"
          >
            Admin Dashboard
          </Link>
        </div>
      </nav>
    </div>
  );
}
