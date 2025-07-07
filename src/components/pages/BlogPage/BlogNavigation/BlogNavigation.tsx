import BlogFilters from "../BlogFilters/BlogFilters";
import BlogSearchBar from "@/components/pages/BlogPage/BlogSearchBar/BlogSearchBar";
import MobileFilters from "./MobileFilters";

const BlogNavigation = () => {
    return (
        <div className="flex flex-row items-center mt-10 mb-10">
            {/* Desktop Filters - hidden on mobile */}
            <div className="hidden lg:block">
                <BlogFilters />
            </div>
            
            {/* Mobile Filters - shown only on mobile */}
            <div className="lg:hidden">
                <MobileFilters />
            </div>
            
            <div className="ml-auto flex-1 sm:flex-none">
                <BlogSearchBar />
            </div>
        </div>
    )
}

export default BlogNavigation;