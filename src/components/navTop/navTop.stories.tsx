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
export const WithCart: Story = { render: () => <NavTop cartCount="3" onCartClick={() => {}} /> };
export const EmptyCart: Story = { render: () => <NavTop cartCount="Default" /> };
export const WithSearch: Story = {
  render: () => (
    <NavTop
      cartCount="5"
      search={
        <input
          type="search"
          placeholder="Search parts, equipment, suppliers..."
          style={{ width:'100%', height:36, padding:'0 12px 0 36px', border:'1px solid #DCDCDC', borderRadius:4, fontSize:14, fontFamily:"'Source Sans Pro',sans-serif", background:'#FAFAFA' }}
        />
      }
    />
  ),
};
