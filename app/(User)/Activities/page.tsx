"use client"
import ActivitiesGrid from "@/components/ActivityGrid";
import TestimonialsCarousel from "@/components/TestimonialCarousel";
import { activities, testimonials } from "@/constants";
import { useLayoutEffect, useState } from "react";

export default function Activities() {
  const [dynamicActivity, setDynamicActivity] = useState(activities);
  const [dynamicTestimonial, setDynamicTestimonial] = useState(testimonials);
  useLayoutEffect(() => {
    setDynamicActivity(activities);
    setDynamicTestimonial(testimonials);
  }, [activities, testimonials]);
  return (
    <div className="py-5">
      <ActivitiesGrid activities={dynamicActivity} />
      <TestimonialsCarousel testimonials={dynamicTestimonial} />
    </div>
  );
}
