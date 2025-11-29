// components/BlogItem.tsx
import Image from 'next/image';
import Link from 'next/link';
import { User, MessageCircle, Bookmark } from 'lucide-react';

interface BlogItemProps {
  image?: string;
  date?: string;
  title?: string;
  excerpt?: string;
  author?: string;
  delay?: string;
  slug?: string;
}

export default function BlogItem({ 
  image = '/assets/blog-1.jpg',
  date = '01 Jan 2045',
  title = 'Blog Title',
  excerpt = 'Blog excerpt',
  author = 'Admin',
  delay = '0.1s',
  slug = '#'
}: BlogItemProps) {
  return (
    <div 
      className="w-full lg:w-1/2 xl:w-1/3 px-4 wow fadeInUp" 
      data-wow-delay={delay}
    >
      <div className="h-full shadow-[0_0_45px_rgba(0,0,0,0.08)]">
        <div className="relative overflow-hidden h-64">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-500 hover:scale-110"
          />
          <div className="bg-[#10b982] inline-block px-3 py-2 text-center text-[#0C1214] absolute top-0 right-0">
            {date}
          </div>
        </div>
        <div className="p-4 bg-white">
          <div className="flex justify-between pb-2 border-b border-gray-200">
            <div className="flex gap-4">
              <small className="inline-flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <Link 
                  href="#" 
                  className="text-gray-500 transition-all duration-500 hover:text-[#10b982]"
                >
                  By {author}
                </Link>
              </small>
              <small className="inline-flex items-center">
                <MessageCircle className="w-4 h-4 mr-2 text-gray-500" />
                <Link 
                  href="#" 
                  className="text-gray-500 transition-all duration-500 hover:text-[#10b982]"
                >
                  12 Comments
                </Link>
              </small>
            </div>
            <div>
              <Link 
                href="#" 
                className="transition-all duration-500 hover:text-[#F1C152]"
              >
                <Bookmark className="w-4 h-4 text-gray-500 transition-all duration-500" />
              </Link>
            </div>
          </div>
          <Link 
            href={`/blog/${slug}`}
            className="inline-block text-2xl font-semibold font-sans leading-tight mb-3 mt-3 transition-all duration-500 hover:text-[#F1C152]"
          >
            {title}
          </Link>
          <p className="mb-4 text-gray-600">{excerpt}</p>
          <Link 
            href={`/blog/${slug}`}
            className="inline-flex items-center justify-center px-3 py-2 bg-[#10b982] text-[#0C1214] font-semibold transition-all duration-500 hover:bg-[#0C1214] hover:text-[#10b982]"
          >
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
}
