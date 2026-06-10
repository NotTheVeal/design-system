import type { Meta, StoryObj } from '@storybook/react';
import Popover from './popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right', 'top-start', 'top-end', 'bottom-start', 'bottom-end'] },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    title: 'Part Details',
    content: 'GE Patient Monitor Cable — SpO2, 3m. Compatible with GE Dash 3000, 4000, and 5000 series monitors.',
    placement: 'bottom',
    onClose: () => {},
  },
};

export const NoTitle: Story = {
  args: {
    content: 'Lead time is typically 1–3 business days for in-stock items. Expedited options available at checkout.',
    placement: 'bottom',
    onClose: () => {},
  },
};

export const NoDismiss: Story = {
  args: {
    title: 'Availability Note',
    content: 'This item ships from our Kansas City warehouse. Orders placed before 2 PM EST ship same day.',
    placement: 'top',
  },
};

export const TopPlacement: Story = {
  args: {
    title: 'Order Status',
    content: 'Your order #PO-28491 is confirmed and scheduled for delivery on June 14.',
    placement: 'top',
    onClose: () => {},
  },
};
