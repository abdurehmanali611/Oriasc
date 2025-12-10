import {
  GetActivity,
  GetBlog,
  GetEvent,
  GetHero,
  GetSermon,
  GetTeam,
  GetTestimonial,
} from "@/lib/actions";

const dummyHero = [
  {
    id: 1,
    Title: "Welcome to Our Community",
    Body: "Join us in building a stronger, more connected community through faith and service.",
    startDate: new Date().toLocaleDateString(),
    endDate: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toLocaleDateString(),
    ImageUrl: "/assets/hero.jpg",
  },
];

const dummyActivities = [
  {
    id: 1,
    Title: "Community Outreach",
    Description:
      "Helping those in need through various community programs and initiatives.",
    Stat: 150,
    DateTime: new Date().toLocaleDateString("en-US"),
  }
];

const dummyBlogs = [
  {
    id: 1,
    Title: "Getting Started with Our Community",
    Description:
      "Learn more about our mission, values, and how you can get involved.",
    Slug: "getting-started",
    ImageUrl: "/assets/blog-1.jpg",
    Author: "Admin",
    createdAt: new Date().toDateString(),
  },
];

const dummyEvents = [
  {
    id: 1,
    Title: "Weekly Gathering",
    Slug: "weekly-gathering",
    Description: "Join us for our weekly community gathering and fellowship.",
    ImageUrl: "/assets/events-1.jpg",
    StartDate: new Date().toLocaleDateString("en-US"),
    EndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(
      "en-US"
    ),
  },
];

const dummySermons = [
  {
    id: 1,
    Title: "Faith and Community",
    Slug: "faith-community",
    Description:
      "Exploring the importance of faith in building strong communities.",
    ImageVideoUrl: "/assets/sermon-1.jpg",
    Speaker: "Guest Speaker",
  },
];

const dummyTeamLeaders = [
  {
    id: 1,
    Name: "Dr. Sherif Ali",
    Position: "general manager",
    ImageUrl: "/assets/team-1.jpg",
    Facebook: "#",
    Instagram: "#",
    LinkedIn: "#",
  },
  {
    id: 2,
    Name: "Community Leader",
    Position: "Director",
    ImageUrl: "/assets/team-2.jpg",
    Facebook: "#",
    Instagram: "#",
    LinkedIn: "#",
  },
  {
    id: 3,
    Name: "Community Leader",
    Position: "Director",
    ImageUrl: "/assets/team-3.jpg",
    Facebook: "#",
    Instagram: "#",
    LinkedIn: "#",
  }
];

const dummyTestimonials = [
  {
    id: 1,
    Name: "Community Member",
    Proffession: "Local Resident",
    ImageUrl: "/assets/testimonial-1.jpg",
    Content:
      "This community has been a blessing to me and my family. The support and fellowship we've found here is truly remarkable.",
    Rating: 5,
  },
];

const fetchedActivities = await GetActivity();
const fetchedHero = await GetHero();
const fetchedBlogs = await GetBlog();
const fetchedEvents = await GetEvent();
const fetchedSermons = await GetSermon();
const fetchedTestimonials = await GetTestimonial();
const fetchedTeam = await GetTeam()

export const activities =
  fetchedActivities && fetchedActivities.length > 0
    ? fetchedActivities
    : dummyActivities;

export const Hero =
  fetchedHero && fetchedHero.length > 0 ? fetchedHero : dummyHero;

export const blogs =
  fetchedBlogs && fetchedBlogs.length > 0 ? fetchedBlogs : dummyBlogs;

export const events =
  fetchedEvents && fetchedEvents.length > 0 ? fetchedEvents : dummyEvents;

export const sermons =
  fetchedSermons && fetchedSermons.length > 0 ? fetchedSermons : dummySermons;

export const leader = fetchedTeam && fetchedTeam.length > 0 ? fetchedTeam : dummyTeamLeaders

export const testimonials =
  fetchedTestimonials && fetchedTestimonials.length > 0
    ? fetchedTestimonials
    : dummyTestimonials;

export const AbsoluteAdminList = [
  {
    id: 1,
    name: "Dashboard",
    icon: "fluent-color:home-16",
  },
  {
    id: 2,
    name: "Hero",
    icon: "openmoji:superhero",
  },
  {
    id: 3,
    name: "Activities",
    icon: "lucide:activity",
  },
  {
    id: 4,
    name: "Events",
    icon: "clarity:event-solid",
  },
  {
    id: 5,
    name: "Blogs",
    icon: "streamline-ultimate-color:blogger-logo",
  },
  {
    id: 6,
    name: "Sermons",
    icon: "catppuccin:video",
  },
  {
    id: 7,
    name: "Team",
    icon: "fluent-color:people-team-16",
  },
  {
    id: 8,
    name: "Testimonial",
    icon: "dashicons:testimonial",
  },
  {
    id: 9,
    name: "Contact",
    icon: "streamline-ultimate-color:messages-logo"
  }
];

export const cta_links = [
  {
    id: 1,
    name: "About",
  },
  {
    id: 2,
    name: "Activities",
  },
  {
    id: 3,
    name: "Events",
  },
  {
    id: 4,
    name: "Blog",
  },
  {
    id: 5,
    name: "Sermons",
  },
  {
    id: 6,
    name: "Contact",
  },
  {
    id: 7,
    name: "Team",
  },
  {
    id: 8,
    name: "Testimonial",
  },
];
