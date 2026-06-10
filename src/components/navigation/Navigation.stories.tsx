import type { Meta, StoryObj } from '@storybook/react';
import Navigation from './navigation';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navigation>;

const menuItems = [
  { label: 'Dashboard', isActive: true },
  { label: 'Orders' },
  { label: 'Catalog' },
  { label: 'Service Requests' },
  { label: 'Reports' },
  { label: 'Settings', isDisabled: true },
];

export const Default: Story = {
  args: {
    userName: 'Rachael V.',
    items: menuItems,
  },
};

export const ActiveOrders: Story = {
  args: {
    userName: 'John B.',
    items: [
      { label: 'Dashboard' },
      { label: 'Orders', isActive: true },
      { label: 'Catalog' },
      { label: 'Service Requests' },
      { label: 'Reports' },
    ],
  },
};

export const MinimalNav: Story = {
  args: {
    userName: 'Guest',
    items: [
      { label: 'Dashboard', isActive: true },
      { label: 'Catalog' },
    ],
  },
};
