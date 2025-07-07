"use client"

import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { BlogPost, PaginationInfo, SearchFilters, FilterCategory } from '../types/api';
import { useBlogPosts } from './useBlogPosts';
import { useBlogFilters } from './useBlogFilters';
import { useBlogPagination } from './useBlogPagination';

interface UseBlogDataReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  pagination: PaginationInfo;
  searchFilters: SearchFilters;
  setSearchQuery: (query: string) => void;
  setCategory: (category: FilterCategory) => void;
  setPage: (page: number) => void;
  refreshPosts: () => Promise<void>;
}

const BlogDataContext = createContext<UseBlogDataReturn | undefined>(undefined);

export const BlogDataProvider = ({ children }: { children: ReactNode }) => {
  // Data fetching
  const { posts: allPosts, loading, error, refetch } = useBlogPosts();
  
  // Filtering
  const { filters, setFilters, filteredPosts, setSearchQuery: setSearchQueryInternal, setCategory: setCategoryInternal } = useBlogFilters(allPosts);
  
  // Pagination
  const { paginatedPosts, paginationInfo, setCurrentPage } = useBlogPagination(filteredPosts);

  // Wrapper functions that reset pagination when filters change
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryInternal(query);
    setCurrentPage(1);
  }, [setSearchQueryInternal, setCurrentPage]);

  const setCategory = useCallback((category: FilterCategory) => {
    setCategoryInternal(category);
    setCurrentPage(1);
  }, [setCategoryInternal, setCurrentPage]);

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setCurrentPage]);

  const refreshPosts = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const value: UseBlogDataReturn = {
    posts: paginatedPosts,
    loading,
    error,
    pagination: paginationInfo,
    searchFilters: filters,
    setSearchQuery,
    setCategory,
    setPage,
    refreshPosts
  };

  return (
    <BlogDataContext.Provider value={value}>
      {children}
    </BlogDataContext.Provider>
  );
};

export const useBlogData = () => {
  const context = useContext(BlogDataContext);
  if (context === undefined) {
    throw new Error('useBlogData must be used within a BlogDataProvider');
  }
  return context;
}; 