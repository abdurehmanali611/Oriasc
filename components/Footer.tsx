// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Check, MapPinIcon, PhoneCall } from "lucide-react";

export default function Footer() {
  const accentColor = "text-[#10b982]";
  const accentBg = "bg-[#10b982]";

  return (
    <>
      {/* Footer Start - Styling maintained */}
      <div
        className="w-full bg-gray-900 pt-16 mt-24 wow fadeIn shadow-2xl shadow-black/50 border-t border-gray-800"
        data-wow-delay="0.1s"
      >
        {/* Main Content Container */}
        <div className="container mx-auto px-6 py-10">
          {/* Layout Container:
              - Below 'sm': Stacked (w-full)
              - 'sm' to 'lg' (Medium Screens): 2x2 grid (w-1/2)
              - 'lg' and up (Large/XL Screens): 1x4 grid (w-1/4)
          */}
          <div className="flex gap-8 items-start justify-start flex-col sm:flex-row md:flex-wrap lg:flex-nowrap">
            {/* 1. Mosque Info */}
            <div className="w-full lg:w-1/4 px-4">
              <div className="mt-5">
                <h4
                  className={`mb-4 text-3xl font-extrabold font-sans ${accentColor} tracking-wider text-center`}
                >
                  ORIASC
                </h4>
                <p className="mb-4 text-gray-400 text-base leading-relaxed text-center">
                  Nostrud exertation ullamco labor nisi aliquip ex ea commodo
                  consequat duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore.
                </p>
              </div>
            </div>

            {/* 2. Contact Info */}
            <div className="w-full lg:w-1/4 px-4">
              <div className="mt-5">
                <h4 className="text-white mb-6 text-xl font-bold font-sans tracking-wide">
                  Our Institution
                </h4>
                {/* Contact details always stack vertically for clarity */}
                <div className="flex flex-col gap-6 md:flex-row lg:flex-col md:items-center lg:items-start md:justify-between lg:gap-0">
                  {/* Address Block */}
                  <div className="flex flex-col">
                    <h6 className="text-gray-500 mt-4 mb-2 font-semibold font-sans uppercase text-sm">
                      Our Address
                    </h6>
                    <div className="flex items-center border-b border-gray-800 gap-3 pb-4">
                      <MapPinIcon
                        className={`${accentBg} text-white p-2 rounded-full w-9 h-9 shrink-0`}
                      />
                      <p
                        className={`text-gray-400 transition-colors duration-300 hover:${accentColor} text-base`}
                      >
                        123 Street, New York, USA
                      </p>
                    </div>
                  </div>

                  {/* Mobile Block */}
                  <div className="flex flex-col">
                    <h6 className="text-gray-500 mt-4 mb-2 font-semibold font-sans uppercase text-sm">
                      Our Mobile
                    </h6>
                    <div className="flex items-center border-b border-gray-800 gap-3 pb-4">
                      <PhoneCall
                        className={`${accentBg} text-white p-2 rounded-full w-9 h-9 shrink-0`}
                      />
                      <p
                        className={`text-gray-400 transition-colors duration-300 hover:${accentColor} text-base`}
                      >
                        +251 91 315 5694
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Quick Links */}
            <div className="w-full lg:w-1/4 px-4">
              <div className="mt-5">
                <h4 className="text-white mb-6 text-xl font-bold font-sans tracking-wide">
                  Explore Links
                </h4>
                <div className="flex flex-row lg:flex-col gap-10 flex-wrap items-center lg:items-start lg:gap-0">
                  <Link
                    className={`text-gray-400 mb-3 transition-colors duration-300 hover:${accentColor} flex gap-3 items-center text-base`}
                    href="/"
                  >
                    <Check className={`${accentColor} w-4 h-4 shrink-0`} />
                    Home
                  </Link>
                  <Link
                    className={`text-gray-400 mb-3 transition-colors duration-300 hover:${accentColor} flex gap-3 items-center text-base`}
                    href="/About"
                  >
                    <Check className={`${accentColor} w-4 h-4 shrink-0`} />
                    About Us
                  </Link>
                  <Link
                    className={`text-gray-400 mb-3 transition-colors duration-300 hover:${accentColor} flex gap-3 items-center text-base`}
                    href="/Activities"
                  >
                    <Check className={`${accentColor} w-4 h-4 shrink-0`} />
                    Our Activities
                  </Link>
                  <Link
                    className={`text-gray-400 mb-3 transition-colors duration-300 hover:${accentColor} flex gap-3 items-center text-base`}
                    href="/Contact"
                  >
                    <Check className={`${accentColor} w-4 h-4 shrink-0`} />
                    Contact us
                  </Link>
                  <Link
                    className={`text-gray-400 mb-3 transition-colors duration-300 hover:${accentColor} flex gap-3 items-center text-base`}
                    href="/News"
                  >
                    <Check className={`${accentColor} w-4 h-4 shrink-0`} />
                    Our News
                  </Link>
                  <Link
                    className={`text-gray-400 mb-3 transition-colors duration-300 hover:${accentColor} flex gap-3 items-center text-base`}
                    href="/Events"
                  >
                    <Check className={`${accentColor} w-4 h-4 shrink-0`} />
                    Our Events
                  </Link>
                  <Link
                    className={`text-gray-400 mb-3 transition-colors duration-300 hover:${accentColor} flex gap-3 items-center text-base`}
                    href="/Sermons"
                  >
                    <Check className={`${accentColor} w-4 h-4 shrink-0`} />
                    Sermons
                  </Link>
                </div>
              </div>
            </div>

            {/* 4. Latest Posts (Styled to look nice/pretty, w-1/2 for 2x2 on medium, w-1/4 for 1x4 on large/xl) */}
            <div className="w-full lg:w-1/4 px-4">
              <div className="mt-5">
                <h4 className="text-white mb-6 text-xl font-bold font-sans tracking-wide">
                  Latest Post
                </h4>
                <div className="flex flex-col md:flex-row lg:flex-col md:gap-16 md:items-center lg:items-start lg:gap-0">
                  <div className="flex border-b border-gray-700 pb-4 group transition-all duration-300 hover:bg-gray-800/50 p-2 -mx-2 rounded-lg">
                    <Image
                      src="/assets/blog-mini-1.jpg"
                      className="max-w-full h-auto shrink-0 object-cover rounded-md border border-gray-700"
                      alt="Blog post"
                      width={80}
                      height={80}
                    />
                    <div className="ps-4">
                      <p className="mb-1 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                        01 Jan 2045
                      </p>
                      <Link
                        href="/Blog"
                        className={`text-gray-200 transition-colors duration-300 hover:${accentColor} font-medium leading-snug`}
                      >
                        Lorem ipsum dolor sit amet elit eros vel
                      </Link>
                    </div>
                  </div>
                  {/* Post 2 - Enhanced post styling */}
                  <div className="flex pt-2 group transition-all duration-300 hover:bg-gray-800/50 p-2 -mx-2 rounded-lg border-b border-gray-700">
                    <Image
                      src="/assets/blog-mini-2.jpg"
                      className="max-w-full h-auto shrink-0 object-cover rounded-md border border-gray-700"
                      alt="Blog post"
                      width={80}
                      height={80}
                    />
                    <div className="ps-4">
                      <p className="mb-1 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                        01 Jan 2045
                      </p>
                      <Link
                        href="/Blog"
                        className={`text-gray-200 transition-colors duration-300 hover:${accentColor} font-medium leading-snug`}
                      >
                        Lorem ipsum dolor sit amet elit eros vel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="container mx-auto px-6 py-6">
          <div className="border-t border-gray-800 pt-4"></div>
          <div className="flex flex-wrap text-sm">
            <div className="w-full md:w-1/2 text-center md:text-left mb-3 md:mb-0 text-gray-400">
              &copy;{" "}
              <Link
                className={`border-b border-gray-700 text-white transition-colors duration-300 hover:${accentColor}`}
                href="#"
              >
                ORIASC
              </Link>
              , All Right Reserved.
            </div>
            <div className="w-full md:w-1/2 text-center md:text-right text-gray-400">
              Designed By{" "}
              <Link
                className={`border-b border-gray-700 text-white transition-colors duration-300 hover:${accentColor}`}
                href="https://3-d-portfolio-rpdm.vercel.app/"
              >
                Abdurehman Ali
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
    </>
  );
}
