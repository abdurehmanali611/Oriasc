import SectionHeader from "./SectionHeader";
import ServiceItem from "./ServiceItem";

interface Service {
  Title: string
  Description: string
  ImageUrl: string
}

interface ServicesGridProps {
  services: Service[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <>
      {/* Activities Grid Start */}
      <div className="w-full px-4 py-5">
        <div className="container mx-auto py-5">
          <SectionHeader
            subtitle="Services"
          />

          {services && services.length > 0 ? (
            <div className="flex flex-wrap mx-4 gap-y-4">
              {services.map((service, index) => (
                <ServiceItem
                  key={index}
                  Title={service.Title}
                  Description={service.Description}
                  ImageUrl={service.ImageUrl}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No services available at this time. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Activities Grid End */}
    </>
  );
}
