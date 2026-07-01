import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card } from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = { args: { variant: 'default', padding: 'md', children: 'Card content' } };
export const Elevated: Story = { args: { variant: 'elevated', padding: 'md', children: 'Elevated card' } };
export const Outlined: Story = { args: { variant: 'outlined', padding: 'md', children: 'Outlined card' } };
export const Clickable: Story = { args: { variant: 'clickable', padding: 'md', children: 'Clickable card' } };

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <Card variant='default' padding='md'>Default card</Card>
      <Card variant='elevated' padding='md'>Elevated card</Card>
      <Card variant='outlined' padding='md'>Outlined card</Card>
      <Card variant='clickable' padding='md'>Clickable card</Card>
    </div>
  ),
};
