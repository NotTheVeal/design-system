import React, { useState } from 'react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  variant?: 'default' | 'card' | 'inline-faq';
  size?: 'md' | 'lg';
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = 'default',
  size = 'md',
  allowMultiple = false,
  defaultOpen = [],
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpen));
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!allowMultiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const isCard = variant === 'card';
  const isInlineFaq = variant === 'inline-faq';
  const triggerHeight = size === 'lg' ? 64 : 52;

  // Font sizes and weights per variant
  const titleFontSize = isInlineFaq ? 17 : (size === 'lg' ? 16 : 15);
  const titleFontWeight = isInlineFaq ? 600 : 600;
  const titleColor = isInlineFaq ? '#002F48' : '#4A4A4A';

  return (
    <div
      className={className}
      style={{
        width: '100%',
        fontFamily: font,
        ...(isCard ? {
          borderRadius: 4,
          overflow: 'hidden',
          border: '1px solid #DCDCDC',
          boxShadow: '0 2px 10px rgba(0,47,72,0.10)',
        } : {}),
      }}
    >
      {items.map((item, i) => {
        const isOpen = openIds.has(item.id);
        const isHovered = hoveredId === item.id;
        const isFirst = i === 0;
        const isLast = i === items.length - 1;

        const triggerBg = item.disabled
          ? '#FFFFFF'
          : isHovered && !isOpen
            ? '#FAFAFA'
            : isOpen
              ? (isCard ? '#F7FAFD' : '#FAFAFA')
              : '#FFFFFF';

        return (
          <div
            key={item.id}
            style={{
              borderTop: !isFirst ? '1px solid #DCDCDC' : (isCard ? 'none' : 'none'),
            }}
          >
            {/* Trigger */}
            <button
              onClick={() => !item.disabled && toggle(item.id)}
              aria-expanded={isOpen}
              disabled={item.disabled}
              onMouseEnter={() => !item.disabled && setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                width: '100%',
                minHeight: triggerHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: size === 'lg' ? '14px 24px' : '12px 16px',
                background: triggerBg,
                border: 'none',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                fontFamily: font,
                fontSize: titleFontSize,
                fontWeight: titleFontWeight,
                color: item.disabled ? '#949494' : titleColor,
                textAlign: 'left',
                transition: 'background 150ms ease',
                outline: 'none',
                gap: 12,
              }}
            >
              <span style={{ flex: 1, lineHeight: 1.4 }}>{item.title}</span>
              <span
                style={{
                  flexShrink: 0,
                  color: item.disabled ? '#DCDCDC' : '#005BA6',
                  display: 'flex',
                  alignItems: 'center',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 220ms ease',
                }}
              >
                <ChevronDown />
              </span>
            </button>

            {/* Panel */}
            <div
              aria-hidden={!isOpen}
              style={{
                overflow: 'hidden',
                maxHeight: isOpen ? 2000 : 0,
                transition: 'max-height 280ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <div
                style={{
                  padding: size === 'lg' ? '4px 24px 20px' : '4px 16px 16px',
                  background: isCard ? '#F7FAFD' : '#FAFAFA',
                  fontSize: 14,
                  fontWeight: 400,
                  color: isInlineFaq ? '#4A4A4A' : '#777777',
                  lineHeight: '22px',
                  borderTop: '1px solid #DCDCDC',
                }}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
