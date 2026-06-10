import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Card from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    hoverable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'Mindray MEC-1200 Patient Monitor — 12-Lead ECG, SpO2, NIBP. Condition: Refurbished. Est. delivery 3–5 business days.',
    padding: 'md',
    hoverable: false,
  },
};

export const WithHeader: Story = {
  args: {
    header: 'Order #PRO-20941',
    children: 'Patient Monitoring Cable, 12-Lead — OEM-89400-01. Qty: 2. Unit price: $42.50.',
    padding: 'md',
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: 'Open Service Request',
    children: 'GE LOGIQ E10 Ultrasound — Probe failure reported. Ticket #SR-4421. Priority: High.',
    footer: 'Last updated: Jun 10, 2026',
    padding: 'md',
  },
};

export const Hoverable: Story = {
  args: {
    children: 'Philips IntelliVue MX800 — Available for same-day dispatch. Click to view product details.',
    padding: 'md',
    hoverable: true,
  },
};

export const Compact: Story = {
  args: {
    children: 'IV Pump — ALARIS 8100, Serial #A77812. Status: Available.',
    padding: 'sm',
  },
};
