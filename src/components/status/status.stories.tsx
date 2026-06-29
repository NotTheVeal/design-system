import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Status } from './status';

const meta: Meta<typeof Status> = {
  title: 'Components/Status',
  component: Status,
  parameters: { layout: 'centered' },
  argTypes: {
    value: { control: 'select', options: ['active','inactive','pending','error','warning','draft','archived'] },
    size: { control: 'select', options: ['sm','md'] },
  },
};
export default meta;
type Story = StoryObj<typeof Status>;

export const Default: Story = { args: { value: 'active' } };
export const Active: Story = { args: { value: 'active' } };
export const Inactive: Story = { args: { value: 'inactive' } };
export const Pending: Story = { args: { value: 'pending' } };
export const Error: Story = { args: { value: 'error' } };
export const Warning: Story = { args: { value: 'warning' } };
export const Draft: Story = { args: { value: 'draft' } };
export const Archived: Story = { args: { value: 'archived' } };

export const AllStates: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:12, fontFamily:'Source Sans Pro, sans-serif' }}>
      {(['active','inactive','pending','error','warning','draft','archived'] as const).map(v => (
        <Status key={v} value={v} />
      ))}
    </div>
  ),
};

export const SmallSize: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:8, fontFamily:'Source Sans Pro, sans-serif' }}>
      {(['active','inactive','pending','error'] as const).map(v => (
        <Status key={v} value={v} size="sm" />
      ))}
    </div>
  ),
};

export const CustomLabels: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display:'flex', flexWrap:'wrap', gap:12, fontFamily:'Source Sans Pro, sans-serif' }}>
      <Status value="active" label="Online" />
      <Status value="inactive" label="Offline" />
      <Status value="pending" label="Processing" />
      <Status value="error" label="Failed" />
      <Status value="warning" label="Review Required" />
      <Status value="draft" label="In Progress" />
      <Status value="archived" label="Closed" />
    </div>
  ),
};

export const InTable: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <table style={{ width:'100%', borderCollapse:'collapse', fontFamily:'Source Sans Pro, sans-serif', fontSize:13 }}>
      <thead>
        <tr style={{ background:'#005BA6', color:'white' }}>
          {['Vendor','Category','Orders','Status'].map(h => <th key={h} style={{ padding:'8px 16px', textAlign:'left', fontWeight:600 }}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {[
          ['GE Healthcare','Imaging',142,'active'],['Siemens Healthineers','CT/MRI',98,'active'],
          ['Philips Healthcare','Monitoring',67,'pending'],['Stryker','Surgical',45,'warning'],
          ['Medtronic','Infusion',23,'inactive'],
        ].map(([name,cat,orders,status],i) => (
          <tr key={String(name)} style={{ background:i%2?'#FAFAFA':'white', borderBottom:'1px solid #DCDCDC' }}>
            <td style={{ padding:'10px 16px', fontWeight:600, color:'#002F48' }}>{name}</td>
            <td style={{ padding:'10px 16px', color:'#777' }}>{cat}</td>
            <td style={{ padding:'10px 16px' }}>{orders}</td>
            <td style={{ padding:'10px 16px' }}><Status value={status as any} size="sm" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
