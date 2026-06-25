import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
    },
    colorScheme: { control: 'radio', options: ['future', 'current'] },
    size: { control: 'radio', options: ['lg', 'sm'] },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default (Primary Large)',
  args: { variant: 'primary', size: 'lg', colorScheme: 'future', children: 'Place Order' },
};

/** Primary — Future (Blue Fill): filled #005BA6 background, white text, no visible border */
export const PrimaryFuture: Story = {
  name: 'Primary — Future (Blue Fill)',
  args: { variant: 'primary', size: 'lg', colorScheme: 'future', children: 'Place Order' },
};

/** Primary — Current (Orange Fill) — LEGACY: filled #FF9505 orange background, white text */
export const PrimaryCurrentLegacy: Story = {
  name: 'Primary — Current (Orange Fill) — LEGACY',
  args: { variant: 'primary', size: 'lg', colorScheme: 'current', children: 'Place Order' },
};

/** Secondary — Outline: white background with colored border (blue for future, orange for current) */
export const SecondaryOutline: Story = {
  name: 'Secondary — Outline',
  args: { variant: 'secondary', size: 'lg', colorScheme: 'future', children: 'Cancel Order' },
};

export const SecondaryOutlineCurrentLegacy: Story = {
  name: 'Secondary — Outline (Current — LEGACY)',
  args: { variant: 'secondary', size: 'lg', colorScheme: 'current', children: 'Cancel Order' },
};

export const SecondaryLg: Story = {
  name: 'Secondary — Large',
  args: { variant: 'secondary', size: 'lg', colorScheme: 'future', children: 'Cancel Order' },
};

export const SecondarySm: Story = {
  name: 'Secondary — Small',
  args: { variant: 'secondary', size: 'sm', colorScheme: 'future', children: 'Cancel' },
};

export const Tertiary: Story = {
  name: 'Tertiary',
  args: { variant: 'tertiary', colorScheme: 'future', children: 'View Details' },
};

export const Ghost: Story = {
  name: 'Ghost',
  args: { variant: 'ghost', size: 'lg', colorScheme: 'future', children: 'Export' },
};

export const Danger: Story = {
  name: 'Danger',
  args: { variant: 'danger', size: 'lg', colorScheme: 'future', children: 'Delete' },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: { variant: 'primary', size: 'lg', colorScheme: 'future', disabled: true, children: 'Submit' },
};

export const AllVariants: Story = {
  name: 'All 5 Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', padding: 16 }}>
      <Button variant="primary" size="lg" colorScheme="future">Primary (Blue Fill)</Button>
      <Button variant="secondary" size="lg" colorScheme="future">Secondary (Outline)</Button>
      <Button variant="tertiary" colorScheme="future">Tertiary</Button>
      <Button variant="ghost" size="lg" colorScheme="future">Ghost</Button>
      <Button variant="danger" size="lg" colorScheme="future">Danger</Button>
    </div>
  ),
};

export const FutureVsCurrent: Story = {
  name: 'Future vs Current (Primary)',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', padding: 16, alignItems: 'center' }}>
      <Button variant="primary" size="lg" colorScheme="future">Future Primary (Blue)</Button>
      <Button variant="primary" size="lg" colorScheme="current">Current Primary (Orange — LEGACY)</Button>
    </div>
  ),
};
