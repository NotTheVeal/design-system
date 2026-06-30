import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Accordion, AccordionCard } from './accordion';
import type { AccordionItem, AccordionCardItem } from './accordion';

// ─── Sample data ──────────────────────────────────────────────────────────────

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: 'q1',
    title: 'What is ProProcure?',
    content:
      'ProProcure is PartsSource's cloud-based procurement platform for healthcare, providing centralized purchasing, supplier management, and spend analytics.',
  },
  {
    id: 'q2',
    title: 'How do I submit a purchase order?',
    content:
      'Navigate to Orders → New Order, select items from the catalog, review pricing, and click Submit. Your order enters the approval workflow automatically.',
  },
  {
    id: 'q3',
    title: 'Can I track my order status?',
    defaultOpen: true,
    content:
      'Yes. Go to Orders → My Orders to see real-time status for all submitted POs including shipping tracking numbers once dispatched.',
  },
  {
    id: 'q4',
    title: 'How do I add a new supplier?',
    content:
      'Go to Suppliers → Add Supplier, complete the onboarding form, and submit for approval. Approved suppliers appear in your catalog within 24 hours.',
  },
];

const OrderRow = ({ id, name, type, date }: { id: string; name: string; type: string; date: string }) => (
  <div style={{
    display: 'flex', alignItems: 'center', padding: '10px 26px',
    borderBottom: '1px solid #F1F1F1', fontFamily: "'Source Sans 3','Source Sans Pro',sans-serif",
    fontSize: 14, color: '#4A4A4A',
  }}>
    <span style={{ flex: '0 0 110px', fontWeight: 600, color: '#005BA6' }}>{id}</span>
    <span style={{ flex: 1 }}>{name}</span>
    <span style={{ flex: '0 0 90px', color: '#777777', fontSize: 13 }}>{type}</span>
    <span style={{ flex: '0 0 100px', color: '#777777', fontSize: 13, textAlign: 'right' }}>{date}</span>
  </div>
);

const CARD_CONTENT = (
  <div>
    <OrderRow id="PS000011" name="Reusable Finger Sensor by Masimo"      type="Install" date="03/11/2025" />
    <OrderRow id="PS000012" name="ECG Leadwire Set, 10-Lead"             type="Repair"  date="03/12/2025" />
    <OrderRow id="PS000013" name="Warming Unit Hose, Bair Hugger 700"    type="Service" date="03/13/2025" />
    <OrderRow id="PS000014" name="Pulse Oximeter Probe, Nellcor"         type="Install" date="03/14/2025" />
    <OrderRow id="PS000015" name="Defibrillator Electrode Pads, Adult"   type="Repair"  date="03/15/2025" />
  </div>
);

const CARD_ITEMS: AccordionCardItem[] = [
  { id: 'collapsed', title: 'Accordion Header Collapsed', content: CARD_CONTENT },
  { id: 'expanded',  title: 'Accordion Header Expanded',  defaultOpen: true, content: CARD_CONTENT },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**PS Design System 2.0 — Accordion**

Two variants:

### Inline (flat)
FAQ / Q&A / simple content toggles.
- Dividers: \`1px solid #DCDCDC\` top + bottom
- Trigger: 16px padding top/bottom, weight 600, 16px
- **Expanded background: \`#FFFFFF\` — no grey, no tint**
- Chevron: \`#777777\`, rotates 180° open

### Card (large)
Figma: \`Accordion-Section\` node \`4390:39583\`
- White card, \`4px\` border-radius, \`2px solid #F1F1F1\` border
- 60px header · Source Sans Pro 25px/300 (Light) · \`#000000\`
- Drag grip handle on left · 14px \`#777777\` chevron
        `.trim(),
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Inline stories ───────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Inline — FAQ (default)',
  args: { items: FAQ_ITEMS, multiple: false },
  parameters: {
    docs: {
      description: {
        story:
          'Standard inline accordion. Third item opens by default. **Expanded trigger is white — no grey background.**',
      },
    },
  },
};

