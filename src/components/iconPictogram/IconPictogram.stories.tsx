import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import IconPictogram from './iconPictogram';

const meta: Meta<typeof IconPictogram> = {
  title: 'Components/IconPictogram',
  component: IconPictogram,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    background: { control: 'select', options: ['light', 'subtle', 'dark'] },
  },
};

export default meta;
type Story = StoryObj<typeof IconPictogram>;

export const Default: Story = {
  args: {
    size: 'md',
    background: 'light',
    ariaLabel: 'Equipment pictogram',
  },
};

export const SubtleBackground: Story = {
  args: {
    size: 'md',
    background: 'subtle',
    ariaLabel: 'Equipment pictogram on subtle background',
  },
};

export const DarkBackground: Story = {
  args: {
    size: 'md',
    background: 'dark',
    ariaLabel: 'Equipment pictogram on dark background',
  },
  decorators: [(Story) => (
    <div style={{ background: '#002F48', padding: 32, display: 'inline-block', borderRadius: 8 }}>
      <Story />
    </div>
  )],
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map(size => (
        <div key={size} style={{ textAlign: 'center' }}>
          <IconPictogram size={size} background="light" ariaLabel={`${size} pictogram`} />
          <div style={{ marginTop: 8, fontSize: 12, color: '#777', fontFamily: "'Source Sans Pro', sans-serif" }}>{size}</div>
        </div>
      ))}
    </div>
  ),
};

export const AllBackgrounds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {(['light', 'subtle', 'dark'] as const).map(bg => (
        <div key={bg} style={{ textAlign: 'center', background: bg === 'dark' ? '#002F48' : '#F1F1F1', padding: 24, borderRadius: 8 }}>
          <IconPictogram size="md" background={bg} ariaLabel={`${bg} background pictogram`} />
          <div style={{ marginTop: 8, fontSize: 12, color: bg === 'dark' ? '#fff' : '#777', fontFamily: "'Source Sans Pro', sans-serif" }}>{bg}</div>
        </div>
      ))}
    </div>
  ),
};
