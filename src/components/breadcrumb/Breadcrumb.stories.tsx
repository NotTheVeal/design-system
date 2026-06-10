import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Catalog', href: '/catalog' },
      { label: 'MRI Parts' },
    ],
  },
};

export const Deep: Story = {
  args: {
    items: [
      { label: 'ProProcure', href: '/' },
      { label: 'Equipment', href: '/equipment' },
      { label: 'Imaging', href: '/equipment/imaging' },
      { label: 'MRI Systems', href: '/equipment/imaging/mri' },
      { label: 'Siemens MAGNETOM Aera' },
    ],
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Orders', href: '/orders' },
      { label: 'PO-28471' },
    ],
  },
};

export const WithCustomSeparator: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'Contracts', href: '/contracts' },
      { label: 'Service Agreements' },
    ],
    separator: '>',
  },
};

export const WithClickHandlers: Story = {
  args: {
    items: [
      { label: 'Suppliers', onClick: () => alert('Suppliers') },
      { label: 'GE Healthcare', onClick: () => alert('GE Healthcare') },
      { label: 'Parts Catalog' },
    ],
  },
};