export const MultipleOpen: Story = {
  name: 'Inline — Multiple open',
  args: { items: FAQ_ITEMS, multiple: true },
};

export const WithDisabledItem: Story = {
  name: 'Inline — Disabled item',
  args: {
    items: [
      ...FAQ_ITEMS.slice(0, 2),
      { id: 'dis', title: 'This item is disabled', content: 'Hidden.', disabled: true },
      ...FAQ_ITEMS.slice(2),
    ],
  },
};

export const Controlled: Story = {
  name: 'Inline — Controlled state',
  render: () => {
    const [open, setOpen] = useState<string[]>(['q1']);
    return (
      <div>
        <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
          {FAQ_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() =>
                setOpen(prev =>
                  prev.includes(item.id) ? prev.filter(x => x !== item.id) : [...prev, item.id],
                )
              }
              style={{
                padding: '4px 12px', borderRadius: 4, border: '1px solid #DCDCDC',
                background: open.includes(item.id) ? '#005BA6' : '#fff',
                color: open.includes(item.id) ? '#fff' : '#4A4A4A',
                fontSize: 12, cursor: 'pointer',
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              {item.id}
            </button>
          ))}
        </div>
        <Accordion items={FAQ_ITEMS} openItems={open} onOpenChange={setOpen} multiple />
      </div>
    );
  },
};

// ─── Card stories ─────────────────────────────────────────────────────────────

export const CardDefault: Story = {
  name: 'Card — Figma Accordion-Section',
  render: () => <AccordionCard items={CARD_ITEMS} />,
  parameters: {
    docs: {
      description: {
        story:
          'Large card accordion matching Figma node `4390:39583`. White card, 4px radius, 2px `#F1F1F1` border, 60px header, Source Sans Pro Light (25px/300).',
      },
    },
  },
};

export const CardAllCollapsed: Story = {
  name: 'Card — All collapsed',
  render: () => (
    <AccordionCard
      items={[
        { id: 'a', title: 'Accordion Header Collapsed', content: CARD_CONTENT },
        { id: 'b', title: 'Service Orders Q2 2025',     content: CARD_CONTENT },
      ]}
    />
  ),
};

export const CardMultiple: Story = {
  name: 'Card — Both open (multiple)',
  render: () => (
    <AccordionCard
      multiple
      items={[
        { id: 'a', title: 'Accordion Header Expanded', defaultOpen: true, content: CARD_CONTENT },
        { id: 'b', title: 'Service Orders Q2 2025',    defaultOpen: true, content: CARD_CONTENT },
      ]}
    />
  ),
};

export const CardWithSubtitle: Story = {
  name: 'Card — With subtitle',
  render: () => (
    <AccordionCard
      items={[
        { id: 'a', title: 'Active Service Orders', subtitle: '5 items', content: CARD_CONTENT },
        { id: 'b', title: 'Completed Orders',      subtitle: '142 items', defaultOpen: true, content: CARD_CONTENT },
      ]}
    />
  ),
};

export const BothVariants: Story = {
  name: 'Both variants side by side',
  render: () => (
    <div style={{ display: 'flex', gap: 40, fontFamily: "'Source Sans 3', sans-serif" }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#777', marginBottom: 12 }}>
          INLINE
        </p>
        <Accordion items={FAQ_ITEMS.slice(0, 3)} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#777', marginBottom: 12 }}>
          CARD
        </p>
        <AccordionCard items={CARD_ITEMS} />
      </div>
    </div>
  ),
};

// ─── InProgressActivity ────────────────────────────────────────────────────────
// Left border accent (4px solid #005BA6), white card bg, amber "In Progress"
// status badges with part names and order numbers.

const FONT_STACK = "'Source Sans 3','Source Sans Pro',-apple-system,sans-serif";

const InProgressBadge = () => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '2px 8px', borderRadius: 10,
    backgroundColor: '#FFF3CD', color: '#856404',
    fontSize: 11, fontWeight: 700, letterSpacing: '0.03em',
    fontFamily: FONT_STACK, whiteSpace: 'nowrap',
  }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#E6A817', display: 'inline-block' }} />
    In Progress
  </span>
);

