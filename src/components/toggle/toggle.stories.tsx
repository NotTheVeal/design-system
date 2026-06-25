import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toggle } from './toggle';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Toggle (Switch) — PS Design System 2.0. Track: 40x22px, grey OFF, PS Blue #005BA6 ON. Thumb: 18x18px white. Supports disabled and labelled states.',
      },
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  name: 'Default (ON — PS Blue #005BA6)',
  args: {
    checked: true,
    label: 'Notifications enabled',
  },
};

export const Off: Story = {
  name: 'Off',
  args: {
    checked: false,
    label: 'Notifications disabled',
  },
};

export const DisabledOn: Story = {
  name: 'Disabled ON',
  args: {
    checked: true,
    disabled: true,
    label: 'Enabled (disabled control)',
  },
};

export const DisabledOff: Story = {
  name: 'Disabled OFF',
  args: {
    checked: false,
    disabled: true,
    label: 'Disabled (disabled control)',
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 24, maxWidth: 480 } },
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: '#777', textTransform: 'uppercase', marginBottom: 8 } }, 'ON'),
        React.createElement(Toggle, { checked: true, label: 'Toggle ON' })
      ),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: '#777', textTransform: 'uppercase', marginBottom: 8 } }, 'OFF'),
        React.createElement(Toggle, { checked: false, label: 'Toggle OFF' })
      ),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: '#777', textTransform: 'uppercase', marginBottom: 8 } }, 'Disabled ON'),
        React.createElement(Toggle, { checked: true, disabled: true, label: 'Disabled ON' })
      ),
      React.createElement('div', null,
        React.createElement('div', { style: { fontSize: 11, fontWeight: 700, color: '#777', textTransform: 'uppercase', marginBottom: 8 } }, 'Disabled OFF'),
        React.createElement(Toggle, { checked: false, disabled: true, label: 'Disabled OFF' })
      )
    )
  ),
};
