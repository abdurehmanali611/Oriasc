import BlogGrid from "@/components/BlogGrid";
import Hero from "@/components/Hero";
import { blogs } from "@/constants";

const metadata = {
  title: 'About Us - ORIASC',
  description: 'Learn more about ORIASC and our mission',
};
export default function Blog() {
    return <div>
        <Hero title="Blogs" breadcrumbs={[
            {label: "Pages"},
            {label: "Blogs"}
        ]}/>
        <BlogGrid blogs={blogs}/>
    </div>
}