const ActivityRow = ({ orderId, partName, updated }: { orderId: string; partName: string; updated: string }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '10px 16px', borderBottom: '1px solid #F1F1F1',
    fontFamily: FONT_STACK, fontSize: 13, color: '#4A4A4A',
  }}>
    <InProgressBadge />
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, color: '#002F48', marginBottom: 2 }}>{partName}</div>
      <div style={{ color: '#777777', fontSize: 12 }}>Order {orderId}</div>
    </div>
    <div style={{ color: '#AAAAAA', fontSize: 12, whiteSpace: 'nowrap' }}>{updated}</div>
  </div>
);

const IN_PROGRESS_CONTENT = (
  <div>
    <ActivityRow orderId="PS-100821" partName="Ventilator Flow Sensor, Hamilton G5"       updated="Updated 2h ago" />
    <ActivityRow orderId="PS-100834" partName="ECG Cable, 5-Lead Banana, GE DASH 3000"    updated="Updated 4h ago" />
    <ActivityRow orderId="PS-100849" partName="Infusion Pump Module, Alaris 8100"         updated="Updated 6h ago" />
    <ActivityRow orderId="PS-100862" partName="Pulse Ox Probe, Adult Reusable, Nellcor"   updated="Updated 1d ago" />
  </div>
);

const IN_PROGRESS_ITEMS: AccordionItem[] = [
  {
    id: 'active-repairs',
    title: 'Active Repairs',
    defaultOpen: true,
    content: IN_PROGRESS_CONTENT,
  },
  {
    id: 'pending-parts',
    title: 'Pending Parts Arrival',
    content: IN_PROGRESS_CONTENT,
  },
  {
    id: 'awaiting-approval',
    title: 'Awaiting Approval',
    content: IN_PROGRESS_CONTENT,
  },
];

export const InProgressActivity: Story = {
  name: 'In-Progress Activity',
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Accordion
        items={IN_PROGRESS_ITEMS}
        style={{ borderLeft: '4px solid #005BA6', backgroundColor: '#FFFFFF' }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Accordion variant for in-progress activity items. Left border accent `4px solid #005BA6`, white card background, amber "In Progress" status badges alongside part names and order numbers.',
      },
    },
  },
};

// ─── PartsServiceEvents ────────────────────────────────────────────────────────
// Accordion for parts/service event history. Items show: event type icon
// (inline SVG), event description, date/time stamp in grey.
// Collapsed by default showing 3-4 service events.

const SERVICE_EVENT_ICONS: Record<string, React.ReactNode> = {
  install: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#005BA6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="12 5 12 19" /><polyline points="5 12 12 19 19 12" />
    </svg>
  ),
  repair: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E6A817" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  inspection: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  replacement: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="1 4 1 10 7 10" /><polyline points="23 20 23 14 17 14" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
    </svg>
  ),
};

const ServiceEventRow = ({
  type, description, timestamp,
}: {
  type: keyof typeof SERVICE_EVENT_ICONS;
  description: string;
  timestamp: string;
}) => (
  <div style={{
    display: 'flex', alignItems: 'flex-start', gap: 10,
    padding: '10px 16px', borderBottom: '1px solid #F1F1F1',
    fontFamily: FONT_STACK, fontSize: 13, color: '#4A4A4A',
  }}>
    <span style={{ marginTop: 1, flexShrink: 0 }}>{SERVICE_EVENT_ICONS[type]}</span>
    <div style={{ flex: 1, lineHeight: 1.45 }}>
      <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{type}:</span>{' '}
      {description}
    </div>
    <div style={{ color: '#AAAAAA', fontSize: 11, whiteSpace: 'nowrap', flexShrink: 0 }}>{timestamp}</div>
  </div>
);

