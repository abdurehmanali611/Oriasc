import ActivitiesGrid from "@/components/ActivityGrid";
import Hero from "@/components/Hero";
import TestimonialsCarousel from "@/components/TestimonialCarousel";
import { activities, testimonials } from "@/constants";

export const metadata = {
  title: 'About Us - ORIASC',
  description: 'Learn more about ORIASC and our mission',
};

export default function Activities() {
    return <div>
        <Hero title="Activities" breadcrumbs={[
            {label: "Pages"},
            {label: "Activities"}
        ]}/>
        <ActivitiesGrid activities={activities}/>
        <TestimonialsCarousel testimonials={testimonials}/>
    </div>
}