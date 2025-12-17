"use client";
import Image from "next/image";

interface ServiceItemProps {
  Title: string;
  Description: string;
  ImageUrl: string;
}

export default function ServiceItem({
  Title,
  Description,
  ImageUrl,
}: ServiceItemProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 wow fadeInUp mb-8 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 w-full lg:w-1/2 lg:flex-wrap md:1/2">
      <div className="h-full flex flex-col justify-between p-6 bg-white transition-all duration-500 shadow-[0_0_45px_rgba(12,18,20,0.08)] hover:bg-[#10b982] group rounded-lg">
        <div>
          <h4 className="text-xl font-semibold font-sans mb-3 group-hover:text-white text-center">
            {Title || "Service"}
          </h4>
          <div className="flex gap-10 items-center lg:items-start lg:flex-row flex-col-reverse">
            <p className="mb-4 text-gray-700 group-hover:text-white text-center text-lg">
              {Description || "No description provided"}
            </p>
            <Image
              src={ImageUrl}
              alt={Title}
              width={260}
              height={260}
              loading="eager"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
