import type { Meta, StoryObj } from '@storybook/react';
import { PartReference } from './partReference';
const meta: Meta<typeof PartReference> = { title: 'Components/PartReference', component: PartReference, parameters: { layout: 'centered' } };
export default meta;
type Story = StoryObj<typeof PartReference>;
export const Default: Story = { args: { sku: 'GE-4542-0012' } };
export const LongSku: Story = { args: { sku: 'PHI-PM4401-CABLE-XL', label: 'Part No.' } };
