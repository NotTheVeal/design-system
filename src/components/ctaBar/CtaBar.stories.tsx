import type { Meta, StoryObj } from '@storybook/react';
import CtaBar from './ctaBar';

const meta: Meta<typeof CtaBar> = {
  title: 'Components/CtaBar',
  component: CtaBar,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'info', 'success', 'warning'] },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CtaBar>;

export const Default: Story = {
  args: {
    variant: 'default',
    title: 'New parts catalog available — updated pricing effective July 1, 2026',
    description: 'Review the updated catalog before placing new orders.',
    onClose: () => {},
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Scheduled maintenance window: Jun 15, 2026 from 2:00–4:00 AM EST',
    description: 'The ProProcure portal will be temporarily unavailable during this time.',
    onClose: () => {},
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Order #PRO-20941 confirmed — estimated delivery Jun 13, 2026',
    onClose: () => {},
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Your session expires in 5 minutes. Save your work to avoid losing changes.',
    onClose: () => {},
  },
};

export const NoClose: Story = {
  args: {
    variant: 'info',
    title: 'Read-only mode: contact your administrator to enable editing.',
  },
};
