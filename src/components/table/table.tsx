import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const STYLE_ID = 'ps-table-styles';
const injectTableStyles = () => {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = '.ps-table-row:hover td { background: #F1F1F1 !important; } .ps-table-cell:focus { outline: none; box-shadow: inset 0 0 0 2px rgba(0,147,244,0.4); }';
  document.head.appendChild(style);
};

type SortDirection = 'asc' | 'desc' | null;

interface TableColumn {
  key: string;
  label: string;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

interface TableProps {
  columns?: TableColumn[];
  headers?: string[];
  data?: string[][];
  rows?: Record<string, React.ReactNode>[];
  striped?: boolean;
  sortColumn?: string;
  sortDirection?: SortDirection;
  onSort?: (key: string) => void;
  className?: string;
}

const SortIcon = ({ direction }: { direction: SortDirection }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 4, opacity: direction ? 1 : 0.4 }}>
    {direction === 'asc'
      ? <polyline points="18 15 12 9 6 15" />
      : direction === 'desc'
        ? <polyline points="6 9 12 15 18 9" />
        : <><polyline points="18 9 12 3 6 9" /><polyline points="6 15 12 21 18 15" /></>}
  </svg>
);

const Table: React.FC<TableProps> = ({
  columns, headers, data, rows, striped = true,
  sortColumn, sortDirection, onSort, className = '',
}) => {
  if (typeof document !== 'undefined') injectTableStyles();

  const cols: TableColumn[] = columns ?? (headers?.map(h => ({ key: h, label: h })) ?? []);

  const normalizedRows: Record<string, React.ReactNode>[] =
    rows ?? data?.map(row => Object.fromEntries(cols.map((col, i) => [col.key, row[i] ?? '']))) ?? [];

  const headerCellStyle: React.CSSProperties = {
    padding: '0 16px',
    height: 42,
    textAlign: 'left',
    fontSize: 13,
    fontWeight: 600,
    color: '#4A4A4A',
    background: '#F1F1F1',
    borderBottom: '1px solid #DCDCDC',
    whiteSpace: 'nowrap',
    fontFamily,
    userSelect: 'none',
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto', fontFamily }}>
      <table
        className={className}
        style={{ width: '100%', borderCollapse: 'collapse', fontFamily, fontSize: 14, color: '#4A4A4A' }}
      >
        <thead>
          <tr>
            {cols.map((col, i) => (
              <th
                key={col.key ?? i}
                style={{ ...headerCellStyle, textAlign: col.align ?? 'left', width: col.width, cursor: col.sortable ? 'pointer' : 'default' }}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {col.label}
                  {col.sortable && <SortIcon direction={sortColumn === col.key ? sortDirection ?? null : null} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {normalizedRows.map((row, rowIdx) => {
            const rowBg = striped && rowIdx % 2 === 1 ? '#FAFAFA' : '#FFFFFF';
            return (
              <tr key={rowIdx} className="ps-table-row">
                {cols.map((col, colIdx) => (
                  <td
                    key={col.key ?? colIdx}
                    className="ps-table-cell"
                    tabIndex={0}
                    style={{
                      padding: '0 16px',
                      height: 48,
                      background: rowBg,
                      borderBottom: '1px solid #DCDCDC',
                      fontSize: 14,
                      color: '#4A4A4A',
                      textAlign: col.align ?? 'left',
                      fontFamily,
                      verticalAlign: 'middle',
                      transition: 'background 100ms ease',
                    }}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
