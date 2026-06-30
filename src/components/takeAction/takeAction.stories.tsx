import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { TakeAction } from './takeAction';

// ── Inline SVG icons for stories ──────────────────────────────────────────────

const BearingIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#005BA6"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="8" />
    <line x1="12" y1="16" x2="12" y2="22" />
    <line x1="2" y1="12" x2="8" y2="12" />
    <line x1="16" y1="12" x2="22" y2="12" />
  </svg>
);

const FilterIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#005BA6"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Components/TakeAction',
  component: TakeAction,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**PS Design System — TakeAction**

Product CTA card used throughout PartsSource ProProcure. Displays a part or product with a primary "Take Action" button and an optional secondary ghost button.

| Token | Value |
|---|---|
| Background | #FFFFFF |
| Border (default) | 1px solid #DCDCDC |
| Border (hover) | 2px solid #005BA6 |
| Border radius | 4px |
| Padding | 20px |
| Image area bg | #DCEAED |
| Part name | Bold 16px #2B2B2B |
| Part number | 12px #777777 |
| Primary button | #005BA6 fill, uppercase Bold 14px, height 40px |
| Secondary button | Ghost, 1px #DCDCDC border, 13px/600, height 36px |
| Font | Source Sans 3 |
        `.trim(),
      },
    },
  },
  argTypes: {
    status: {
      control: 'select',
      options: [undefined, 'available', 'low-stock', 'out-of-stock', 'pending', 'approved', 'on-order'],
      description: 'Optional status badge',
    },
    primaryLabel: { control: 'text' },
    secondaryLabel: { control: 'text' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof TakeAction>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ───────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: {
    partName: 'NSK 6205 Deep Groove Ball Bearing',
    partNumber: '6205-OPEN',
    primaryLabel: 'Take Action',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default state: no image, no status badge, single primary CTA. Hover the card to see the 2px #005BA6 border.',
      },
    },
  },
};

// ── WithImage ─────────────────────────────────────────────────────────────────

export const WithImage: Story = {
  name: 'With Image',
  args: {
    partName: 'SKF 6205-2RS1 Deep Groove Ball Bearing',
    partNumber: '6205-2RS1',
    imageSrc: 'https://placehold.co/280x140/DCEAED/005BA6?text=Part+Image',
    imageAlt: 'SKF 6205-2RS1 Ball Bearing',
    primaryLabel: 'Take Action',
  },
  parameters: {
    docs: {
      description: {
        story: 'When imageSrc is provided the image fills the 140px image area with object-fit: cover.',
      },
    },
  },
};

// ── WithStatus ────────────────────────────────────────────────────────────────

export const WithStatus: Story = {
  name: 'With Status',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
        fontFamily: "'Source Sans 3', sans-serif",
        alignItems: 'flex-start',
      }}
    >
      <TakeAction
        partName="Parker G50 O-Ring Kit"
        partNumber="G50-KIT-24"
        icon={<FilterIcon />}
        status="available"
        primaryLabel="Take Action"
      />
      <TakeAction
        partName="NSK 6205 Ball Bearing"
        partNumber="6205-OPEN"
        status="low-stock"
        primaryLabel="Take Action"
      />
      <TakeAction
        partName="SKF 6205-2RS1 Bearing"
        partNumber="6205-2RS1"
        status="out-of-stock"
        primaryLabel="Take Action"
      />
      <TakeAction
        partName="Gates PowerGrip Belt"
        partNumber="XL-375"
        status="pending"
        primaryLabel="Take Action"
      />
      <TakeAction
        partName="Parker 4H-16 Seal Kit"
        partNumber="4H-16-SK"
        status="approved"
        primaryLabel="Take Action"
      />
      <TakeAction
        partName="NSK 7205 Angular Contact"
        partNumber="7205-BEP"
        status="on-order"
        primaryLabel="Take Action"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All 6 status badge variants: available, low-stock, out-of-stock, pending, approved, on-order.',
      },
    },
  },
};

// ── WithActions ───────────────────────────────────────────────────────────────

export const WithActions: Story = {
  name: 'With Actions',
  render: () => {
    const [log, setLog] = React.useState<string[]>([]);
    const push = (msg: string) => setLog(prev => [msg, ...prev].slice(0, 5));
    return (
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', fontFamily: "'Source Sans 3', sans-serif" }}>
        <TakeAction
          partName="NSK 6205 Deep Groove Ball Bearing"
          partNumber="6205-OPEN"
          icon={<BearingIcon />}
          status="available"
          primaryLabel="Take Action"
          onPrimaryClick={() => push('Primary clicked — Take Action')}
        />
        {log.length > 0 && (
          <div style={{ fontSize: 13, color: '#4A4A4A', paddingTop: 8 }}>
            <div style={{ fontWeight: 700, marginBottom: 6, color: '#002F48' }}>Event log</div>
            {log.map((entry, i) => (
              <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid #DCDCDC' }}>{entry}</div>
            ))}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive story — click the primary button to see the onPrimaryClick callback fire.',
      },
    },
  },
};

// ── WithSecondaryAction ───────────────────────────────────────────────────────

export const WithSecondaryAction: Story = {
  name: 'With Secondary Action',
  render: () => {
    const [log, setLog] = React.useState<string[]>([]);
    const push = (msg: string) => setLog(prev => [msg, ...prev].slice(0, 5));
    return (
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', fontFamily: "'Source Sans 3', sans-serif" }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <TakeAction
            partName="NSK 6205 Deep Groove Ball Bearing"
            partNumber="6205-OPEN"
            icon={<BearingIcon />}
            status="available"
            primaryLabel="Take Action"
            onPrimaryClick={() => push('Primary — Take Action')}
            secondaryLabel="View Details"
            onSecondaryClick={() => push('Secondary — View Details')}
          />
          <TakeAction
            partName="Parker G50 O-Ring Kit"
            partNumber="G50-KIT-24"
            icon={<FilterIcon />}
            status="low-stock"
            primaryLabel="Add to Cart"
            onPrimaryClick={() => push('Primary — Add to Cart')}
            secondaryLabel="View Details"
            onSecondaryClick={() => push('Secondary — View Details')}
            disabled
          />
          <div style={{ fontSize: 11, color: '#777777', maxWidth: 280 }}>
            Bottom card shows the <strong>disabled</strong> state — both buttons are non-interactive.
          </div>
        </div>
        {log.length > 0 && (
          <div style={{ fontSize: 13, color: '#4A4A4A', paddingTop: 8, minWidth: 200 }}>
            <div style={{ fontWeight: 700, marginBottom: 6, color: '#002F48' }}>Event log</div>
            {log.map((entry, i) => (
              <div key={i} style={{ padding: '4px 0', borderBottom: '1px solid #DCDCDC' }}>{entry}</div>
            ))}
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Two-button layout: primary filled CTA + secondary ghost button. Bottom card demonstrates the disabled prop.',
      },
    },
  },
};
