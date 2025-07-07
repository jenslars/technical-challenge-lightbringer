"use client"

import { useBlogData } from "@/hooks/useBlogData";
import { Button } from "@/components/shared/Button";

import ArrowRightIcon from '@/assets/icons/ArrowRightIcon.svg';
import ArrowLeftIcon from '@/assets/icons/ArrowLeftIcon.svg';
import EllipsisIcon from '@/assets/icons/EllipsisIcon.svg';

const BlogPagination = () => {
  const { pagination, setPage } = useBlogData();
  const { currentPage, totalPages, hasPrevPage, hasNextPage } = pagination;

  if (totalPages <= 1) return null;

  // Helper to render page numbers
  const getPageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    if (currentPage <= 3) {
      end = Math.min(5, totalPages);
    }
    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const showEllipsis = pageNumbers.length === 5 && pageNumbers[pageNumbers.length - 1] < totalPages;

  return (
    <nav className="flex justify-center mt-8 w-[357px] mx-auto mt-8 sm:mt-15 mb-8 sm:mb-20" aria-label="Pagination">
      <ul className="inline-flex items-center gap-2" >
        <li>
          <Button
            onClick={() => setPage(currentPage - 1)}
            disabled={!hasPrevPage}
            backgroundColor="bg-white"
            textColor="text-black"
            hoverBackgroundColor="hover:bg-gray-100"
            className="w-9 h-9 p-0 rounded-md active:bg-gray-400"
            aria-label="Previous page"
          >
            <ArrowLeftIcon />
          </Button>
        </li>
        {pageNumbers.map((page, index) => {
          // Replace the 4th button with an ellipsis if there are more pages
          if (index === 3 && showEllipsis) {
            return (
              <li key={"ellipsis"}>
                <Button
                  onClick={() => setPage(page)}
                  backgroundColor="bg-gray-50"
                  textColor="text-black"
                  hoverBackgroundColor="hover:bg-gray-100"
                  className="w-9 h-9 p-0 rounded-md"
                  aria-label={`Go to page ${page}`}
                >
                  <EllipsisIcon className="mt-3" />
                </Button>
              </li>
            );
          }
          // Render normal page button
          return (
            <li key={page}>
              <Button
                onClick={() => setPage(page)}
                backgroundColor={page === currentPage ? 'bg-gray-400' : 'bg-gray-50'}
                textColor="text-black"
                hoverBackgroundColor={page === currentPage ? '' : 'hover:bg-gray-100'}
                className="py-2 px-4 rounded-md"
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Button>
            </li>
          );
        })}
        <li>
          <Button
            onClick={() => setPage(currentPage + 1)}
            disabled={!hasNextPage}
            backgroundColor="bg-white"
            textColor="text-black"
            hoverBackgroundColor="hover:bg-gray-100"
            className="w-9 h-9 p-0 rounded-md active:bg-gray-400"
            aria-label="Next page"
          >
            <ArrowRightIcon />
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default BlogPagination;
