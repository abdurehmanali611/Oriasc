"use client"
import ServicesGrid from "@/components/ServiceGrid";
import { Service } from "@/constants";
import { useLayoutEffect, useState } from "react";

export default function Services() {
  const [dynamicService, setDynamicService] = useState(Service);
  useLayoutEffect(() => {
    setDynamicService(Service);
  }, [Service])
  return (
    <div className="py-5">
      <ServicesGrid services={dynamicService} />
    </div>
  );
}
