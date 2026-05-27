import type { Meta, StoryObj } from '@storybook/react';
import Icon from './icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ["xs","sm","md","default","lg"] },
    color: { control: 'select', options: ["default","secondary","tertiary","brand","light","ondark","success","error","warning","disabled"] },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    size: 'xs',
    color: 'default',
    className: 'className',
  },
};

