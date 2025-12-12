"use client"
import SermonsGrid from "@/components/SermonGrid";
import { sermons } from "@/constants";
import { useLayoutEffect, useState } from "react";

export default function Sermons() {
  const [dynamicSermon, setDynamicSermon] = useState(sermons);
  useLayoutEffect(() => {
    setDynamicSermon(sermons);
  }, [sermons]);
  return (
    <div className="py-5">
      <SermonsGrid sermons={dynamicSermon} />
    </div>
  );
}
