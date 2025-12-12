"use client"
import EventsList from "@/components/EventsList";
import { events } from "@/constants";
import { useLayoutEffect, useState } from "react";

export default function Events() {
  const [dynamicEvent, setDynamicEvent] = useState(events);
  useLayoutEffect(() => {
    setDynamicEvent(events);
  }, [events]);
  return (
    <div className="py-5">
      <EventsList events={dynamicEvent} />
    </div>
  );
}
