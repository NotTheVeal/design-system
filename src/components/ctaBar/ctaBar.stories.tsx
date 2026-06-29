import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CtaBar } from './ctaBar';

const meta: Meta<typeof CtaBar> = {
  title: 'Components/CtaBar',
  component: CtaBar,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof CtaBar>;

export const Default: Story = {
  args: {
    heading: 'Ready to streamline your procurement?',
    subtext: 'Join thousands of healthcare facilities using PartsSource.',
    actions: [
      { label: 'LEARN MORE', onClick: () => {}, variant: 'secondary' },
      { label: 'GET STARTED', onClick: () => {}, variant: 'primary' },
    ],
  },
};

export const SingleAction: Story = {
  args: {
    heading: 'New vendor catalog updates are available.',
    subtext: 'Review the latest pricing and availability changes.',
    actions: [{ label: 'VIEW CATALOG', onClick: () => {}, variant: 'primary' }],
  },
};

export const NoActions: Story = {
  args: {
    heading: 'Your order has been submitted successfully.',
    subtext: 'PO #PO-12847 has been sent to GE Healthcare for processing.',
  },
};

export const DarkBlue: Story = {
  args: {
    heading: 'Upgrade to Enterprise',
    subtext: 'Unlock advanced analytics, custom workflows, and dedicated support.',
    actions: [
      { label: 'CONTACT SALES', onClick: () => {}, variant: 'secondary' },
      { label: 'UPGRADE NOW', onClick: () => {}, variant: 'primary' },
    ],
    background: '#002F48',
  },
};
