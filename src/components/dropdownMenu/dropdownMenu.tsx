import React, { useState, useRef, useEffect, useCallback } from 'react';

/**
 * DropdownMenu — PS Design System 2.0
 *
 * Action/navigation dropdown menu. Distinct from Select (form field) —
 * DropdownMenu is for action menus and navigation, not form data collection.
 *
 * Spec:
 * - Trigger: any React node (usually a Button or InlineButton)
 * - Menu: white bg, 1px #DCDCDC border, 4px radius, shadow 0 4px 12px rgba(0,47,72,0.12)
 * - Item: 36px height, 12px 16px padding, 14px #4A4A4A text
 * - Hover item: #EBF3FA bg, #005BA6 text
 * - Danger item: #E00000 text
 * - Divider: 1px solid #F1F1F1, 4px vertical margin
 * - Disabled: opacity 0.4, cursor not-allowed
 * - Keyboard: Escape closes, ArrowUp/Down navigate, Enter/Space selects
 */

export interface DropdownMenuItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  /** Renders a divider line ABOVE this item */
  divider?: boolean;
}

export type DropdownMenuPlacement =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right';

export interface DropdownMenuProps {
  /** The trigger element (button, icon, etc.) */
  trigger: React.ReactNode;
  /** Menu items */
  items: DropdownMenuItem[];
  /** Where the menu appears relative to the trigger */
  placement?: DropdownMenuPlacement;
  /** Called when an item is selected */
  onSelect?: (value: string) => void;
  className?: string;
}

const FONT = "'Source Sans 3', -apple-system, sans-serif";

export function DropdownMenu({
  trigger,
  items,
  placement = 'bottom-left',
  onSelect,
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          setOpen(true);
          setFocusedIndex(0);
        }
        return;
      }

      const enabledIndexes = items
        .map((item, i) => (item.disabled ? -1 : i))
        .filter((i) => i !== -1);

      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        setFocusedIndex(-1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentPos = enabledIndexes.indexOf(focusedIndex);
        const next = enabledIndexes[(currentPos + 1) % enabledIndexes.length];
        setFocusedIndex(next);
        itemRefs.current[next]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentPos = enabledIndexes.indexOf(focusedIndex);
        const prev =
          enabledIndexes[
            (currentPos - 1 + enabledIndexes.length) % enabledIndexes.length
          ];
        setFocusedIndex(prev);
        itemRefs.current[prev]?.focus();
      } else if (e.key === 'Tab') {
        setOpen(false);
        setFocusedIndex(-1);
      }
    },
    [open, items, focusedIndex]
  );

  const handleSelect = (item: DropdownMenuItem) => {
    if (item.disabled) return;
    onSelect?.(item.value);
    setOpen(false);
    setFocusedIndex(-1);
  };

  // Placement styles
  const getMenuPosition = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'absolute',
      zIndex: 1000,
    };
    switch (placement) {
      case 'bottom-left':
        return { ...base, top: 'calc(100% + 4px)', left: 0 };
      case 'bottom-right':
        return { ...base, top: 'calc(100% + 4px)', right: 0 };
      case 'top-left':
        return { ...base, bottom: 'calc(100% + 4px)', left: 0 };
      case 'top-right':
        return { ...base, bottom: 'calc(100% + 4px)', right: 0 };
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block' }}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger wrapper */}
      <div
        onClick={() => {
          setOpen((prev) => !prev);
          if (!open) setFocusedIndex(-1);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
        style={{ display: 'inline-flex' }}
      >
        {trigger}
      </div>

      {/* Menu panel */}
      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          style={{
            ...getMenuPosition(),
            minWidth: 180,
            backgroundColor: '#FFFFFF',
            border: '1px solid #DCDCDC',
            borderRadius: 4,
            boxShadow: '0 4px 12px rgba(0, 47, 72, 0.12)',
            padding: '4px 0',
            fontFamily: FONT,
          }}
        >
          {items.map((item, index) => {
            const isFocused = focusedIndex === index;
            return (
              <React.Fragment key={item.value}>
                {item.divider && (
                  <div
                    role="separator"
                    style={{
                      height: 1,
                      backgroundColor: '#F1F1F1',
                      margin: '4px 0',
                    }}
                  />
                )}
                <button
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  role="menuitem"
                  disabled={item.disabled}
                  onClick={() => handleSelect(item)}
                  onFocus={() => setFocusedIndex(index)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onMouseLeave={() => setFocusedIndex(-1)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    height: 36,
                    padding: '0 16px',
                    border: 'none',
                    background:
                      isFocused && !item.disabled ? '#EBF3FA' : 'transparent',
                    color: item.danger
                      ? '#E00000'
                      : isFocused && !item.disabled
                      ? '#005BA6'
                      : '#4A4A4A',
                    fontSize: 14,
                    fontWeight: 400,
                    fontFamily: FONT,
                    textAlign: 'left',
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    opacity: item.disabled ? 0.4 : 1,
                    transition: 'background 100ms ease, color 100ms ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.icon && (
                    <span
                      style={{
                        fontSize: 16,
                        lineHeight: 1,
                        flexShrink: 0,
                        color: 'inherit',
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
