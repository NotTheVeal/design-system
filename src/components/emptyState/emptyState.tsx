import React from 'react';

export type EmptyStateType = 'no-results' | 'no-data' | 'first-use' | 'error';
export type EmptyStateSize = 'full' | 'inline';

export interface EmptyStateProps {
  type?: EmptyStateType;
  size?: EmptyStateSize;
  title?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  icon?: React.ReactNode;
  className?: string;
}

// Figma spec (node 4567:3236 — Empty State):
// Container: white, border 1px #DCDCDC, 8px radius, flex-col centered
// Full: 480×320px; Inline: 320×240px
// Icon badge: 72×72px circle, #F1F1F1 bg, 50% radius, 28px icon inside
// Title: Source Sans Pro SemiBold 18px, #4A4A4A
// Description: Regular 14px, #777777
// Action: Secondary LG button

const DEFAULTS: Record<EmptyStateType, { title: string; description: string }> = {
  'no-results':  { title: 'No results found',   description: "Try adjusting your search terms or filters to find what you're looking for." },
  'no-data':     { title: 'No data available',  description: 'There is no data to display at this time.' },
  'first-use':   { title: 'Get started',        description: 'Add your first item to get started.' },
  'error':       { title: 'Something went wrong', description: 'An error occurred. Please try again.' },
};

const DefaultIcons: Record<EmptyStateType, React.ReactElement> = {
  'no-results': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#777777" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  'no-data': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#777777" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/>
    </svg>
  ),
  'first-use': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#777777" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
    </svg>
  ),
  'error': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#777777" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no-results', size = 'full', title, description, action, icon, className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";
  const defaults = DEFAULTS[type];
  const displayTitle = title || defaults.title;
  const displayDesc = description || defaults.description;
  const iconEl = icon || DefaultIcons[type];
  const isFull = size === 'full';

  return (
    <div
      className={className}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 12, padding: 40,
        background: '#FFFFFF', border: '1px solid #DCDCDC', borderRadius: 8,
        width: isFull ? 480 : 320, minHeight: isFull ? 320 : 240,
        fontFamily: font, textAlign: 'center', boxSizing: 'border-box',
      }}
    >
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#F1F1F1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {iconEl}
      </div>
      <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#4A4A4A', fontFamily: font, lineHeight: 1.3 }}>{displayTitle}</p>
      <p style={{ margin: 0, fontSize: 14, fontWeight: 400, color: '#777777', fontFamily: font, lineHeight: 1.5, maxWidth: 360 }}>{displayDesc}</p>
      {action && (
        <button onClick={action.onClick}
          style={{ marginTop: 8, height: 50, padding: '0 40px', background: '#FFFFFF', border: '2px solid #005BA6', borderRadius: 4, fontSize: 16, fontWeight: 600, color: '#005BA6', cursor: 'pointer', fontFamily: font, textTransform: 'uppercase', letterSpacing: '0.5px', transition: 'all 200ms ease' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#005BA6'; e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = '#005BA6'; }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
