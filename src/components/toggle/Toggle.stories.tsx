import type { Meta, StoryObj } from '@storybook/react';
import Toggle from './toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Off: Story = {
  args: {
    checked: false,
    label: 'Email notifications',
    onChange: () => {},
  },
};

export const On: Story = {
  args: {
    checked: true,
    label: 'Email notifications',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'SMS alerts (unavailable)',
    onChange: () => {},
  },
};
