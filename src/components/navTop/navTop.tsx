/**
 * NavTop — PS Design System 2.0
 * Height: 56px, bg: #FFFFFF, border-bottom: 1px solid #DCDCDC
 * Position: fixed top, z-index: 100, padding: 0 24px
 */
import React, { forwardRef } from 'react';

const FONT = "'Source Sans 3', 'Source Sans Pro', -apple-system, sans-serif";

export interface NavTopProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  search?: React.ReactNode;
  actions?: React.ReactNode;
}

export const NavTop = forwardRef<HTMLElement, NavTopProps>(function NavTop(
  { logo, search, actions, className, style, ...rest },
  ref
) {
  return (
    <header
      ref={ref}
      role="banner"
      className={['ps-navtop', className].filter(Boolean).join(' ')}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        height: '56px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #DCDCDC',
        padding: '0 24px',
        boxSizing: 'border-box',
        zIndex: 100,
        fontFamily: FONT,
        gap: 16,
        ...style,
      }}
      {...rest}
    >
      {/* Logo — left-aligned, flex-shrink 0 */}
      {logo && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {logo}
        </div>
      )}

      {/* Search — flex 1, full-width middle area */}
      {search && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          {search}
        </div>
      )}

      {/* Spacer when no search */}
      {!search && <div style={{ flex: 1 }} aria-hidden="true" />}

      {/* Actions — right-aligned icons */}
      {actions && (
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          {actions}
        </div>
      )}
    </header>
  );
});

export default NavTop;
