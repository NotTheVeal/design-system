import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Search from './search';

const fontFamily = "'Source Sans 3', 'Source Sans Pro', sans-serif";

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Search>;

// ─── Existing stories ────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return (
      <div style={{ width: 320 }}>
        <Search placeholder="Search parts, equipment..." value={val} onChange={setVal} onSearch={(v) => alert('Searching: ' + v)} />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [val, setVal] = useState('MRI Scanner');
    return (
      <div style={{ width: 320 }}>
        <Search placeholder="Search parts, equipment..." value={val} onChange={setVal} />
      </div>
    );
  },
};

export const CustomPlaceholder: Story = {
  args: { placeholder: 'Search by part number or description...', defaultValue: '' },
  decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

export const Disabled: Story = {
  args: { placeholder: 'Search unavailable', disabled: true },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const Wide: Story = {
  args: { placeholder: 'Search contracts, suppliers, or part numbers...', defaultValue: '' },
  decorators: [(Story) => <div style={{ width: 560 }}><Story /></div>],
};

// ─── SearchIcon for inline use ────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="5.5" />
    <line x1="12.5" y1="12.5" x2="16" y2="16" />
  </svg>
);

const PartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#005BA6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 9h6M9 12h6M9 15h4" />
  </svg>
);

const XCircleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="7" />
    <line x1="5" y1="5" x2="11" y2="11" />
    <line x1="11" y1="5" x2="5" y2="11" />
  </svg>
);

// ─── Autocomplete story ───────────────────────────────────────────────────────

const AUTOCOMPLETE_RESULTS = [
  { partName: 'X-Ray Tube Assembly', partNumber: 'XRT-4820-A', category: 'Imaging' },
  { partName: 'MRI Gradient Coil', partNumber: 'MRI-GC-1120', category: 'MRI' },
  { partName: 'CT Detector Array', partNumber: 'CTD-9900-B', category: 'CT Scanner' },
  { partName: 'Ultrasound Transducer', partNumber: 'UST-7700-C', category: 'Ultrasound' },
  { partName: 'X-Ray Collimator', partNumber: 'XRC-3310-D', category: 'Imaging' },
];

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'rgba(0,91,166,0.12)', color: '#005BA6', fontWeight: 700, borderRadius: 2, padding: '0 1px' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export const Autocomplete: Story = {
  name: 'Autocomplete',
  render: () => {
    const [val, setVal] = useState('x-ray');
    const filtered = AUTOCOMPLETE_RESULTS.filter(
      (r) =>
        r.partName.toLowerCase().includes(val.toLowerCase()) ||
        r.partNumber.toLowerCase().includes(val.toLowerCase())
    );

    return (
      <div style={{ width: 480, fontFamily, position: 'relative' }}>
        <Search
          value={val}
          onChange={setVal}
          placeholder="Search parts, equipment..."
        />

        {/* Dropdown */}
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            background: '#FFFFFF',
            border: '1px solid #DCDCDC',
            borderRadius: 4,
            boxShadow: '0 6px 20px rgba(0,47,72,0.18)',
            zIndex: 100,
            overflow: 'hidden',
          }}
        >
          {filtered.map((r, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                cursor: 'pointer',
                borderBottom: i < filtered.length - 1 ? '1px solid #F5F5F5' : 'none',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F5F8FF'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'transparent'; }}
              onClick={() => setVal(r.partName)}
            >
              <span style={{ flexShrink: 0, color: '#777777' }}>
                <PartIcon />
              </span>
              <span style={{ flex: 1, fontSize: 14, color: '#2B2B2B', fontFamily }}>
                {highlight(r.partName, val)}
              </span>
              <span style={{ fontSize: 12, color: '#777777', fontFamily, flexShrink: 0 }}>
                {highlight(r.partNumber, val)}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: '#005BA6',
                  background: 'rgba(0,91,166,0.08)',
                  borderRadius: 3,
                  padding: '1px 6px',
                  fontFamily,
                  flexShrink: 0,
                }}
              >
                {r.category}
              </span>
            </div>
          ))}

          {/* View all results */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '10px 14px',
              borderTop: '1px solid #DCDCDC',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              color: '#005BA6',
              fontFamily,
              background: '#FAFAFA',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#F0F6FF'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = '#FAFAFA'; }}
          >
            <SearchIcon />
            View all results for &ldquo;{val}&rdquo;
          </div>
        </div>
      </div>
    );
  },
};

// ─── WithFilters story ────────────────────────────────────────────────────────

const INITIAL_FILTERS = [
  { id: 'cat-imaging', label: 'Imaging' },
  { id: 'cat-mri', label: 'MRI' },
  { id: 'status-active', label: 'In Stock' },
];

export const WithFilters: Story = {
  name: 'WithFilters',
  render: () => {
    const [val, setVal] = useState('');
    const [filters, setFilters] = useState(INITIAL_FILTERS);

    const removeFilter = (id: string) =>
      setFilters((prev) => prev.filter((f) => f.id !== id));

    return (
      <div style={{ width: 560, fontFamily }}>
        {/* Search bar */}
        <Search
          value={val}
          onChange={setVal}
          placeholder="Search parts, equipment..."
        />

        {/* Filter chips row */}
        {filters.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            <span style={{ fontSize: 12, color: '#777777', fontFamily, flexShrink: 0 }}>Filters:</span>
            {filters.map((f) => (
              <div
                key={f.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  height: 28,
                  padding: '0 10px',
                  background: 'rgba(0,91,166,0.08)',
                  border: '1px solid rgba(0,91,166,0.25)',
                  borderRadius: 14,
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#005BA6',
                  fontFamily,
                  cursor: 'default',
                }}
              >
                {f.label}
                <button
                  onClick={() => removeFilter(f.id)}
                  aria-label={`Remove filter ${f.label}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#005BA6',
                    marginLeft: 2,
                  }}
                >
                  <XCircleIcon />
                </button>
              </div>
            ))}
            {filters.length > 0 && (
              <button
                onClick={() => setFilters([])}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 12,
                  color: '#777777',
                  fontFamily,
                  padding: '0 4px',
                  textDecoration: 'underline',
                }}
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
};
