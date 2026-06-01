import React from 'react';

interface ListCardItem {
  id: string | number;
  primary: string;
  secondary?: string;
  meta?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  status?: React.ReactNode;
}

interface ListCardProps {
  items: ListCardItem[];
  onItemClick?: (item: ListCardItem) => void;
  className?: string;
}

const ListCard: React.FC<ListCardProps> = ({ items = [], onItemClick, className = '' }) => {
  return (
    <div className={`bg-white border border-[color:var(--ps-border-default)] rounded-[4px] shadow-[var(--ps-shadow-sm)] overflow-hidden ${className}`}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center gap-3 px-4 py-3 transition-colors duration-150 ${index < items.length - 1 ? 'border-b border-[color:var(--ps-border-default)]' : ''} ${onItemClick ? 'cursor-pointer hover:bg-[#FAFAFA]' : ''}`}
          onClick={() => onItemClick?.(item)}
          role={onItemClick ? 'button' : undefined}
          tabIndex={onItemClick ? 0 : undefined}
        >
          {item.icon && (
            <div className="flex-shrink-0 w-[40px] h-[40px] rounded-full bg-[#DCEAED] flex items-center justify-center text-[color:var(--ps-brand-primary)]">
              {item.icon}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-semibold text-[color:var(--ps-fg-primary)] truncate">{item.primary}</p>
            {item.secondary && <p className="text-[12px] text-[#777777] truncate">{item.secondary}</p>}
          </div>
          {item.status && <div className="flex-shrink-0">{item.status}</div>}
          {item.meta && <span className="flex-shrink-0 text-[12px] text-[#949494]">{item.meta}</span>}
          {item.action && <div className="flex-shrink-0">{item.action}</div>}
        </div>
      ))}
    </div>
  );
};

export default ListCard;
