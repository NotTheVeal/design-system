import type { Meta, StoryObj } from '@storybook/react';
import { PriceTag } from './priceTag';
const meta: Meta<typeof PriceTag> = { title: 'Components/PriceTag', component: PriceTag, parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj<typeof PriceTag>;
export const Default: Story = { args: { price: 299.99 } };
export const WithDiscount: Story = { args: { price: 199.99, originalPrice: 299.99 } };
export const SmallSize: Story = { args: { price: 49.99, originalPrice: 79.99, size: 'sm' } };
export const LargeSize: Story = { args: { price: 1299.00, originalPrice: 1599.00, size: 'lg' } };
