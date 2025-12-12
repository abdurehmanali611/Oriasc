"use client"
import TestimonialsCarousel from "@/components/TestimonialCarousel";
import { testimonials } from "@/constants";
import { useLayoutEffect, useState } from "react";

export default function Testimonial() {
  const [dynamicTestimonial, setDynamicTestimonial] = useState(testimonials);
  useLayoutEffect(() => {
    setDynamicTestimonial(testimonials);
  }, [testimonials]);
  return (
    <div>
      <TestimonialsCarousel testimonials={dynamicTestimonial} />
    </div>
  );
}
