import type { Meta, StoryObj } from '@storybook/react';
import IconModality from './iconModality';

const meta: Meta<typeof IconModality> = {
  title: 'Components/IconModality',
  component: IconModality,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ["squarefilled","squareoutline","circlefilled","circleoutline"] },
    icon: { control: 'text' },
    size: { control: 'select', options: ["sm","md","lg","xl"] },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof IconModality>;

export const Default: Story = {
  args: {
    type: 'squarefilled',
    icon: 'Sample content',
    size: 'sm',
    className: 'className',
  },
};

