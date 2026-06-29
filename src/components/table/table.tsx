import React from 'react';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  render?: (value: unknown, row: T, idx: number) => React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey?: (row: T, idx: number) => string;
  selectedKeys?: string[];
  onRowSelect?: (key: string) => void;
  onSort?: (key: string, dir: 'asc' | 'desc') => void;
  sortKey?: string;
  sortDir?: 'asc' | 'desc';
  striped?: boolean;
  stickyHeader?: boolean;
  emptyMessage?: string;
  className?: string;
}

// PS Design System Table (Figma node 4099:6874):
// Header: #FAFAFA bg, 14px SemiBold #4A4A4A, 1px #DCDCDC bottom border
// Row: 48px height, 14px Regular #4A4A4A, 1px #F1F1F1 bottom border
// Hover: #F7FAFD background
// Selected: #E8F2FA background
// Sort icon: chevron up/down #005BA6

export function Table<T = Record<string, unknown>>({
  columns, data, rowKey, selectedKeys = [], onRowSelect, onSort, sortKey, sortDir,
  striped = false, emptyMessage = 'No data to display', className = '',
}: TableProps<T>) {
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  const getKey = (row: T, idx: number) => rowKey ? rowKey(row, idx) : String(idx);

  return (
    <div className={className} style={{ width: '100%', overflowX: 'auto', fontFamily: font }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
        <thead>
          <tr style={{ background: '#FAFAFA', borderBottom: '1px solid #DCDCDC' }}>
            {columns.map(col => (
              <th
                key={col.key}
                style={{
                  padding: '0 16px',
                  height: 44,
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#4A4A4A',
                  textAlign: col.align || 'left',
                  width: col.width,
                  whiteSpace: 'nowrap',
                  cursor: col.sortable ? 'pointer' : 'default',
                  userSelect: 'none',
                  background: '#FAFAFA',
                }}
                onClick={() => {
                  if (col.sortable && onSort) {
                    onSort(col.key, sortKey === col.key && sortDir === 'asc' ? 'desc' : 'asc');
                  }
                }}
              >
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  {col.header}
                  {col.sortable && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={sortKey === col.key ? '#005BA6' : '#DCDCDC'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {sortKey === col.key && sortDir === 'desc'
                        ? <polyline points="18 15 12 9 6 15"/>
                        : <polyline points="6 9 12 15 18 9"/>}
                    </svg>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center', padding: '32px 16px', color: '#777777', fontSize: 14 }}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => {
              const key = getKey(row, idx);
              const isSelected = selectedKeys.includes(key);
              const isHovered = hoveredRow === key;
              const isStriped = striped && idx % 2 === 1;
              const bg = isSelected ? '#E8F2FA' : isHovered ? '#F7FAFD' : isStriped ? '#F9F9F9' : '#FFFFFF';

              return (
                <tr
                  key={key}
                  onClick={() => onRowSelect?.(key)}
                  onMouseEnter={() => setHoveredRow(key)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{
                    background: bg,
                    borderBottom: '1px solid #F1F1F1',
                    cursor: onRowSelect ? 'pointer' : 'default',
                    transition: 'background 100ms ease',
                  }}
                >
                  {columns.map(col => {
                    const value = (row as Record<string, unknown>)[col.key];
                    return (
                      <td
                        key={col.key}
                        style={{
                          padding: '0 16px',
                          height: 48,
                          fontSize: 14,
                          fontWeight: 400,
                          color: '#4A4A4A',
                          textAlign: col.align || 'left',
                          verticalAlign: 'middle',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {col.render ? col.render(value, row, idx) : String(value ?? '')}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
