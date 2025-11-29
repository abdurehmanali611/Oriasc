import BlogItem from "./BlogItem";

// components/BlogGrid.tsx
interface Blog {
  image?: string;
  date?: string;
  title: string;
  excerpt?: string;
  description?: string;
  author?: string;
  delay: string;
  slug?: string;
}

interface BlogGridProps {
  blogs: Blog[];
}

export default function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <>
      {/* Blog Grid Start */}
      <div className="w-full px-4 py-5">
        <div className="container mx-auto py-5">
          <h1 
            className="text-5xl md:text-6xl font-bold font-sans mb-5 wow fadeIn" 
            data-wow-delay="0.1s"
          >
            Latest From <span className="text-[#10b982]">Our Blog</span>
          </h1>
          
          <div className="flex flex-wrap -mx-4 gap-y-4 justify-center">
            {blogs.map((blog, index) => (
              <BlogItem 
                key={index}
                image={blog.image}
                date={blog.date}
                title={blog.title}
                excerpt={blog.excerpt ?? blog.description}
                author={blog.author ?? 'Admin'}
                delay={blog.delay}
                slug={blog.slug}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Blog Grid End */}
    </>
  );
}
