import Image from "next/image";
import Link from "next/link";
import {
  User,
  Video,
  Headphones,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

interface SermonItemProps {
  image?: string;
  title?: string;
  speaker?: string;
  description?: string;
  slug?: string;
}

export default function SermonItem({
  image,
  title,
  speaker,
  description,
  slug,
}: SermonItemProps) {
  return (
    <div className="w-full lg:w-1/2 xl:w-1/3 px-4 wow fadeInUp">
      <div className="h-full shadow-[0_0_45px_rgba(0,0,0,0.08)]">
        <div className="overflow-hidden p-4 pb-0 relative h-64 rounded-t-lg">
          <Image
            src={image ?? "/assets/sermon-1.jpg"}
            alt={title ?? "Sermon Image"}
            fill
            className="object-cover transition-all duration-500 hover:scale-110"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between pb-2">
            <div className="flex gap-3">
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
          <h4
            className="inline-block text-2xl font-semibold font-sans leading-tight mb-3 transition-all duration-500 hover:text-[#10b982]"
          >
            {title || "Untitled Sermon"}
          </h4>
          <p className="text-gray-700">
            {description || "No description available for this sermon."}
          </p>
        </div>
      </div>
    </div>
  );
}
