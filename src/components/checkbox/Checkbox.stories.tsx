import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    colorScheme: { control: 'select', options: ['current', 'future'] },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Patient Monitoring Equipment',
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Infusion Therapy Supplies',
    checked: true,
    disabled: false,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Respiratory Devices (3 of 5 selected)',
    indeterminate: true,
    checked: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Unavailable Category',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Pre-selected Item (locked)',
    checked: true,
    disabled: true,
  },
};
