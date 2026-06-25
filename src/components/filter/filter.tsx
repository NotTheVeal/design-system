import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface FilterOption {
  label: string;
  value: string;
}

// ─── CheckboxFilter ────────────────────────────────────────────────────────────

interface CheckboxFilterProps {
  label?: string;
  options?: FilterOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  onClick?: () => void;
  className?: string;
}

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 6 8 10 12 6" />
  </svg>
);

export const CheckboxFilter: React.FC<CheckboxFilterProps> = ({
  label,
  options = [],
  value,
  defaultValue = [],
  onChange,
  onClick,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const [hovered, setHovered] = useState(false);

  const controlled = value !== undefined;
  const currentValue = controlled ? value! : internalValue;

  const activeCount = currentValue.length;
  const isActive = activeCount > 0;

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    onClick?.();
  };

  const handleOptionClick = (optValue: string) => {
    const next = currentValue.includes(optValue)
      ? currentValue.filter(v => v !== optValue)
      : [...currentValue, optValue];
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block', fontFamily }}>
      <button
        type="button"
        onClick={handleToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          height: 36,
          padding: '0 12px',
          background: isActive ? '#005BA6' : '#FFFFFF',
          border: `1px solid ${isActive ? '#005BA6' : hovered ? '#949494' : '#DCDCDC'}`,
          borderRadius: 4,
          fontSize: 14,
          fontWeight: isActive ? 600 : 400,
          color: isActive ? '#FFFFFF' : '#4A4A4A',
          cursor: 'pointer',
          fontFamily,
          transition: 'border-color 150ms ease, background 150ms ease',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
        {isActive && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.3)',
              fontSize: 11,
              fontWeight: 700,
              color: '#FFFFFF',
            }}
          >
            {activeCount}
          </span>
        )}
        <ChevronIcon />
      </button>

      {isOpen && options.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 100,
            background: '#FFFFFF',
            border: '1px solid #DCDCDC',
            borderRadius: 4,
            boxShadow: '0 2px 10px rgba(0,47,72,0.10)',
            minWidth: 180,
            padding: '4px 0',
          }}
        >
          {options.map(opt => {
            const selected = currentValue.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleOptionClick(opt.value)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  color: selected ? '#005BA6' : '#4A4A4A',
                  fontWeight: selected ? 600 : 400,
                  textAlign: 'left',
                  fontFamily,
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    border: `1.5px solid ${selected ? '#005BA6' : '#DCDCDC'}`,
                    borderRadius: 2,
                    background: selected ? '#005BA6' : '#FFFFFF',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selected && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1.5 5 4 7.5 8.5 2.5" />
                    </svg>
                  )}
                </span>
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── TreeFilter ────────────────────────────────────────────────────────────────

export interface TreeFilterNode {
  /** Unique identifier for this node */
  id: string;
  /** Display label */
  label: string;
  /** Child nodes (makes this a parent/category row) */
  children?: TreeFilterLeaf[];
}

export interface TreeFilterLeaf {
  id: string;
  label: string;
}

export interface TreeFilterProps {
  /** Tree nodes — each can have children */
  nodes?: TreeFilterNode[];
  /** Currently selected leaf node IDs */
  value?: string[];
  /** Default selected IDs (uncontrolled) */
  defaultValue?: string[];
  /** Called when selection changes */
  onChange?: (selectedIds: string[]) => void;
  /** Show search input at top */
  searchable?: boolean;
  /** Placeholder for search input */
  searchPlaceholder?: string;
  className?: string;
}

export const TreeFilter: React.FC<TreeFilterProps> = ({
  nodes = [],
  value,
  defaultValue = [],
  onChange,
  searchable = false,
  searchPlaceholder = 'Search...',
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
  const [expandedIds, setExpandedIds] = useState<string[]>(() => nodes.map(n => n.id));
  const [searchQuery, setSearchQuery] = useState('');

  const controlled = value !== undefined;
  const currentValue = controlled ? value! : internalValue;

  const handleLeafClick = (leafId: string) => {
    const next = currentValue.includes(leafId)
      ? currentValue.filter(id => id !== leafId)
      : [...currentValue, leafId];
    if (!controlled) setInternalValue(next);
    onChange?.(next);
  };

  const toggleExpanded = (nodeId: string) => {
    setExpandedIds(prev =>
      prev.includes(nodeId) ? prev.filter(id => id !== nodeId) : [...prev, nodeId]
    );
  };

  // Filter nodes by search query
  const filteredNodes = searchQuery
    ? nodes
        .map(node => {
          const nodeMatches = node.label.toLowerCase().includes(searchQuery.toLowerCase());
          const filteredChildren = (node.children || []).filter(child =>
            child.label.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (nodeMatches || filteredChildren.length > 0) {
            return { ...node, children: nodeMatches ? node.children : filteredChildren };
          }
          return null;
        })
        .filter(Boolean) as TreeFilterNode[]
    : nodes;

  return (
    <div
      className={className}
      style={{
        background: '#FFFFFF',
        border: '1px solid #DCDCDC',
        borderRadius: 4,
        minWidth: 240,
        fontFamily,
        overflow: 'hidden',
      }}
    >
      {searchable && (
        <div style={{ padding: '8px 12px', borderBottom: '1px solid #DCDCDC' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg
              width="14" height="14"
              viewBox="0 0 24 24" fill="none" stroke="#949494"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ position: 'absolute', left: 8, flexShrink: 0 }}
            >
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              style={{
                width: '100%',
                padding: '6px 8px 6px 28px',
                border: '1px solid #DCDCDC',
                borderRadius: 4,
                fontSize: 13,
                color: '#4A4A4A',
                fontFamily,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      )}

      <div style={{ padding: '4px 0' }}>
        {filteredNodes.map(node => {
          const isExpanded = expandedIds.includes(node.id);
          const leaves = node.children || [];
          const selectedCount = leaves.filter(l => currentValue.includes(l.id)).length;
          const hasChildren = leaves.length > 0;

          return (
            <div key={node.id}>
              {/* Parent row */}
              <button
                type="button"
                onClick={() => hasChildren && toggleExpanded(node.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  width: '100%',
                  padding: '8px 12px',
                  background: 'none',
                  border: 'none',
                  cursor: hasChildren ? 'pointer' : 'default',
                  textAlign: 'left',
                  fontFamily,
                }}
              >
                {/* Arrow indicator */}
                <span
                  style={{
                    display: 'inline-block',
                    width: 14,
                    fontSize: 10,
                    color: '#4A4A4A',
                    transition: 'transform 150ms ease',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                    visibility: hasChildren ? 'visible' : 'hidden',
                  }}
                >
                  &#9654;
                </span>
                <span
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#2B2B2B',
                  }}
                >
                  {node.label}
                </span>
                {/* Count badge */}
                {selectedCount > 0 && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: '#005BA6',
                      color: '#FFFFFF',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '0 4px',
                    }}
                  >
                    {selectedCount}
                  </span>
                )}
              </button>

              {/* Children */}
              {isExpanded && hasChildren && (
                <div>
                  {leaves.map(leaf => {
                    const selected = currentValue.includes(leaf.id);
                    return (
                      <button
                        key={leaf.id}
                        type="button"
                        onClick={() => handleLeafClick(leaf.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          width: '100%',
                          padding: '7px 12px 7px 32px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: 14,
                          color: selected ? '#005BA6' : '#4A4A4A',
                          fontWeight: selected ? 600 : 400,
                          textAlign: 'left',
                          fontFamily,
                        }}
                      >
                        {/* Checkbox */}
                        <span
                          style={{
                            width: 16,
                            height: 16,
                            border: `1.5px solid ${selected ? '#005BA6' : '#DCDCDC'}`,
                            borderRadius: 2,
                            background: selected ? '#005BA6' : '#FFFFFF',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {selected && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="1.5 5 4 7.5 8.5 2.5" />
                            </svg>
                          )}
                        </span>
                        {leaf.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Keep default export as CheckboxFilter for backward compat
export { CheckboxFilter as default };
