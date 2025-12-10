import ActivitiesGrid from "@/components/ActivityGrid";
import TestimonialsCarousel from "@/components/TestimonialCarousel";
import { activities, testimonials } from "@/constants";

export default function Activities() {
    return <div className="py-5">
        <ActivitiesGrid activities={activities}/>
        <TestimonialsCarousel testimonials={testimonials}/>
    </div>
}