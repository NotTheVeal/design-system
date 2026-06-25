import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  siblingCount?: number;
  size?: 'sm' | 'md';
  className?: string;
}

function getRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function getPages(current: number, total: number, siblings: number): (number | '...')[] {
  const totalSlots = siblings * 2 + 5; // first + last + current + 2*siblings + 2*dots
  if (total <= totalSlots) return getRange(1, total);

  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (!showLeftDots && showRightDots) {
    const left = getRange(1, 3 + siblings * 2);
    return [...left, '...', total];
  }
  if (showLeftDots && !showRightDots) {
    const right = getRange(total - (2 + siblings * 2), total);
    return [1, '...', ...right];
  }
  return [1, '...', ...getRange(leftSibling, rightSibling), '...', total];
}

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const ChevronsLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" />
  </svg>
);
const ChevronsRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" />
  </svg>
);

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = false,
  siblingCount = 1,
  size = 'md',
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const pages = getPages(currentPage, totalPages, siblingCount);
  const btnSize = size === 'sm' ? 32 : 36;
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const baseBtn: React.CSSProperties = {
    width: btnSize,
    height: btnSize,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #DCDCDC',
    borderRadius: 4,
    background: '#FFFFFF',
    color: '#4A4A4A',
    fontSize: size === 'sm' ? 12 : 13,
    fontWeight: 400,
    fontFamily: font,
    cursor: 'pointer',
    transition: 'all 150ms ease',
    lineHeight: 1,
    padding: 0,
    userSelect: 'none',
  };

  const activeBtn: React.CSSProperties = {
    ...baseBtn,
    background: '#005BA6',
    borderColor: '#005BA6',
    color: '#FFFFFF',
    fontWeight: 600,
  };

  const disabledBtn: React.CSSProperties = {
    ...baseBtn,
    color: '#CCCCCC',
    borderColor: '#DCDCDC',
    cursor: 'not-allowed',
    background: '#FAFAFA',
  };

  const NavBtn: React.FC<{
    onClick: () => void;
    disabled: boolean;
    label: string;
    icon: React.ReactNode;
  }> = ({ onClick, disabled, label, icon }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      style={disabled ? disabledBtn : baseBtn}
      onMouseEnter={e => !disabled && ((e.currentTarget as HTMLElement).style.background = '#DCEAED')}
      onMouseLeave={e => !disabled && ((e.currentTarget as HTMLElement).style.background = '#FFFFFF')}
    >
      {icon}
    </button>
  );

  return (
    <nav
      aria-label="Pagination"
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: font }}
    >
      {showFirstLast && (
        <NavBtn onClick={() => onPageChange(1)} disabled={currentPage === 1} label="First page" icon={<ChevronsLeft />} />
      )}
      <NavBtn onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} label="Previous page" icon={<ChevronLeft />} />

      {pages.map((page, i) =>
        page === '...' ? (
          <span
            key={`dots-${i}`}
            style={{ width: btnSize, height: btnSize, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#777777', fontFamily: font }}
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            style={page === currentPage ? activeBtn : baseBtn}
            onMouseEnter={e => page !== currentPage && ((e.currentTarget as HTMLElement).style.background = '#DCEAED')}
            onMouseLeave={e => page !== currentPage && ((e.currentTarget as HTMLElement).style.background = '#FFFFFF')}
          >
            {page}
          </button>
        )
      )}

      <NavBtn onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} label="Next page" icon={<ChevronRight />} />
      {showFirstLast && (
        <NavBtn onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} label="Last page" icon={<ChevronsRight />} />
      )}
    </nav>
  );
};

export default Pagination;
