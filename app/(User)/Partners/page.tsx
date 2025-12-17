"use client"
import PartnersGrid from "@/components/PartnerGrid";
import { Partner } from "@/constants";
import { useLayoutEffect, useState } from "react";

export default function Partners() {
  const [dynamicPartner, setDynamicPartner] = useState(Partner);
  useLayoutEffect(() => {
    setDynamicPartner(Partner)
  }, [Partner])
  return (
    <div className="py-5">
      <PartnersGrid partners={dynamicPartner} />
    </div>
  );
}
