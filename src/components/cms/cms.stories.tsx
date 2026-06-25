import type { Meta, StoryObj } from '@storybook/react';
import Cms from './cms';

const meta: Meta<typeof Cms> = {
  title: 'Components/Cms',
  component: Cms,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Cms>;

export const Hero: Story = {
  args: {
    type: 'hero',
    title: 'The Smarter Way to Source Medical Parts',
    subtitle: 'ProProcure Platform',
    body: 'Reduce downtime with verified OEM and aftermarket parts from thousands of trusted suppliers.',
    label: 'Get Started',
    onClick: () => {},
  },
};

export const Text: Story = {
  args: {
    type: 'text',
    subtitle: 'Why PartsSource',
    title: 'Procurement Built for Healthcare',
    body: 'Our platform connects biomedical teams with the parts they need â faster, at lower cost, with full compliance documentation included.',
    label: 'Learn More',
    onClick: () => {},
  },
};

export const Cta: Story = {
  args: {
    type: 'cta',
    title: 'Ready to reduce equipment downtime?',
    subtitle: 'Join thousands of hospitals already using PartsSource to streamline procurement.',
    label: 'Request a Demo',
    onClick: () => {},
  },
};

export const Grid: Story = {
  args: {
    type: 'grid',
    title: 'Everything Your Team Needs',
    items: [
      { title: 'Verified Parts', body: 'Every part is sourced from certified suppliers with full traceability.' },
      { title: 'Fast Fulfillment', body: 'Same-day shipping on thousands of in-stock parts nationwide.' },
      { title: 'Compliance Ready', body: 'Documentation and audit trails built into every order.' },
    ],
  },
};

export const Divider: Story = {
  args: {
    type: 'divider',
  },
};