const SERVICE_EVENT_CONTENT = (
  <div>
    <ServiceEventRow type="repair"      description="Replaced worn drive belt assembly on unit B-224."           timestamp="Jun 12, 2025 09:14" />
    <ServiceEventRow type="inspection"  description="Routine PM — all vitals within spec, no issues found."       timestamp="Apr 30, 2025 13:45" />
    <ServiceEventRow type="replacement" description="Battery pack replaced due to capacity below 80% threshold."  timestamp="Feb 18, 2025 11:02" />
    <ServiceEventRow type="install"     description="Initial installation and commissioning completed."            timestamp="Nov 03, 2024 08:30" />
  </div>
);

const SERVICE_EVENTS_ITEMS: AccordionItem[] = [
  {
    id: 'ventilator-srv',
    title: 'Hamilton G5 Ventilator — SN 4402817',
    content: SERVICE_EVENT_CONTENT,
  },
  {
    id: 'monitor-srv',
    title: 'GE DASH 3000 Patient Monitor — SN 2291034',
    content: SERVICE_EVENT_CONTENT,
  },
  {
    id: 'pump-srv',
    title: 'Alaris 8100 Infusion Pump — SN 5519823',
    content: SERVICE_EVENT_CONTENT,
  },
];

export const PartsServiceEvents: Story = {
  name: 'Parts / Service Event History',
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <Accordion items={SERVICE_EVENTS_ITEMS} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Accordion for parts and service event history. Each panel lists install, repair, inspection, and replacement events with an inline SVG type icon, event description, and a grey date/time stamp. All panels collapsed by default.',
      },
    },
  },
};

// ─── TopHeaderAccordion ────────────────────────────────────────────────────────
// Compact accordion inside NavTop — smaller padding (12px), #FAFAFA bg,
// no border-radius on first/last items (flush), chevron on right.

const NAV_ITEMS: AccordionItem[] = [
  {
    id: 'facility-info',
    title: 'Mercy General Hospital · Chicago, IL',
    content: (
      <div style={{ padding: '0 16px 10px', fontFamily: FONT_STACK, fontSize: 12, color: '#4A4A4A', lineHeight: 1.6 }}>
        <div><strong>Facility ID:</strong> MG-001</div>
        <div><strong>Contact:</strong> procurement@mercygeneral.org</div>
        <div><strong>Contract:</strong> Premier Healthcare Alliance</div>
      </div>
    ),
  },
  {
    id: 'active-po',
    title: 'Active PO · PO-2025-0412',
    content: (
      <div style={{ padding: '0 16px 10px', fontFamily: FONT_STACK, fontSize: 12, color: '#4A4A4A', lineHeight: 1.6 }}>
        <div><strong>Items:</strong> 3 line items</div>
        <div><strong>Total:</strong> $4,820.00</div>
        <div><strong>Est. delivery:</strong> Jun 18, 2025</div>
      </div>
    ),
  },
  {
    id: 'quick-links',
    title: 'Quick Links',
    defaultOpen: true,
    content: (
      <div style={{ padding: '0 16px 10px', fontFamily: FONT_STACK, fontSize: 12, lineHeight: 1.8 }}>
        {['Order History', 'Supplier Catalog', 'Spend Analytics', 'Support'].map((link) => (
          <div key={link}>
            <a href="#" style={{ color: '#005BA6', textDecoration: 'none' }}>{link}</a>
          </div>
        ))}
      </div>
    ),
  },
];

export const TopHeaderAccordion: Story = {
  name: 'Top Header (NavTop) Accordion',
  render: () => (
    <div style={{ maxWidth: 340, border: '1px solid #DCDCDC', borderRadius: 4, overflow: 'hidden' }}>
      <Accordion
        items={NAV_ITEMS}
        style={{
          backgroundColor: '#FAFAFA',
          // Override individual item padding via wrapper — items render flush
        }}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Compact accordion for use inside NavTop contextual panels. `#FAFAFA` background, narrower layout (340px max), flush first/last items inside the container border. Third item (Quick Links) open by default.',
      },
    },
  },
};
