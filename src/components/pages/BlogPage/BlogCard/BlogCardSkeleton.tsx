interface BlogCardSkeletonProps {
    isFeatured: boolean;
}

const BlogCardSkeleton = ({ isFeatured }: BlogCardSkeletonProps) => {
    return (
        <div className={`bg-white rounded-lg shadow-sm overflow-hidden flex flex-col ${
            isFeatured 
                ? 'lg:grid lg:grid-cols-2 lg:h-[391px]' 
                : 'h-auto lg:h-[514px]'
        }`}>
            {/* Image skeleton */}
            <div className={`relative w-full ${
                isFeatured 
                    ? 'h-[112px] lg:h-full' 
                    : 'h-[112px] lg:h-52'
            }`}>
                <div className={`w-full bg-gray-200 animate-pulse ${
                    isFeatured 
                        ? 'absolute inset-0 h-full' 
                        : 'h-full'
                }`} />
            </div>
            
            {/* Content skeleton */}
            <div className={`flex flex-col gap-5 flex-grow ${
                isFeatured 
                    ? 'lg:gap-6 p-6 lg:p-11 lg:justify-center lg:justify-between' 
                    : 'p-6'
            }`}>
                {/* Tag skeleton */}
                <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse" />
                
                {/* Title skeleton */}
                <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse" />
                    <div className={`h-6 bg-gray-200 rounded animate-pulse ${
                        isFeatured ? 'lg:w-3/4' : 'w-full'
                    }`} />
                </div>
                
                {/* Excerpt skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className={`h-4 bg-gray-200 rounded animate-pulse ${
                        isFeatured ? 'lg:w-2/3' : 'w-3/4'
                    }`} />
                </div>
                
                {/* Meta skeleton */}
                <div className="mt-auto md:mt-0 space-y-2">
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCardSkeleton; 