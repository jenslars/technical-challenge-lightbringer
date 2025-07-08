import { BlogPost } from '@/types/api';
import Tag from '@/components/pages/BlogPage/BlogCard/Tag/Tag';
import BlogCardMeta from './BlogCardMeta';

interface BlogCardProps {
    post: BlogPost;
    isFeatured: boolean;
}

// Style utility functions
const getContainerClasses = (isFeatured: boolean) => 
    `bg-white rounded-lg shadow-sm overflow-hidden flex flex-col group hover:shadow-xl/10 transition-shadow duration-300 ${
        isFeatured 
            ? 'lg:grid lg:grid-cols-2 lg:h-[391px]' 
            : 'h-auto lg:h-[514px]'
    }`;

const getImageContainerClasses = (isFeatured: boolean) => 
    `relative w-full ${
        isFeatured 
            ? 'h-[112px] lg:h-full' 
            : 'h-[112px] lg:h-52'
    }`;

const getImageClasses = (isFeatured: boolean) => 
    `w-full object-cover group-hover:opacity-50 duration-300 ${
        isFeatured 
            ? 'absolute inset-0 h-full' 
            : 'h-full'
    }`;

const getContentClasses = (isFeatured: boolean) => 
    `flex flex-col gap-5 flex-grow ${
        isFeatured 
            ? 'lg:gap-6 p-6 lg:p-11 lg:justify-center lg:justify-between' 
            : 'p-6'
    }`;

const getTitleClasses = (isFeatured: boolean) => 
    `text-lg font-semibold line-clamp-2 transition-transform duration-300 group-hover:scale-105 origin-left ${
        isFeatured ? 'md:line-clamp-none' : ''
    }`;

const getExcerptClasses = (isFeatured: boolean) => 
    `hidden sm:[display:-webkit-box] text-gray-600 overflow-hidden sm:WebkitBoxOrient-vertical ${
        isFeatured 
            ? 'lg:line-clamp-4 sm:line-clamp-2' 
            : 'line-clamp-2'
    }`;

const BlogCard = ({ post, isFeatured }: BlogCardProps) => {
    return (
        <div className={getContainerClasses(isFeatured)}>
            <div className={getImageContainerClasses(isFeatured)}>
                <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className={getImageClasses(isFeatured)} 
                />
            </div>
            
            <div className={getContentClasses(isFeatured)}>
                <Tag theme={post.category} />
                <h3 className={getTitleClasses(isFeatured)}>
                    {post.title}
                </h3>
                <p className={getExcerptClasses(isFeatured)}>
                    {post.excerpt}
                </p>
                
                <div className="mt-auto md:mt-0">
                    <BlogCardMeta post={post} />
                </div>
            </div>
        </div>
    );
}

export default BlogCard;