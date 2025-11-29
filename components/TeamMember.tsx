// components/TeamMember.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

interface TeamMemberProps {
  image?: string;
  name?: string;
  role?: string;
  social?: SocialLinks;
  delay?: string;
}

export default function TeamMember({ 
  image = '/assets/team-2.jpg',
  name = 'Team Member',
  role = 'position',
  social = {
    facebook: '#',
    twitter: '#',
    instagram: '#',
    linkedin: '#'
  },
  delay = '0.2s'
}: TeamMemberProps) {
  return (
    <div 
      className="w-full md:w-1/3 px-4 wow zoomIn" 
      data-wow-delay={delay}
    >
      <div className="relative overflow-hidden group">
        <div className="relative h-80">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute w-full h-full top-0 left-0 p-[15px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-[rgba(241,193,82,0.7)]">
          <div className="text-center">
            <h5 className="mb-0 text-[#0C1214] font-semibold font-sans text-lg">
              {name}
            </h5>
            <p className="text-[#0C1214] mb-4">{role}</p>
            <div className="flex items-center justify-center space-x-2">
              <Link 
                href={social.facebook ?? '#'}
                className="w-8 h-8 flex items-center justify-center bg-[#0C1214] text-[#F1C152] transition-all duration-500 hover:bg-[#F1C152] hover:text-[#0C1214] rounded"
              >
                <Facebook className="w-4 h-4" />
              </Link>
              <Link 
                href={social.twitter ?? '#'}
                className="w-8 h-8 flex items-center justify-center bg-[#0C1214] text-[#F1C152] transition-all duration-500 hover:bg-[#F1C152] hover:text-[#0C1214] rounded"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link 
                href={social.instagram ?? '#'}
                className="w-8 h-8 flex items-center justify-center bg-[#0C1214] text-[#F1C152] transition-all duration-500 hover:bg-[#F1C152] hover:text-[#0C1214] rounded"
              >
                <Instagram className="w-4 h-4" />
              </Link>
              <Link 
                href={social.linkedin ?? '#'}
                className="w-8 h-8 flex items-center justify-center bg-[#0C1214] text-[#F1C152] transition-all duration-500 hover:bg-[#F1C152] hover:text-[#0C1214] rounded"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
