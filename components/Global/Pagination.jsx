"use client";

import { useMemo } from "react";

const SIBLING_COUNT = 1;
const DOTS = "...";

function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function usePaginationRange(totalPages, currentPage) {
    return useMemo(() => {
        const totalPageNumbers = SIBLING_COUNT * 2 + 5; // siblings + first + last + current + 2 dots

        if (totalPages <= totalPageNumbers) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(currentPage - SIBLING_COUNT, 1);
        const rightSiblingIndex = Math.min(currentPage + SIBLING_COUNT, totalPages);
        const showLeftDots = leftSiblingIndex > 2;
        const showRightDots = rightSiblingIndex < totalPages - 1;

        if (!showLeftDots && showRightDots) {
            const leftRange = range(1, 3 + 2 * SIBLING_COUNT);
            return [...leftRange, DOTS, totalPages];
        }

        if (showLeftDots && !showRightDots) {
            const rightRange = range(totalPages - (3 + 2 * SIBLING_COUNT) + 1, totalPages);
            return [1, DOTS, ...rightRange];
        }

        const middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [1, DOTS, ...middleRange, DOTS, totalPages];
    }, [totalPages, currentPage]);
}

export default function Pagination({ totalPages, currentPage, setFilter }) {
    const pages = usePaginationRange(totalPages, currentPage);

    const goTo = (pageNum) => {
        if (pageNum < 1 || pageNum > totalPages || pageNum === currentPage) return;
        setFilter((pv) => ({ ...pv, page: pageNum }));
    };

    return (
        <nav
            aria-label="Pagination"
            className="flex items-center gap-1 select-none"
        >
            {/* Previous */}
            <button
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="
          flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium
          border border-transparent
          text-gray-500 hover:text-gray-900 hover:bg-gray-100
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500
          transition-colors duration-150
        "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            {/* Page buttons */}
            {pages.map((page, i) =>
                page === DOTS ? (
                    <span
                        key={`dots-${i}`}
                        className="flex items-center justify-center w-9 h-9 text-sm text-gray-400"
                        aria-hidden="true"
                    >
                        ···
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => goTo(page)}
                        aria-label={`Page ${page}`}
                        aria-current={page === currentPage ? "page" : undefined}
                        className={`
              flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium
              transition-colors duration-150
              ${page === currentPage
                                ? "bg-gray-900 text-white border border-gray-900 cursor-default"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-transparent"
                            }
            `}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
                className="
          flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium
          border border-transparent
          text-gray-500 hover:text-gray-900 hover:bg-gray-100
          disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-500
          transition-colors duration-150
        "
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
        </nav>
    );
}