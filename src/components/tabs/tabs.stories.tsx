import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs } from './tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**PS Design System — Tabs**

Horizontal tab navigation with active indicator. Key spec values (FIXED):

- **Active indicator**: 3px solid #005BA6 at the **TOP** of the tab *(spec: top border, not bottom)*
- **Active text**: #005BA6 (PS Blue), font-weight 700
- **Inactive text**: #777777 *(was #4A4A4A — too dark)*
- **Hover text**: #002F48 (Midnight) *(was #005BA6 — now correct)*
- **Count badge**: active = PS Blue bg + white text, inactive = #DCDCDC bg + #777777 text
`.trim(),
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'sm'],
      description: 'Tab height — default=44px, sm=36px',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Default ---
export const Default: Story = {
  name: 'Default',
  render: () => {
    const [tab, setTab] = useState('orders');
    const tabs = [
      { label: 'Open Orders', value: 'orders' },
      { label: 'Pending Approval', value: 'pending' },
      { label: 'Shipped', value: 'shipped' },
      { label: 'Completed', value: 'completed' },
    ];

    return (
      <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
        <div style={{ padding: '16px 0', fontSize: 14, color: '#4A4A4A' }}>
          Active tab: <strong>{tab}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '**FIXED**: Active indicator is a 3px PS Blue stripe at the TOP of the tab (not bottom). Inactive text is #777777, hover text is #002F48.',
      },
    },
  },
};

// --- With Badge Counts ---
export const WithBadgeCounts: Story = {
  name: 'With Badge Counts',
  render: () => {
    const [tab, setTab] = useState('pending');
    const tabs = [
      { label: 'All Orders', value: 'all', count: 142 },
      { label: 'Pending', value: 'pending', count: 17 },
      { label: 'Rush', value: 'rush', count: 4 },
      { label: 'Backordered', value: 'backordered', count: 9 },
      { label: 'Completed', value: 'completed', count: 112 },
    ];

    return (
      <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
        <div style={{ padding: '16px 0', fontSize: 14, color: '#4A4A4A' }}>
          Showing: <strong>{tabs.find(t => t.value === tab)?.label}</strong> —{' '}
          {tabs.find(t => t.value === tab)?.count} items
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with count badges — active tab badge is PS Blue + white, inactive is #DCDCDC + #777777.',
      },
    },
  },
};

// --- Small Size ---
export const Small: Story = {
  name: 'Small (sm)',
  render: () => {
    const [tab, setTab] = useState('details');
    const tabs = [
      { label: 'Details', value: 'details' },
      { label: 'Line Items', value: 'items' },
      { label: 'History', value: 'history' },
      { label: 'Documents', value: 'docs' },
    ];

    return (
      <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        <Tabs tabs={tabs} value={tab} onChange={setTab} size="sm" />
        <div style={{ padding: '12px 0', fontSize: 13, color: '#4A4A4A' }}>
          Active: <strong>{tab}</strong>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Small variant — 36px height, 13px font. Used in compact panels and sidebars.',
      },
    },
  },
};

// --- With Disabled Tab ---
export const WithDisabledTab: Story = {
  name: 'With Disabled Tab',
  render: () => {
    const [tab, setTab] = useState('overview');
    const tabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Analytics', value: 'analytics' },
      { label: 'Forecasting', value: 'forecasting', disabled: true },
      { label: 'Export', value: 'export', disabled: true },
    ];

    return (
      <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
        <Tabs tabs={tabs} value={tab} onChange={setTab} />
        <div style={{ padding: '16px 0', fontSize: 13, color: '#777777' }}>
          Forecasting and Export tabs are disabled — restricted to admin users.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tabs with some options disabled — not-allowed cursor, #AAAAAA text, not keyboard-focusable.',
      },
    },
  },
};

// --- With Panel Content ---
export const WithPanelContent: Story = {
  name: 'With Tab Panel Content',
  render: () => {
    const [tab, setTab] = useState('overview');
    const tabs = [
      { label: 'Overview', value: 'overview' },
      { label: 'Line Items', value: 'items', count: 4 },
      { label: 'Documents', value: 'docs', count: 2 },
      { label: 'Activity', value: 'activity' },
    ];

    return (
      <div
        style={{
          fontFamily: "'Source Sans 3', sans-serif",
          maxWidth: 580,
          border: '1px solid #DCDCDC',
          borderRadius: 6,
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '16px 20px 0' }}>
          <Tabs tabs={tabs} value={tab} onChange={setTab} />
        </div>
        <div style={{ padding: '0 20px 20px' }}>
          {tab === 'overview' && (
            <div role="tabpanel" style={{ paddingTop: 16, fontSize: 14, color: '#4A4A4A' }}>
              <p style={{ margin: '0 0 12px' }}>
                <strong>PO-2024-0895</strong> · Centrifugal Pump 2" · Grundfos
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', fontSize: 13 }}>
                <div><span style={{ color: '#777777' }}>Status</span><br /><strong>Under Review</strong></div>
                <div><span style={{ color: '#777777' }}>Priority</span><br /><strong style={{ color: '#FF0000' }}>Critical</strong></div>
                <div><span style={{ color: '#777777' }}>Requested by</span><br />S. Thompson</div>
                <div><span style={{ color: '#777777' }}>Department</span><br />Facilities</div>
                <div><span style={{ color: '#777777' }}>Total value</span><br /><strong>$3,890.00</strong></div>
                <div><span style={{ color: '#777777' }}>Est. delivery</span><br />Dec 22, 2024</div>
              </div>
            </div>
          )}
          {tab === 'items' && (
            <div role="tabpanel" style={{ paddingTop: 16, fontSize: 14, color: '#4A4A4A' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #DCDCDC' }}>
                    <th style={{ padding: '6px 0', textAlign: 'left', color: '#005BA6', fontSize: 11, textTransform: 'uppercase' }}>Part Number</th>
                    <th style={{ padding: '6px 0', textAlign: 'left', color: '#005BA6', fontSize: 11, textTransform: 'uppercase' }}>Description</th>
                    <th style={{ padding: '6px 0', textAlign: 'right', color: '#005BA6', fontSize: 11, textTransform: 'uppercase' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pn: 'PUMP-CENT-2', desc: 'Centrifugal Pump 2"', total: '$3,890.00' },
                    { pn: 'SEAL-OIL-25', desc: 'Oil Seal Kit', total: '$24.50' },
                    { pn: 'BOLT-M12-SS', desc: 'M12 Stainless Bolts x8', total: '$18.40' },
                    { pn: 'GASKET-100', desc: 'Pump Inlet Gasket', total: '$12.10' },
                  ].map(row => (
                    <tr key={row.pn} style={{ borderBottom: '1px solid #DCDCDC' }}>
                      <td style={{ padding: '8px 0', fontWeight: 600 }}>{row.pn}</td>
                      <td style={{ padding: '8px 0', color: '#777777' }}>{row.desc}</td>
                      <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600 }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === 'docs' && (
            <div role="tabpanel" style={{ paddingTop: 16 }}>
              {['Facilities_Sign-off_Form.pdf', 'Grundfos_Quote_2024.pdf'].map(doc => (
                <div key={doc} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #DCDCDC' }}>
                  <span style={{ fontSize: 13 }}>{doc}</span>
                </div>
              ))}
            </div>
          )}
          {tab === 'activity' && (
            <div role="tabpanel" style={{ paddingTop: 16, fontSize: 13, color: '#4A4A4A' }}>
              {[
                { time: '2 hours ago', msg: 'S. Thompson submitted PO for review' },
                { time: '1 hour ago', msg: 'J. Martinez flagged as Critical priority' },
                { time: '45 min ago', msg: 'Facilities sign-off requested' },
              ].map(({ time, msg }) => (
                <div key={time} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #DCDCDC' }}>
                  <span style={{ color: '#949494', whiteSpace: 'nowrap', width: 90, fontSize: 12 }}>{time}</span>
                  <span>{msg}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Full tabs + panel content integration — realistic PO detail view with four content panels.',
      },
    },
  },
};

// --- All States ---
export const AllStates: Story = {
  name: 'All States',
  render: () => {
    const [tab1, setTab1] = useState('open');
    const [tab2, setTab2] = useState('all');
    const [tab3, setTab3] = useState('details');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: "'Source Sans 3', sans-serif" }}>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, color: '#777777', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Default size
          </p>
          <Tabs
            tabs={[
              { label: 'Open Orders', value: 'open' },
              { label: 'Pending', value: 'pending' },
              { label: 'Completed', value: 'completed' },
              { label: 'Archived', value: 'archived', disabled: true },
            ]}
            value={tab1}
            onChange={setTab1}
          />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, color: '#777777', textTransform: 'uppercase', letterSpacing: '1px' }}>
            With badge counts
          </p>
          <Tabs
            tabs={[
              { label: 'All', value: 'all', count: 142 },
              { label: 'Rush', value: 'rush', count: 4 },
              { label: 'Backordered', value: 'backordered', count: 9 },
            ]}
            value={tab2}
            onChange={setTab2}
          />
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 700, color: '#777777', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Small size (sm)
          </p>
          <Tabs
            tabs={[
              { label: 'Details', value: 'details' },
              { label: 'Items', value: 'items' },
              { label: 'Docs', value: 'docs' },
            ]}
            value={tab3}
            onChange={setTab3}
            size="sm"
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'All tab configurations — default, badge counts, small, with disabled tab.',
      },
    },
  },
};
