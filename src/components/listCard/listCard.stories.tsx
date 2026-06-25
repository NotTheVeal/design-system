import type { Meta, StoryObj } from '@storybook/react';
import { ListCard } from './listCard';

const meta: Meta<typeof ListCard> = {
  title: 'Components/ListCard',
  component: ListCard,
  parameters: { layout: 'padded' },
  argTypes: {
    status: { control: 'select', options: ['In Stock', 'Low Stock', 'Out of Stock', 'Active', 'Inactive'] },
  },
};

export default meta;
type Story = StoryObj<typeof ListCard>;

export const Default: Story = {
  args: {
    title: 'GE Healthcare Ultrasound Probe',
    subtitle: 'Imaging & Diagnostics',
    description: 'High-frequency transducer for detailed abdominal imaging.',
    status: 'In Stock',
    sku: '4542-0012',
    manufacturer: 'GE Healthcare',
    price: '\$1,249.00',
    actionLabel: 'Add to Cart',
  },
};

export const LowStock: Story = {
  args: {
    title: 'Siemens CT Scanner Filter',
    subtitle: 'CT Components',
    status: 'Low Stock',
    sku: 'CT-7821',
    manufacturer: 'Siemens Healthineers',
    price: '\$89.50',
    badge: 'Preferred',
    actionLabel: 'View Details',
  },
};

export const OutOfStock: Story = {
  args: {
    title: 'Philips Patient Monitor Lead',
    subtitle: 'Monitoring',
    status: 'Out of Stock',
    sku: 'PM-4401-L',
    manufacturer: 'Philips Healthcare',
    actionLabel: 'Notify Me',
  },
};

export const WithBadge: Story = {
  args: {
    title: 'Stryker Surgical Instrument Set',
    subtitle: 'Surgical Equipment',
    badge: 'OEM',
    status: 'Active',
    sku: 'STR-9900',
    manufacturer: 'Stryker',
    price: '\$3,450.00',
    actionLabel: 'Request Quote',
  },
};

export const Selected: Story = {
  args: {
    title: 'Medtronic Infusion Pump Tubing',
    subtitle: 'Infusion',
    status: 'In Stock',
    sku: 'INF-2280',
    manufacturer: 'Medtronic',
    price: '\$24.99',
    selected: true,
    actionLabel: 'Add to Cart',
  },
};

export const ListGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 720 }}>
      <ListCard title="GE Healthcare Probe" subtitle="Imaging" status="In Stock" sku="4542" manufacturer="GE" price="\$1,249.00" actionLabel="Add to Cart" />
      <ListCard title="Siemens CT Filter" subtitle="CT Components" status="Low Stock" sku="CT-7821" manufacturer="Siemens" price="\$89.50" actionLabel="View Details" />
      <ListCard title="Philips Monitor Lead" subtitle="Monitoring" status="Out of Stock" sku="PM-4401" manufacturer="Philips" actionLabel="Notify Me" />
    </div>
  ),
};
