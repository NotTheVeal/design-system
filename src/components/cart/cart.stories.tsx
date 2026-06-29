import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Cart } from './cart';

const meta: Meta<typeof Cart> = {
  title: 'Components/Cart',
  component: Cart,
  parameters: { layout: 'centered' },
  argTypes: {
    cart: { control: 'select', options: ['Default','1','2','3','4','5','6','7','8','9','10+'] },
  },
};
export default meta;
type Story = StoryObj<typeof Cart>;

export const Default: Story = { args: { cart: 'Default' } };
export const Empty: Story = { args: { cart: 'Default' } };
export const OneItem: Story = { args: { cart: '1' } };
export const FiveItems: Story = { args: { cart: '5' } };
export const NineItems: Story = { args: { cart: '9' } };
export const TenPlus: Story = { args: { cart: '10+' } };

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap', padding:24 }}>
      {(['Default','1','2','3','4','5','6','7','8','9','10+'] as const).map(c => (
        <div key={c} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <Cart cart={c} onClick={() => {}} />
          <span style={{ fontSize:11, color:'#777777', fontFamily:"'Source Sans Pro',sans-serif" }}>{c}</span>
        </div>
      ))}
    </div>
  ),
};

export const InNavBar: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 24px', height:56, background:'#002F48', borderRadius:4,
      fontFamily:"'Source Sans Pro',sans-serif",
    }}>
      <span style={{ color:'#fff', fontWeight:700, fontSize:16 }}>PartsSource</span>
      <div style={{ display:'flex', gap:8, alignItems:'center' }}>
        <Cart cart="3" onClick={() => {}} />
      </div>
    </div>
  ),
};
