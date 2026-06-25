import React from 'react';

const fontFamily = "'Source Sans Pro', 'Source Sans 3', sans-serif";

const NAV_TOP_HEIGHT = 56;
const NAV_LEFT_WIDTH = 240;
const NAV_LEFT_COLLAPSED_WIDTH = 60;

// ─── PageShell Props ──────────────────────────────────────────────────────────

interface PageShellProps {
  /** Top navigation bar content (pinned, 56px height) */
  navTop?: React.ReactNode;
  /** Left navigation bar content (pinned, 240px width) */
  navLeft?: React.ReactNode;
  /** Main page content */
  children: React.ReactNode;
  /** Collapse left nav to icon-only mode (60px) */
  sidebarCollapsed?: boolean;
  className?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

const PageShell: React.FC<PageShellProps> = ({
  navTop,
  navLeft,
  children,
  sidebarCollapsed = false,
  className = '',
}) => {
  const leftWidth = navLeft
    ? sidebarCollapsed
      ? NAV_LEFT_COLLAPSED_WIDTH
      : NAV_LEFT_WIDTH
    : 0;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#FAFAFA',
        fontFamily,
      }}
    >
      {/* NavTop — pinned, full width, 56px */}
      {navTop && (
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: NAV_TOP_HEIGHT,
            zIndex: 200,
            background: '#FFFFFF',
            borderBottom: '1px solid #DCDCDC',
            display: 'flex',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          {navTop}
        </header>
      )}

      {/* NavLeft — pinned, below NavTop */}
      {navLeft && (
        <aside
          style={{
            position: 'fixed',
            top: navTop ? NAV_TOP_HEIGHT : 0,
            left: 0,
            bottom: 0,
            width: leftWidth,
            zIndex: 100,
            background: '#FFFFFF',
            borderRight: '1px solid #DCDCDC',
            overflowY: 'auto',
            overflowX: 'hidden',
            boxSizing: 'border-box',
            transition: 'width 200ms ease',
          }}
        >
          {navLeft}
        </aside>
      )}

      {/* Main content area */}
      <main
        role="main"
        style={{
          paddingTop: navTop ? NAV_TOP_HEIGHT : 0,
          paddingLeft: leftWidth,
          minHeight: '100vh',
          boxSizing: 'border-box',
          transition: 'padding-left 200ms ease',
        }}
      >
        <div style={{ padding: '24px' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default PageShell;
