import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  showCount?: boolean;
  showPageSize?: boolean;
  className?: string;
}

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize = 12,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [12, 24, 48],
  showCount = false,
  showPageSize = false,
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

  const pageBtn: React.CSSProperties = {
    minWidth: 32, height: 32, display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', borderRadius: 4, border: '1px solid transparent',
    background: 'transparent', fontSize: 14, fontWeight: 400, color: '#4A4A4A',
    cursor: 'pointer', fontFamily, transition: 'all 150ms ease', outline: 'none', padding: '0 6px',
  };

  const activePageBtn: React.CSSProperties = {
    ...pageBtn, border: '1px solid #2B2B2B', background: '#FFFFFF', fontWeight: 600, color: '#2B2B2B',
  };

  const navBtn: React.CSSProperties = {
    ...pageBtn, border: '1px solid #DCDCDC', background: '#FFFFFF',
  };

  const navBtnDisabled: React.CSSProperties = {
    ...navBtn, opacity: 0.4, cursor: 'not-allowed',
  };

  const countStart = totalItems ? (currentPage - 1) * pageSize + 1 : null;
  const countEnd = totalItems ? Math.min(currentPage * pageSize, totalItems) : null;

  return (
    <nav aria-label="Pagination" style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily }} className={className}>
      {showCount && totalItems != null && (
        <span style={{ fontSize: 14, color: '#4A4A4A', whiteSpace: 'nowrap', fontFamily }}>
          {countStart}–{countEnd} of {totalItems}
        </span>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={currentPage === 1 ? navBtnDisabled : navBtn}
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {getPages().map((p, i) =>
          typeof p === 'string' ? (
            <span key={`e${i}`} style={{ ...pageBtn, cursor: 'default', color: '#949494' }}>…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              style={currentPage === p ? activePageBtn : pageBtn}
              aria-current={currentPage === p ? 'page' : undefined}
              onMouseEnter={e => {
                if (currentPage !== p) (e.currentTarget as HTMLButtonElement).style.background = '#F1F1F1';
              }}
              onMouseLeave={e => {
                if (currentPage !== p) (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={currentPage === totalPages ? navBtnDisabled : navBtn}
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {showPageSize && onPageSizeChange && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, color: '#4A4A4A', fontFamily }}>Show</span>
          <select
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
            style={{
              height: 32, padding: '0 28px 0 10px', border: '1px solid #DCDCDC', borderRadius: 4,
              fontSize: 14, color: '#4A4A4A', background: '#FFFFFF', cursor: 'pointer', fontFamily,
              outline: 'none', appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234A4A4A' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center',
            }}
          >
            {pageSizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}
    </nav>
  );
};

export default Pagination;
