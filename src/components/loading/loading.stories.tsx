import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Loading } from './loading';

const meta: Meta<typeof Loading> = {
  title: 'Components/Loading',
  component: Loading,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Loading>;

export const Default: Story = { args: { size: 'md' } };
export const ExtraSmall: Story = { args: { size: 'xs' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const ExtraLarge: Story = { args: { size: 'xl' } };
export const WithLabel: Story = { args: { size: 'md', label: 'Loading parts...' } };
export const AllSizes: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', gap:32, alignItems:'center', padding:24 }}>
      {(['xs','sm','md','lg','xl'] as const).map(s => (
        <div key={s} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          <Loading size={s} />
          <span style={{ fontSize:11, color:'#777777', fontFamily:"'Source Sans Pro',sans-serif", textTransform:'uppercase', letterSpacing:'0.5px' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};
