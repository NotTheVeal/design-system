import type { Meta, StoryObj } from '@storybook/react';
import InlineButton from './inlineButton';

const meta: Meta<typeof InlineButton> = {
  title: 'Components/InlineButton',
  component: InlineButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'called' },
    variant: { control: 'select', options: ["tall","link","linkblue","directory","iconbutton"] },
    className: { control: 'text' },
    ariaLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof InlineButton>;

export const Default: Story = {
  args: {
    label: 'Label',
    onClick: () => {},
    variant: 'tall',
    className: 'className',
    ariaLabel: 'ariaLabel',
  },
};

export const Tall: Story = { args: { ...Default.args, variant: 'tall' } };

export const Link: Story = { args: { ...Default.args, variant: 'link' } };

export const LinkBlue: Story = { args: { ...Default.args, variant: 'linkBlue' } };

export const Directory: Story = { args: { ...Default.args, variant: 'directory' } };

export const IconButton: Story = { args: { ...Default.args, variant: 'iconButton' } };
