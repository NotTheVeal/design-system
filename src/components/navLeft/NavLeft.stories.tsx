import type { Meta, StoryObj } from '@storybook/react';
import NavLeft from './navLeft';

const meta: Meta<typeof NavLeft> = {
  title: 'Components/NavLeft',
  component: NavLeft,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavLeft>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Dashboard', value: 'dashboard' },
      { label: 'Orders', value: 'orders', badge: 4 },
      {
        label: 'Equipment',
        value: 'equipment',
        children: [
          { label: 'All Equipment', value: 'equipment-all' },
          { label: 'Maintenance', value: 'equipment-maintenance' },
        ],
      },
      { label: 'Reports', value: 'reports' },
      { label: 'Settings', value: 'settings', disabled: true },
    ],
    activeValue: 'dashboard',
    onItemClick: () => {},
  },
};
