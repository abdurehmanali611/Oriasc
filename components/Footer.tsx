// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Check, MapPinIcon, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Footer Start */}
      <div
        className="w-full bg-[#0C1214] pt-5 mt-24 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container mx-auto px-4 py-5">
          <div className="flex gap-4 items-center justify-between">
            {/* Mosque Info */}
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/4 px-4">
              <div className="mt-5">
                <h4 className="mb-4 font-semibold font-sans text-[#10b982]">
                  ORIASC
                </h4>
                <p className="mb-4 text-gray-600 text-base leading-[35px]">
                  Nostrud exertation ullamco labor nisi aliquip ex ea commodo
                  consequat duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/4 px-4">
              <div className="mt-5">
                <h4 className="text-gray-100 mb-4 font-semibold font-sans">
                  Our Institution
                </h4>
                <div className="flex flex-col">
                  <h6 className="text-gray-600 mb-0 font-semibold font-sans">
                    Our Address
                  </h6>
                  <div className="flex items-center border-b border-white/8 py-4 gap-2">
                    <MapPinIcon className="bg-[#10b982] p-2 rounded-xl" />
                    <Link
                      href="#"
                      className="text-gray-400 transition-all duration-500 hover:text-[#10b982]"
                    >
                      123 Street, New York, USA
                    </Link>
                  </div>
                  <h6 className="text-gray-600 mt-4 mb-0 font-semibold font-sans">
                    Our Mobile
                  </h6>
                  <div className="flex items-center py-4 gap-2">
                    <PhoneCall className="bg-[#10b982] p-2 rounded-xl" />
                    <Link
                      href="tel:+251 91 315 5694"
                      className="text-gray-400 transition-all duration-500 hover:text-[#10b982]"
                    >
                      +251 91 315 5694
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/4 px-4">
              <div className="mt-5">
                <h4 className="text-gray-100 mb-4 font-semibold font-sans">
                  Explore Link
                </h4>
                <div className="flex flex-col items-start">
                  <Link
                    className="text-gray-400 mb-2 transition-all duration-500 hover:text-[#10b982] flex gap-2 items-center"
                    href="/"
                  >
                    <Check />
                    Home
                  </Link>
                  <Link
                    className="text-gray-400 mb-2 transition-all duration-500 hover:text-[#10b982] flex gap-2 items-center"
                    href="/About"
                  >
                    <Check />
                    About Us
                  </Link>
                  <Link
                    className="text-gray-400 mb-2 transition-all duration-500 hover:text-[#10b982] flex gap-2 items-center"
                    href="/Activities"
                  >
                    <Check />
                    Our Activities
                  </Link>
                  <Link
                    className="text-gray-400 mb-2 transition-all duration-500 hover:text-[#10b982] flex gap-2 items-center"
                    href="/Contact"
                  >
                    <Check />
                    Contact us
                  </Link>
                  <Link
                    className="text-gray-400 mb-2 transition-all duration-500 hover:text-[#10b982] flex gap-2 items-center"
                    href="/Blog"
                  >
                    <Check />
                    Our Blog
                  </Link>
                  <Link
                    className="text-gray-400 mb-2 transition-all duration-500 hover:text-[#10b982] flex gap-2 items-center"
                    href="/Events"
                  >
                    <Check />
                    Our Events
                  </Link>
                  <Link
                    className="text-gray-400 mb-2 transition-all duration-500 hover:text-[#10b982] flex gap-2 items-center"
                    href="/Sermons"
                  >
                    <Check />
                    Sermons
                  </Link>
                </div>
              </div>
            </div>

            {/* Latest Posts */}
            <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/4 px-4">
              <div className="mt-5">
                <h4 className="text-gray-100 mb-4 font-semibold font-sans">
                  Latest Post
                </h4>
                <div className="flex border-b border-white/8 py-4">
                  <Image
                    src="/assets/blog-mini-1.jpg"
                    className="max-w-full h-auto shrink-0"
                    alt="Blog post"
                    width={80}
                    height={80}
                  />
                  <div className="ps-3">
                    <p className="mb-0 text-gray-500">01 Jan 2045</p>
                    <Link
                      href="/Blog"
                      className="text-gray-400 transition-all duration-500 hover:text-[#10b982]"
                    >
                      Lorem ipsum dolor sit amet elit eros vel
                    </Link>
                  </div>
                </div>
                <div className="flex py-4">
                  <Image
                    src="/assets/blog-mini-2.jpg"
                    className="max-w-full h-auto shrink-0"
                    alt="Blog post"
                    width={80}
                    height={80}
                  />
                  <div className="ps-3">
                    <p className="mb-0 text-gray-500">01 Jan 2045</p>
                    <Link
                      href="/Blog"
                      className="text-gray-400 transition-all duration-500 hover:text-[#10b982]"
                    >
                      Lorem ipsum dolor sit amet elit eros vel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-4">
          <div className="border-t border-white/8 pb-4"></div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 text-center md:text-left mb-3 md:mb-0 text-white">
              &copy;{" "}
              <Link className="border-b border-gray-400 text-white" href="#">
                ORIASC
              </Link>
              , All Right Reserved.
            </div>
            <div className="w-full md:w-1/2 text-center md:text-right text-white">
              Designed By{" "}
              <Link
                className="border-b border-gray-400"
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
