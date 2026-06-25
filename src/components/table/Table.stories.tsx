import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Table from './table';

const meta: Meta<typeof Table> = {
title: 'Components/Table',
component: Table,
tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const orderColumns = [
{ key: 'po', label: 'PO Number', sortable: true },
{ key: 'supplier', label: 'Supplier', sortable: true },
{ key: 'date', label: 'Date', sortable: true },
{ key: 'amount', label: 'Amount', align: 'right' as const, sortable: true },
{ key: 'status', label: 'Status' },
];

const orderData: Record<string, React.ReactNode>[] = [
{ id: '1', po: 'PO-2025-0841', supplier: 'GE Healthcare', date: 'Jun 3, 2025', amount: '$4,200', status: 'Delivered' },
{ id: '2', po: 'PO-2025-0790', supplier: 'Philips Healthcare', date: 'May 22, 2025', amount: '$890', status: 'Delivered' },
{ id: '3', po: 'PO-2025-0755', supplier: 'Siemens Healthineers', date: 'May 10, 2025', amount: '$12,400', status: 'In Transit' },
{ id: '4', po: 'PO-2025-0722', supplier: 'GE Healthcare', date: 'Apr 28, 2025', amount: '$3,100', status: 'Delivered' },
{ id: '5', po: 'PO-2025-0698', supplier: 'Mindray', date: 'Apr 15, 2025', amount: '$7,650', status: 'Pending' },
];

export const Default: Story = {
args: {
columns: orderColumns,
data: orderData,
},
};

export const WithHeaders: Story = {
args: {
columns: [
{ key: 'partNumber', label: 'Part Number' },
{ key: 'description', label: 'Description' },
{ key: 'qty', label: 'Qty', align: 'right' as const },
{ key: 'unitPrice', label: 'Unit Price', align: 'right' as const },
{ key: 'total', label: 'Total', align: 'right' as const },
],
data: [
{ id: '1', partNumber: '5183754-2', description: 'MRI Gradient Coil Assembly', qty: '1', unitPrice: '$8,400', total: '$8,400' },
{ id: '2', partNumber: '4522108-G', description: 'CT X-Ray Tube', qty: '2', unitPrice: '$6,200', total: '$12,400' },
{ id: '3', partNumber: '7813992-1', description: 'Ultrasound Probe 3.5MHz', qty: '3', unitPrice: '$1,850', total: '$5,550' },
{ id: '4', partNumber: '2904371-B', description: 'Patient Monitor Battery Pack', qty: '10', unitPrice: '$145', total: '$1,450' },
{ id: '5', partNumber: '6617234-A', description: 'Ventilator Flow Sensor', qty: '5', unitPrice: '$380', total: '$1,900' },
],
},
};

export const Sortable: Story = {
render: () => {
const equipmentColumns = [
{ key: 'name', label: 'Equipment', sortable: true },
{ key: 'modality', label: 'Modality', sortable: true },
{ key: 'manufacturer', label: 'Manufacturer', sortable: true },
{ key: 'location', label: 'Location' },
{ key: 'contract', label: 'Contract Type', sortable: true },
];
const equipmentData = [
{ id: '1', name: 'Ingenia 3.0T', modality: 'MRI', manufacturer: 'Philips', location: 'Radiology 4B', contract: 'Full Service' },
{ id: '2', name: 'Revolution CT 256', modality: 'CT', manufacturer: 'GE Healthcare', location: 'Imaging 2A', contract: 'Parts Only' },
{ id: '3', name: 'EPIQ 7G', modality: 'Ultrasound', manufacturer: 'Philips', location: 'Cardiology', contract: 'Full Service' },
{ id: '4', name: 'Ysio X.pree', modality: 'X-Ray', manufacturer: 'Siemens', location: 'ER Bay 3', contract: 'T&M' },
{ id: '5', name: 'IntelliVue MX800', modality: 'Monitoring', manufacturer: 'Philips', location: 'ICU', contract: 'Full Service' },
];
return <Table columns={equipmentColumns} data={equipmentData} />;
},
};

export const NoStripes: Story = {
args: {
columns: [
{ key: 'contract', label: 'Contract #' },
{ key: 'vendor', label: 'Vendor' },
{ key: 'type', label: 'Type' },
{ key: 'expires', label: 'Expires' },
{ key: 'value', label: 'Value', align: 'right' as const },
],
data: [
{ id: '1', contract: 'CON-2025-0142', vendor: 'Siemens Healthineers', type: 'Comprehensive', expires: 'Dec 31, 2025', value: '$186,000' },
{ id: '2', contract: 'CON-2025-0098', vendor: 'GE Healthcare', type: 'Parts & Labor', expires: 'Sep 30, 2025', value: '$94,000' },
{ id: '3', contract: 'CON-2025-0067', vendor: 'Philips Healthcare', type: 'Full Service', expires: 'Jun 30, 2025', value: '$248,000' },
{ id: '4', contract: 'CON-2024-0314', vendor: 'Mindray', type: 'Time & Materials', expires: 'Mar 31, 2026', value: '$42,000' },
],
},
};

export const WithReactNodeCells: Story = {
render: () => {
const statusColor = (s: string) =>
s === 'Active' ? '#17AB78' : s === 'Expiring Soon' ? '#E3A92D' : '#FF0000';
const columns = [
{ key: 'supplier', label: 'Supplier' },
{ key: 'category', label: 'Category' },
{ key: 'orders', label: 'Orders', align: 'right' as const },
{ key: 'spend', label: 'YTD Spend', align: 'right' as const },
{ key: 'status', label: 'Status' },
];
const data = [
{ id: '1', supplier: 'GE Healthcare', category: 'Imaging', orders: '24', spend: '$184,200', status: <span style={{ color: statusColor('Active'), fontWeight: 600, fontSize: 13 }}>● Active</span> },
{ id: '2', supplier: 'Philips Healthcare', category: 'Monitoring', orders: '18', spend: '$142,800', status: <span style={{ color: statusColor('Active'), fontWeight: 600, fontSize: 13 }}>● Active</span> },
{ id: '3', supplier: 'Siemens Healthineers', category: 'CT / MRI', orders: '11', spend: '$310,500', status: <span style={{ color: statusColor('Expiring Soon'), fontWeight: 600, fontSize: 13 }}>● Expiring Soon</span> },
{ id: '4', supplier: 'Mindray', category: 'Patient Care', orders: '7', spend: '$38,900', status: <span style={{ color: statusColor('Inactive'), fontWeight: 600, fontSize: 13 }}>● Inactive</span> },
];
return <Table columns={columns} data={data} />;
},
};

export const Selectable: Story = {
render: () => {
const [selected, setSelected] = useState<string[]>([]);
const columns = [
{ key: 'partNumber', label: 'Part Number', sortable: true },
{ key: 'description', label: 'Description' },
{ key: 'category', label: 'Category' },
{ key: 'price', label: 'Price', align: 'right' as const },
];
const data = [
{ id: 'PS-7731', partNumber: 'PS-7731', description: 'Pulse Oximeter Probe, Adult', category: 'Patient Monitoring', price: '$24.50' },
{ id: 'PS-8842', partNumber: 'PS-8842', description: 'ECG Lead Wire Set, 10-Lead', category: 'Cardiac', price: '$42.00' },
{ id: 'PS-9901', partNumber: 'PS-9901', description: 'Suction Canister, 1500mL', category: 'Suction', price: '$8.75' },
{ id: 'PS-4422', partNumber: 'PS-4422', description: 'Blood Pressure Cuff, Adult Standard', category: 'Monitoring', price: '$31.00' },
{ id: 'PS-6611', partNumber: 'PS-6611', description: 'Endotracheal Tube, 7.5mm', category: 'Airway', price: '$6.25' },
];
return (
<div>
<Table columns={columns} data={data} selectable rowKey="id" onRowSelect={setSelected} />
{selected.length > 0 && (
<p style={{ marginTop: 12, fontSize: 13, color: '#4A4A4A', fontFamily: "'Source Sans 3', sans-serif" }}>
Selected: {selected.join(', ')}
</p>
)}
</div>
);
},
};

// ── NEW: WithToggle story ──────────────────────────────────────────────────────
// Shows a table header with a Toggle that switches between List and Grid views.
export const WithToggle: Story = {
render: () => {
const [isGrid, setIsGrid] = useState(false);

const listColumns = [
{ key: 'name', label: 'Equipment', sortable: true },
{ key: 'modality', label: 'Modality', sortable: true },
{ key: 'location', label: 'Location' },
{ key: 'status', label: 'Status' },
];

const listData = [
{ id: '1', name: 'Ingenia 3.0T', modality: 'MRI', location: 'Radiology 4B', status: 'Active' },
{ id: '2', name: 'Revolution CT 256', modality: 'CT', location: 'Imaging 2A', status: 'Active' },
{ id: '3', name: 'EPIQ 7G', modality: 'Ultrasound', location: 'Cardiology', status: 'Maintenance' },
{ id: '4', name: 'Ysio X.pree', modality: 'X-Ray', location: 'ER Bay 3', status: 'Active' },
{ id: '5', name: 'IntelliVue MX800', modality: 'Monitoring', location: 'ICU', status: 'Active' },
];

// Inline Toggle component (matches toggle.tsx API)
const Toggle: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label?: string }> = ({ checked, onChange, label }) => (
<label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif" }}>
<div
role="switch"
aria-checked={checked}
tabIndex={0}
onClick={() => onChange(!checked)}
onKeyDown={e => e.key === 'Enter' || e.key === ' ' ? onChange(!checked) : undefined}
style={{ position: 'relative', width: 40, height: 22, borderRadius: 11, background: checked ? '#005BA6' : '#CCCCCC', transition: 'background 200ms ease', outline: 'none', cursor: 'pointer' }}
>
<div style={{ position: 'absolute', top: '50%', left: checked ? 'calc(100% - 20px)' : 2, transform: 'translateY(-50%)', width: 18, height: 18, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,47,72,0.25)', transition: 'left 200ms ease' }} />
</div>
{label && <span style={{ fontSize: 14, color: '#4A4A4A' }}>{label}</span>}
</label>
);

return (
<div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
{/* Header bar with toggle */}
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: '8px 0' }}>
<span style={{ fontSize: 16, fontWeight: 600, color: '#002F48' }}>Equipment List</span>
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
<span style={{ fontSize: 13, color: isGrid ? '#777777' : '#005BA6', fontWeight: isGrid ? 400 : 600 }}>List</span>
<Toggle checked={isGrid} onChange={setIsGrid} />
<span style={{ fontSize: 13, color: isGrid ? '#005BA6' : '#777777', fontWeight: isGrid ? 600 : 400 }}>Grid</span>
</div>
</div>

{/* Conditional view */}
{isGrid ? (
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
{listData.map(item => (
<div key={item.id} style={{ border: '1px solid #DCDCDC', borderRadius: 4, padding: 16, background: '#FFFFFF' }}>
<div style={{ fontSize: 14, fontWeight: 600, color: '#4A4A4A', marginBottom: 4 }}>{item.name}</div>
<div style={{ fontSize: 12, color: '#777777', marginBottom: 4 }}>{item.modality}</div>
<div style={{ fontSize: 12, color: '#777777', marginBottom: 8 }}>{item.location}</div>
<span style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, color: item.status === 'Active' ? '#0E7C55' : '#B45309', background: item.status === 'Active' ? '#ECFDF5' : '#FFF7ED', borderRadius: 3, padding: '2px 8px' }}>
{item.status}
</span>
</div>
))}
</div>
) : (
<Table columns={listColumns} data={listData} />
)}
</div>
);
},
};
