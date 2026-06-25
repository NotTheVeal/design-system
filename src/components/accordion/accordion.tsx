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
  const triggerHeight = size === 'lg' ? 60 : 48;
  const contentPadding = size === 'lg' ? '16px 24px 20px' : '12px 16px 16px';

  const isCard = variant === 'card';
  const isInlineFaq = variant === 'inline-faq';

  return (
    <div
      className={className}
      style={{
        width: '100%',
        fontFamily: font,
        borderRadius: isCard ? 8 : 0,
        overflow: isCard ? 'hidden' : undefined,
        boxShadow: isCard ? '0 2px 10px rgba(0,47,72,0.10)' : undefined,
        border: isCard ? '1px solid #DCDCDC' : undefined,
      }}
    >
      {items.map((item, i) => {
        const isOpen = openIds.has(item.id);
        const isFirst = i === 0;
        const isLast = i === items.length - 1;

        return (
          <div
            key={item.id}
            style={{
              borderTop: !isCard && !isFirst ? '1px solid #DCDCDC' : undefined,
              borderBottom: isCard && !isLast ? '1px solid #DCDCDC' : undefined,
            }}
          >
            {/* Trigger */}
            <button
              onClick={() => !item.disabled && toggle(item.id)}
              aria-expanded={isOpen}
              disabled={item.disabled}
              style={{
                width: '100%',
                height: triggerHeight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: size === 'lg' ? '0 24px' : '0 16px',
                background: '#FFFFFF',
                border: 'none',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                fontFamily: font,
                fontSize: isInlineFaq ? 16 : 14,
                fontWeight: 300,
                color: item.disabled ? '#949494' : isInlineFaq ? '#002F48' : '#4A4A4A',
                textAlign: 'left',
                transition: 'background 150ms ease',
                outline: 'none',
              }}
              onMouseEnter={e => !item.disabled && ((e.currentTarget as HTMLElement).style.background = '#FAFAFA')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#FFFFFF')}
              onFocus={e => ((e.currentTarget as HTMLElement).style.outline = '2px solid #005BA6')}
              onBlur={e => ((e.currentTarget as HTMLElement).style.outline = 'none')}
            >
              <span style={{ flex: 1, fontWeight: isInlineFaq ? 400 : 300 }}>{item.title}</span>
              <span
                style={{
                  flexShrink: 0,
                  marginLeft: 12,
                  color: '#005BA6',
                  display: 'flex',
                  alignItems: 'center',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms ease',
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
                maxHeight: isOpen ? 1000 : 0,
                transition: 'max-height 250ms ease',
              }}
            >
              <div
                style={{
                  padding: contentPadding,
                  background: '#FFFFFF',
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#4A4A4A',
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
