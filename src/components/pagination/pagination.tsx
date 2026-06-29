import React from 'react';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
  className?: string;
}

// PS Design System Pagination:
// 32px buttons, 4px radius
// Active: #005BA6 fill, white SemiBold
// Default: white bg, 1px #DCDCDC border, #4A4A4A
// Hover: light blue bg
// Prev/Next arrows

export const Pagination: React.FC<PaginationProps> = ({
  page, totalPages, onPageChange, showFirstLast = false, maxVisible = 7, className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const btnStyle = (isActive: boolean, disabled?: boolean): React.CSSProperties => ({
    width: 32, height: 32, borderRadius: 4,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: font, fontSize: 14, fontWeight: isActive ? 600 : 400,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: isActive ? 'none' : '1px solid #DCDCDC',
    background: isActive ? '#005BA6' : disabled ? '#F1F1F1' : '#FFFFFF',
    color: isActive ? '#FFFFFF' : disabled ? '#CCCCCC' : '#4A4A4A',
    opacity: 1, transition: 'all 150ms ease',
    textDecoration: 'none',
  });

  // Build page numbers to show
  const pages: (number | '...')[] = [];
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className={className} style={{ display:'flex', alignItems:'center', gap:4, fontFamily:font }}>
      {showFirstLast && (
        <button onClick={() => onPageChange(1)} disabled={page === 1} style={btnStyle(false, page === 1)} aria-label="First page">
          «
        </button>
      )}
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1} style={btnStyle(false, page === 1)} aria-label="Previous page">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`e${i}`} style={{ width:32, textAlign:'center', color:'#777777', fontSize:14, fontFamily:font }}>…</span>
        ) : (
          <button key={p} onClick={() => onPageChange(p as number)} style={btnStyle(p === page)} aria-current={p === page ? 'page' : undefined} aria-label={`Page ${p}`}>
            {p}
          </button>
        )
      )}
      <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages} style={btnStyle(false, page === totalPages)} aria-label="Next page">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
      {showFirstLast && (
        <button onClick={() => onPageChange(totalPages)} disabled={page === totalPages} style={btnStyle(false, page === totalPages)} aria-label="Last page">
          »
        </button>
      )}
    </div>
  );
};

export default Pagination;
