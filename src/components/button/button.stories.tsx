import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: { layout: 'centered' },
  argTypes: {
    variant: { control: 'select', options: ['primary','secondary','secondary-sm','tertiary','ghost','danger'] },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

// Primary: solid #005BA6 fill, white text, UPPERCASE Bold
export const Default: Story = { args: { variant: 'primary', children: 'PLACE ORDER' } };
export const PrimaryLarge: Story = { args: { variant: 'primary', children: 'PLACE ORDER' } };
// Secondary: outlined white + #005BA6 border, fills on hover
export const SecondaryLarge: Story = { args: { variant: 'secondary', children: 'VIEW DETAILS' } };
export const SecondarySmall: Story = { name: 'Secondary — Small', args: { variant: 'secondary-sm', children: 'VIEW' } };
export const Tertiary: Story = { args: { variant: 'tertiary', children: 'Save Filters' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Cancel' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Delete Item' } };
export const Loading: Story = { args: { variant: 'primary', children: 'PROCESSING...', loading: true } };
export const Disabled: Story = { args: { variant: 'primary', children: 'PLACE ORDER', disabled: true } };
export const FullWidth: Story = {
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
  args: { variant: 'primary', children: 'PLACE ORDER', fullWidth: true },
};
export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:16, alignItems:'center', padding:24, fontFamily:"'Source Sans Pro',sans-serif" }}>
      <Button variant="primary">PLACE ORDER</Button>
      <Button variant="secondary">VIEW DETAILS</Button>
      <Button variant="secondary-sm">EDIT</Button>
      <Button variant="tertiary">Save Filters</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">DELETE</Button>
    </div>
  ),
};
export const AllStates: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:16, alignItems:'center', padding:24 }}>
      <Button variant="primary">Default</Button>
      <Button variant="primary" disabled>Disabled</Button>
      <Button variant="primary" loading>Loading</Button>
    </div>
  ),
};
