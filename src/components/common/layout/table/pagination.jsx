import React from 'react';

export const renderPagination = (currentPage, totalPages, handlePageChange) => {
    if (totalPages === 0) return null;

    const pages = [];
    const generatePageButton = (page) => (
        <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${page === currentPage ? 'text-[#000000] font-bold' : 'text-[#5E5E5E]'} px-1`}
        >
            {page}
        </button>
    );

    pages.push(
        <button
            key="prev"
            onClick={() => handlePageChange((currentPage - 2 + totalPages) % totalPages + 1)}
            className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
        >
            &lt;
        </button>
    );

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(generatePageButton(i));
        }
        pages.push(
            <button
                key="next"
                onClick={() => handlePageChange((currentPage % totalPages) + 1)}
                className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
            >
                &gt;
            </button>
        );
        return pages;
    }

    pages.push(generatePageButton(1));
    if (currentPage > 3) {
        pages.push(<span key="dots1" className='text-[#3A3A3A] py-2'>...</span>);
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(generatePageButton(i));
    }

    if (currentPage < totalPages - 2) {
        pages.push(<span key="dots2" className='text-[#3A3A3A] py-2'>...</span>);
    }

    pages.push(generatePageButton(totalPages));
    pages.push(
        <button
            key="next"
            onClick={() => handlePageChange((currentPage % totalPages) + 1)}
            className='text-[#3A3A3A] border-none rounded cursor-pointer px-1 py-2'
        >
            &gt;
        </button>
    );

    return pages;
};