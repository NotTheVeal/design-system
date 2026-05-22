import React from 'react';

interface DatePickerProps {
  className?: string;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  ariaLabel?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ className, selectedDate, onDateSelect, ariaLabel }) => {
  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  
  const days: JSX.Element[] = [];
  
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="day empty" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    const isSelected = date.toDateString() === selectedDate.toDateString();
    const isToday = date.toDateString() === new Date().toDateString();
    
    days.push(
      <button
        key={day}
        className={`day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
        onClick={() => onDateSelect(date)}
        aria-label={ariaLabel ? `${ariaLabel} ${day}` : `${day}`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className={`date-picker ${className}`}>
      <div className="calendar">
        <div className="days">
          {days}
        </div>
      </div>
      <style jsx>{`
        :root {
          --ps-color-background-calendar: transparent;
          --ps-color-background-day-default: transparent;
          --ps-color-background-day-hover: #e0e0e0;
          --ps-color-background-day-selected: #005BA6;
          --ps-color-background-day-today: #DCE6F1;
          --ps-color-text-day-default: #000;
          --ps-color-text-day-selected: #fff;
          --ps-color-text-day-today: #005BA6;
          --ps-color-border-calendar: #DCDCDC;
          --ps-spacing-cell-size: 36px;
          --ps-spacing-calendar-padding: 16px;
          --ps-border-radius-day: 50%;
          --ps-shadow-calendar: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .date-picker {
          font-family: 'Source Sans Pro', sans-serif;
        }

        .calendar {
          padding: var(--ps-spacing-calendar-padding);
          border: 1px solid var(--ps-color-border-calendar);
          border-radius: 8px;
          box-shadow: var(--ps-shadow-calendar);
        }

        .days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: var(--ps-spacing-gap);
        }

        .day {
          display: flex;
          justify-content: center;
          align-items: center;
          height: var(--ps-spacing-cell-size);
          border-radius: var(--ps-border-radius-day);
          background-color: var(--ps-color-background-day-default);
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .day:hover {
          background-color: var(--ps-color-background-day-hover);
        }

        .day.selected {
          background-color: var(--ps-color-background-day-selected);
          color: var(--ps-color-text-day-selected);
        }

        .day.today {
          background-color: var(--ps-color-background-day-today);
          color: var(--ps-color-text-day-today);
        }
      `}</style>
    </div>
  );
}

export default DatePicker;
