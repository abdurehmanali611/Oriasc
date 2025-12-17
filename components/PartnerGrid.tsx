import PartnerItem from "./PartnerItem";
import SectionHeader from "./SectionHeader";
import Marquee from "react-fast-marquee";

interface Partner {
  Title: string;
  Type: string;
  logoUrl: string;
}

interface PartnersGridProps {
  partners: Partner[];
}

export default function PartnersGrid({ partners }: PartnersGridProps) {
  return (
    <>
      <div className="w-full px-4 py-5">
        <div className="container mx-auto py-5">
          {partners && partners.length > 0 ? (
            <Marquee
              className="bg-gray-100 py-4 rounded-xl shadow-inner border border-gray-200"
              gradient={false}
              speed={40}
              pauseOnHover
            >
              <div className="flex items-center">
                {partners.map((partner, index) => (
                  <PartnerItem
                    key={index}
                    Title={partner.Title}
                    logoUrl={partner.logoUrl}
                  />
                ))}
              </div>
            </Marquee>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No Partners available at this time. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
