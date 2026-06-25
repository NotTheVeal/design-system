import type { Meta, StoryObj } from '@storybook/react';
import { IconCustom } from './iconCustom';

const meta: Meta<typeof IconCustom> = {
  title: 'Components/IconCustom',
  component: IconCustom,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['squareFilled', 'squareOutline', 'circFilled', 'circOutline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    icon: {
      control: 'select',
      options: ['check', 'tag', 'wrench', 'heart', 'star', 'alert', 'info', 'cart'],
    },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof IconCustom>;

export const SquareFilled: Story = {
  args: {
    variant: 'squareFilled',
    size: 'md',
    icon: 'check',
    color: '#005BA6',
  },
};

export const SquareOutline: Story = {
  args: {
    variant: 'squareOutline',
    size: 'md',
    icon: 'check',
    color: '#005BA6',
  },
};

export const CircleFilled: Story = {
  args: {
    variant: 'circFilled',
    size: 'md',
    icon: 'check',
    color: '#005BA6',
  },
};

export const CircleOutline: Story = {
  args: {
    variant: 'circOutline',
    size: 'md',
    icon: 'check',
    color: '#005BA6',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <IconCustom variant="squareFilled" size="lg" icon="check" color="#005BA6" />
      <IconCustom variant="squareOutline" size="lg" icon="tag" color="#005BA6" />
      <IconCustom variant="circFilled" size="lg" icon="star" color="#005BA6" />
      <IconCustom variant="circOutline" size="lg" icon="heart" color="#005BA6" />
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconCustom variant="squareFilled" size="sm" icon="check" color="#005BA6" />
      <IconCustom variant="squareFilled" size="md" icon="check" color="#005BA6" />
      <IconCustom variant="squareFilled" size="lg" icon="check" color="#005BA6" />
      <IconCustom variant="squareFilled" size="xl" icon="check" color="#005BA6" />
    </div>
  ),
};

export const AllIcons: Story = {
  name: 'All Icons',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      {(['check', 'tag', 'wrench', 'heart', 'star', 'alert', 'info', 'cart'] as const).map(
        (icon) => (
          <div key={icon} style={{ textAlign: 'center' }}>
            <IconCustom variant="circFilled" size="lg" icon={icon} color="#005BA6" />
            <div style={{ fontSize: 10, marginTop: 4, color: '#6B7280' }}>{icon}</div>
          </div>
        )
      )}
    </div>
  ),
};

export const PSColors: Story = {
  name: 'PS Brand Colors',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconCustom variant="circFilled" size="lg" icon="check" color="#005BA6" aria-label="PS Blue" />
      <IconCustom variant="circFilled" size="lg" icon="star" color="#009CF4" aria-label="Azure" />
      <IconCustom variant="circFilled" size="lg" icon="heart" color="#002F48" aria-label="Midnight" />
      <IconCustom variant="circFilled" size="lg" icon="check" color="#0E7C55" aria-label="Success" />
      <IconCustom variant="circFilled" size="lg" icon="alert" color="#B45309" aria-label="Warning" />
    </div>
  ),
};
