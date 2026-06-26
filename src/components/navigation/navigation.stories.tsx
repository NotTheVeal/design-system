import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * @deprecated The standalone Navigation component has been superseded by:
 * - NavTop (Components/NavTop) — top navigation bar, 56px, PS Blue header
 * - NavLeft (Components/NavLeft) — left sidebar navigation, Midnight bg
 * - PageShell (Components/PageShell) — full layout with both nav components
 *
 * This component will be removed in a future release.
 */
const DeprecationNotice = () => (
  <div style={{
    padding: 32,
    border: '2px dashed #E3A92D',
    borderRadius: 8,
    background: '#FFF4D0',
    fontFamily: "'Source Sans Pro', sans-serif",
    maxWidth: 600,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: '#B45309' }}>Deprecated Component</h2>
    </div>
    <p style={{ margin: '0 0 16px', fontSize: 14, color: '#4A4A4A', lineHeight: '22px' }}>
      The standalone <strong>Navigation</strong> component has been replaced by three more specific, production-ready components that match the PS Design System 2.0 specification exactly.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {[
        { name: 'NavTop', desc: '56px top bar — fixed position, PS Blue header, logo + search + actions', path: 'Components/NavTop' },
        { name: 'NavLeft', desc: '240px sidebar — Midnight #002F48 bg, collapsible, 44px item height', path: 'Components/NavLeft' },
        { name: 'PageShell', desc: 'Full page layout with both nav components + content area', path: 'Components/PageShell' },
      ].map(c => (
        <div key={c.name} style={{ padding: '10px 16px', background: 'white', borderRadius: 4, border: '1px solid #DCDCDC' }}>
          <div style={{ fontWeight: 600, color: '#005BA6', marginBottom: 2 }}>{c.name}</div>
          <div style={{ fontSize: 13, color: '#777' }}>{c.desc}</div>
          <div style={{ fontSize: 12, color: '#949494', marginTop: 2 }}>Storybook: {c.path}</div>
        </div>
      ))}
    </div>
  </div>
);

const meta = {
  title: 'Deprecated/Navigation',
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const DeprecationWarning: Story = {
  name: '⚠️ Deprecated — See NavTop + NavLeft',
  render: () => <DeprecationNotice />,
};
