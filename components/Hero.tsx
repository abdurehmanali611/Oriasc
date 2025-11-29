// components/Hero.tsx
import Image from 'next/image';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  url?: string;
}

interface HeroProps {
  title?: string;
  breadcrumbs?: Breadcrumb[];
  background?: string;
}

export default function Hero({ 
  title = 'Page Title', 
  breadcrumbs = [],
  background = 'hero-header' 
}: HeroProps) {
  return (
    <div 
      className="w-full px-4 mb-24 pt-60 lg:pt-48 pb-24 bg-center bg-no-repeat bg-cover h-screen"
      style={{ backgroundImage: "url('/assets/hero.jpg')" }}
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-[550px]">
            <div className="p-12 bg-white/50">
              <h1 className="text-6xl font-bold text-[#0C1214] font-sans">
                {title}
              </h1>
              <ol className="flex items-center space-x-2 mb-0 text-lg">
                <li className="flex items-center">
                  <Link href="/">Home</Link>
                </li>
                {breadcrumbs.map((breadcrumb, index) => {
                  const isLast = index === breadcrumbs.length - 1;
                  
                  if (!isLast) {
                    return (
                      <li 
                        key={index}
                        className="flex items-center before:content-['/'] before:mx-2"
                      >
                        <Link href={breadcrumb.url || '#'}>
                          {breadcrumb.label}
                        </Link>
                      </li>
                    );
                  } else {
                    return (
                      <li 
                        key={index}
                        className="flex items-center before:content-['/'] before:mx-2 text-[#0C1214]"
                        aria-current="page"
                      >
                        {breadcrumb.label}
                      </li>
                    );
                  }
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
