import { BlogPost } from '@/types/api';
import AuthorIcon from '@/assets/icons/AuthorIcon.svg';
import CalendarIcon from '@/assets/icons/CalendarIcon.svg';
import ReadTimeIcon from '@/assets/icons/ReadTimeIcon.svg';
import HashtagIcon from '@/assets/icons/HashtagIcon.svg';

interface MetaItemProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    children: React.ReactNode;
}

const MetaItem = ({ icon: Icon, children }: MetaItemProps) => (
    <span className="flex flex-row items-center gap-1 px-1.5 py-1.5 w-fit sm:gap-2">
        <Icon/>
        <span>{children}</span>
    </span>
);

const BlogCardMeta = ({ post }: { post: BlogPost }) => {
    const primaryMetaItems = [
        { icon: CalendarIcon, content: post.publishDate },
        { icon: AuthorIcon, content: post.author },
        { icon: ReadTimeIcon, content: post.readTime },
    ];

    if (post.tags) {
        primaryMetaItems.push({
            icon: HashtagIcon,
            content: post.tags.map(tag => tag.replace(/\s+/g, '')).join(' ')
        });
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap text-xs font-medium">
                {primaryMetaItems.map((item, index) => (
                    <MetaItem key={index} icon={item.icon}>
                        {item.content}
                    </MetaItem>
                ))}
            </div>
        </div>
    )
}

export default BlogCardMeta;