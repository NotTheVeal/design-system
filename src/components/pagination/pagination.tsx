import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  className = '',
}) => {
  const getPages = (): (number | string)[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | string)[] = [1];
    if (currentPage > 3) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const btnBase = 'min-w-[32px] h-8 px-2 rounded text-sm font-medium transition-colors flex items-center justify-center';

  return (
    <nav className={`flex items-center gap-1 ${className}`} aria-label="Pagination">
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`${btnBase} text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          «
        </button>
      )}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${btnBase} text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        ‹
      </button>
      {getPages().map((p, i) =>
        typeof p === 'string' ? (
          <span key={`e${i}`} className={`${btnBase} text-gray-400 cursor-default`}>…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`${btnBase} ${currentPage === p ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
            aria-current={currentPage === p ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${btnBase} text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        ›
      </button>
      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`${btnBase} text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          »
        </button>
      )}
    </nav>
  );
};

export default Pagination;
