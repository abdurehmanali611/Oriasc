import { Book, BookOpen, GraduationCap, HandHeart, Users } from "lucide-react";

export const activities = [
    {
      icon: 'fa6-solid:mosque',
      title: 'Mosque Development',
      description: 'Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.',
      delay: '0.1s'
    },
    {
      icon: 'mdi:hand-heart',
      title: 'Charity & Donation',
      description: 'Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.',
      delay: '0.3s'
    },
    {
      icon: 'fa6-solid:quran',
      title: 'Quran Learning',
      description: 'Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.',
      delay: '0.5s'
    },
    {
      icon: 'mdi:book-open-page-variant',
      title: 'Hadith & Sunnah',
      description: 'Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.',
      delay: '0.1s'
    },
    {
      icon: 'mdi:school',
      title: 'Parent Education',
      description: 'Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.',
      delay: '0.3s'
    },
    {
      icon: 'mdi:account-group',
      title: 'Help Orphans',
      description: 'Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.',
      delay: '0.5s'
    }
  ];

export const blogs = [
    {
      image: '/assets/blog-1.jpg',
      date: '01 Jan 2024',
      title: 'The Importance of Daily Prayer',
      excerpt: 'Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.',
      author: 'Sheikh Ahmed',
      delay: '0.1s',
      slug: 'importance-of-daily-prayer'
    },
    {
      image: '/assets/blog-2.jpg',
      date: '15 Jan 2024',
      title: 'Understanding Ramadan',
      excerpt: 'Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.',
      author: 'Imam Hassan',
      delay: '0.3s',
      slug: 'understanding-ramadan'
    },
    {
      image: '/assets/blog-3.jpg',
      date: '20 Jan 2024',
      title: 'Community Service in Islam',
      excerpt: 'Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam.',
      delay: '0.5s',
      slug: 'community-service-in-islam'
    }
  ];

export const events = [
    {
      date: '15 Feb 2024',
      time: 'Fri 18:00',
      title: 'Ramadan Preparation Workshop',
      description: 'Join us for a comprehensive workshop on preparing for the blessed month of Ramadan.',
      image: '/assets/events-1.jpg',
      delay: '0.1s',
      slug: 'ramadan-preparation-workshop'
    },
    {
      date: '22 Feb 2024',
      time: 'Sat 14:00',
      title: 'Community Iftar Gathering',
      description: 'Break your fast with the community in a warm and welcoming environment.',
      image: '/assets/events-2.jpg',
      delay: '0.3s',
      slug: 'community-iftar-gathering'
    },
    {
      date: '01 Mar 2024',
      time: 'Sun 10:00',
      title: 'Youth Islamic Education Program',
      description: 'Educational program designed for youth to learn about Islamic values and principles.',
      image: '/assets/events-3.jpg',
      delay: '0.5s',
      slug: 'youth-islamic-education-program'
    }
  ];

export const sermons = [
    {
      image: '/assets/sermon-1.jpg',
      date: '13 Nov 2024',
      title: 'The Importance of Patience in Islam',
      speaker: 'Sheikh Ahmed',
      delay: '0.1s',
      description: 'A powerful sermon about the virtue of patience and its significance in our daily lives.',
      slug: 'importance-of-patience'
    },
    {
      image: '/assets/sermon-2.jpg',
      date: '20 Nov 2024',
      title: 'Understanding the Five Pillars',
      speaker: 'Imam Hassan',
      delay: '0.3s',
      description: 'An in-depth discussion on the fundamental pillars of Islam and their practical application.',
      slug: 'understanding-five-pillars'
    },
    {
      image: '/assets/sermon-3.jpg',
      date: '27 Nov 2024',
      title: 'The Power of Dua',
      speaker: 'Sheikh Mohammed',
      delay: '0.5s',
      description: 'Learn about the significance of supplication and how to make effective dua.',
      slug: 'power-of-dua'
    }
  ];

export const leader = {
    image: '/assets/team-1.jpg',
    name: 'Anamul Hasan',
    role: 'President',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    social: {
      facebook: 'https://facebook.com/profile',
      twitter: 'https://twitter.com/profile',
      instagram: 'https://instagram.com/profile',
      linkedin: 'https://linkedin.com/in/profile'
    }
  };

 export const teamMembers = [
    {
      image: '/assets/team-2.jpg',
      name: 'Ahmed Ali',
      position: 'Vice President',
      delay: '0.2s',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      image: '/assets/team-3.jpg',
      name: 'Fatima Hassan',
      position: 'Secretary',
      delay: '0.4s',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      image: '/assets/team-4.jpg',
      name: 'Omar Ibrahim',
      position: 'Treasurer',
      delay: '0.6s',
      social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        linkedin: '#'
      }
    }
  ];

export const testimonials = [
    {
      image: '/assets/testimonial-1.jpg',
      name: 'Sarah Ahmed',
      profession: 'Community Member',
      content: 'The Islamic center has been a blessing for our family. The programs and activities have helped us grow spiritually and connect with our community.',
      rating: 5
    },
    {
      image: '/assets/testimonial-2.jpg',
      name: 'Mohammed Ali',
      profession: 'Youth Program Participant',
      content: 'I have learned so much about my faith through the educational programs. The teachers are knowledgeable and caring.',
      rating: 5
    },
    {
      image: '/assets/testimonial-3.jpg',
      name: 'Aisha Khan',
      profession: 'Volunteer',
      content: 'Being part of this community has enriched my life. The charity work and community service opportunities are truly impactful.',
      rating: 5
    }
  ];