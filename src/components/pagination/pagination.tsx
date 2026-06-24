import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  className?: string;
}

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="10 4 6 8 10 12" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 4 10 8 6 12" />
  </svg>
);

const ChevronsLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8 4 4 8 8 12" /><polyline points="13 4 9 8 13 12" />
  </svg>
);

const ChevronsRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 4 7 8 3 12" /><polyline points="8 4 12 8 8 12" />
  </svg>
);

const PageButton: React.FC<{
  page: number | string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}> = ({ page, isActive, disabled, onClick, children }) => {
  const [hovered, setHovered] = useState(false);
  const isEllipsis = page === 'â¦';

  if (isEllipsis) {
    return (
      <span style={{ width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, color: '#949494', fontFamily }}>
        â¦
      </span>
    );
  }

  const bg = isActive ? '#005BA6' : hovered && !disabled ? '#EBF3FA' : 'transparent';
  const color = isActive ? '#FFFFFF' : disabled ? '#949494' : '#4A4A4A';
  const border = isActive ? '1px solid #005BA6' : '1px solid #DCDCDC';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-current={isActive ? 'page' : undefined}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 36,
        height: 36,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: isActive ? 600 : 400,
        color,
        background: bg,
        border,
        borderRadius: 4,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 150ms ease, color 150ms ease',
        fontFamily,
        padding: 0,
      }}
    >
      {children ?? page}
    </button>
  );
};

const getPageRange = (current: number, total: number, siblings: number): (number | string)[] => {
  const delta = siblings + 2;
  const range: (number | string)[] = [];

  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);

  range.push(1);
  if (left > 2) range.push('â¦');
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push('â¦');
  if (total > 1) range.push(total);

  return range;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const pages = getPageRange(currentPage, totalPages, siblingCount);

  return (
    <nav aria-label="Pagination" className={className}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily }}>
        {showFirstLast && (
          <PageButton page="first" disabled={currentPage === 1} onClick={() => onPageChange(1)}>
            <ChevronsLeft />
          </PageButton>
        )}
        <PageButton page="prev" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft />
        </PageButton>

        {pages.map((p, i) => (
          <PageButton
            key={i}
            page={p}
            isActive={p === currentPage}
            onClick={typeof p === 'number' ? () => onPageChange(p) : undefined}
          />
        ))}

        <PageButton page="next" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          <ChevronRight />
        </PageButton>
        {showFirstLast && (
          <PageButton page="last" disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
            <ChevronsRight />
          </PageButton>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
