import type { Meta, StoryObj } from '@storybook/react';
import { IconPictogram } from './iconPictogram';

const meta: Meta<typeof IconPictogram> = {
  title: 'Components/IconPictogram',
  component: IconPictogram,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['equipment', 'medical', 'wrench', 'hospital', 'order', 'shield', 'analytics', 'delivery'],
    },
    background: {
      control: 'select',
      options: ['light', 'subtle', 'dark'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconPictogram>;

export const LightBackground: Story = {
  args: {
    name: 'equipment',
    background: 'light',
    size: 'lg',
  },
};

export const SubtleBackground: Story = {
  args: {
    name: 'equipment',
    background: 'subtle',
    size: 'lg',
  },
};

export const DarkBackground: Story = {
  args: {
    name: 'equipment',
    background: 'dark',
    size: 'lg',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconPictogram name="shield" background="light" size="sm" />
      <IconPictogram name="shield" background="light" size="md" />
      <IconPictogram name="shield" background="light" size="lg" />
      <IconPictogram name="shield" background="light" size="xl" />
    </div>
  ),
};

export const AllBackgrounds: Story = {
  name: 'All Backgrounds',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16, background: '#E5E7EB', borderRadius: 8 }}>
      <IconPictogram name="analytics" background="light" size="lg" />
      <IconPictogram name="analytics" background="subtle" size="lg" />
      <IconPictogram name="analytics" background="dark" size="lg" />
    </div>
  ),
};

export const AllPictograms: Story = {
  name: 'All Pictograms',
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, maxWidth: 480 }}>
      {(['equipment', 'medical', 'wrench', 'hospital', 'order', 'shield', 'analytics', 'delivery'] as const).map(
        (name) => (
          <div key={name} style={{ textAlign: 'center' }}>
            <IconPictogram name={name} background="light" size="md" />
            <div style={{ fontSize: 10, marginTop: 4, color: '#6B7280' }}>{name}</div>
          </div>
        )
      )}
    </div>
  ),
};

export const AllPictogramsDark: Story = {
  name: 'All Pictograms — Dark',
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        maxWidth: 480,
        padding: 16,
        background: '#001F31',
        borderRadius: 8,
      }}
    >
      {(['equipment', 'medical', 'wrench', 'hospital', 'order', 'shield', 'analytics', 'delivery'] as const).map(
        (name) => (
          <div key={name} style={{ textAlign: 'center' }}>
            <IconPictogram name={name} background="dark" size="md" />
            <div style={{ fontSize: 10, marginTop: 4, color: '#9CA3AF' }}>{name}</div>
          </div>
        )
      )}
    </div>
  ),
};
