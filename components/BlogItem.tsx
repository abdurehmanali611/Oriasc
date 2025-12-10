import Image from "next/image";
import Link from "next/link";
import { User, MessageCircle, Bookmark } from "lucide-react";

interface BlogItemProps {
  image?: string;
  date?: any;
  title?: string;
  description?: string;
  author?: string;
  slug?: string;
}

export default function BlogItem({
  image,
  date,
  title,
  description,
  author,
  slug,
}: BlogItemProps) {
  return (
    <div className="w-full lg:w-1/2 xl:w-1/3 px-4 wow fadeInUp">
      <div className="h-full shadow-[0_0_45px_rgba(0,0,0,0.08)] rounded-lg overflow-hidden">
        <div className="relative overflow-hidden h-64">
          <Image
            src={image ?? "/assets/blog-placeholder.jpg"}
            alt={title ?? "Blog Image"}
            fill
            className="object-cover transition-all duration-500 hover:scale-110"
          />
          <div className="bg-[#10b982] inline-block px-3 py-2 text-center text-white absolute top-0 right-0 rounded-bl-lg">
            {date || "No Date"}
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
          <h4
            className="inline-block text-2xl font-semibold font-sans leading-tight mb-3 mt-3 transition-all duration-500 hover:text-[#10b982]"
          >
            {title || "Untitled Blog Post"}
          </h4>
          <p className="mb-4 text-gray-600">
            {description || "No description available for this blog post."}
          </p>
        </div>
      </div>
    </div>
  );
}
