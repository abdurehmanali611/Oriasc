import { Icon } from "@iconify/react";
import { Check, Eye, Flag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    description = "Oromiya Region Islamic Affairs Supreme Council was established in 1997 and reestablished pursuant to the enactment of the federal law act Federal Negarete Gazette in 2020 in the Oromiya Region and is a statutory council under the Ethiopian Islamic Affairs Supreme Council.",
    visionTitle = "Our Vision",
    visionText = "use modern management style and as a result awarded and capable Muslim society will be created and also religious, economic and social benefits will be secured",
    missionTitle = "Our Mission",
    missionText = "Regional Muslim Council follow inclusive approach, exercise religious rules, practices good manner",
    testimonialText = "Ethiopia was one of the first countries which took part in playing its role during infant stage of Islam",
    ctaTitle = 'Every Muslim Needs To Realise The Importance Of The "Pillar" Of Islam',
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
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="w-[calc(50%-0.5rem)]">
                  <Image
                    src="/assets/about-2.jpg"
                    alt="About image 2"
                    width={400}
                    height={300}
                    className="w-full pb-3 rounded-xl"
                  />
                  <Image
                    src="/assets/about-3.jpg"
                    alt="About image 3"
                    width={400}
                    height={300}
                    className="w-full pt-3 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="w-full xl:w-[calc(50%-1.25rem)]">
              <p className="text-xl uppercase text-[#10b982] pb-4">
                {subtitle}
              </p>
              <h1 className="text-5xl font-bold font-sans pb-4 m-0">{title}</h1>
              <p className="pb-4">{description}</p>

              {/* Vision & Mission */}
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="w-full md:w-[calc(50%-0.5rem)]">
                  <div className="ps-3 flex items-center justify-start">
                    <span className="bg-[#10b982] w-8 h-8 flex items-center justify-center rounded-full mt-4 me-2">
                      <Eye className="text-white" />
                    </span>
                    <h5 className="text-xl font-semibold font-sans mt-4">
                      {visionTitle}
                    </h5>
                  </div>
                  <p>{visionText}</p>
                </div>
                <div className="w-full md:w-[calc(50%-0.5rem)]">
                  <div className="ps-3 flex items-center gap-2">
                    <span className="bg-[#10b982] w-8 h-8 rounded-full mt-4 me-2 flex items-center justify-center">
                      <Flag className="text-white w-4 h-4" />
                    </span>
                    <h5 className="text-xl font-semibold font-sans mt-3">
                      {missionTitle}
                    </h5>
                  </div>
                  <p>{missionText}</p>
                </div>
              </div>

              {/* Testimonial Card */}
              <div className="bg-[#F8F9FA] p-3 mb-4 rounded-xl">
                <div className="flex flex-wrap items-center justify-center gap-4">
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
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="container mx-auto text-center h-56 bg-[#10b982] py-5 flex justify-center">
            <div className="flex gap-4 items-center flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-2/12 lg:block hidden">
                <Icon icon="noto:mosque" width="128" height="128" />
              </div>
              <div className="w-full lg:w-7/12 text-center lg:text-left">
                <h1 className="mb-0 text-4xl font-bold font-sans">
                  {ctaTitle}
                </h1>
              </div>
              <div className="w-full lg:w-3/12">
                <Link
                  href="/About"
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
