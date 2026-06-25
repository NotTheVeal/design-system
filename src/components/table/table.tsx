import React, { useState } from 'react';

interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T, index: number) => void;
  loading?: boolean;
  emptyMessage?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  className?: string;
  striped?: boolean;
}

type SortDir = 'asc' | 'desc' | null;

const SortIcon = ({ dir }: { dir: SortDir }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
    <path d="M7 2v10M4 9l3 3 3-3" stroke={dir === 'desc' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 5l3-3 3 3" stroke={dir === 'asc' ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Table<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  loading = false,
  emptyMessage = 'No data to display',
  selectable = false,
  onSelectionChange,
  className = '',
  striped = false,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const toggleRow = (i: number) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setSelected(next);
    onSelectionChange?.(Array.from(next).map(idx => sortedData[idx]));
  };

  const toggleAll = () => {
    if (selected.size === data.length) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      setSelected(new Set(data.map((_, i) => i)));
      onSelectionChange?.(sortedData);
    }
  };

  const alignClass: Record<string, string> = { left: 'text-left', center: 'text-center', right: 'text-right' };

  return (
    <div className={`w-full overflow-auto ${className}`}>
      <table className="w-full border-collapse text-left">
        <thead className="bg-[#005BA6]">
          <tr>
            {selectable && (
              <th className="w-[48px] px-4" style={{ height: 40 }}>
                <input
                  type="checkbox"
                  checked={selected.size === data.length && data.length > 0}
                  onChange={toggleAll}
                  className="w-[16px] h-[16px] rounded-[2px] border border-white accent-white"
                />
              </th>
            )}
            {columns.map(col => (
              <th
                key={col.key}
                style={{ width: col.width, height: 40 }}
                className={`px-4 text-[12px] font-semibold text-white uppercase tracking-[0.05em] whitespace-nowrap ${alignClass[col.align || 'left']} ${col.sortable ? 'cursor-pointer select-none hover:bg-[#004a8f]' : ''}`}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.label}
                  {col.sortable && <SortIcon dir={sortKey === col.key ? sortDir : null} />}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-[14px] text-[#949494]">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-[20px] h-[20px] border-2 border-[#DCDCDC] border-t-[#005BA6] rounded-full animate-spin" />
                  Loading...
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-[14px] text-[#949494]">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, i) => {
              const isSelected = selected.has(i);
              const isOddStripe = striped && i % 2 === 1;
              const rowBg = isSelected
                ? 'bg-[#EFF9FE]'
                : isOddStripe
                ? 'bg-[#FAFAFA]'
                : 'bg-white';
              return (
                <tr
                  key={i}
                  className={`border-b border-[#DCDCDC] last:border-0 transition-colors duration-150 ${rowBg} ${onRowClick ? 'cursor-pointer hover:bg-[#EFF9FE]' : ''}`}
                  onClick={() => onRowClick?.(row, i)}
                >
                  {selectable && (
                    <td
                      className="w-[48px] px-4"
                      style={{ height: 48 }}
                      onClick={e => { e.stopPropagation(); toggleRow(i); }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleRow(i)}
                        className="w-[16px] h-[16px] rounded-[2px] border border-[#DCDCDC] accent-[#005BA6]"
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td
                      key={col.key}
                      style={{ height: 48 }}
                      className={`px-4 text-[14px] text-[#4A4A4A] ${alignClass[col.align || 'left']}`}
                    >
                      {col.render ? col.render(row[col.key], row, i) : String(row[col.key] ?? '')}
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
