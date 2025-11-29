"use client"
import AboutContent from "@/components/About";
import ActivitiesGrid from "@/components/ActivityGrid";
import BlogGrid from "@/components/BlogGrid";
import EventsList from "@/components/EventsList";
import Hero from "@/components/Hero";
import SermonsGrid from "@/components/SermonGrid";
import TeamSection from "@/components/TeamSection";
import TestimonialsCarousel from "@/components/TestimonialCarousel";
import { activities, blogs, events, leader, sermons, teamMembers, testimonials } from "@/constants";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutContent />
      <ActivitiesGrid activities={activities}/>
      <EventsList events={events}/>
      <SermonsGrid sermons={sermons}/>
      <BlogGrid blogs={blogs}/>
      <TeamSection teamMembers={teamMembers} leader={leader}/>
      <TestimonialsCarousel testimonials={testimonials}/>
    </div>
  );
}
