import type { Meta, StoryObj } from '@storybook/react';
import Tabs from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    tabs: { control: 'text' },
    activeTabIndex: { control: 'number' },
    onTabChange: { action: 'called' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [],
    activeTabIndex: 1,
    onTabChange: () => {},
    className: 'className',
  },
};

