import React from 'react';

export interface CtaBarAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export interface CtaBarProps {
  heading: string;
  subtext?: string;
  actions?: CtaBarAction[];
  background?: string;
  className?: string;
}

// PS Design System CTA Bar:
// Dark navy bg #002F48, full-width, 80px height min
// Heading: Source Sans Pro Bold 24px white
// Subtext: 14px rgba(255,255,255,0.75)
// Actions: right-aligned, primary (white bg + navy text) + secondary (transparent white border)

export const CtaBar: React.FC<CtaBarProps> = ({
  heading, subtext, actions = [], background = '#002F48', className = '',
}) => {
  const font = "'Source Sans Pro', -apple-system, sans-serif";

  return (
    <div
      className={className}
      style={{
        width: '100%', minHeight: 80,
        background,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 40px',
        gap: 24,
        boxSizing: 'border-box',
        fontFamily: font,
      }}
    >
      {/* Text block */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2, fontFamily: font }}>
          {heading}
        </div>
        {subtext && (
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginTop: 4, fontFamily: font }}>
            {subtext}
          </div>
        )}
      </div>

      {/* Action buttons */}
      {actions.length > 0 && (
        <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
          {actions.map((action, i) => {
            const isPrimary = action.variant === 'primary' || i === actions.length - 1;
            return (
              <button
                key={i}
                onClick={action.onClick}
                style={{
                  height: 44,
                  padding: '0 28px',
                  borderRadius: 4,
                  fontFamily: font,
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  background: isPrimary ? '#FFFFFF' : 'transparent',
                  color: isPrimary ? '#002F48' : '#FFFFFF',
                  border: isPrimary ? 'none' : '2px solid rgba(255,255,255,0.6)',
                }}
                onMouseEnter={e => {
                  if (isPrimary) { e.currentTarget.style.background = '#F1F1F1'; }
                  else { e.currentTarget.style.borderColor = '#FFFFFF'; }
                }}
                onMouseLeave={e => {
                  if (isPrimary) { e.currentTarget.style.background = '#FFFFFF'; }
                  else { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; }
                }}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CtaBar;
