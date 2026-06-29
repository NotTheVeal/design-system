import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NavLeft } from './navLeft';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const OrderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
  </svg>
);
const PartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
  </svg>
);

const SECTIONS = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
      { id: 'orders', label: 'Orders', icon: <OrderIcon />, badge: '3' },
      { id: 'catalog', label: 'Parts Catalog', icon: <PartIcon /> },
    ],
  },
  {
    title: 'Settings',
    items: [
      { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ],
  },
];

const meta: Meta<typeof NavLeft> = {
  title: 'Components/NavLeft',
  component: NavLeft,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof NavLeft>;

export const Default: Story = {
  render: () => (
    <div style={{ display:'flex', height:'100vh' }}>
      <NavLeft sections={SECTIONS} activeId="dashboard" />
      <div style={{ flex:1, padding:32, fontFamily:"'Source Sans Pro',sans-serif", background:'#FAFAFA' }}>
        <h2 style={{ fontSize:24, fontWeight:300, color:'#002F48', marginBottom:8 }}>Dashboard</h2>
        <p style={{ color:'#777777', fontSize:14 }}>Main content area</p>
      </div>
    </div>
  ),
};

export const OrdersActive: Story = {
  render: () => (
    <div style={{ display:'flex', height:'100vh' }}>
      <NavLeft sections={SECTIONS} activeId="orders" />
      <div style={{ flex:1, padding:32, fontFamily:"'Source Sans Pro',sans-serif", background:'#FAFAFA' }}>
        <h2 style={{ fontSize:24, fontWeight:300, color:'#002F48' }}>Orders</h2>
      </div>
    </div>
  ),
};
