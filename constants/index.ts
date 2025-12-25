import {
  GetActivity,
  GetBlog,
  GetEvent,
  GetHero,
  GetPartner,
  GetSermon,
  GetService,
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
  },
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
  },
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

const dummyServices = [
  {
    Title: "Halal Service",
    Description: "This community has been a blessing to me and my family. The support and fellowship we've found here is truly remarkable.",
    ImageUrl: "/assets/hero.jpg"
  }
];

const dummyPartners = [
  {
    Title: "EIASC",
    Type: "Shariah Partner",
    logoUrl: "/assets/logo.jpg"
  },
  {
    Title: "EIASC",
    Type: "Technology Partner",
    logoUrl: "/assets/logo.jpg"
  },
  {
    Title: "EIASC",
    Type: "Business Partner",
    logoUrl: "/assets/logo.jpg"
  },
  {
    Title: "EIASC",
    Type: "Community Partner",
    logoUrl: "/assets/logo.jpg"
  }
]

const dummyBranches = [
  {
    id: 1,
    Name: "An-Noor Community Center",
    City: "Los Angeles, CA",
    Contact: "(555) 123-4667",
    Category: "Regional",
    Latitude: 10.1203,
    Longitude: 39.0321
  },
  {
    id: 2,
    Name: "Al-Falah Islamic Center",
    City: "Toronto, ON",
    Contact: "987-6543",
    Category: "Zonal",
    Latitude: 11.0213,
    Longitude: 40.2108
  },
  {
    id: 3,
    Name: "Ihsan Institute, UK",
    City: "London",
    Contact: "+44 20 7XXX XXX",
    Category: "Woreda",
    Latitude: 12.2314,
    Longitude: 41.2310
  }
];

const fetchedActivities = await GetActivity();
const fetchedHero = await GetHero();
const fetchedBlogs = await GetBlog();
const fetchedEvents = await GetEvent();
const fetchedSermons = await GetSermon();
const fetchedTestimonials = await GetTestimonial();
const fetchedTeam = await GetTeam();
const fetchedServices = await GetService();
const fetchedPartners = await GetPartner();


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

export const leader =
  fetchedTeam && fetchedTeam.length > 0 ? fetchedTeam : dummyTeamLeaders;

export const Service =
  fetchedServices && fetchedServices.length > 0 ? fetchedServices : dummyServices;

export const Partner =
  fetchedPartners && fetchedPartners.length > 0 ? fetchedPartners : dummyPartners;

export const testimonials =
  fetchedTestimonials && fetchedTestimonials.length > 0
    ? fetchedTestimonials
    : dummyTestimonials;

export const Branches = dummyBranches;

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
    name: "Services",
    icon: "flat-color-icons:services",
  },
  {
    id: 6,
    name: "Partners",
    icon: "arcticons:partners",
  },
  {
    id: 7,
    name: "Branches",
    icon: "streamline-ultimate-color:building-2",
  },
  {
    id: 8,
    name: "News",
    icon: "streamline-ultimate-color:blogger-logo",
  },
  {
    id: 9,
    name: "Sermons",
    icon: "catppuccin:video",
  },
  {
    id: 10,
    name: "Team",
    icon: "fluent-color:people-team-16",
  },
  {
    id: 11,
    name: "Testimonial",
    icon: "dashicons:testimonial",
  },
  {
    id: 12,
    name: "Contact",
    icon: "streamline-ultimate-color:messages-logo",
  },
  {
    id: 13,
    name: "Change Password",
    icon: "fluent-color:person-key-20",
  },
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

export const partnerTypes = [
  {
    id: 1,
    name: "Technology Partner"
  },
  {
    id: 2,
    name: "Shariah Partner"
  },
  {
    id: 3,
    name: "Business Partner"
  },
  {
    id: 4,
    name: "Community Partner"
  }
]

export const AreaCategory = [
  {
    id: 1,
    name: "Regional"
  },
  {
    id: 2,
    name: "Zonal"
  },
  {
    id: 3,
    name: "Woreda"
  }
]
