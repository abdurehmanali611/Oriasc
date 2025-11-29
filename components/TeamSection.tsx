// components/TeamSection.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import SectionHeader from './SectionHeader';
import TeamMember from './TeamMember';

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

interface TeamMemberData {
  image: string;
  name: string;
  position: string;
  delay: string;
  social?: SocialLinks;
}

interface LeaderData {
  image?: string;
  name?: string;
  role?: string;
  bio?: string;
  social?: SocialLinks;
}

interface TeamSectionProps {
  teamMembers: TeamMemberData[];
  leader?: LeaderData;
}

export default function TeamSection({ 
  teamMembers,
  leader = {
    image: '/assets/team-1.jpg',
    name: 'Anamul Hasan',
    role: 'President',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. aliquip ex ea commodo consequat.',
    social: {
      facebook: '#',
      twitter: '#',
      instagram: '#',
      linkedin: '#'
    }
  }
}: TeamSectionProps) {
  return (
    <>
      {/* Team Section Start */}
      <div className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <SectionHeader 
            subtitle="Our Team"
            title="Meet Our Organizer"
          />
          
          <div className="flex flex-wrap -mx-4 gap-y-12">
            {/* Main Team Member */}
            <div className="w-full lg:w-1/3 xl:w-5/12 px-4">
              <div 
                className="h-full p-[25px] bg-white overflow-hidden shadow-[0_0_45px_rgba(0,0,0,0.08)] wow zoomIn" 
                data-wow-delay="0.1s"
              >
                <div className="relative h-[500px]">
                  <Image
                    src={leader.image!}
                    alt={leader.name!}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Team Details */}
            <div className="w-full lg:w-2/3 xl:w-7/12 px-4">
              <div className="wow fadeIn" data-wow-delay="0.1s">
                <h1 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 mb-4">
                  {leader.name}
                </h1>
                <h5 className="font-normal italic text-[#F1C152] text-xl mb-4 font-sans">
                  {leader.role}
                </h5>
                <p className="mb-4 text-gray-700">{leader.bio}</p>
                <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-[#F1C152]">
                  <Link 
                    href={leader.social?.facebook ?? '#'}
                    className="w-12 h-12 flex items-center justify-center bg-[#10b982] text-[#0C1214] transition-all duration-500 hover:bg-[#0C1214] hover:text-[#10b982] rounded"
                  >
                    <Facebook className="w-5 h-5" />
                  </Link>
                  <Link 
                    href={leader.social?.twitter ?? '#'}
                    className="w-12 h-12 flex items-center justify-center bg-[#10b982] text-[#0C1214] transition-all duration-500 hover:bg-[#0C1214] hover:text-[#10b982] rounded"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link 
                    href={leader.social?.instagram ?? '#'}
                    className="w-12 h-12 flex items-center justify-center bg-[#10b982] text-[#0C1214] transition-all duration-500 hover:bg-[#0C1214] hover:text-[#10b982] rounded"
                  >
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link 
                    href={leader.social?.linkedin ?? '#'}
                    className="w-12 h-12 flex items-center justify-center bg-[#10b982] text-[#0C1214] transition-all duration-500 hover:bg-[#0C1214] hover:text-[#10b982] rounded"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              
              {/* Other Team Members */}
              <div className="flex flex-wrap -mx-4 gap-y-8">
                {teamMembers.map((member, index) => (
                  <TeamMember 
                    key={index}
                    image={member.image}
                    name={member.name}
                    role={member.position}
                    delay={member.delay}
                    social={member.social}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Team Section End */}
    </>
  );
}
