import BlogGrid from "@/components/BlogGrid";
import { blogs } from "@/constants";

export default function Blog() {
    return <div className="py-5">
        <BlogGrid blogs={blogs}/>
    </div>
}