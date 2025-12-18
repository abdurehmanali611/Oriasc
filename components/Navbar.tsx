"use client";
import { useState } from "react";
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
  const pagesActive = ["blog", "team", "testimonial"].includes(currentActive);

  return (
    <header className="border-b border-white/50 bg-[#61CE70] top-0 z-100">
      <nav className="flex items-center justify-between py-3 px-5 relative lg:mr-64">
        <div className="shrink-0 lg:w-1/4">
          <Link href="/" className="inline-block">
            <h1 className="mb-0 text-white font-bold font-sans text-2xl">
              ORIASC
            </h1>
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden shadow-none bg-black p-2 rounded-lg text-white focus:outline-none cursor-pointer z-50"
          type="button"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div
          className={`${
            mobileMenuOpen ? "flex" : "hidden"
          } lg:flex absolute lg:relative top-full left-0 w-full lg:w-auto bg-[#61CE70] lg:bg-transparent flex-col lg:flex-row items-center justify-center lg:grow z-40`}
        >
          <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-1 lg:gap-2 px-4 py-4 lg:py-0">
            <NavLink href="/" active={currentActive === "index"}>
              Home
            </NavLink>
            <NavLink href="/About" active={currentActive === "about"}>
              About
            </NavLink>
            <NavLink href="/Activities" active={currentActive === "activities"}>
              Activities
            </NavLink>
            <NavLink href="/Events" active={currentActive === "events"}>
              Events
            </NavLink>
            <NavLink href="/Services" active={currentActive === "events"}>
              Services
            </NavLink>
            <NavLink href="/Partners" active={currentActive === "events"}>
              Partners
            </NavLink>
            <NavLink href="/Sermons" active={currentActive === "sermons"}>
              Sermons
            </NavLink>

            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 p-3 text-[17px] font-semibold transition-all ${
                  pagesActive ? "text-red-500" : "text-white hover:text-red-500"
                } cursor-pointer`}
              >
                Pages
                <Icon icon="gridicons:dropdown" width="20" height="20" />
              </button>

              <div
                className={`${
                  dropdownOpen ? "block" : "hidden"
                } absolute left-1/2 -translate-x-1/2 lg:translate-x-0 lg:left-0 mt-0 w-48 bg-black shadow-2xl z-110`}
              >
                <DropdownLink href="/News" active={currentActive === "blog"}>
                  Latest News
                </DropdownLink>
                <DropdownLink href="/Team" active={currentActive === "team"}>
                  Our Management
                </DropdownLink>
                <DropdownLink
                  href="/Testimonial"
                  active={currentActive === "testimonial"}
                >
                  Testimonial
                </DropdownLink>
              </div>
            </div>

            <NavLink href="/Contact" active={currentActive === "contact"}>
              Contact
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`p-3 text-[16px] xl:text-[17px] font-semibold whitespace-nowrap transition-all ${
        active ? "text-red-500" : "text-white hover:text-red-500"
      }`}
    >
      {children}
    </Link>
  );
}

function DropdownLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`block px-5 py-3 text-sm font-medium transition-all ${
        active
          ? "text-red-500"
          : "text-white hover:bg-zinc-900 hover:text-red-500"
      }`}
    >
      {children}
    </Link>
  );
}
