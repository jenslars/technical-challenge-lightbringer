"use client"

import { useBlogData } from "@/hooks/useBlogData";
import { FilterCategory } from "@/types/api";
import { Button } from "@/components/shared/Button";

const BlogFilters = () => {
    const { searchFilters, setCategory } = useBlogData();
    
    const categories: FilterCategory[] = ['All', 'AI Updates', 'Sustainability News', 'Tech Trends', 'Health Innovations'];

    const handleCategoryClick = (category: FilterCategory) => {
        setCategory(category);
    };

    return (
        <div className="flex flex-row gap-4">
            <nav>
                <ul className="flex flex-row gap-4">
                    {categories.map((category) => (
                        <li key={category}>
                            <Button 
                                backgroundColor={searchFilters.category === category ? 'bg-gray-400' : 'bg-gray-50'}
                                textColor="text-black"
                                hoverBackgroundColor={searchFilters.category === category ? '' : 'hover:bg-gray-100'}
                                className="rounded-3xl"
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default BlogFilters;