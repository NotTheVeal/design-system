import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Bell, ShoppingCart } from 'lucide-react';
import NavTop from './navTop';

const FONT = "'Source Sans 3', 'Source Sans Pro', -apple-system, sans-serif";

const meta: Meta<typeof NavTop> = {
  title: 'Components/NavTop',
  component: NavTop,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavTop>;

/** PS Blue "PartsSource" text logo */
const PSLogo = () => (
  <div
    style={{
      fontWeight: 700,
      fontSize: 20,
      color: '#005BA6',
      fontFamily: FONT,
      letterSpacing: '-0.02em',
      userSelect: 'none',
    }}
  >
    PartsSource
  </div>
);

/** Full-width search input */
const SearchInput = () => (
  <input
    type="search"
    placeholder="Search parts, equipment, suppliers…"
    style={{
      width: '100%',
      height: 36,
      padding: '0 12px',
      border: '1px solid #DCDCDC',
      borderRadius: 4,
      fontSize: 14,
      fontFamily: FONT,
      color: '#4A4A4A',
      background: '#FAFAFA',
      outline: 'none',
      boxSizing: 'border-box',
    }}
  />
);

/** Icon button with optional red count badge */
const IconBtn = ({
  children,
  label,
  badge,
}: {
  children: React.ReactNode;
  label: string;
  badge?: number;
}) => (
  <button
    aria-label={label}
    style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 36,
      height: 36,
      background: 'transparent',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      color: '#4A4A4A',
      padding: 0,
    }}
  >
    {children}
    {badge !== undefined && badge > 0 && (
      <span
        style={{
          position: 'absolute',
          top: 2,
          right: 2,
          minWidth: 16,
          height: 16,
          background: '#D63B3B',
          borderRadius: 8,
          color: '#FFF',
          fontSize: 10,
          fontWeight: 700,
          fontFamily: FONT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 3px',
          lineHeight: 1,
          pointerEvents: 'none',
        }}
      >
        {badge > 99 ? '99+' : badge}
      </span>
    )}
  </button>
);

/** User avatar circle showing initials */
const UserAvatar = ({ initials = 'RV' }: { initials?: string }) => (
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: '#005BA6',
      color: '#FFF',
      fontSize: 13,
      fontWeight: 700,
      fontFamily: FONT,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      userSelect: 'none',
      flexShrink: 0,
    }}
    role="button"
    aria-label="User menu"
    tabIndex={0}
  >
    {initials}
  </div>
);

const PageBody = ({ text }: { text: string }) => (
  <div style={{ paddingTop: 72, padding: '72px 24px 24px', fontFamily: FONT, color: '#4A4A4A', fontSize: 14 }}>
    {text}
  </div>
);

/* ── Default: logo + search ──────────────────────────────────────────── */
export const Default: Story = {
  render: () => (
    <div>
      <NavTop logo={<PSLogo />} search={<SearchInput />} />
      <PageBody text="Basic NavTop: PS logo left-aligned, search bar spanning the middle area." />
    </div>
  ),
};

/* ── WithActions: logo + search + bell + avatar ──────────────────────── */
export const WithActions: Story = {
  render: () => (
    <div>
      <NavTop
        logo={<PSLogo />}
        search={<SearchInput />}
        actions={
          <>
            <IconBtn label="Notifications (3 unread)" badge={3}>
              <Bell size={22} strokeWidth={1.8} />
            </IconBtn>
            <UserAvatar initials="RV" />
          </>
        }
      />
      <PageBody text="NavTop with notification bell (3 unread badge) and user avatar on the right." />
    </div>
  ),
};

/* ── WithCart: logo + search + cart + bell + avatar ─────────────────── */
export const WithCart: Story = {
  render: () => (
    <div>
      <NavTop
        logo={<PSLogo />}
        search={<SearchInput />}
        actions={
          <>
            <IconBtn label="Cart (4 items)" badge={4}>
              <ShoppingCart size={22} strokeWidth={1.8} />
            </IconBtn>
            <IconBtn label="Notifications (2 unread)" badge={2}>
              <Bell size={22} strokeWidth={1.8} />
            </IconBtn>
            <UserAvatar initials="RV" />
          </>
        }
      />
      <PageBody text="NavTop with cart icon (4-item red badge), notification bell, and user avatar." />
    </div>
  ),
};
