"use client";
import Link from "next/link";

interface ActivityItemProps {
  DateTime: string;
  Title?: string;
  Description?: string;
  Stat?: string;
}

export default function ActivityItem({
  DateTime,
  Title,
  Description,
  Stat,
}: ActivityItemProps) {
  return (
    <div className="w-full lg:w-1/2 xl:w-1/3 px-4 wow fadeInUp">
      <div className="h-full flex flex-col justify-between p-6 bg-white transition-all duration-500 shadow-[0_0_45px_rgba(12,18,20,0.08)] hover:bg-[#10b982] group rounded-lg">
        <div>
          <h4 className="text-xl font-semibold font-sans mb-3 group-hover:text-white">
            {Title || "Activity"}
          </h4>
          <p className="mb-4 text-gray-700 group-hover:text-white">
            {Description || "No description available"}
          </p>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 group-hover:border-white/30">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 group-hover:text-white/80">
                Stat
              </span>
              <p className="font-semibold text-[#10b982] group-hover:text-white">
                {Stat || "N/A"}
              </p>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs text-gray-500 group-hover:text-white/80">
                Date
              </span>
              <p className="font-semibold text-[#10b982] group-hover:text-white">
                {DateTime || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
