import type { Meta, StoryObj } from '@storybook/react';
import AiAgent from './aiAgent';

const meta: Meta<typeof AiAgent> = {
  title: 'Components/AiAgent',
  component: AiAgent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AiAgent>;

export const Default: Story = {
  args: {},
};
