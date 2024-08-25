import React from "react";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";

/**
 * Props for the Pagination component.
 * @interface PaginationProps
 */
interface PaginationProps {
  /**
   * The current active page number.
   */
  currentPage: number;

  /**
   * The total number of pages available.
   */
  totalPages: number;

  /**
   * Callback function to handle page changes.
   * @param page The page number to navigate to.
   */
  onPageChange: (page: number) => void;
}

/**
 * A pagination component to navigate through pages.
 *
 * This component displays page numbers and navigational arrows based on the
 * current page and total pages. It handles showing page numbers with ellipses
 * for large page ranges and ensures that the current page is always visible in the
 * pagination controls.
 *
 * @param {PaginationProps} props - The props for the component.
 * @returns {JSX.Element} The Pagination component.
 */
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageRange = 4; // Number of pages to display around the current page

  /**
   * Calculates the range of page numbers to display based on the current page
   * and the total number of pages.
   *
   * @returns {number[]} An array of page numbers to display.
   */
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      // Display all pages if there are 5 or fewer
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      let startPage: number, endPage: number;

      if (currentPage <= 3) {
        // If on the first few pages, show the first set of pages
        startPage = 1;
        endPage = pageRange;
      } else if (currentPage + pageRange - 1 >= totalPages) {
        // If on the last few pages, show the last set of pages
        startPage = totalPages - pageRange + 1;
        endPage = totalPages;
      } else {
        // Otherwise, show pages around the current page
        startPage = currentPage - Math.floor(pageRange / 2);
        endPage = currentPage + Math.floor(pageRange / 2);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 text-gray-600">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>
          <IoChevronBackOutline />
        </button>
      )}

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={
            pageNumber === currentPage ? "font-bold bg-white text-[#2A59FE] w-6 h-6 rounded-md shadow-xl" : "w-6 h-6"
          }>
          {pageNumber}
        </button>
      ))}

      {totalPages > 5 && currentPage + pageRange - 1 < totalPages && (
        <>
          {currentPage + pageRange - 1 < totalPages && <span>...</span>}
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>
          <IoChevronForward />
        </button>
      )}
    </div>
  );
};

export default Pagination;
