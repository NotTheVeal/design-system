import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Divider } from './divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth:400, width:'100%', margin:'0 auto', padding:24 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = { args: { weight: 'default' } };
export const Subtle: Story = { args: { weight: 'subtle' } };
export const Strong: Story = { args: { weight: 'strong' } };
export const WithLabel: Story = { args: { weight: 'default', label: 'Billing' } };
export const Vertical: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div style={{ display:'flex', alignItems:'center', gap:16, height:40, fontFamily:"'Source Sans Pro',sans-serif", fontSize:14 }}>
      <span>Orders</span>
      <Divider orientation="vertical" weight="default" style={{ height:20 }} />
      <span>Parts</span>
      <Divider orientation="vertical" weight="default" style={{ height:20 }} />
      <span>Vendors</span>
    </div>
  ),
};
export const AllWeights: Story = {
  render: () => (
    <div style={{ display:'flex', flexDirection:'column', gap:20, fontFamily:"'Source Sans Pro',sans-serif", fontSize:12, color:'#777777' }}>
      <div><p style={{ marginBottom:8 }}>Subtle (#E0E0E0)</p><Divider weight="subtle" /></div>
      <div><p style={{ marginBottom:8 }}>Default (#CCCCCC)</p><Divider weight="default" /></div>
      <div><p style={{ marginBottom:8 }}>Strong (#999999)</p><Divider weight="strong" /></div>
    </div>
  ),
};
