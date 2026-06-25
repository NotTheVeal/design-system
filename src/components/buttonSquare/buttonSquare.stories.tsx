import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Search, Settings, Trash2, Edit2 } from 'lucide-react';
import { ButtonSquare } from './buttonSquare';

const meta: Meta<typeof ButtonSquare> = {
  title: 'Components/ButtonSquare',
  component: ButtonSquare,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'lg'] },
    variant: { control: 'select', options: ['default', 'filled', 'ghost', 'danger'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonSquare>;

const ICON_SIZE = { width: 16, height: 16, strokeWidth: 1.75 };

export const Default: Story = {
  args: {
    icon: <Search {...ICON_SIZE} />,
    ariaLabel: 'Search',
    variant: 'default',
    size: 'lg',
  },
};

export const Filled: Story = {
  args: {
    icon: <Settings {...ICON_SIZE} />,
    ariaLabel: 'Settings',
    variant: 'filled',
    size: 'lg',
  },
};

export const Ghost: Story = {
  args: {
    icon: <Edit2 {...ICON_SIZE} />,
    ariaLabel: 'Edit',
    variant: 'ghost',
    size: 'lg',
  },
};

export const Danger: Story = {
  args: {
    icon: <Trash2 {...ICON_SIZE} />,
    ariaLabel: 'Delete',
    variant: 'danger',
    size: 'lg',
  },
};

export const SmallSize: Story = {
  args: {
    icon: <Search width={14} height={14} strokeWidth={1.75} />,
    ariaLabel: 'Search',
    variant: 'default',
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    icon: <Trash2 {...ICON_SIZE} />,
    ariaLabel: 'Delete',
    variant: 'danger',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: '#777777', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '1px' }}>Large (40px)</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <ButtonSquare icon={<Search width={16} height={16} strokeWidth={1.75} />} ariaLabel="Search" variant="default" size="lg" />
          <ButtonSquare icon={<Settings width={16} height={16} strokeWidth={1.75} />} ariaLabel="Settings" variant="filled" size="lg" />
          <ButtonSquare icon={<Edit2 width={16} height={16} strokeWidth={1.75} />} ariaLabel="Edit" variant="ghost" size="lg" />
          <ButtonSquare icon={<Trash2 width={16} height={16} strokeWidth={1.75} />} ariaLabel="Delete" variant="danger" size="lg" />
        </div>
      </div>
      <div>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: '#777777', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '1px' }}>Small (32px)</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <ButtonSquare icon={<Search width={14} height={14} strokeWidth={1.75} />} ariaLabel="Search" variant="default" size="sm" />
          <ButtonSquare icon={<Settings width={14} height={14} strokeWidth={1.75} />} ariaLabel="Settings" variant="filled" size="sm" />
          <ButtonSquare icon={<Edit2 width={14} height={14} strokeWidth={1.75} />} ariaLabel="Edit" variant="ghost" size="sm" />
          <ButtonSquare icon={<Trash2 width={14} height={14} strokeWidth={1.75} />} ariaLabel="Delete" variant="danger" size="sm" />
        </div>
      </div>
      <div>
        <p style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: '#777777', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '1px' }}>Disabled</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <ButtonSquare icon={<Search width={16} height={16} strokeWidth={1.75} />} ariaLabel="Search" variant="default" disabled />
          <ButtonSquare icon={<Settings width={16} height={16} strokeWidth={1.75} />} ariaLabel="Settings" variant="filled" disabled />
          <ButtonSquare icon={<Edit2 width={16} height={16} strokeWidth={1.75} />} ariaLabel="Edit" variant="ghost" disabled />
          <ButtonSquare icon={<Trash2 width={16} height={16} strokeWidth={1.75} />} ariaLabel="Delete" variant="danger" disabled />
        </div>
      </div>
    </div>
  ),
};
