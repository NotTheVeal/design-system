import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Accordion from './accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion
        items={[
          {
            title: 'What is ProProcure?',
            content: "ProProcure is PartsSource's end-to-end procurement platform for healthcare equipment parts, service contracts, and supplier management.",
          },
          {
            title: 'How do I submit a purchase order?',
            content: 'Navigate to the Cart, review your items, then click "Submit for Approval." Orders above your approval threshold will route to your manager automatically.',
          },
          {
            title: 'Can I track my order status?',
            content: 'Yes. Go to Orders → My Orders to see real-time status for all submitted POs including shipping tracking numbers once dispatched.',
          },
        ]}
      />
    </div>
  ),
};

export const WithDefaultOpen: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion
        items={[
          {
            title: 'Shipping & Delivery',
            content: 'Standard shipping is 3–5 business days. Expedited options are available at checkout. Emergency orders can be flagged for same-day fulfillment.',
            defaultOpen: true,
          },
          {
            title: 'Returns & Exchanges',
            content: 'Parts may be returned within 30 days of receipt in original packaging. Service contracts are non-refundable once activated.',
          },
          {
            title: 'Warranty Information',
            content: "All OEM parts carry the manufacturer's standard warranty. Aftermarket parts carry a 90-day PartsSource warranty.",
          },
        ]}
      />
    </div>
  ),
};

export const AllowMultiple: Story = {
  render: () => (
    <div style={{ width: 560 }}>
      <Accordion
        allowMultiple
        items={[
          {
            title: 'Siemens MAGNETOM Aera — Specifications',
            content: 'Field strength: 1.5T · Bore diameter: 70cm · Gradient: 33mT/m · Max slew rate: 125 T/m/s',
          },
          {
            title: 'Service Contract Options',
            content: 'Bronze: Preventive maintenance only. Silver: PM + emergency response within 24h. Gold: Full coverage including parts and labor.',
            defaultOpen: true,
          },
          {
            title: 'Compatible Parts & Accessories',
            content: 'Gradient coil assembly, RF coils (head, body, extremity), patient table, cryogenic cooling system, RF shielding panels.',
            defaultOpen: true,
          },
        ]}
      />
    </div>
  ),
};

export const FAQStyle: Story = {
  render: () => (
    <div style={{ width: 600, fontFamily: 'Source Sans Pro, sans-serif' }}>
      <h3 style={{ marginBottom: 16, color: '#2B2B2B', fontWeight: 600 }}>Frequently Asked Questions</h3>
      <Accordion
        allowMultiple
        items={[
          { title: 'What payment methods are accepted?', content: 'Purchase cards (P-cards), purchase orders, and approved credit accounts. ACH and wire transfer available for invoices over $50,000.' },
          { title: 'How are GPO discounts applied?', content: "Your negotiated GPO discounts are applied automatically at checkout based on your facility's contract group membership." },
          { title: 'Can I set up recurring orders?', content: 'Yes. Add items to a Requisition Template to quickly re-order consumables and frequently purchased parts on a schedule.' },
          { title: 'Who approves emergency purchases?', content: 'Emergency purchases bypass standard approval workflows and route directly to your Biomedical Director. A 24-hour post-purchase audit trail is generated automatically.' },
        ]}
      />
    </div>
  ),
};
