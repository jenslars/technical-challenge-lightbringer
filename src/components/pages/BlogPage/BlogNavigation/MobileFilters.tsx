"use client"

import { useState } from 'react';
import FilterIcon from '@/assets/icons/FilterIcon.svg';
import CheckedIcon from '@/assets/icons/CheckedIcon.svg';
import { useBlogData } from "@/hooks/useBlogData";
import { FilterCategory } from "@/types/api";


const MobileFilters = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { searchFilters, setCategory } = useBlogData();
    
    const categories: FilterCategory[] = ['All', 'AI Updates', 'Sustainability News', 'Tech Trends', 'Health Innovations'];

    const handleCategoryClick = (category: FilterCategory) => {
        setCategory(category);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative flex flex-row items-center justify-center mr-2">
            <button 
                onClick={toggleDropdown}
                className={`flex items-center justify-center p-3 h-[48px] w-[48px] rounded-full border border-gray-200 transition-colors duration-300 cursor-pointer ${
                    isDropdownOpen 
                        ? 'bg-gray-400' 
                        : 'bg-white hover:bg-gray-200'
                }`}
                aria-label="Toggle filters"
            >
                <FilterIcon />
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-sm z-50">
                    <div className="p-2">
                        <nav>
                            <ul className="flex flex-col">
                                {categories.map((category) => (
                                    <li key={category}>
                                        <button 
                                            className={`w-full text-left py-2 px-3 rounded-lg transition-colors cursor-pointer duration-200 ${
                                                searchFilters.category === category
                                                    ? 'bg-gray-100 font-medium'
                                                    : 'hover:bg-gray-100'
                                            }`}
                                            onClick={() => handleCategoryClick(category)}
                                        >
                                            <div className="flex flex-row items-center justify-between w-full">
                                                {category}
                                                {searchFilters.category === category && <CheckedIcon />}
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
            
            {/* Backdrop to close dropdown when clicking outside */}
            {isDropdownOpen && (
                <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                />
            )}
        </div>
    )
}

export default MobileFilters;