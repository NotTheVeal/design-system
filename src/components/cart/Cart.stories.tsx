import type { Meta, StoryObj } from '@storybook/react';
import Cart from './cart';

const meta: Meta<typeof Cart> = {
  title: 'Components/Cart',
  component: Cart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Cart>;

export const Default: Story = {
  args: {
    colorScheme: 'future',
    title: 'My Cart',
    items: [
      { id: '1', name: 'MRI Gradient Coil Assembly', partNumber: 'GCA-7720', quantity: 1, price: '$1249.99' },
      { id: '2', name: 'Ultrasound Transducer Probe', partNumber: 'GE-LOGIQ-E9', quantity: 2, price: '$389.00' },
    ],
    onAddToCart: () => {},
    onCheckout: () => {},
  },
};

export const SingleItem: Story = {
  args: {
    colorScheme: 'future',
    title: 'Quick Order',
    items: [
      { id: '1', name: 'Patient Cable, SpO2 Spot Check', partNumber: 'OEM-89400-01', quantity: 4, price: '$42.50' },
    ],
    onAddToCart: () => {},
    onCheckout: () => {},
  },
};

export const LargeOrder: Story = {
  args: {
    colorScheme: 'future',
    title: 'Quarterly Supply Order',
    items: [
      { id: '1', name: 'ECG Electrode Snap, 10-pack', partNumber: 'ECG-1001-10', quantity: 10, price: '$12.40' },
      { id: '2', name: 'Blood Pressure Cuff, Adult Large', partNumber: 'BP-5104-AL', quantity: 5, price: '$34.50' },
      { id: '3', name: 'SpO2 Sensor, Adult Reusable', partNumber: 'SPO2-SA-R', quantity: 3, price: '$89.00' },
      { id: '4', name: 'Ventilator Circuit, Adult Disp.', partNumber: 'VC-22A-DISP', quantity: 8, price: '$18.75' },
    ],
    onAddToCart: () => {},
    onCheckout: () => {},
  },
};

export const EmptyCart: Story = {
  args: {
    colorScheme: 'future',
    title: 'My Cart',
    items: [],
    onAddToCart: () => {},
    onCheckout: () => {},
  },
};
