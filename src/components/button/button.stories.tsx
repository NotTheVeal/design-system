import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Button from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**PS Design System — Button**

Five variants, two sizes, two color schemes.

### colorScheme
| Value | Description |
|-------|-------------|
| \`future\` | **PS Blue (#005BA6)** — New standard. Use in all new work. ADA compliant. |
| \`current\` | **Orange (#FF9505)** — Legacy. **DO NOT USE IN PRODUCTION.** Migration required. |

### Variants
| Variant | Description |
|---------|-------------|
| \`primary\` | White bg + PS Blue border → fills blue on hover |
| \`secondary\` | White bg, gray border → fills PS Blue on hover |
| \`tertiary\` | Pill, light gray bg (#F1F1F1) → darker on hover. No border. |
| \`ghost\` | Transparent, PS Blue text → #EFF9FE tint on hover |
| \`danger\` | White bg, red (#E00000) border+text → fills red on hover |

### Sizes
| Size | Height | Notes |
|------|--------|-------|
| \`lg\` | 50px | Uppercase text, 0.08em letter-spacing |
| \`sm\` | 32px | Normal case |
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      description: 'Visual style of the button',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'radio',
      options: ['lg', 'sm'],
      description: 'lg = 50px height | sm = 32px height',
      table: { defaultValue: { summary: 'lg' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    children: {
      control: 'text',
      description: 'Button label text',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── ColorScheme Comparison (PRIMARY STORY) 
export const ColorSchemeComparison: Story = {
  name: 'colorScheme — current vs future',
  render: () => (
    <div style={{ display: 'flex', gap: 0, fontFamily: "'Source Sans 3', sans-serif", borderRadius: 8, overflow: 'hidden', border: '1px solid #DCDCDC', maxWidth: 720 }}>
      <div style={{ flex: 1, padding: 24, background: '#FFFFFF' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#777777', marginTop: 0, marginBottom: 16 }}>CURRENT — colorScheme="current" (Orange)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button variant="primary" size="lg" colorScheme="current">Primary (default)</Button>
          <Button variant="secondary" size="lg" colorScheme="current">Secondary</Button>
        </div>
      </div>
      <div style={{ width: 1, background: '#DCDCDC', flexShrink: 0 }} />
      <div style={{ flex: 1, padding: 24, background: '#FFFFFF' }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#005BA6', marginTop: 0, marginBottom: 16 }}>FUTURE — colorScheme="future" (PS Blue)</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Button variant="primary" size="lg" colorScheme="future">Primary (default)</Button>
          <Button variant="secondary" size="lg" colorScheme="future">Secondary</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of `colorScheme="current"` vs `colorScheme="future"`.',
      },
    },
  },
};

export const Default: Story = {
  name: 'Default (Primary Large)',
  args: {
    variant: 'primary',
    size: 'lg',
    colorScheme: 'future',
    children: 'Place Order',
  },
};

export const PrimaryFuture: Story = {
  name: 'Primary — future',
  args: {
    variant: 'primary',
    size: 'lg',
    colorScheme: 'future',
    children: 'Place Order',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Place Order' });
    await expect(button).not.toBeDisabled();
  },
};

export const LegacyCurrentPrimary: Story = {
  name: 'LEGACY — colorScheme="current" (DO NOT USE)',
  render: () => (
    <div style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Button variant="primary" size="lg" colorScheme="current">Primary</Button>
        <Button variant="secondary" size="lg" colorScheme="current">Secondary</Button>
      </div>
    </div>
  ),
};

export const SecondaryLg: Story = {
  name: 'Secondary — Large 50px',
  args: {
    variant: 'secondary',
    size: 'lg',
    colorScheme: 'future',
    children: 'Cancel Order',
  },
};

export const SecondarySm: Story = {
  name: 'Secondary — Small 32px',
  args: {
    variant: 'secondary',
    size: 'sm',
    colorScheme: 'future',
    children: 'Cancel',
  },
};

export const Tertiary: Story = {
  name: 'Tertiary — Pill (light gray`)',
  args: {
    variant: 'tertiary',
    colorScheme: 'future',
    children: 'View Details',
  },
};

export const Ghost: Story = {
  name: 'Ghost — Transparent',
  args: {
    variant: 'ghost',
    size: 'lg',
    colorScheme: 'future',
    children: 'Export to CSV',
  },
};

export const Danger: Story = {
  name: 'Danger — Destructive action',
  args: {
    variant: 'danger',
    size: 'lg',
    colorScheme: 'future',
    children: 'Delete Requisition',
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    variant: 'primary',
    size: 'lg',
    colorScheme: 'future',
    disabled: true,
    children: 'Submit (Unavailable)',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
  },
};

export const AllVariants: Story = {
  name: 'All 5 Variants (colorScheme="future")',
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', fontFamily: "'Source Sans 3', sans-serif", padding: 16 }}>
      <Button variant="primary" size="lg" colorScheme="future">Primary</Button>
      <Button variant="secondary" size="lg" colorScheme="future">Secondary</Button>
      <Button variant="tertiary" colorScheme="future">Tertiary</Button>
      <Button variant="ghost" size="lg" colorScheme="future">Ghost</Button>
      <Button variant="danger" size="lg" colorScheme="future">Danger</Button>
    </div>
  ),
};

export const SizeComparison: Story = {
  name: 'Size Comparison (lg vs sm)',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', fontFamily: "'Source Sans 3', sans-serif", padding: 16 }}>
      <Button variant="primary" size="lg" colorScheme="future">Large (50px)</Button>
      <Button variant="primary" size="sm" colorScheme="future">Small (32px)</Button>
    </div>
  ),
};
