import SearchIcon from "@/assets/icons/SearchIcon.svg";
import { useDebouncedSearch } from "@/hooks/useDebouncedSearch";
import { useBlogData } from "@/hooks/useBlogData";
import { SEARCH_CONFIG } from "@/constants";

const BlogSearchBar = () => {
    const { setSearchQuery } = useBlogData();
    
    const {
        searchQuery,
        setSearchQuery: setLocalSearchQuery,
        isSearching
    } = useDebouncedSearch(setSearchQuery, SEARCH_CONFIG.DEBOUNCE_DELAY);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setLocalSearchQuery(value);
    };

    return (
        <div className="flex items-center border border-gray-200 rounded-full px-4 h-12 w-full max-w-md bg-white border-1 focus-within:border-gray-950 focus-within:border-2 duration-300">
            <SearchIcon className="mr-2 fill-gray-600"  />
            <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleInputChange}
                aria-label="Search blog posts"
                className="flex-1 outline-none bg-white text-gray-700 placeholder-gray-500 h-full flex items-center"
            />
            {isSearching && (
                <div 
                    className="ml-2 w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"
                    aria-label="Searching..."
                    role="status"
                />
            )}
        </div>
    )
}

export default BlogSearchBar;