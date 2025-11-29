// components/SermonItem.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Video, Headphones, FileText, Image as ImageIcon } from 'lucide-react';

interface SermonItemProps {
  image?: string;
  date?: string;
  title?: string;
  speaker?: string;
  delay?: string;
  description?: string;
  slug?: string;
}

export default function SermonItem({ 
  image = '/assets/sermon-1.jpg',
  date = '13 Nov 2023',
  title = 'Sermon Title',
  speaker = 'Admin',
  delay = '0.1s',
  description = 'sermon description',
  slug = '#'
}: SermonItemProps) {
  return (
    <div 
      className="w-full lg:w-1/2 xl:w-1/3 px-4 wow fadeInUp" 
      data-wow-delay={delay}
    >
      <div className="h-full shadow-[0_0_45px_rgba(0,0,0,0.08)]">
        <div className="overflow-hidden p-4 pb-0 relative h-64">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-500 hover:scale-110"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between pb-2">
            <div className="flex gap-3">
              <small className="inline-flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <Link 
                  href="#" 
                  className="text-gray-500 transition-all duration-500 hover:text-[#10b982]"
                >
                  {date}
                </Link>
              </small>
              <small className="inline-flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <Link 
                  href="#" 
                  className="text-gray-500 transition-all duration-500 hover:text-[#10b982]"
                >
                  {speaker}
                </Link>
              </small>
            </div>
            <div className="flex gap-2">
              <Link 
                href="#" 
                className="transition-all duration-500 hover:text-[#F1C152]"
              >
                <Video className="w-4 h-4 text-gray-500 transition-all duration-500" />
              </Link>
              <Link 
                href="#" 
                className="transition-all duration-500 hover:text-[#F1C152]"
              >
                <Headphones className="w-4 h-4 text-gray-500 transition-all duration-500" />
              </Link>
              <Link 
                href="#" 
                className="transition-all duration-500 hover:text-[#F1C152]"
              >
                <FileText className="w-4 h-4 text-gray-500 transition-all duration-500" />
              </Link>
              <Link 
                href="#" 
                className="transition-all duration-500 hover:text-[#F1C152]"
              >
                <ImageIcon className="w-4 h-4 text-gray-500 transition-all duration-500" />
              </Link>
            </div>
          </div>
          <Link 
            href={`/sermons/${slug}`}
            className="inline-block text-2xl font-semibold font-sans leading-tight mb-3 transition-all duration-500 hover:text-[#10b982]"
          >
            {title}
          </Link>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}
