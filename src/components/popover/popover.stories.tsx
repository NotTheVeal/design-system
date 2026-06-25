import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Popover from './popover';

const meta = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Floating popover panel with optional title, close button, and CTA. Supports top/bottom/left/right placement.',
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const FF = "'Source Sans Pro','Source Sans 3',sans-serif";

const TriggerLayout = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 40 }}>
    {children}
  </div>
);

export const Default: Story = {
  name: 'Default — With Title and Close',
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <TriggerLayout>
        <button onClick={() => setOpen(o => !o)} style={{ padding: '8px 16px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer', fontFamily: FF }}>
          Toggle Popover
        </button>
        {open && (
          <Popover
            title="Order Details"
            content="This popover provides additional context about the selected order. Click outside or the X to dismiss."
            onClose={() => setOpen(false)}
          />
        )}
      </TriggerLayout>
    );
  },
};

export const WithCTA: Story = {
  name: 'With CTA — Learn More Button',
  render: () => {
    const [open, setOpen] = React.useState(true);
    return (
      <TriggerLayout>
        <button onClick={() => setOpen(o => !o)} style={{ padding: '8px 16px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer', fontFamily: FF }}>
          Toggle Popover
        </button>
        {open && (
          <Popover
            title="Warranty Coverage"
            content={
              <div>
                <p style={{ margin: '0 0 12px', fontSize: 14, color: '#4A4A4A', lineHeight: 1.5, fontFamily: FF }}>
                  This part is covered under a 2-year manufacturer warranty. Coverage includes defects in materials and workmanship.
                </p>
                <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: 13, fontWeight: 600, color: '#005BA6', textDecoration: 'underline', fontFamily: FF }}>
                  Learn more about warranty terms
                </a>
              </div>
            }
            onClose={() => setOpen(false)}
          />
        )}
      </TriggerLayout>
    );
  },
};

export const TextOnly: Story = {
  name: 'Text Only — No Close Button',
  render: () => (
    <TriggerLayout>
      <Popover
        content="This part number has been superseded. Please use PN-98723-B as the replacement. All orders will be automatically redirected."
      />
    </TriggerLayout>
  ),
};

export const TopPlacement: Story = {
  name: 'Top Placement',
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 80, gap: 8, fontFamily: FF }}>
        {open && (
          <Popover
            title="Appears Above Trigger"
            content="This popover is positioned above the trigger button. Placement is controlled by the parent layout."
            placement="top"
            onClose={() => setOpen(false)}
          />
        )}
        <div style={{ fontSize: 12, color: '#949494', marginBottom: 4, fontFamily: FF }}>placement="top"</div>
        <button onClick={() => setOpen(o => !o)} style={{ padding: '8px 16px', background: '#005BA6', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer', fontFamily: FF }}>
          Toggle Popover (Top)
        </button>
      </div>
    );
  },
};

export const WithRichContent: Story = {
  name: 'Rich Content — Metadata List',
  render: () => (
    <TriggerLayout>
      <Popover
        title="Part Information"
        onClose={() => {}}
        content={
          <dl style={{ margin: 0 }}>
            {[
              { label: 'SKU', value: 'SKF-6205-2RS' },
              { label: 'Category', value: 'Bearings' },
              { label: 'Stock', value: '42 units' },
              { label: 'Lead Time', value: '3–5 days' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F1F1F1' }}>
                <dt style={{ fontSize: 13, color: '#777', fontFamily: FF }}>{row.label}</dt>
                <dd style={{ fontSize: 13, fontWeight: 600, color: '#4A4A4A', margin: 0, fontFamily: FF }}>{row.value}</dd>
              </div>
            ))}
          </dl>
        }
      />
    </TriggerLayout>
  ),
};
