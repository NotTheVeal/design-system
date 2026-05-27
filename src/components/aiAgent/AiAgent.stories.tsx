import type { Meta, StoryObj } from '@storybook/react';
import AiAgent from './aiAgent';

const meta: Meta<typeof AiAgent> = {
  title: 'Components/AiAgent',
  component: AiAgent,
  tags: ['autodocs'],
  argTypes: {
    messages: { control: 'select', options: ["{ text: string; type: user","agent","error"] },
  },
};

export default meta;
type Story = StoryObj<typeof AiAgent>;

export const Default: Story = {
  args: {
    messages: { text: string; type: 'user',
  },
};

