// components/AboutContent.tsx
import { Icon } from '@iconify/react';
import { Check, Eye, Flag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface AboutData {
  title?: string;
  subtitle?: string;
  description?: string;
  visionTitle?: string;
  visionText?: string;
  missionTitle?: string;
  missionText?: string;
  testimonialText?: string;
  raisedAmount?: string;
  ctaTitle?: string;
  features?: string[];
}

interface AboutContentProps {
  aboutData?: AboutData;
}

export default function AboutContent({ aboutData }: AboutContentProps) {
  const {
    title = "Allah Help Those Who Help Others",
    subtitle = "About ORIASC",
    description = "Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam. Etiam quis mauris justo. Vivamus purus nulla, rutrum ac risus in.",
    visionTitle = "Our Vision",
    visionText = "Lorem ipsum dolor sit amet tetur nod elit sed",
    missionTitle = "Our Mission",
    missionText = "Lorem ipsum dolor sit amet tetur nod elit sed",
    testimonialText = "Lorem ipsum dolor sit amet elit. Donec tempus eros vel dolor mattis aliquam. Etiam quis mauris justo.",
    raisedAmount = "$20,46",
    ctaTitle = "Every Muslim Needs To Realise The Importance Of The \"Pillar\" Of Islam",
    features = [
      "Charity & Donation",
      "Parent Education",
      "Hadith & Sunnah",
      "Mosque Development"
    ]
  } = aboutData || {};

  return (
    <>
      {/* About Content Start */}
      <div className="w-full px-4 py-5">
        <div className="container mx-auto py-5">
          <div className="flex flex-wrap gap-5 mb-5">
            {/* Image Grid */}
            <div className="w-full xl:w-[calc(50%-1.25rem)]">
              <div className="flex flex-wrap gap-4">
                <div className="w-[calc(50%-0.5rem)]">
                  <Image
                    src="/assets/about-1.jpg"
                    alt="About image 1"
                    width={400}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[calc(50%-0.5rem)]">
                  <Image
                    src="/assets/about-2.jpg"
                    alt="About image 2"
                    width={400}
                    height={300}
                    className="w-full pb-3"
                  />
                  <Image
                    src="/assets/about-3.jpg"
                    alt="About image 3"
                    width={400}
                    height={300}
                    className="w-full pt-3"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full xl:w-[calc(50%-1.25rem)]">
              <p className="text-xl uppercase text-[#10b982]">{subtitle}</p>
              <h1 className="text-5xl font-bold font-sans pb-4 m-0">{title}</h1>
              <p className="pb-4">{description}</p>

              {/* Vision & Mission */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="w-full md:w-[calc(50%-0.5rem)]">
                  <div className="ps-3 flex items-center justify-start">
                    <span className="bg-[#10b982] w-16 h-16 flex items-center justify-center rounded-full mt-4 me-2">
                      <Eye />
                    </span>
                    <div className="ms-4">
                      <h5 className="text-xl font-semibold font-sans">{visionTitle}</h5>
                      <p>{visionText}</p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[calc(50%-0.5rem)]">
                  <div className="ps-3 flex items-center justify-start">
                    <span className="bg-[#10b982] w-16 h-16 flex items-center justify-center rounded-full mt-4 me-2">
                      <Flag />
                    </span>
                    <div className="ms-4">
                      <h5 className="text-xl font-semibold font-sans">{missionTitle}</h5>
                      <p>{missionText}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card */}
              <div className="bg-[#F8F9FA] p-3 mb-4">
                <div className="flex flex-wrap items-center justify-center">
                  <div className="w-3/12">
                    <Image
                      src="/assets/about-child.jpg"
                      alt="Child"
                      width={150}
                      height={150}
                      className="w-full rounded-full"
                    />
                  </div>
                  <div className="w-6/12">
                    <p className="mb-0">{testimonialText}</p>
                  </div>
                  <div className="w-3/12">
                    <h2 className="mb-0 text-[#10b982] text-center font-bold font-sans">
                      {raisedAmount}
                    </h2>
                    <h5 className="mb-0 text-center font-semibold font-sans">Raised</h5>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="flex flex-wrap gap-2">
                <div className="w-full md:w-[calc(50%-0.25rem)]">
                  <p className="mb-2">
                    <Check />
                    {features[0]}
                  </p>
                  <p className="mb-0">
                    <Check />
                    {features[1]}
                  </p>
                </div>
                <div className="w-full md:w-[calc(50%-0.25rem)]">
                  <p className="mb-2">
                   <Check />
                    {features[2]}
                  </p>
                  <p className="mb-0">
                    <Check />
                    {features[3]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="container mx-auto text-center h-56 bg-[#10b982] py-5 flex justify-center">
            <div className="flex gap-4 items-center">
              <div className="w-full lg:w-2/12">
                <Icon icon="noto:mosque" width="128" height="128" />
              </div>
              <div className="w-full lg:w-7/12 text-center lg:text-left">
                <h1 className="mb-0 text-4xl font-bold font-sans">{ctaTitle}</h1>
              </div>
              <div className="w-full lg:w-3/12">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-4 py-2 bg-[#F8F9FA] text-[#0C1214] font-semibold rounded transition-all duration-500 border-0 hover:bg-[#0C1214] hover:text-[#F8F9FA]"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Content End */}
    </>
  );
}
