import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
    args: {
          items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Medical Devices', href: '/products/medical' },
            { label: 'Current Page' },
                ],
    },
};

export const Short: Story = {
    args: {
          items: [
            { label: 'Home', href: '/' },
            { label: 'Current Page' },
                ],
    },
};
