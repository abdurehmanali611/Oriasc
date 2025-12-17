import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import SectionHeader from "./SectionHeader";
import TeamMember from "./TeamMember";

interface LeaderData {
  ImageUrl: string;
  Name: string;
  Role: string;
  Position: string;
  Facebook?: string;
  Instagram?: string;
  LinkedIn?: string;
}

interface TeamSectionProps {
  leader?: LeaderData | LeaderData[];
}

export default function TeamSection({ leader }: TeamSectionProps) {
  const generalManager = Array.isArray(leader)
    ? leader.find((member: any) =>
        member.Position?.toLowerCase().includes("general manager")
      )
    : null;

  const regularTeamMembers = Array.isArray(leader)
    ? leader.filter(
        (member: any) =>
          !member.Position?.toLowerCase().includes("general manager")
      )
    : [];

  if (generalManager === null && regularTeamMembers.length === 0) {
    return (
      <div className="w-full py-12 md:py-20">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <SectionHeader subtitle="Our Team" title="Meet Our Organizer" />
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Team information coming soon!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <SectionHeader subtitle="Our Management Team" />

          <div className="flex flex-wrap -mx-4 gap-y-12 mt-12">
            {generalManager && (
              <>
                <div className="w-full lg:w-1/3 xl:w-5/12 px-4">
                  <div
                    className="h-full p-[25px] bg-white overflow-hidden shadow-[0_0_45px_rgba(0,0,0,0.08)] rounded-lg wow zoomIn"
                    data-wow-delay="0.1s"
                  >
                    <div className="relative h-[500px] rounded-lg overflow-hidden">
                      <Image
                        src={generalManager?.ImageUrl || "/assets/team-1.jpg"}
                        alt={generalManager?.Name || "Team Leader"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-2/3 xl:w-7/12 px-4">
                  <div className="wow fadeIn" data-wow-delay="0.1s">
                    <h1 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 mb-4">
                      {generalManager?.Name || "Team Leader"}
                    </h1>
                    <h5 className="font-normal italic text-[#10b982] text-xl mb-4 font-sans">
                      {generalManager?.Position || "General Manager"}
                    </h5>
                    <p className="mb-4 text-gray-700">
                      {generalManager?.Role ||
                        "Leading our organization with dedication and vision."}
                    </p>
                    <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-[#10b982]">
                      <Link
                        href={generalManager?.Facebook || "#"}
                        className="w-12 h-12 flex items-center justify-center bg-[#10b982] text-white transition-all duration-500 hover:bg-[#0C1214] hover:text-white rounded"
                      >
                        <Facebook className="w-5 h-5" />
                      </Link>
                      <Link
                        href={generalManager?.Instagram || "#"}
                        className="w-12 h-12 flex items-center justify-center bg-[#10b982] text-white transition-all duration-500 hover:bg-[#0C1214] hover:text-white rounded"
                      >
                        <Instagram className="w-5 h-5" />
                      </Link>
                      <Link
                        href={generalManager?.LinkedIn || "#"}
                        className="w-12 h-12 flex items-center justify-center bg-[#10b982] text-white transition-all duration-500 hover:bg-[#0C1214] hover:text-white rounded"
                      >
                        <Linkedin className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                  {regularTeamMembers.length > 0 && (
                    <div className="flex flex-wrap -mx-4 gap-y-8 mt-8">
                      {regularTeamMembers.map((member: any, index: any) => (
                        <TeamMember
                          key={index}
                          image={member.ImageUrl}
                          name={member.Name}
                          position={member.Position}
                          role={member.Role}
                          facebook={member.Facebook}
                          instagram={member.Instagram}
                          linkedin={member.LinkedIn}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
