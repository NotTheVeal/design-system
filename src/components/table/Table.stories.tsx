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

const orderRows = [
  { po: 'PO-2025-0841', supplier: 'GE Healthcare', date: 'Jun 3, 2025', amount: '$4,200', status: 'Delivered' },
  { po: 'PO-2025-0790', supplier: 'Philips Healthcare', date: 'May 22, 2025', amount: '$890', status: 'Delivered' },
  { po: 'PO-2025-0755', supplier: 'Siemens Healthineers', date: 'May 10, 2025', amount: '$12,400', status: 'In Transit' },
  { po: 'PO-2025-0722', supplier: 'GE Healthcare', date: 'Apr 28, 2025', amount: '$3,100', status: 'Delivered' },
  { po: 'PO-2025-0698', supplier: 'Mindray', date: 'Apr 15, 2025', amount: '$7,650', status: 'Pending' },
];

export const Default: Story = {
  args: {
    columns: orderColumns,
    rows: orderRows,
    striped: true,
  },
};

export const WithHeaders: Story = {
  args: {
    headers: ['Part Number', 'Description', 'Qty', 'Unit Price', 'Total'],
    data: [
      ['5183754-2', 'MRI Gradient Coil Assembly', '1', '$8,400', '$8,400'],
      ['4522108-G', 'CT X-Ray Tube', '2', '$6,200', '$12,400'],
      ['7813992-1', 'Ultrasound Probe 3.5MHz', '3', '$1,850', '$5,550'],
      ['2904371-B', 'Patient Monitor Battery Pack', '10', '$145', '$1,450'],
      ['6617234-A', 'Ventilator Flow Sensor', '5', '$380', '$1,900'],
    ],
    striped: true,
  },
};

export const Sortable: Story = {
  render: () => {
    const [sortCol, setSortCol] = useState('');
    const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);

    const handleSort = (key: string) => {
      if (sortCol === key) {
        setSortDir(prev => prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc');
        if (sortDir === 'desc') setSortCol('');
      } else {
        setSortCol(key);
        setSortDir('asc');
      }
    };

    const equipmentColumns = [
      { key: 'name', label: 'Equipment', sortable: true },
      { key: 'modality', label: 'Modality', sortable: true },
      { key: 'manufacturer', label: 'Manufacturer', sortable: true },
      { key: 'location', label: 'Location' },
      { key: 'contract', label: 'Contract Type', sortable: true },
    ];

    const rows = [
      { name: 'Ingenia 3.0T', modality: 'MRI', manufacturer: 'Philips', location: 'Radiology 4B', contract: 'Full Service' },
      { name: 'Revolution CT 256', modality: 'CT', manufacturer: 'GE Healthcare', location: 'Imaging 2A', contract: 'Parts Only' },
      { name: 'EPIQ 7G', modality: 'Ultrasound', manufacturer: 'Philips', location: 'Cardiology', contract: 'Full Service' },
      { name: 'Ysio X.pree', modality: 'X-Ray', manufacturer: 'Siemens', location: 'ER Bay 3', contract: 'T&M' },
      { name: 'IntelliVue MX800', modality: 'Monitoring', manufacturer: 'Philips', location: 'ICU', contract: 'Full Service' },
    ];

    return (
      <Table
        columns={equipmentColumns}
        rows={rows}
        sortColumn={sortCol}
        sortDirection={sortDir}
        onSort={handleSort}
        striped
      />
    );
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
    rows: [
      { contract: 'CON-2025-0142', vendor: 'Siemens Healthineers', type: 'Comprehensive', expires: 'Dec 31, 2025', value: '$186,000' },
      { contract: 'CON-2025-0098', vendor: 'GE Healthcare', type: 'Parts & Labor', expires: 'Sep 30, 2025', value: '$94,000' },
      { contract: 'CON-2025-0067', vendor: 'Philips Healthcare', type: 'Full Service', expires: 'Jun 30, 2025', value: '$248,000' },
      { contract: 'CON-2024-0314', vendor: 'Mindray', type: 'Time & Materials', expires: 'Mar 31, 2026', value: '$42,000' },
    ],
    striped: false,
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

    const rows = [
      {
        supplier: 'GE Healthcare',
        category: 'Imaging',
        orders: '24',
        spend: '$184,200',
        status: <span style={{ color: statusColor('Active'), fontWeight: 600, fontSize: 13 }}>● Active</span>,
      },
      {
        supplier: 'Philips Healthcare',
        category: 'Monitoring',
        orders: '18',
        spend: '$142,800',
        status: <span style={{ color: statusColor('Active'), fontWeight: 600, fontSize: 13 }}>● Active</span>,
      },
      {
        supplier: 'Siemens Healthineers',
        category: 'CT / MRI',
        orders: '11',
        spend: '$310,500',
        status: <span style={{ color: statusColor('Expiring Soon'), fontWeight: 600, fontSize: 13 }}>● Expiring Soon</span>,
      },
      {
        supplier: 'Mindray',
        category: 'Patient Care',
        orders: '7',
        spend: '$38,900',
        status: <span style={{ color: statusColor('Inactive'), fontWeight: 600, fontSize: 13 }}>● Inactive</span>,
      },
    ];

    return <Table columns={columns} rows={rows} striped />;
  },
};
