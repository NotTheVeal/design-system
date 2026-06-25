import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Search } from './search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'autocomplete', 'filter'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<typeof Search>;

// ─── 1. Basic Search Bar ────────────────────────────────────────────────
export const Default: Story = {
  args: { placeholder: 'Search parts, SKUs, or vendors...', size: 'md' },
};

export const Large: Story = {
  args: { placeholder: 'Search the PartsSource catalog...', size: 'lg', variant: 'default' },
};

export const GlobalSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ maxWidth: 480 }}>
        <Search value={value} onChange={setValue} placeholder="Search parts, vendors, orders..." size="md" />
      </div>
    );
  },
};

// ─── 2. Autocomplete Search ────────────────────────────────────────────
const SUGGESTIONS = [
  'GE Healthcare Ultrasound Probe',
  'GE Healthcare Patient Monitor',
  'Siemens CT Scanner Filter',
  'Siemens X-Ray Tube Assembly',
  'Philips Defibrillator Lead',
  'Philips Ventilator Filter',
  'Stryker Surgical Drill Kit',
  'Medtronic Infusion Pump Tubing',
];

export const Autocomplete: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [focused, setFocused] = useState(false);
    const filtered = value.length > 1 ? SUGGESTIONS.filter(s => s.toLowerCase().includes(value.toLowerCase())).slice(0, 6) : [];

    return (
      <div style={{ maxWidth: 480, position: 'relative', fontFamily: "'Source Sans Pro', sans-serif" }}>
        <Search
          value={value}
          onChange={setValue}
          placeholder="Search parts or vendors..."
          size="md"
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
        />
        {focused && filtered.length > 0 && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999,
            background: '#FFFFFF', border: '1px solid #DCDCDC', borderRadius: '0 0 4px 4px',
            boxShadow: '0 4px 12px rgba(0,47,72,0.10)', overflow: 'hidden', marginTop: 2,
          }}>
            {filtered.map((s, i) => (
              <div key={i} onClick={() => { setValue(s); setFocused(false); }} style={{
                padding: '10px 16px', fontSize: 14, color: '#4A4A4A', cursor: 'pointer',
                borderBottom: i < filtered.length - 1 ? '1px solid #F1F1F1' : 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#EFF9FE')}
              onMouseLeave={e => (e.currentTarget.style.background = '#FFFFFF')}
              >
                <span style={{ color: '#005BA6', fontWeight: 600 }}>{s.substring(0, value.length)}</span>
                {s.substring(value.length)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
};

// ─── 3. Filter Search ─────────────────────────────────────────────────
const CATEGORIES = ['Imaging', 'Surgical', 'Monitoring', 'Infusion', 'Lab', 'Respiratory'];

export const FilterSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    return (
      <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'Source Sans Pro', sans-serif" }}>
        <Search value={value} onChange={setValue} placeholder="Search within category..." size="md" />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(activeFilter === cat ? null : cat)}
              style={{
                padding: '4px 12px', borderRadius: '100px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                border: activeFilter === cat ? '1px solid #005BA6' : '1px solid #DCDCDC',
                background: activeFilter === cat ? '#005BA6' : '#FFFFFF',
                color: activeFilter === cat ? '#FFFFFF' : '#4A4A4A',
                transition: 'all 150ms ease',
                fontFamily: 'inherit',
              }}
            >
              {cat}
            </button>
          ))}
          {activeFilter && (
            <button onClick={() => setActiveFilter(null)} style={{ padding: '4px 12px', borderRadius: '100px', fontSize: 13, cursor: 'pointer', border: '1px solid #DCDCDC', background: '#F1F1F1', color: '#777777', fontFamily: 'inherit' }}>
              Clear
            </button>
          )}
        </div>
        {(value || activeFilter) && (
          <p style={{ margin: 0, fontSize: 13, color: '#777777' }}>
            Showing results{value ? ` for "${value}"` : ''}{activeFilter ? ` in ${activeFilter}` : ''}
          </p>
        )}
      </div>
    );
  },
};

export const SearchInHeader: Story = {
  render: () => (
    <div style={{ background: '#FFFFFF', borderBottom: '1px solid #DCDCDC', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: '#002F48', fontFamily: "'Source Sans Pro', sans-serif", whiteSpace: 'nowrap' }}>PartsSource</div>
      <div style={{ flex: 1, maxWidth: 480 }}>
        <Search placeholder="Search 2M+ parts and accessories..." size="md" />
      </div>
    </div>
  ),
};
