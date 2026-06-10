import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from './productCard';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: { control: 'select', options: ['current', 'future'] },
    availability: { control: 'text' },
    price: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    productName: 'Patient Cable, SpO2 Spot Check, 4ft',
    partNumber: 'OEM-89400-01',
    oem: 'Nellcor',
    price: '\$42.50',
    availability: 'In Stock',
    optionsCount: 3,
    colorScheme: 'future',
  },
};

export const BackOrdered: Story = {
  args: {
    productName: 'Ventilator Circuit, Adult Disposable, 22mm',
    partNumber: 'VC-22A-DISP',
    oem: 'Novalung',
    price: '\$18.75',
    availability: 'Backordered',
    optionsCount: 1,
    colorScheme: 'future',
  },
};

export const HighValue: Story = {
  args: {
    productName: 'Ultrasound Transducer, Convex Array 3.5 MHz',
    partNumber: 'C60-8A',
    oem: 'GE Healthcare',
    price: '\$4,250.00',
    availability: 'In Stock',
    optionsCount: 2,
    colorScheme: 'future',
  },
};
