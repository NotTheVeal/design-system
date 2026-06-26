import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button from './button';
const meta: Meta<typeof Button> = {
  title:'Components/Button', component:Button,
  parameters:{ layout:'centered' },
  argTypes:{ variant:{ control:'select', options:['primary','secondary','secondary-sm','tertiary','ghost','danger'] } },
};
export default meta;
type Story = StoryObj<typeof Button>;
export const Default: Story = { args:{ variant:'primary', children:'Place Order' } };
export const PrimaryLarge: Story = { args:{ variant:'primary', children:'Place Order' } };
export const SecondaryLarge: Story = { args:{ variant:'secondary', children:'View Details' } };
export const SecondarySmall: Story = { name:'Secondary — Small', args:{ variant:'secondary-sm', children:'View Details' } };
export const Tertiary: Story = { args:{ variant:'tertiary', children:'Learn More' } };
export const Ghost: Story = { args:{ variant:'ghost', children:'Cancel' } };
export const Danger: Story = { args:{ variant:'danger', children:'Delete Item' } };
export const Loading: Story = { args:{ variant:'primary', children:'Processing...', loading:true } };
export const Disabled: Story = { args:{ variant:'primary', children:'Place Order', disabled:true } };
export const FullWidth: Story = {
  parameters:{ layout:'padded' },
  decorators:[(Story)=><div style={{width:400}}><Story/></div>],
  args:{ variant:'primary', children:'Place Order', fullWidth:true },
};
export const AllVariants: Story = {
  parameters:{ layout:'padded' },
  render:()=>(
    <div style={{display:'flex',flexWrap:'wrap',gap:16,alignItems:'center',fontFamily:"'Source Sans Pro',sans-serif",padding:24}}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="secondary-sm">Secondary Sm</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};
export const AllStates: Story = {
  parameters:{ layout:'padded' },
  render:()=>(
    <div style={{display:'flex',flexWrap:'wrap',gap:16,alignItems:'center',fontFamily:"'Source Sans Pro',sans-serif",padding:24}}>
      <Button variant="primary">Default</Button>
      <Button variant="primary" disabled>Disabled</Button>
      <Button variant="primary" loading>Loading</Button>
    </div>
  ),
};
