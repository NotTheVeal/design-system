import type { Meta, StoryObj } from '@storybook/react';
import PageShell from './pageShell';

const meta: Meta<typeof PageShell> = {
  title: 'Components/PageShell',
  component: PageShell,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof PageShell>;

export const Default: Story = {
  args: {
    children: 'Content goes here',
    className: 'className',
  },
};

