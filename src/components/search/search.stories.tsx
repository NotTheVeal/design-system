import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Search } from './search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div style={{ maxWidth: 480, width: '100%', margin: '40px auto' }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return <Search value={val} onChange={setVal} placeholder="Search parts, equipment, suppliers..." />;
  },
};
export const WithValue: Story = {
  render: () => {
    const [val, setVal] = useState('Ultrasound probe');
    return <Search value={val} onChange={setVal} />;
  },
};
export const Large: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return <Search value={val} onChange={setVal} size="lg" placeholder="Search..." />;
  },
};
export const Small: Story = {
  render: () => {
    const [val, setVal] = useState('');
    return <Search value={val} onChange={setVal} size="sm" placeholder="Search..." />;
  },
};
export const Disabled: Story = {
  render: () => <Search value="" onChange={() => {}} disabled placeholder="Search disabled" />,
};
export const Interactive: Story = {
  render: () => {
    const [val, setVal] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const parts = ['GE Healthcare Probe', 'Siemens CT Filter', 'Philips Monitor Lead', 'Medtronic Tubing', 'BD Vacutainer'];
    const handleSearch = (v: string) => {
      setResults(v ? parts.filter(p => p.toLowerCase().includes(v.toLowerCase())) : []);
    };
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        <Search value={val} onChange={v => { setVal(v); handleSearch(v); }} onSearch={handleSearch} />
        {results.length > 0 && (
          <div style={{ border:'1px solid #DCDCDC', borderRadius:4, background:'#fff', fontFamily:"'Source Sans Pro',sans-serif" }}>
            {results.map(r => <div key={r} style={{ padding:'10px 16px', fontSize:14, color:'#4A4A4A', borderBottom:'1px solid #F1F1F1', cursor:'pointer' }}>{r}</div>)}
          </div>
        )}
        {val && results.length === 0 && <p style={{ fontSize:13, color:'#777777', fontFamily:"'Source Sans Pro',sans-serif" }}>No results for "{val}"</p>}
      </div>
    );
  },
};
