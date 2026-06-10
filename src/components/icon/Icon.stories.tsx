import type { Meta, StoryObj } from '@storybook/react';
import Icon from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'select', options: ['settings', 'search', 'close', 'check', 'arrow-right', 'plus', 'download', 'upload', 'edit', 'trash'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'default', 'lg'] },
    color: { control: 'select', options: ['default', 'secondary', 'tertiary', 'brand', 'light', 'success', 'error', 'warning', 'disabled'] },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Search: Story = {
  args: { name: 'search', size: 'default', color: 'default' },
};

export const Settings: Story = {
  args: { name: 'settings', size: 'default', color: 'brand' },
};

export const Edit: Story = {
  args: { name: 'edit', size: 'default', color: 'default' },
};

export const Trash: Story = {
  args: { name: 'trash', size: 'default', color: 'error' },
};

export const Check: Story = {
  args: { name: 'check', size: 'default', color: 'success' },
};

export const Large: Story = {
  args: { name: 'download', size: 'lg', color: 'brand' },
};

export const Small: Story = {
  args: { name: 'plus', size: 'sm', color: 'default' },
};
