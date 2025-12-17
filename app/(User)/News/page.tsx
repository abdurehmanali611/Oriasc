"use client"
import BlogGrid from "@/components/BlogGrid";
import { blogs } from "@/constants";
import { useLayoutEffect, useState } from "react";

export default function News() {
    const [dynamicBlogs, setDynamicBlogs] = useState(blogs)
    useLayoutEffect(() => {
        setDynamicBlogs(blogs)
    }, [blogs])
    return <div className="py-5">
        <BlogGrid blogs={dynamicBlogs}/>
    </div>
}