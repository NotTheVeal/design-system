import React, { useState, useRef, useEffect } from 'react';

const FONT = "'Source Sans 3', 'Source Sans Pro', -apple-system, sans-serif";

const T = {
  borderDefault: '#DCDCDC',
  borderLight:   '#F1F1F1',
  bgWhite:       '#FFFFFF',
  textPrimary:   '#4A4A4A',
  textSecondary: '#777777',
  textDisabled:  '#AAAAAA',
  brandBlue:     '#005BA6',
  focusRing:     '#005BA6',
} as const;

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  multiple?: boolean;
  openItems?: string[];
  onOpenChange?: (openItems: string[]) => void;
  className?: string;
  style?: React.CSSProperties;
}

const AccordionPanel: React.FC<{ isOpen: boolean; children: React.ReactNode }> = ({ isOpen, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | string>(isOpen ? 'auto' : 0);

  useEffect(() => {
    if (!panelRef.current) return;
    if (isOpen) {
      const scrollH = panelRef.current.scrollHeight;
      setHeight(scrollH);
      const timer = setTimeout(() => setHeight('auto'), 220);
      return () => clearTimeout(timer);
    } else {
      const scrollH = panelRef.current.scrollHeight;
      setHeight(scrollH);
      requestAnimationFrame(() => { requestAnimationFrame(() => setHeight(0)); });
    }
  }, [isOpen]);

  return (
    <div ref={panelRef} aria-hidden={!isOpen} style={{
      overflow: 'hidden',
      height: typeof height === 'number' ? height + 'px' : height,
      transition: 'height 220ms cubic-bezier(0.4,0,0.2,1)',
      willChange: 'height',
    }}>{children}</div>
  );
};

const ChevronIcon: React.FC<{ isOpen: boolean; size?: number }> = ({ isOpen, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={T.textSecondary} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 220ms cubic-bezier(0.4,0,0.2,1)' }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DragHandle: React.FC = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill={T.textSecondary} aria-hidden="true"
    style={{ flexShrink: 0, cursor: 'grab', marginRight: 8 }}>
    <circle cx="5"  cy="4"  r="1.25" /><circle cx="5"  cy="8"  r="1.25" /><circle cx="5"  cy="12" r="1.25" />
    <circle cx="11" cy="4"  r="1.25" /><circle cx="11" cy="8"  r="1.25" /><circle cx="11" cy="12" r="1.25" />
  </svg>
);

// Inline flat accordion — NO grey on expanded trigger, always white
export const Accordion: React.FC<AccordionProps> = ({ items, multiple = false, openItems: openItemsProp, onOpenChange, className = '', style }) => {
  const isControlled = openItemsProp !== undefined;
  const [internalOpen, setInternalOpen] = useState<string[]>(() => items.filter(i => i.defaultOpen).map(i => i.id));
  const openItems = isControlled ? openItemsProp! : internalOpen;

  const toggle = (id: string) => {
    const next = openItems.includes(id) ? openItems.filter(x => x !== id) : multiple ? [...openItems, id] : [id];
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={className} style={{ fontFamily: FONT, width: '100%', ...style }}>
      {items.map((item, idx) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div key={item.id} style={{
            backgroundColor: T.bgWhite, // Always white — never grey
            borderBottom: '1px solid ' + T.borderDefault,
            ...(idx === 0 ? { borderTop: '1px solid ' + T.borderDefault } : {}),
          }}>
            <button
              id={'accordion-trigger-' + item.id}
              aria-expanded={isOpen}
              aria-controls={'accordion-panel-' + item.id}
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.id)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '16px 0', fontFamily: FONT, fontSize: 16, fontWeight: 600,
                lineHeight: 1.4, color: item.disabled ? T.textDisabled : T.textPrimary,
                backgroundColor: T.bgWhite, // Explicit white — no grey on expanded
                border: 'none', cursor: item.disabled ? 'not-allowed' : 'pointer',
                textAlign: 'left', outline: 'none', gap: 12, userSelect: 'none',
              }}
              onFocus={e => { if (!item.disabled) { e.currentTarget.style.outline = '2px solid ' + T.focusRing; e.currentTarget.style.outlineOffset = '2px'; } }}
              onBlur={e => { e.currentTarget.style.outline = 'none'; }}
            >
              <span style={{ flex: 1 }}>{item.title}</span>
              <ChevronIcon isOpen={isOpen} />
            </button>
            <div id={'accordion-panel-' + item.id} role="region" aria-labelledby={'accordion-trigger-' + item.id}>
              <AccordionPanel isOpen={isOpen}>
                <div style={{ padding: '0 0 20px 0', fontFamily: FONT, fontSize: 14, lineHeight: 1.6, color: T.textPrimary, backgroundColor: T.bgWhite }}>
                  {item.content}
                </div>
              </AccordionPanel>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export interface AccordionSingleProps {
  title: string; children: React.ReactNode; defaultOpen?: boolean; disabled?: boolean;
  className?: string; style?: React.CSSProperties;
}

export const AccordionSingle: React.FC<AccordionSingleProps> = ({ title, children, defaultOpen = false, disabled = false, className = '', style }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Accordion className={className} style={style}
      items={[{ id: 'single', title, content: children, disabled, defaultOpen }]}
      openItems={isOpen ? ['single'] : []}
      onOpenChange={ids => setIsOpen(ids.includes('single'))}
    />
  );
};

// AccordionCard — Large card variant (Figma: Accordion-Section node 4390:39583)
// White card, 4px radius, 2px #F1F1F1 border, 60px header
// Source Sans Pro 25px / weight 300 (Light), drag handle, 14px chevron
export interface AccordionCardItem {
  id: string; title: string; content: React.ReactNode; disabled?: boolean; defaultOpen?: boolean;
  subtitle?: string; draggable?: boolean;
}

export interface AccordionCardProps {
  items: AccordionCardItem[]; multiple?: boolean; openItems?: string[];
  onOpenChange?: (openItems: string[]) => void; className?: string; style?: React.CSSProperties;
}

export const AccordionCard: React.FC<AccordionCardProps> = ({ items, multiple = false, openItems: openItemsProp, onOpenChange, className = '', style }) => {
  const isControlled = openItemsProp !== undefined;
  const [internalOpen, setInternalOpen] = useState<string[]>(() => items.filter(i => i.defaultOpen).map(i => i.id));
  const openItems = isControlled ? openItemsProp! : internalOpen;

  const toggle = (id: string) => {
    const next = openItems.includes(id) ? openItems.filter(x => x !== id) : multiple ? [...openItems, id] : [id];
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={className} style={{ fontFamily: FONT, width: '100%', display: 'flex', flexDirection: 'column', gap: 8, ...style }}>
      {items.map(item => {
        const isOpen = openItems.includes(item.id);
        const showDrag = item.draggable !== false;
        return (
          <div key={item.id} style={{ backgroundColor: T.bgWhite, border: '2px solid ' + T.borderLight, borderRadius: 4, overflow: 'hidden' }}>
            <button
              id={'accordion-card-trigger-' + item.id}
              aria-expanded={isOpen}
              aria-controls={'accordion-card-panel-' + item.id}
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.id)}
              style={{
                display: 'flex', alignItems: 'center', width: '100%', height: 60,
                padding: '16px 26px', fontFamily: FONT, fontSize: 25, fontWeight: 300,
                lineHeight: 1.2, color: '#000000', backgroundColor: T.bgWhite,
                border: 'none', borderBottom: isOpen ? '1px solid ' + T.borderLight : 'none',
                cursor: item.disabled ? 'not-allowed' : 'pointer', textAlign: 'left',
                outline: 'none', userSelect: 'none', boxSizing: 'border-box',
              }}
              onFocus={e => { if (!item.disabled) { e.currentTarget.style.outline = '2px solid ' + T.focusRing; e.currentTarget.style.outlineOffset = '-2px'; } }}
              onBlur={e => { e.currentTarget.style.outline = 'none'; }}
            >
              {showDrag && <DragHandle />}
              <span style={{ flex: 1, marginRight: 12 }}>{item.title}</span>
              {item.subtitle && !isOpen && (
                <span style={{ fontSize: 13, fontWeight: 400, color: T.textSecondary, marginRight: 16, whiteSpace: 'nowrap' }}>{item.subtitle}</span>
              )}
              <ChevronIcon isOpen={isOpen} size={14} />
            </button>
            <div id={'accordion-card-panel-' + item.id} role="region" aria-labelledby={'accordion-card-trigger-' + item.id}>
              <AccordionPanel isOpen={isOpen}>
                <div style={{ backgroundColor: T.bgWhite, fontFamily: FONT, fontSize: 14, color: T.textPrimary }}>
                  {item.content}
                </div>
              </AccordionPanel>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
