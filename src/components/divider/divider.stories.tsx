import type { Meta, StoryObj } from '@storybook/react';
import Divider from './divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    weight: 'default',
  },
  decorators: [(Story) => <div style={{ width: 400, padding: 24 }}><Story /></div>],
};

export const Subtle: Story = {
  args: {
    orientation: 'horizontal',
    weight: 'subtle',
  },
  decorators: [(Story) => <div style={{ width: 400, padding: 24 }}><Story /></div>],
};

export const Strong: Story = {
  args: {
    orientation: 'horizontal',
    weight: 'strong',
  },
  decorators: [(Story) => <div style={{ width: 400, padding: 24 }}><Story /></div>],
};

export const WithLabel: Story = {
  args: {
    label: 'OR',
    weight: 'default',
  },
  decorators: [(Story) => <div style={{ width: 400, padding: 24 }}><Story /></div>],
};

export const SectionLabel: Story = {
  args: {
    label: 'Contract Details',
    weight: 'subtle',
  },
  decorators: [(Story) => <div style={{ width: 400, padding: 24 }}><Story /></div>],
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    weight: 'default',
  },
  decorators: [(Story) => <div style={{ display: 'flex', gap: 16, alignItems: 'center', height: 48, padding: 24 }}><span>Parts</span><Story /><span>Equipment</span></div>],
};
