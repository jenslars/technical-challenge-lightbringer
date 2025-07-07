"use client"

import { useState, useMemo, useCallback } from 'react';
import { BlogPost, PaginationInfo } from '../types/api';

interface UseBlogPaginationReturn {
  paginatedPosts: BlogPost[];
  paginationInfo: PaginationInfo;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export const useBlogPagination = (filteredPosts: BlogPost[]): UseBlogPaginationReturn => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate posts per page based on current page
  const postsPerPage = currentPage === 1 ? 7 : 9;
  
  // Calculate start and end indices for pagination
  const startIndex = currentPage === 1 ? 0 : 7 + (currentPage - 2) * 9;
  const endIndex = startIndex + postsPerPage;

  // Memoized paginated posts for better performance
  const paginatedPosts = useMemo(() => 
    filteredPosts.slice(startIndex, endIndex),
    [filteredPosts, startIndex, endIndex]
  );

  // Memoized pagination info
  const paginationInfo = useMemo(() => {
    const calculateTotalPages = (totalPosts: number): number => {
      if (totalPosts <= 7) return 1;
      const remainingPosts = totalPosts - 7;
      return 1 + Math.ceil(remainingPosts / 9);
    };

    const totalPages = calculateTotalPages(filteredPosts.length);
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
    setCurrentPage: handleSetCurrentPage,
    currentPage
  };
}; 