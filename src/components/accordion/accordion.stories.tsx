import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Accordion, AccordionCard } from './accordion';
import type { AccordionItem, AccordionCardItem } from './accordion';

const FAQ_ITEMS: AccordionItem[] = [
  { id: 'q1', title: 'What is ProProcure?', content: 'ProProcure is the PartsSource cloud-based procurement platform for healthcare.' },
  { id: 'q2', title: 'How do I submit a purchase order?', content: 'Navigate to Orders, then New Order, select items from the catalog, and click Submit.' },
  { id: 'q3', title: 'Can I track my order status?', defaultOpen: true, content: 'Yes. Go to Orders and My Orders to see real-time status for all submitted POs.' },
  { id: 'q4', title: 'How do I add a new supplier?', content: 'Go to Suppliers, Add Supplier, complete the onboarding form, and submit for approval.' },
];

const OrderRow = ({ id, name, type, date }: { id: string; name: string; type: string; date: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', padding: '10px 26px', borderBottom: '1px solid #F1F1F1', fontFamily: "'Source Sans 3',sans-serif", fontSize: 14, color: '#4A4A4A' }}>
    <span style={{ flex: '0 0 110px', fontWeight: 600, color: '#005BA6' }}>{id}</span>
    <span style={{ flex: 1 }}>{name}</span>
    <span style={{ flex: '0 0 90px', color: '#777777', fontSize: 13 }}>{type}</span>
    <span style={{ flex: '0 0 100px', color: '#777777', fontSize: 13, textAlign: 'right' }}>{date}</span>
  </div>
);

const CARD_CONTENT = (
  <div>
    <OrderRow id="PS000011" name="Reusable Finger Sensor by Masimo"    type="Install" date="03/11/2025" />
    <OrderRow id="PS000012" name="ECG Leadwire Set, 10-Lead"           type="Repair"  date="03/12/2025" />
    <OrderRow id="PS000013" name="Warming Unit Hose, Bair Hugger 700"  type="Service" date="03/13/2025" />
    <OrderRow id="PS000014" name="Pulse Oximeter Probe, Nellcor"       type="Install" date="03/14/2025" />
  </div>
);

const CARD_ITEMS: AccordionCardItem[] = [
  { id: 'collapsed', title: 'Accordion Header Collapsed', content: CARD_CONTENT },
  { id: 'expanded',  title: 'Accordion Header Expanded',  defaultOpen: true, content: CARD_CONTENT },
];

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '**PS Design System 2.0 — Accordion**',
          '',
          'Two variants:',
          '',
          '### Inline (flat)',
          'FAQ / Q&A / simple content toggles.',
          '- Dividers: 1px solid #DCDCDC top + bottom',
          '- Expanded background: #FFFFFF — NO grey, no tint',
          '',
          '### Card (large)',
          'Figma: Accordion-Section node 4390:39583',
          '- White card, 4px radius, 2px #F1F1F1 border',
          '- 60px header, Source Sans Pro 25px/300 (Light), drag grip, 14px chevron',
        ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Inline FAQ (default)',
  args: { items: FAQ_ITEMS, multiple: false },
};

export const MultipleOpen: Story = {
  name: 'Inline Multiple open',
  args: { items: FAQ_ITEMS, multiple: true },
};

export const CardDefault: Story = {
  name: 'Card Figma Accordion-Section',
  render: () => <AccordionCard items={CARD_ITEMS} />,
};

export const CardWithSubtitle: Story = {
  name: 'Card With subtitle',
  render: () => (
    <AccordionCard items={[
      { id: 'a', title: 'Active Service Orders', subtitle: '5 items', content: CARD_CONTENT },
      { id: 'b', title: 'Completed Orders', subtitle: '142 items', defaultOpen: true, content: CARD_CONTENT },
    ]} />
  ),
};

export const BothVariants: Story = {
  name: 'Both variants side by side',
  render: () => (
    <div style={{ display: 'flex', gap: 40 }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#777', marginBottom: 12 }}>INLINE</p>
        <Accordion items={FAQ_ITEMS.slice(0, 3)} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#777', marginBottom: 12 }}>CARD</p>
        <AccordionCard items={CARD_ITEMS} />
      </div>
    </div>
  ),
};
