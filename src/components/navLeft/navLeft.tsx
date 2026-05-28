import React, { useState } from 'react';

interface NavItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  disabled?: boolean;
  badge?: string | number;
  href?: string;
}

interface NavLeftProps {
  items: NavItem[];
  activeValue?: string;
  onItemClick?: (value: string) => void;
  className?: string;
  collapsed?: boolean;
}

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NavLeft: React.FC<NavLeftProps> = ({
  items,
  activeValue,
  onItemClick,
  className = '',
  collapsed = false,
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (value: string) => {
    setExpanded(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const renderItem = (item: NavItem, depth = 0): React.ReactNode => {
    const isActive = activeValue === item.value;
    const isExpanded = expanded.includes(item.value);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.value}>
        <div
          role="button"
          tabIndex={item.disabled ? -1 : 0}
          onClick={() => {
            if (item.disabled) return;
            if (hasChildren) toggleExpand(item.value);
            else onItemClick?.(item.value);
          }}
          className={`flex items-center gap-3 h-[40px] px-3 rounded-[4px] text-[14px] font-semibold transition-colors duration-150 cursor-pointer select-none mb-0.5
            ${depth > 0 ? 'ml-6' : ''}
            ${item.disabled ? 'text-[#CCCCCC] cursor-not-allowed' : isActive ? 'bg-[#DCEAED] text-[#005BA6]' : 'text-[#4A4A4A] hover:bg-[#F1F1F1]'}`}
        >
          {item.icon && <span className="flex-shrink-0 w-[20px] h-[20px] flex items-center justify-center">{item.icon}</span>}
          {!collapsed && (
            <>
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge !== undefined && (
                <span className="flex-shrink-0 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-[#005BA6] text-white text-[11px] font-bold">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <span className={`flex-shrink-0 transition-transform duration-150 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                  <ChevronDown />
                </span>
              )}
            </>
          )}
        </div>
        {hasChildren && isExpanded && !collapsed && (
          <div>{item.children!.map(child => renderItem(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={`flex flex-col ${collapsed ? 'w-[56px]' : 'w-[240px]'} bg-white border-r border-[#DCDCDC] h-full py-4 px-2 transition-all duration-200 ${className}`}
      aria-label="Side navigation"
    >
      {items.map(item => renderItem(item))}
    </nav>
  );
};

export default NavLeft;
