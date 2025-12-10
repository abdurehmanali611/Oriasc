import BlogItem from "./BlogItem";

// components/BlogGrid.tsx
interface Blog {
  ImageUrl?: string;
  createdAt?: Date;
  Title: string;
  Description?: string;
  Author?: string;
  Slug?: string;
}

interface BlogGridProps {
  blogs: Blog[];
}

export default function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <>
      <div className="w-full px-4 py-5">
        <div className="container mx-auto py-5">
          <h1
            className="text-5xl md:text-6xl font-bold font-sans mb-5 wow fadeIn"
            data-wow-delay="0.1s"
          >
            Latest From <span className="text-[#10b982]">Our Blog</span>
          </h1>

          {blogs && blogs.length > 0 ? (
            <div className="flex flex-wrap -mx-4 gap-y-4 justify-center">
              {blogs.map((blog, index) => (
                <BlogItem
                  key={index}
                  image={blog.ImageUrl}
                  date={blog.createdAt}
                  title={blog.Title}
                  description={blog.Description}
                  author={blog.Author ?? "Admin"}
                  slug={blog.Slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No blog posts available yet. Stay tuned for updates!
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Blog Grid End */}
    </>
  );
}
