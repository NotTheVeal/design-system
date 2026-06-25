import React, { useState, useMemo } from 'react';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  width?: string | number;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  selectable?: boolean;
  onSelectionChange?: (selected: T[]) => void;
  onRowClick?: (row: T, index: number) => void;
  emptyText?: string;
  loading?: boolean;
  stickyHeader?: boolean;
  rowKey?: keyof T | ((row: T) => string);
  className?: string;
}

type SortDir = 'asc' | 'desc' | null;

const SortIcon: React.FC<{ dir: SortDir }> = ({ dir }) => (
  <span style={{ marginLeft: 6, fontSize: 10, opacity: dir ? 1 : 0.5, userSelect: 'none' }}>
    {dir === 'asc' ? '▲' : dir === 'desc' ? '▼' : '⇅'}
  </span>
);

export function Table<T = Record<string, unknown>>({
  columns,
  data,
  selectable = false,
  onSelectionChange,
  onRowClick,
  emptyText = 'No results found.',
  loading = false,
  stickyHeader = false,
  rowKey,
  className = '',
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const getKey = (row: T, i: number): string => {
    if (!rowKey) return String(i);
    if (typeof rowKey === 'function') return rowKey(row);
    return String(row[rowKey]);
  };

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      const cmp = String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable) return;
    if (sortKey !== col.key) { setSortKey(col.key); setSortDir('asc'); return; }
    setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc');
    if (sortDir === 'desc') setSortKey(null);
  };

  const allSelected = sorted.length > 0 && sorted.every((r, i) => selected.has(getKey(r, i)));
  const someSelected = sorted.some((r, i) => selected.has(getKey(r, i)));

  const toggleAll = () => {
    const next = new Set(allSelected ? [] : sorted.map((r, i) => getKey(r, i)));
    setSelected(next);
    onSelectionChange?.(sorted.filter((r, i) => next.has(getKey(r, i))));
  };

  const toggleRow = (row: T, i: number) => {
    const k = getKey(row, i);
    const next = new Set(selected);
    next.has(k) ? next.delete(k) : next.add(k);
    setSelected(next);
    onSelectionChange?.(sorted.filter((r, j) => next.has(getKey(r, j))));
  };

  const font = "'Source Sans Pro', -apple-system, sans-serif";

  return (
    <div
      className={className}
      style={{ width: '100%', overflowX: 'auto', border: '1px solid #DCDCDC', borderRadius: 4, fontFamily: font }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr>
            {selectable && (
              <th style={{ width: 40, padding: '0 12px', background: '#005BA6', borderBottom: '1px solid #004A84', textAlign: 'center', position: stickyHeader ? 'sticky' : undefined, top: stickyHeader ? 0 : undefined, zIndex: stickyHeader ? 1 : undefined }}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={el => el && (el.indeterminate = someSelected && !allSelected)}
                  onChange={toggleAll}
                  style={{ cursor: 'pointer', accentColor: '#FFFFFF' }}
                />
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                style={{
                  height: 40,
                  padding: '0 16px',
                  background: '#005BA6',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 600,
                  textAlign: col.align || 'left',
                  whiteSpace: 'nowrap',
                  width: col.width,
                  cursor: col.sortable ? 'pointer' : 'default',
                  userSelect: 'none',
                  borderBottom: '1px solid #004A84',
                  borderRight: '1px solid rgba(255,255,255,0.12)',
                  position: stickyHeader ? 'sticky' : undefined,
                  top: stickyHeader ? 0 : undefined,
                  zIndex: stickyHeader ? 1 : undefined,
                  transition: 'background 150ms ease',
                }}
                onMouseEnter={e => col.sortable && ((e.currentTarget as HTMLElement).style.background = '#004A84')}
                onMouseLeave={e => col.sortable && ((e.currentTarget as HTMLElement).style.background = '#005BA6')}
              >
                {col.header}
                {col.sortable && <SortIcon dir={sortKey === col.key ? sortDir : null} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} style={{ height: 120, textAlign: 'center', color: '#777777', padding: 24 }}>
                Loading…
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} style={{ height: 120, textAlign: 'center', color: '#777777', padding: 24 }}>
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, i) => {
              const k = getKey(row, i);
              const isSelected = selected.has(k);
              const isOdd = i % 2 === 1;
              return (
                <tr
                  key={k}
                  onClick={() => onRowClick?.(row, i)}
                  style={{
                    height: 48,
                    background: isSelected ? '#DCEAED' : isOdd ? '#FAFAFA' : '#FFFFFF',
                    cursor: onRowClick ? 'pointer' : 'default',
                    borderBottom: '1px solid #DCDCDC',
                    transition: 'background 150ms ease',
                  }}
                  onMouseEnter={e => !isSelected && ((e.currentTarget as HTMLElement).style.background = '#EFF9FE')}
                  onMouseLeave={e => !isSelected && ((e.currentTarget as HTMLElement).style.background = isOdd ? '#FAFAFA' : '#FFFFFF')}
                >
                  {selectable && (
                    <td style={{ width: 40, padding: '0 12px', textAlign: 'center', borderRight: '1px solid #DCDCDC' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(row, i)}
                        onClick={e => e.stopPropagation()}
                        style={{ cursor: 'pointer', accentColor: '#005BA6' }}
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td
                      key={col.key}
                      style={{
                        padding: '0 16px',
                        color: '#4A4A4A',
                        textAlign: col.align || 'left',
                        fontSize: 14,
                        borderRight: '1px solid #DCDCDC',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: 300,
                      }}
                    >
                      {col.render
                        ? col.render((row as Record<string, unknown>)[col.key], row, i)
                        : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
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
