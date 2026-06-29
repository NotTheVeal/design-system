import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Breadcrumb } from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Catalog', href: '/catalog' },
      { label: 'Imaging', href: '/catalog/imaging' },
      { label: 'Ultrasound Probes' },
    ],
  },
};

export const Short: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Orders' },
    ],
  },
};

export const Single: Story = {
  args: { items: [{ label: 'Dashboard' }] },
};
