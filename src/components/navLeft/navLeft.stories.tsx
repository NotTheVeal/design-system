import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NavLeft } from './navLeft';

const HomeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const PackageIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>;
const CartIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>;

const SECTIONS = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
      { id: 'orders', label: 'Orders', icon: <PackageIcon />, badge: '3' },
      { id: 'catalog', label: 'Parts Catalog', icon: <CartIcon /> },
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
      <div style={{ flex:1, padding:24, fontFamily:"'Source Sans Pro',sans-serif", color:'#4A4A4A' }}>
        <h2 style={{ fontSize:24, fontWeight:300, color:'#002F48' }}>Dashboard</h2>
        <p style={{ marginTop:8, color:'#777777' }}>Main content area</p>
      </div>
    </div>
  ),
};

export const WithActiveOrder: Story = {
  render: () => (
    <div style={{ display:'flex', height:'100vh' }}>
      <NavLeft sections={SECTIONS} activeId="orders" />
    </div>
  ),
};
