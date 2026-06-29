import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NavTop } from './navTop';

const meta: Meta<typeof NavTop> = {
  title: 'Components/NavTop',
  component: NavTop,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof NavTop>;

export const Default: Story = { render: () => <NavTop /> };

export const WithCart: Story = {
  render: () => <NavTop cartCount="3" onCartClick={() => {}} />,
};

export const EmptyCart: Story = {
  render: () => <NavTop cartCount="Default" onCartClick={() => {}} />,
};

export const HighCartCount: Story = {
  render: () => <NavTop cartCount="10+" onCartClick={() => {}} />,
};

export const WithSearch: Story = {
  render: () => (
    <NavTop
      cartCount="5"
      onCartClick={() => {}}
      search={
        <div style={{ position: 'relative', width: '100%' }}>
          <svg style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'#949494', pointerEvents:'none' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            type="search"
            placeholder="Search parts, equipment, suppliers..."
            style={{ width:'100%', height:36, padding:'0 12px 0 34px', border:'1px solid #DCDCDC', borderRadius:4, fontSize:14, fontFamily:"'Source Sans Pro',sans-serif", background:'#FAFAFA', color:'#4A4A4A' }}
          />
        </div>
      }
    />
  ),
};
