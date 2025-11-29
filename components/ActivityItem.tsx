// components/ActivityItem.tsx
'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';

interface ActivityItemProps {
  icon: string; // Only accept string icons
  title?: string;
  description?: string;
  delay?: string;
}

export default function ActivityItem({ 
  icon,
  title = 'Activity Title',
  description = 'Activity description',
  delay = '0.1s'
}: ActivityItemProps) {
  return (
    <div 
      className="w-full lg:w-1/2 xl:w-1/3 px-4 wow fadeInUp" 
      data-wow-delay={delay}
    >
      <div className="h-full flex items-center justify-center p-4 bg-white transition-all duration-500 shadow-[0_0_45px_rgba(12,18,20,0.08)] hover:bg-[#10b982] hover:text-[#0C1214] group">
        <Icon 
          icon={icon} 
          className="w-16 h-16 text-[#10b982] group-hover:text-[#0C1214]" 
        />
        <div className="mx-4">
          <h4 className="text-xl font-semibold font-sans mb-2">{title}</h4>
          <p className="mb-4">{description}</p>
          <Link 
            href="/activities"
            className="inline-flex items-center justify-center px-3 py-2 bg-[#10b982] text-[#0C1214] font-semibold transition-all duration-500 hover:bg-[#F8F9FA] hover:text-[#0C1214]"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
