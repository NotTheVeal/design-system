import type { Meta, StoryObj } from '@storybook/react';
import Toggle from './toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    onChange: { action: 'called' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    checked: true,
    onChange: () => {},
    disabled: true,
    label: 'Label',
    className: 'className',
  },
};

export const Disabled: Story = { args: { ...Default.args, disabled: true } };
