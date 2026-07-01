import type { Meta, StoryObj } from '@storybook/react';
import { StockLevel } from './stockLevel';
const meta: Meta<typeof StockLevel> = { title: 'Components/StockLevel', component: StockLevel, parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj<typeof StockLevel>;
export const Default: Story = { args: { current: 47, max: 100, label: 'Inventory' } };
export const LowStock: Story = { args: { current: 12, max: 100, label: 'Inventory' } };
export const OutOfStock: Story = { args: { current: 0, max: 100, label: 'Inventory' } };
export const Full: Story = { args: { current: 100, max: 100, label: 'Inventory' } };
