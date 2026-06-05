import React, { useState } from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 200ms ease',
      flexShrink: 0,
    }}
  >
    <polyline points="5 8 10 13 15 8" />
  </svg>
);

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    () => new Set(items.map((item, i) => (item.defaultOpen ? i : -1)).filter(i => i >= 0))
  );

  const toggle = (index: number) => {
    setOpenIndexes(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={className} style={{ fontFamily, width: '100%' }}>
      {items.map((item, i) => {
        const isOpen = openIndexes.has(i);
        return (
          <div
            key={i}
            style={{
              border: '1px solid #DCDCDC',
              borderRadius: 4,
              marginBottom: i < items.length - 1 ? 8 : 0,
              overflow: 'hidden',
              background: '#FFFFFF',
            }}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: isOpen ? '#F1F1F1' : '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                fontSize: 16,
                fontWeight: 600,
                color: '#2B2B2B',
                fontFamily,
                textAlign: 'left',
                transition: 'background 150ms ease',
              }}
            >
              <span>{item.title}</span>
              <ChevronIcon open={isOpen} />
            </button>
            {isOpen && (
              <div
                style={{
                  padding: '16px 20px',
                  background: '#FFFFFF',
                  fontSize: 14,
                  color: '#4A4A4A',
                  fontFamily,
                }}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
