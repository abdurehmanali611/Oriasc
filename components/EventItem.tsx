// components/EventItem.tsx
import Image from 'next/image';
import Link from 'next/link';

interface EventItemProps {
  date?: string;
  time?: string;
  title?: string;
  description?: string;
  image?: string;
  delay?: string;
  slug?: string;
}

export default function EventItem({ 
  date = '01 Jan 2045',
  time = 'Fri 06:55',
  title = 'Event Title',
  description = 'Event description',
  image = '/assets/events-1.jpg',
  delay = '0.1s',
  slug = '#'
}: EventItemProps) {
  return (
    <div 
      className="flex justify-between items-center gap-4 wow fadeInUp" 
      data-wow-delay={delay}
    >
      <div className="w-1/4 lg:w-1/6 pr-0">
        <div className="text-center border-b border-[#0C1214] py-3 px-2">
          <h6 className="text-base font-semibold font-sans">{date}</h6>
          <p className="mb-0 text-sm">{time}</p>
        </div>
      </div>
      <div className="w-3/4 lg:w-1/2 border-l border-[#0C1214] pb-5">
        <div className="ml-3">
          <h4 className="mb-3 text-2xl font-bold font-sans">{title}</h4>
          <p className="mb-4 w-[65%]">{description}</p>
          <Link 
            href={`/events/${slug}`}
            className="inline-flex items-center justify-center px-3 py-2 bg-[#10b982] text-[#0C1214] font-semibold transition-all duration-500 hover:bg-[#0C1214] hover:text-[#10b982]"
          >
            Join Now
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-1/3">
        <div className="overflow-hidden mb-5 relative h-48">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-500 hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}
