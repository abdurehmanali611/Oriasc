import Link from "next/link";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="w-full px-4 fixed top-0 z-50 transition-all duration-500">
      <div className="container mx-auto hidden lg:block">
        <div className="h-[45px] px-[15px] py-2.5 bg-white/50">
          <div className="flex flex-wrap">
            <div className="w-full text-left flex justify-between items-center">
              <div className="h-full inline-flex items-center me-4">
                <span className="fa fa-phone-alt me-2 text-gray-900"></span>
                <Link
                  href="tel:+251 91 315 5694"
                  className="text-gray-600 transition-all duration-500 hover:text-[#10b982]"
                >
                  <span>+251 91 315 5694</span>
                </Link>
              </div>
              <div className="h-full inline-flex items-center">
                <span className="far fa-envelope me-2 text-gray-900"></span>
                <Link
                  href="mailto:oriasc14@gmail.com"
                  target="blank"
                  className="text-gray-600 transition-all duration-500 hover:text-[#10b982]"
                >
                  <span>oriasc14@gmail.com</span>
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
