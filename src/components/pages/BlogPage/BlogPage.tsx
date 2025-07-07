"use client"

import BlogHeader from "./BlogHeader/BlogHeader";
import BlogNavigation from "./BlogNavigation/BlogNavigation";
import BlogGrid from "./BlogGrid/BlogGrid";
import BlogPagination from "./BlogPagination/BlogPagination";
import { useBlogData } from "@/hooks/useBlogData";

const BlogPage = () => {
    const { pagination } = useBlogData();
    return (
        <div className="w-[85%] max-w-7xl mx-auto mt-10 md:mt-30">
            <BlogHeader />
            <BlogNavigation />
            <BlogGrid currentPage={pagination.currentPage} />
            <BlogPagination />
        </div>
    )
}

export default BlogPage;