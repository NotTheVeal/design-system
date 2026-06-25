import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './radio';
import type { RadioColorScheme } from './radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '**PS Design System 2.0 - Radio**',
          '',
          'colorScheme="current" = Orange #FF9505 (legacy, ADA non-compliant)',
          'colorScheme="future" = Blue #005BA6 (new default, ADA compliant)',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    colorScheme: { control: 'select', options: ['current', 'future'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default (future / blue)',
  args: { label: 'Option A', value: 'a', checked: true, colorScheme: 'future' },
};

export const Unchecked: Story = {
  args: { label: 'Option B', value: 'b', checked: false, colorScheme: 'future' },
};

export const LegacyOrange: Story = {
  name: 'Legacy (current / orange)',
  args: { label: 'Option C', value: 'c', checked: true, colorScheme: 'current' },
  parameters: {
    docs: {
      description: {
        story: 'colorScheme="current" — orange #FF9505, ADA non-compliant (2.9:1). Use future for new work.',
      },
    },
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled option', value: 'd', checked: false, disabled: true, colorScheme: 'future' },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontFamily: "'Source Sans 3', sans-serif" }}>
      <Radio label="Future unchecked" value="f1" checked={false} colorScheme="future" onChange={() => {}} />
      <Radio label="Future checked" value="f2" checked={true} colorScheme="future" onChange={() => {}} />
      <Radio label="Current unchecked (orange)" value="c1" checked={false} colorScheme="current" onChange={() => {}} />
      <Radio label="Current checked (orange)" value="c2" checked={true} colorScheme="current" onChange={() => {}} />
      <Radio label="Disabled" value="d1" checked={false} disabled={true} colorScheme="future" onChange={() => {}} />
    </div>
  ),
};
