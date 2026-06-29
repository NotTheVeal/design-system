import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Table } from './table';

const COLUMNS = [
  { key: 'partNumber', header: 'Part #', width: 120 },
  { key: 'description', header: 'Description' },
  { key: 'manufacturer', header: 'Manufacturer', width: 160 },
  { key: 'price', header: 'Price', width: 100, align: 'right' as const },
  { key: 'status', header: 'Status', width: 120 },
];

const DATA = [
  { partNumber: '4542-0012', description: 'GE Healthcare Ultrasound Probe', manufacturer: 'GE Healthcare', price: '$1,249.00', status: 'In Stock' },
  { partNumber: 'CT-7821', description: 'Siemens CT Collimator Filter', manufacturer: 'Siemens Healthineers', price: '$89.50', status: 'Low Stock' },
  { partNumber: 'PM-4401', description: 'Philips Patient Monitor Cable', manufacturer: 'Philips Healthcare', price: '$34.99', status: 'Out of Stock' },
  { partNumber: 'INF-2280', description: 'Medtronic Infusion Pump Tubing', manufacturer: 'Medtronic', price: '$24.99', status: 'In Stock' },
  { partNumber: 'BD-5510', description: 'BD Vacutainer Blood Collection Kit', manufacturer: 'BD Becton Dickinson', price: '$12.75', status: 'In Stock' },
];

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = { render: () => <Table columns={COLUMNS} data={DATA} rowKey={(r) => r.partNumber} /> };
export const Striped: Story = { render: () => <Table columns={COLUMNS} data={DATA} rowKey={(r) => r.partNumber} striped /> };
export const Empty: Story = { render: () => <Table columns={COLUMNS} data={[]} rowKey={(r) => r.partNumber} emptyMessage="No parts found" /> };
export const Sortable: Story = {
  render: () => {
    const [sortKey, setSortKey] = React.useState('partNumber');
    const [sortDir, setSortDir] = React.useState<'asc'|'desc'>('asc');
    return (
      <Table
        columns={COLUMNS.map(c => ({ ...c, sortable: true }))}
        data={DATA} rowKey={(r) => r.partNumber}
        sortKey={sortKey} sortDir={sortDir}
        onSort={(k, d) => { setSortKey(k); setSortDir(d); }}
      />
    );
  },
};
