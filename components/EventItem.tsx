import Image from 'next/image';
import Link from 'next/link';

interface EventItemProps {
  startDate?: string;
  endDate?: string;
  title?: string;
  description?: string;
  image?: string;
  slug?: string;
}

export default function EventItem({ 
  startDate,
  endDate,
  title,
  description,
  image,
  slug
}: EventItemProps) {
  return (
    <div 
      className="flex flex-col lg:flex-row justify-between items-center gap-4 wow fadeInUp mb-8 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300" 
    >
      <div className="w-full lg:w-1/4 xl:w-1/6 pr-0">
        <div className="text-center border-b border-[#10b982] py-3 px-2 bg-[#10b982]/5 rounded">
          <h6 className="text-base font-semibold font-sans text-[#10b982]">{startDate || "TBD"}</h6>
          <p className="mb-0 text-sm text-gray-600">{endDate || "TBD"}</p>
        </div>
      </div>
      <div className="w-full lg:w-3/4 xl:w-1/2 border-l border-[#10b982]/30 pb-5 lg:pb-0">
        <div className="ml-0 lg:ml-3">
          <h4 className="mb-3 text-2xl font-bold font-sans">{title}</h4>
          <p className="mb-4 w-[65%]">{description}</p>
        </div>
      </div>
      <div className="w-full lg:w-1/3">
        <div className="overflow-hidden mb-5 relative h-48">
          <Image
            src={image ?? "/assets/events-1.jpg"}
            alt={title ?? "Image"}
            fill
            className="object-cover transition-all duration-500 hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}
