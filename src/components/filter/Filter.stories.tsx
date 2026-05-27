import type { Meta, StoryObj } from '@storybook/react';
import Filter from './filter';

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    onSearch: { action: 'called' },
    onClear: { action: 'called' },
  },
};

export default meta;
type Story = StoryObj<typeof Filter>;

export const Default: Story = {
  args: {
    className: 'className',
    onSearch: () => {},
    onClear: () => {},
  },
};

