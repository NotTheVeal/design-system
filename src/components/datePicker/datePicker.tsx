import React, { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const ChevronLeft = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ChevronRight = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const CalendarIcon = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.75"/><path d="M2 7h14M6 1v4M12 1v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/></svg>;

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue = null,
  onChange,
  label,
  placeholder = 'Select date',
  disabled = false,
  error,
  minDate,
  maxDate,
  className = '',
}) => {
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const controlled = value !== undefined;
  const selectedDate = controlled ? value : internalValue;

  const today = new Date();
  const [viewYear, setViewYear] = useState((selectedDate || today).getFullYear());
  const [viewMonth, setViewMonth] = useState((selectedDate || today).getMonth());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (date: Date) => {
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;
    if (!controlled) setInternalValue(date);
    onChange?.(date);
    setIsOpen(false);
  };

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const formatDate = (d: Date | null) => d ? `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}` : '';
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const borderColor = error ? 'border-[#D32F2F]' : isOpen ? 'border-[#005BA6] shadow-[0_0_0_3px_rgba(0,147,244,0.3)]' : 'border-[#DCDCDC] hover:border-[#949494]';
  const hasValue = Boolean(selectedDate);
  const floated = isOpen || hasValue;

  return (
    <div className={`relative w-full ${className}`} ref={containerRef}>
      <div
        className={`relative h-[48px] border ${borderColor} rounded-[4px] bg-white transition-all duration-150 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => { if (!disabled) setIsOpen(!isOpen); }}
      >
        {label && (
          <label className={`absolute left-3 pointer-events-none transition-all duration-150 ${floated ? 'top-2 text-[12px] font-semibold text-[#005BA6]' : 'top-1/2 -translate-y-1/2 text-[16px] text-[#777777]'}`}>{label}</label>
        )}
        <div className={`absolute left-3 right-10 bottom-0 pb-2 text-[16px] select-none ${floated && label ? 'pt-5' : 'pt-2'} ${selectedDate ? 'text-[#4A4A4A]' : 'text-[#777777]'}`}>
          {selectedDate ? formatDate(selectedDate) : (floated && label ? '' : placeholder)}
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777]"><CalendarIcon /></div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white border border-[#DCDCDC] rounded-[8px] shadow-[0_6px_20px_rgba(0,47,72,0.18)] p-4 w-[280px]">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="w-[28px] h-[28px] flex items-center justify-center rounded-[4px] text-[#777777] hover:bg-[#F1F1F1] transition-colors"><ChevronLeft /></button>
            <span className="text-[14px] font-semibold text-[#4A4A4A]">{MONTHS[viewMonth]} {viewYear}</span>
            <button onClick={nextMonth} className="w-[28px] h-[28px] flex items-center justify-center rounded-[4px] text-[#777777] hover:bg-[#F1F1F1] transition-colors"><ChevronRight /></button>
          </div>

          <div className="grid grid-cols-7 gap-0 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-[11px] font-semibold text-[#949494] py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(viewYear, viewMonth, day);
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
              const isToday = date.toDateString() === today.toDateString();
              const isDisabled = (minDate && date < minDate) || (maxDate && date > maxDate);
              return (
                <button key={day} onClick={() => handleSelect(date)} disabled={Boolean(isDisabled)}
                  className={`w-full aspect-square flex items-center justify-center text-[13px] rounded-full transition-colors duration-150
                    ${isSelected ? 'bg-[#005BA6] text-white font-semibold' : isToday ? 'border border-[#005BA6] text-[#005BA6]' : isDisabled ? 'text-[#CCCCCC] cursor-not-allowed' : 'text-[#4A4A4A] hover:bg-[#F1F1F1]'}`}>
                  {day}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-[#DCDCDC] flex justify-between">
            <button onClick={() => { if (!controlled) setInternalValue(null); onChange?.(null); setIsOpen(false); }}
              className="text-[12px] text-[#777777] hover:text-[#4A4A4A] transition-colors">Clear</button>
            <button onClick={() => { handleSelect(today); }}
              className="text-[12px] font-semibold text-[#005BA6] hover:text-[#004A84] transition-colors">Today</button>
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-[12px] text-[#D32F2F]">{error}</p>}
    </div>
  );
};

export default DatePicker;
