import Hero from "@/components/Hero";
import TestimonialsCarousel from "@/components/TestimonialCarousel";
import { testimonials } from "@/constants";

const metadata = {
  title: 'About Us - ORIASC',
  description: 'Learn more about ORIASC and our mission',
};
export default function Testimonial() {
    return <div>
        <Hero title="Testimonial" breadcrumbs={[
            {label: "Pages"},
            {label: "Testimonial"}
        ]}/>
        <TestimonialsCarousel testimonials={testimonials}/>
    </div>
}