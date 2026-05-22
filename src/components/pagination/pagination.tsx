import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className={`pagination ${className}`} role="navigation" aria-label="Pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
          aria-label={`Go to page ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next"
      >
        &gt;
      </button>
      <style jsx>{`
        :root {
          --ps-font: 'Source Sans Pro', sans-serif;
          --ps-primary-color: #005BA6;
          --ps-midnight: #002F48;
          --ps-pagination-gap: 4px;
          --ps-pagination-item-size: 32px;
          --ps-pagination-item-radius: 4px;
          --ps-pagination-item-background-default: transparent;
          --ps-pagination-item-background-hover: #f0f0f0;
          --ps-pagination-item-background-active: #005BA6;
          --ps-pagination-item-border-default: transparent;
          --ps-pagination-item-border-hover: #DCDCDC;
          --ps-pagination-item-border-active: #005BA6;
          --ps-pagination-item-border-width: 1px;
          --ps-pagination-item-text-default: #000;
          --ps-pagination-item-text-hover: #005BA6;
          --ps-pagination-item-text-active: #fff;
          --ps-pagination-item-text-disabled: #DCDCDC;
          --ps-pagination-arrow-color: #999;
          --ps-pagination-arrow-color-hover: #005BA6;
          --ps-pagination-arrow-color-disabled: #DCDCDC;
          --ps-pagination-arrow-size: 16px;
          --ps-pagination-ellipsis-color: #ccc;
          --ps-pagination-per-page-font-size: 13px;
          --ps-pagination-per-page-color: #999;
        }

        .pagination {
          display: flex;
          gap: var(--ps-pagination-gap);
        }
        button {
          width: var(--ps-pagination-item-size);
          height: var(--ps-pagination-item-size);
          border-radius: var(--ps-pagination-item-radius);
          border: var(--ps-pagination-item-border-width) solid var(--ps-pagination-item-border-default);
          background: var(--ps-pagination-item-background-default);
          color: var(--ps-pagination-item-text-default);
          font-size: var(--ps-pagination-item-text-font-size);
          font-weight: var(--ps-pagination-item-text-font-weight);
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
        }
        button:hover {
          background: var(--ps-pagination-item-background-hover);
          color: var(--ps-pagination-item-text-hover);
        }
        button:disabled {
          cursor: not-allowed;
          color: var(--ps-pagination-item-text-disabled);
        }
        .active {
          background: var(--ps-pagination-item-background-active);
          color: var(--ps-pagination-item-text-active);
        }
      `}</style>
    </div>
  );
};

export default Pagination;
