"use client";

import BlogCard from "../BlogCard/BlogCard";
import BlogCardSkeleton from "../BlogCard/BlogCardSkeleton";
import { useBlogData } from "@/hooks/useBlogData";
import { Button } from "@/components/shared/Button";
import SearchIcon from "@/assets/icons/SearchIcon.svg";

interface BlogGridProps {
  currentPage: number;
}

const BlogGrid = ({ currentPage }: BlogGridProps) => {
  const { posts, loading, error, searchFilters, setSearchQuery } = useBlogData();

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        {/* Featured post skeleton */}
        <div>
          <BlogCardSkeleton isFeatured={true} />
        </div>
        {/* Regular posts grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <BlogCardSkeleton isFeatured={false} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">!</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading posts</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            backgroundColor="bg-gray-900"
            textColor="text-white"
            hoverBackgroundColor="hover:bg-gray-800"
            className="rounded-lg"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    const hasSearchQuery = searchFilters.query.trim().length > 0;
    
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchIcon className="fill-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {hasSearchQuery ? 'No posts found' : 'No posts available'}
          </h3>
          <p className="text-gray-600 mb-4">
            {hasSearchQuery 
              ? `No posts match your search for "${searchFilters.query}". Try adjusting your search terms or browse all posts.`
              : 'There are currently no posts available. Please check back later.'
            }
          </p>
          {hasSearchQuery && (
            <Button 
              onClick={handleClearSearch}
              backgroundColor="bg-gray-900"
              textColor="text-white"
              hoverBackgroundColor="hover:bg-gray-800"
              className="rounded-lg"
            >
              Clear Search
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Featured post on all pages */}
      {posts.length > 0 && (
        <div>
          <BlogCard post={posts[0]} isFeatured={true} />
        </div>
      )}
      {/* Regular posts grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.slice(1, 7).map((post) => (
          <div key={post.id}>
            <BlogCard post={post} isFeatured={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;