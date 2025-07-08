"use client"

import { useState, useMemo, useCallback } from 'react';
import { BlogPost, PaginationInfo } from '../types/api';

interface UseBlogPaginationReturn {
  paginatedPosts: BlogPost[];
  paginationInfo: PaginationInfo;
  setCurrentPage: (page: number) => void;
}

export const useBlogPagination = (filteredPosts: BlogPost[]): UseBlogPaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);

  // Always use 7 posts per page
  const postsPerPage = 7;
  
  // Calculate start and end indices for pagination
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  // Memoized paginated posts for better performance
  const paginatedPosts = useMemo(() => 
    filteredPosts.slice(startIndex, endIndex),
    [filteredPosts, startIndex, endIndex]
  );

  // Memoized pagination info
  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    return {
      currentPage,
      totalPages,
      totalPosts: filteredPosts.length,
      postsPerPage,
      hasNextPage,
      hasPrevPage
    };
  }, [filteredPosts.length, currentPage, postsPerPage]);

  const handleSetCurrentPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return {
    paginatedPosts,
    paginationInfo,
    setCurrentPage: handleSetCurrentPage
  };
};