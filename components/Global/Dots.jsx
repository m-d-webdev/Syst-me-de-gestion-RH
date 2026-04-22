import React from "react";


const DOTS = "DOTS";

function buildPageList(currentPage, totalPages) {
    const pages = new Set();

    // Always include first 3 and last 3 pages (adaptable)
    for (let i = 1; i <= Math.min(3, totalPages); i++) pages.add(i);
    for (let i = Math.max(1, totalPages - 2); i <= totalPages; i++) pages.add(i);

    // Include current and its neighbors
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i >= 1 && i <= totalPages) pages.add(i);
    }

    // Convert to sorted array
    const arr = Array.from(pages).sort((a, b) => a - b);

    // Insert DOTS where there is a gap
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const cur = arr[i];
        result.push(cur);
        const next = arr[i + 1];
        if (next && next - cur > 1) result.push(DOTS);
    }

    return result;
}

export default function Pagination({ currentPage = 1, totalPages = 1, onPageChange = () => { } }) {
    if (totalPages <= 1) return null;

    const pages = buildPageList(currentPage, totalPages);

    const handleClick = (p) => {
        if (p === DOTS) return;
        if (p < 1 || p > totalPages) return;
        if (p === currentPage) return;
        onPageChange(p);
    };

    return (
        <nav aria-label="Pagination" className="flex items-center justify-center py-4">
            <ul className="inline-flex items-center space-x-2">
                {/* Prev button */}
                <li>
                    <button
                        onClick={() => handleClick(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-lg border focus:outline-none focus:ring ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                        aria-label="Previous page"
                    >
                        <i className="bi bi-caret-left"></i>
                    </button>
                </li>

                {pages.map((p, idx) => (
                    <li key={String(p) + idx}>
                        {p === DOTS ? (
                            <span className="px-2 select-none">…</span>
                        ) : (
                            <button
                                onClick={() => handleClick(p)}
                                aria-current={p === currentPage ? 'page' : undefined}
                                className={`min-w-[38px] px-3 py-1 rounded-full border focus:outline-none focus:ring ${p === currentPage ? 'bg-chart-1 text-white' : 'hover:bg-gray-100'}`}
                            >
                                {p}
                            </button>
                        )}
                    </li>
                ))}

                {/* Next button */}
                <li>
                    <button
                        onClick={() => handleClick(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-lg border focus:outline-none focus:ring ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                        aria-label="Next page"
                    >
                        <i className="bi bi-caret-right"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
