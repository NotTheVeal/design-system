import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Table } from './table';
import StatusBadge from '../statusBadge/statusBadge';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Table>;

const columns = [
  { key: 'name', header: 'Part Name', sortable: true, width: '25%' },
  { key: 'sku', header: 'SKU', sortable: true },
  { key: 'manufacturer', header: 'Manufacturer', sortable: true },
  { key: 'category', header: 'Category' },
  { key: 'price', header: 'Price', sortable: true, align: 'right' as const },
  {
    key: 'status',
    header: 'Status',
    align: 'center' as const,
    render: (val: unknown) => (
      <StatusBadge
        label={String(val)}
        color={val === 'In Stock' ? 'success' : val === 'Low Stock' ? 'warning' : 'danger'}
        variant="outlined"
        size="sm"
      />
    ),
  },
];

const data = [
  { name: 'GE Healthcare Ultrasound Probe', sku: '4542-0012', manufacturer: 'GE Healthcare', category: 'Imaging', price: '\$1,249.00', status: 'In Stock' },
  { name: 'Siemens CT Scanner Filter', sku: 'CT-7821', manufacturer: 'Siemens Healthineers', category: 'CT', price: '\$89.50', status: 'Low Stock' },
  { name: 'Philips Patient Monitor Lead', sku: 'PM-4401-L', manufacturer: 'Philips Healthcare', category: 'Monitoring', price: '\$34.99', status: 'Out of Stock' },
  { name: 'Stryker Surgical Instrument', sku: 'STR-9900', manufacturer: 'Stryker', category: 'Surgical', price: '\$3,450.00', status: 'In Stock' },
  { name: 'Medtronic Infusion Pump Tubing', sku: 'INF-2280', manufacturer: 'Medtronic', category: 'Infusion', price: '\$24.99', status: 'In Stock' },
  { name: 'BD Vacutainer Collection Tubes', sku: 'BD-5550', manufacturer: 'Becton Dickinson', category: 'Lab', price: '\$12.75', status: 'Low Stock' },
];

export const Default: Story = {
  render: () => <Table columns={columns} data={data} rowKey="sku" />,
};

export const Selectable: Story = {
  render: () => <Table columns={columns} data={data} rowKey="sku" selectable onSelectionChange={sel => console.log('Selected:', sel.length)} />,
};

export const SortableInteractive: Story = {
  render: () => <Table columns={columns} data={data} rowKey="sku" onRowClick={row => console.log('Row clicked:', row)} />,
};

export const Empty: Story = {
  render: () => <Table columns={columns} data={[]} emptyText="No parts found matching your search." />,
};

export const Loading: Story = {
  render: () => <Table columns={columns} data={[]} loading />,
};
