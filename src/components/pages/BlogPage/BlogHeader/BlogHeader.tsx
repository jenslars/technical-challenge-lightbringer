import { useBlogData } from "@/hooks/useBlogData";

const BlogHeader = () => {
    return (
        <div>
            <h1 className="mb-4">The Askly AI Blog</h1>
            <p className="text-gray-500 font-size-16">The latest news from our community</p>
        </div>
    )
}

export default BlogHeader;