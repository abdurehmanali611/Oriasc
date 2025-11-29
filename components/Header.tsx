import Link from "next/link";
import Navbar from "./Navbar";
import { Icon } from "@iconify/react";

const Header = () => {
  return (
    <div className="w-full px-4 fixed top-0 z-50 transition-all duration-500">
      <div className="container mx-auto hidden lg:block">
        <div className="h-[45px] px-[15px] py-2.5 bg-white/50">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-7/12 text-left">
              <div className="h-full inline-flex items-center me-4">
                <span className="fa fa-phone-alt me-2 text-gray-900"></span>
                <Link
                  href="#"
                  className="text-gray-600 transition-all duration-500 hover:text-[#F1C152]"
                >
                  <span>+012 345 6789</span>
                </Link>
              </div>
              <div className="h-full inline-flex items-center">
                <span className="far fa-envelope me-2 text-gray-900"></span>
                <Link
                  href="#"
                  className="text-gray-600 transition-all duration-500 hover:text-[#F1C152]"
                >
                  <span>info@example.com</span>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-5/12 text-right">
              <div className="h-full inline-flex items-center">
                <span className="text-gray-800">Follow Us:</span>
                <Link
                  className="text-gray-900 px-2 transition-all duration-500 hover:text-[#F1C152]"
                  href=""
                >
                  <Icon
                    icon="ph:facebook-logo-duotone"
                    width="25"
                    height="25"
                  />
                </Link>
                <Link
                  className="text-gray-900 px-2 transition-all duration-500 hover:text-[#F1C152]"
                  href=""
                >
                  <Icon icon="openmoji:twitter" width="25" height="25" />
                </Link>
                <Link
                  className="text-gray-900 px-2 transition-all duration-500 hover:text-[#F1C152]"
                  href=""
                >
                  <Icon icon="skill-icons:linkedin" width="25" height="25" />
                </Link>
                <Link
                  className="text-gray-900 px-2 transition-all duration-500 hover:text-[#F1C152]"
                  href=""
                >
                  <Icon icon="skill-icons:instagram" width="25" height="25" />{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
