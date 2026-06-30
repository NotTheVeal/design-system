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

// Figma spec: UI Actions/chevron/right — a right-pointing chevron (›)
// Collapsed state: rotate(180deg) → points LEFT ‹
// Expanded state:  rotate(90deg)  → points DOWN ↓
const ChevronRight = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
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
      if (next.has(id)) { next.delete(id); }
      else { if (!allowMultiple) next.clear(); next.add(id); }
      return next;
    });
  };

  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const isInlineFaq = variant === 'inline-faq';
  const isCard = variant === 'card';

  const borderColor = (isInlineFaq || isCard) ? '#DCE6E9' : '#DCDCDC';
  const headerHeight = 56;
  const headerPadding = '0 20px';

  return (
    <div
      className={className}
      style={{
        width: '100%',
        fontFamily: font,
        background: '#FFFFFF',
        border: (isInlineFaq || isCard) ? `1px solid ${borderColor}` : 'none',
        boxShadow: isCard ? '0 2px 10px rgba(0,47,72,0.10)' : 'none',
        borderRadius: isCard ? 4 : 0,
        overflow: (isInlineFaq || isCard) ? 'hidden' : undefined,
      }}
    >
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `accordion-trigger-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div key={item.id} style={{ borderBottom: `1px solid ${borderColor}` }}>
            <button
              id={triggerId}
              onClick={() => !item.disabled && toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={item.disabled}
              style={{
                width: '100%', height: headerHeight, display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', padding: headerPadding,
                background: '#FFFFFF', border: 'none',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                fontFamily: font, fontSize: isInlineFaq ? 16 : (size === 'lg' ? 16 : 15),
                fontWeight: 400, color: item.disabled ? '#949494' : '#002F48',
                textAlign: 'left', outline: 'none',
              }}
            >
              <span style={{ flex: 1, lineHeight: 1.4 }}>{item.title}</span>
              <span style={{ flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.disabled ? '#DCE6E9' : '#002F48', transform: isOpen ? 'rotate(90deg)' : 'rotate(180deg)', transition: 'transform 220ms ease' }}><ChevronRight /></span>
            </button>
            <div id={panelId} role="region" aria-labelledby={triggerId} aria-hidden={!isOpen}
              style={{ overflow: 'hidden', maxHeight: isOpen ? 2000 : 0, transition: 'max-height 280ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
              <div style={{ padding: '8px 20px 24px', background: '#FFFFFF', fontSize: 14, fontWeight: 400, color: '#737B84', lineHeight: 1.6, borderTop: `1px solid ${borderColor}`, fontFamily: font }}>
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
