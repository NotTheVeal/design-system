import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProductCard } from './productCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: { layout: 'centered' },
  // Constrain grid cards to a realistic width
  decorators: [
    (Story, ctx) => {
      const isGrid = ctx.args.variant !== 'list';
      return (
        <div style={{ width: isGrid ? 300 : 680, maxWidth: '100%' }}>
          <Story />
        </div>
      );
    },
  ],
};
export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    productName: 'GE Healthcare Ultrasound Probe',
    partNumber: '4542-0012',
    oem: 'GE Healthcare',
    price: '$1,249.00',
    availability: 'In Stock',
    optionsCount: 3,
    colorScheme: 'future',
  },
};

export const LowStock: Story = {
  args: {
    productName: 'Siemens CT Filter',
    partNumber: 'CT-7821',
    oem: 'Siemens Healthineers',
    price: '$89.50',
    availability: 'Low Stock',
    optionsCount: 1,
    colorScheme: 'future',
  },
};

export const OutOfStock: Story = {
  args: {
    productName: 'Philips Patient Monitor Lead',
    partNumber: 'PM-4401',
    oem: 'Philips Healthcare',
    price: '$34.99',
    availability: 'Out of Stock',
    optionsCount: 0,
    colorScheme: 'future',
  },
};

export const ListVariant: Story = {
  args: {
    variant: 'list',
    productName: 'Medtronic Infusion Tubing Set',
    partNumber: 'INF-2280',
    oem: 'Medtronic',
    price: '$24.99',
    availability: 'In Stock',
    optionsCount: 2,
    colorScheme: 'future',
  },
};

export const SearchResultsPage: Story = {
  parameters: { layout: 'padded' },
  decorators: [],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 300px)', gap: 16, padding: 24 }}>
      {[
        { productName: 'GE Healthcare Ultrasound Probe',  partNumber: '4542-0012', oem: 'GE Healthcare',         price: '$1,249.00', availability: 'In Stock',     optionsCount: 3 },
        { productName: 'Siemens CT Collimator Filter',   partNumber: 'CT-7821',   oem: 'Siemens Healthineers',  price: '$89.50',   availability: 'Low Stock',    optionsCount: 1 },
        { productName: 'Philips Patient Monitor Cable',  partNumber: 'PM-4401',   oem: 'Philips Healthcare',    price: '$34.99',   availability: 'Out of Stock', optionsCount: 0 },
        { productName: 'Stryker Surgical Drill Bit',     partNumber: 'STR-9921',  oem: 'Stryker Corporation',   price: '$3,450.00',availability: 'In Stock',     optionsCount: 4 },
        { productName: 'Medtronic Infusion Tubing',      partNumber: 'INF-2280',  oem: 'Medtronic',             price: '$24.99',   availability: 'In Stock',     optionsCount: 2 },
        { productName: 'BD Vacutainer Blood Collection', partNumber: 'BD-5510',   oem: 'BD Becton Dickinson',   price: '$12.75',   availability: 'Low Stock',    optionsCount: 1 },
      ].map(p => (
        <ProductCard key={p.partNumber} {...p} colorScheme="future" />
      ))}
    </div>
  ),
};
