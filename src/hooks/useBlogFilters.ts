"use client"

import { useState, useMemo, useCallback } from 'react';
import { BlogPost, FilterCategory, SearchFilters } from '../types/api';
import { SearchHelper } from '../services/blogService';

interface UseBlogFiltersReturn {
  filters: SearchFilters;
  filteredPosts: BlogPost[];
  setSearchQuery: (query: string) => void;
  setCategory: (category: FilterCategory) => void;
}

export const useBlogFilters = (posts: BlogPost[]): UseBlogFiltersReturn => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'All',
    page: 1
  });

  // Memoized filtering logic for better performance
  const filteredPosts = useMemo(() => {
    let result = posts;
    
    // Apply category filtering
    if (filters.category !== 'All') {
      result = SearchHelper.filterPostsByCategory(result, filters.category);
    }
    
    // Apply search filtering
    if (filters.query.trim()) {
      result = SearchHelper.searchPosts(result, filters.query);
    }
    
    return result;
  }, [posts, filters.query, filters.category]);

  const setSearchQuery = useCallback((query: string) => {
    setFilters(prev => ({
      ...prev,
      query,
      page: 1 // Reset to first page when searching
    }));
  }, []);

  const setCategory = useCallback((category: FilterCategory) => {
    setFilters(prev => ({
      ...prev,
      category,
      page: 1 // Reset to first page when changing category
    }));
  }, []);

  return {
    filters,
    filteredPosts,
    setSearchQuery,
    setCategory
  };
}; 