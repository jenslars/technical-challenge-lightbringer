import { useState, useEffect, useCallback } from 'react';
import { debounce } from '../lib/utils/async';
import { SEARCH_CONFIG } from '../constants';

interface UseDebouncedSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearching: boolean;
}

export const useDebouncedSearch = (
  onSearch: (query: string) => void,
  delay: number = SEARCH_CONFIG.DEBOUNCE_DELAY
): UseDebouncedSearchReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Create debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setDebouncedQuery(query);
      setIsSearching(false);
      onSearch(query);
    }, delay),
    [delay, onSearch]
  );

  // Handle search query changes
  const handleSearchQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    debouncedSearch(query);
  }, [debouncedSearch]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      // Cancel any pending debounced calls
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return {
    searchQuery,
    setSearchQuery: handleSearchQueryChange,
    isSearching
  };
}; 