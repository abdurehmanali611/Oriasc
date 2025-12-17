"use client";

import Image from "next/image";

interface PartnerItemProps {
  Title: string;
  logoUrl: string;
}

export default function PartnerItem({ Title, logoUrl }: PartnerItemProps) {
  const partnerStyles =
    "flex-shrink-0 flex gap-2 items-center p-3 bg-white border border-gray-300 rounded-xl min-w-[250px] shadow-md mr-8"; 

  return (
    <div className={partnerStyles}>
      <Image
        src={logoUrl}
        alt={Title}
        width={50}
        height={50}
        loading="eager"
        className="rounded-full object-cover"
      />
      <h3 className="font-serif text-lg font-semibold text-gray-800 whitespace-nowrap">
        {Title}
      </h3>
    </div>
  );
}