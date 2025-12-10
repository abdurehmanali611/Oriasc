import Hero from "@/components/Hero";
import AboutContent from "@/components/About";
import ActivitiesGrid from "@/components/ActivityGrid";
import SermonsGrid from "@/components/SermonGrid";
import EventsList from "@/components/EventsList";
import BlogGrid from "@/components/BlogGrid";
import TeamSection from "@/components/TeamSection";
import TestimonialsCarousel from "@/components/TestimonialCarousel";
import {
  activities,
  blogs,
  events,
  leader,
  sermons,
  testimonials,
} from "@/constants";
import Link from "next/link";

export default function UserHome() {
  const sampleActivities = activities.slice(0, 3);
  const sampleEvents = events.slice(0, 3);
  const sampleSermons = sermons.slice(0, 3);
  const sampleBlogs = blogs.slice(0, 3);
  const sampleTestimonials = testimonials.slice(0, 3);

  return (
    <div>
      <Hero title="Home" />
      <AboutContent />
      <div className="relative">
        <ActivitiesGrid activities={sampleActivities} />
        {activities.length > 3 && (
          <div className="text-center pb-8">
            <Link
              href="/Activities"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#10b982] text-white font-semibold rounded-lg transition-all duration-500 hover:bg-[#0C1214] hover:text-white"
            >
              View All Activities
            </Link>
          </div>
        )}
      </div>

      {/* Events Section with View All Link */}
      <div className="relative">
        <EventsList events={sampleEvents} />
        {events.length > 3 && (
          <div className="text-center pb-8">
            <Link
              href="/Events"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#10b982] text-white font-semibold rounded-lg transition-all duration-500 hover:bg-[#0C1214] hover:text-white"
            >
              View All Events
            </Link>
          </div>
        )}
      </div>

      {/* Sermons Section with View All Link */}
      <div className="relative">
        <SermonsGrid sermons={sampleSermons} />
        {sermons.length > 3 && (
          <div className="text-center pb-8">
            <Link
              href="/Sermons"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#10b982] text-white font-semibold rounded-lg transition-all duration-500 hover:bg-[#0C1214] hover:text-white"
            >
              View All Sermons
            </Link>
          </div>
        )}
      </div>

      {/* Blog Section with View All Link */}
      <div className="relative">
        <BlogGrid blogs={sampleBlogs} />
        {blogs.length > 3 && (
          <div className="text-center pb-8">
            <Link
              href="/Blog"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#10b982] text-white font-semibold rounded-lg transition-all duration-500 hover:bg-[#0C1214] hover:text-white"
            >
              View All Blog Posts
            </Link>
          </div>
        )}
      </div>

      <TeamSection leader={leader} />
      <div className="relative">
        <TestimonialsCarousel testimonials={sampleTestimonials} />
        {testimonials.length > 3 && (
          <div className="text-center pb-8">
            <Link
              href="/Testimonial"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#10b982] text-white font-semibold rounded-lg transition-all duration-500 hover:bg-[#0C1214] hover:text-white"
            >
              View All Testimonials
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
