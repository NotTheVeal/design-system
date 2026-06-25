import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Accordion } from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'card', 'inline-faq'] },
    size: { control: 'select', options: ['md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

const faqItems = [
  { id: '1', title: 'What is PartsSource?', content: 'PartsSource is the leading B2B healthcare marketplace for medical parts, equipment, and services. We connect healthcare facilities with OEM and aftermarket parts suppliers.' },
  { id: '2', title: 'How do I place an order?', content: 'You can place an order through ProProcure, our procurement platform. Simply search for the part you need, add it to your cart, and complete the checkout process.' },
  { id: '3', title: 'What is the return policy?', content: 'PartsSource offers a 30-day return policy on most items. Some specialty items may have different return conditions. Please contact support for specific details.' },
  { id: '4', title: 'Do you offer OEM parts?', content: 'Yes, we offer both OEM (Original Equipment Manufacturer) and high-quality aftermarket parts. All parts are sourced from verified suppliers and quality-checked.' },
  { id: '5', title: 'Is bulk ordering available?', content: 'Yes, bulk ordering is available with volume discounts. Contact your account manager or reach out to our sales team for custom pricing.', disabled: true },
];

export const Default: Story = {
  args: { items: faqItems, variant: 'default' },
};

export const CardVariant: Story = {
  args: { items: faqItems.slice(0, 3), variant: 'card' },
};

export const InlineFaq: Story = {
  args: { items: faqItems, variant: 'inline-faq' },
};

export const LargeSize: Story = {
  args: { items: faqItems.slice(0, 3), size: 'lg' },
};

export const MultipleOpen: Story = {
  args: { items: faqItems, allowMultiple: true, defaultOpen: ['1', '3'] },
};

export const DefaultOpen: Story = {
  args: { items: faqItems, defaultOpen: ['2'] },
};

export const CardLarge: Story = {
  args: { items: faqItems.slice(0, 4), variant: 'card', size: 'lg' },
};

export const WithRichContent: Story = {
  args: {
    items: [
      {
        id: 'a',
        title: 'Part Specifications',
        content: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 24 }}>
              <span style={{ color: '#777', fontSize: 13, minWidth: 120 }}>SKU</span>
              <span style={{ fontSize: 13 }}>GE-4542-PROBE</span>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <span style={{ color: '#777', fontSize: 13, minWidth: 120 }}>Manufacturer</span>
              <span style={{ fontSize: 13 }}>GE Healthcare</span>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <span style={{ color: '#777', fontSize: 13, minWidth: 120 }}>Category</span>
              <span style={{ fontSize: 13 }}>Ultrasound Probes</span>
            </div>
          </div>
        )
      },
      { id: 'b', title: 'Shipping Information', content: 'Ships within 2-3 business days via FedEx Priority. Expedited shipping available at checkout. Orders over $500 qualify for free shipping.' },
    ],
    variant: 'card',
  },
};
