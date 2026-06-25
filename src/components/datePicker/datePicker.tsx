import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ─── PS Design System 2.0 — DatePicker ────────────────────────────────────────
// Spec:
//   - Height: 48px input trigger
//   - Floating label: "Select Date" label
//   - Calendar icon: right-pinned, 20px, #777777 (PS Blue when focused)
//   - On focus: border #005BA6, box-shadow rgba(0,147,244,0.3) 3px
//   - Calendar popup:
//       Width: 280px
//       Border: 1px solid #DCDCDC
//       Border-radius: 4px
//       Shadow: 0 4px 12px rgba(0,47,72,0.12)
//       Header: Month/Year with chevron arrows
//       Days grid: 7 columns
//       Today: #005BA6 text, no fill
//       Selected: #005BA6 fill, white text
//       Hover: #F1F1F1 bg
//   - Quick select presets row: Today / Last 7 days / Last 30 days / Last 90 days
//   - Font: Source Sans 3
// ─────────────────────────────────────────────────────────────────────────────

const FONT = "'Source Sans 3', -apple-system, sans-serif";

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

function toDateStr(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function parseDate(str: string): Date | null {
  if (!str) return null;
  const parts = str.split('-');
  if (parts.length !== 3) return null;
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return isNaN(d.getTime()) ? null : d;
}

function formatDisplay(str: string): string {
  const d = parseDate(str);
  if (!d) return '';
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// ─── Calendar Popup ───────────────────────────────────────────────────────────
interface CalendarProps {
  value: string;
  onSelect: (date: string) => void;
  min?: string;
  max?: string;
}

function Calendar({ value, onSelect, min, max }: CalendarProps) {
  const today = new Date();
  const selected = parseDate(value);
  const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth());

  const minDate = parseDate(min || '');
  const maxDate = parseDate(max || '');

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const isDisabled = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    if (minDate && d < minDate) return true;
    if (maxDate && d > maxDate) return true;
    return false;
  };

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const isSelected = (day: number) =>
    selected?.getFullYear() === viewYear &&
    selected?.getMonth() === viewMonth &&
    selected?.getDate() === day;

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #DCDCDC',
        borderRadius: 4,
        boxShadow: '0 4px 12px rgba(0,47,72,0.12)',
        padding: '12px 16px 16px',
        width: 280,
        fontFamily: FONT,
        userSelect: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* Month / Year header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            background: 'none',
            border: '1px solid #DCDCDC',
            borderRadius: 4,
            width: 28,
            height: 28,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4A4A4A',
          }}
          aria-label="Previous month"
        >
          <ChevronLeft size={16} strokeWidth={1.75} />
        </button>
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#002F48',
            fontFamily: FONT,
          }}
        >
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          style={{
            background: 'none',
            border: '1px solid #DCDCDC',
            borderRadius: 4,
            width: 28,
            height: 28,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#4A4A4A',
          }}
          aria-label="Next month"
        >
          <ChevronRight size={16} strokeWidth={1.75} />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 2,
          marginBottom: 4,
        }}
      >
        {DAYS.map((d) => (
          <div
            key={d}
            style={{
              textAlign: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: '#777777',
              fontFamily: FONT,
              padding: '2px 0',
              textTransform: 'uppercase',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 2,
        }}
      >
        {cells.map((day, i) => {
          if (day === null) return <div key={i} />;

          const selected_ = isSelected(day);
          const today_ = isToday(day);
          const disabled_ = isDisabled(day);

          // Selected: #005BA6 fill, white text
          // Today: #005BA6 text, no fill (border only)
          const bg = selected_ ? '#005BA6' : 'transparent';
          const color = selected_ ? '#FFFFFF' : disabled_ ? '#DCDCDC' : today_ ? '#005BA6' : '#002F48';
          const border = today_ && !selected_ ? '1px solid #005BA6' : '1px solid transparent';

          return (
            <button
              key={i}
              onClick={() => {
                if (!disabled_) onSelect(toDateStr(viewYear, viewMonth, day));
              }}
              disabled={disabled_}
              aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}`}
              aria-pressed={selected_}
              style={{
                width: '100%',
                aspectRatio: '1',
                border,
                borderRadius: '50%',
                background: bg,
                color,
                fontSize: 13,
                fontWeight: selected_ ? 700 : today_ ? 600 : 400,
                fontFamily: FONT,
                cursor: disabled_ ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 100ms ease',
              }}
              onMouseEnter={(e) => {
                if (!disabled_ && !selected_) {
                  (e.currentTarget as HTMLButtonElement).style.background = '#F1F1F1';
                }
              }}
              onMouseLeave={(e) => {
                if (!disabled_ && !selected_) {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                }
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── DatePicker ───────────────────────────────────────────────────────────────
export interface DatePickerProps {
  label?: string;
  value?: string;
  onChange?: (date: string) => void;
  min?: string;
  max?: string;
  disabled?: boolean;
  helperText?: string;
  error?: string;
  placeholder?: string;
  /** Show quick select preset pills: Today, Last 7 days, Last 30 days, Last 90 days */
  showPresets?: boolean;
  className?: string;
}

function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return toDateStr(d.getFullYear(), d.getMonth(), d.getDate());
}

const PRESETS: { label: string; getValue: () => string }[] = [
  { label: 'Today', getValue: () => { const d = new Date(); return toDateStr(d.getFullYear(), d.getMonth(), d.getDate()); } },
  { label: 'Last 7 days', getValue: () => addDays(new Date(), -7) },
  { label: 'Last 30 days', getValue: () => addDays(new Date(), -30) },
  { label: 'Last 90 days', getValue: () => addDays(new Date(), -90) },
];

export function DatePicker({
  label = 'Select Date',
  value: externalValue,
  onChange,
  min,
  max,
  disabled = false,
  helperText,
  error,
  placeholder = 'Select a date',
  showPresets = false,
  className,
}: DatePickerProps) {
  const [value, setValue] = useState(externalValue || '');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync externalValue
  useEffect(() => {
    if (externalValue !== undefined) setValue(externalValue);
  }, [externalValue]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); setFocused(false); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleSelect = (date: string) => {
    setValue(date);
    onChange?.(date);
    setOpen(false);
    setFocused(false);
  };

  const getBorder = () => {
    if (disabled) return '1px solid #DCDCDC';
    if (error) return '1px solid #FF0000';
    if (focused || open) return '1px solid #005BA6';
    if (hovered) return '1px solid #949494';
    return '1px solid #DCDCDC';
  };

  const getBoxShadow = () => {
    if (disabled) return 'none';
    if (error && (focused || open)) return '0 0 0 3px rgba(224,0,0,0.12)';
    if (focused || open) return '0 0 0 3px rgba(0,147,244,0.3)';
    return 'none';
  };

  const labelFloated = focused || open || Boolean(value);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 4,
        fontFamily: FONT,
        position: 'relative',
        width: '100%',
        maxWidth: 320,
      }}
    >
      {/* Input trigger — 48px height per spec */}
      <div
        role="combobox"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={label ?? 'Date picker'}
        tabIndex={disabled ? -1 : 0}
        onClick={() => {
          if (!disabled) {
            setOpen((o) => !o);
            setFocused(true);
          }
        }}
        onFocus={() => !disabled && setFocused(true)}
        onBlur={() => {
          if (!open) setFocused(false);
        }}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => !disabled && setHovered(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) setOpen((o) => !o);
          }
        }}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: 48,
          border: getBorder(),
          borderRadius: 4,
          background: disabled ? '#FAFAFA' : '#FFFFFF',
          boxShadow: getBoxShadow(),
          transition: 'border 150ms ease, box-shadow 150ms ease',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.65 : 1,
          boxSizing: 'border-box',
          paddingLeft: 12,
          paddingRight: 44,
          userSelect: 'none',
        }}
      >
        {/* Floating label */}
        {label && (
          <span
            style={{
              position: 'absolute',
              left: 12,
              pointerEvents: 'none',
              fontFamily: FONT,
              lineHeight: 1,
              transition: 'top 120ms ease, font-size 120ms ease, color 120ms ease',
              top: labelFloated ? 8 : '50%',
              transform: labelFloated ? undefined : 'translateY(-50%)',
              fontSize: labelFloated ? 11 : 15,
              fontWeight: labelFloated ? 700 : 400,
              color: error ? '#FF0000' : (focused || open) ? '#005BA6' : '#777777',
              zIndex: 1,
            }}
          >
            {label}
          </span>
        )}

        {/* Display value */}
        <span
          style={{
            paddingTop: label ? 16 : 0,
            fontSize: 15,
            color: value ? '#4A4A4A' : '#949494',
            fontFamily: FONT,
            flex: 1,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {value ? formatDisplay(value) : label ? '' : placeholder}
        </span>

        {/* Calendar icon — right-pinned, 20px, #777777 */}
        <span
          style={{
            position: 'absolute',
            right: 12,
            display: 'flex',
            alignItems: 'center',
            color: (focused || open) ? '#005BA6' : '#777777',
            pointerEvents: 'none',
            paddingTop: label && labelFloated ? 8 : 0,
            transition: 'color 150ms ease',
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
      </div>

      {/* Helper / Error text */}
      {(helperText || error) && (
        <span
          style={{
            fontSize: 12,
            color: error ? '#FF0000' : '#777777',
            fontFamily: FONT,
          }}
        >
          {error ?? helperText}
        </span>
      )}

      {/* Calendar popup */}
      {open && (
        <div
          role="dialog"
          aria-label="Date calendar"
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            zIndex: 1000,
          }}
        >
          {/* Quick select presets — pill buttons row above calendar */}
          {showPresets && (
            <div
              style={{
                display: 'flex',
                gap: 6,
                flexWrap: 'wrap',
                padding: '8px 12px',
                background: '#FFFFFF',
                border: '1px solid #DCDCDC',
                borderBottom: 'none',
                borderRadius: '4px 4px 0 0',
                width: 280,
                boxSizing: 'border-box',
              }}
            >
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => handleSelect(p.getValue())}
                  style={{
                    background: 'transparent',
                    border: '1px solid #DCDCDC',
                    borderRadius: 100,
                    padding: '3px 10px',
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#4A4A4A',
                    cursor: 'pointer',
                    fontFamily: FONT,
                    transition: 'background 100ms ease, border-color 100ms ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#EFF9FE';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#005BA6';
                    (e.currentTarget as HTMLButtonElement).style.color = '#005BA6';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#DCDCDC';
                    (e.currentTarget as HTMLButtonElement).style.color = '#4A4A4A';
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
          <div style={{ borderRadius: showPresets ? '0 0 4px 4px' : 4, overflow: 'hidden' }}>
            <Calendar value={value} onSelect={handleSelect} min={min} max={max} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
