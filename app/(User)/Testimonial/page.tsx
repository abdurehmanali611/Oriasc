import TestimonialsCarousel from "@/components/TestimonialCarousel";
import { testimonials } from "@/constants";

export default function Testimonial() {
    return <div>
        <TestimonialsCarousel testimonials={testimonials}/>
    </div>
}