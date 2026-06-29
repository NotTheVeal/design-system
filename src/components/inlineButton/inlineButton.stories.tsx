import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InlineButton from './inlineButton';

const meta = {
  title: 'Components/InlineButton',
  component: InlineButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**PS Design System  -  InlineButton**

Text and icon actions for use *within* content flow (table cells, body copy, cards).

**NOT** for standalone page-level CTAs  -  use the \`Button\` component for those.

### Variants

| Variant | Description |
|---------|-------------|
| \`tall\` | 36px pill, white bg, #DCDCDC border. Hover: #EBF3FA bg, #005BA6 border/text |
| \`link\` | Underlined text, #4A4A4A. Hover: #005BA6 |
| \`linkBlue\` | Always #005BA6, underlined |
| \`iconButton\` | 32px circle, icon-only |

> **Removed:** The \`tertiary\` variant (pill, #F1F1F1 bg) has been moved to the main \`Button\` component as \`variant="tertiary"\`.

### Tokens
- Font: 'Source Sans 3', 14px, weight 400
- Transition: all 150ms ease
- Hover accent: #005BA6 (PS Blue)
- Hover bg tint: #EBF3FA
        `.trim(),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['tall', 'link', 'linkBlue', 'iconButton'],
      description: 'Visual variant. Note: tertiary has been removed  -  use Button variant="tertiary" instead.',
      table: { defaultValue: { summary: 'link' } },
    },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof InlineButton>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  name: 'Default (link variant)',
  args: {
    variant: 'link',
    children: 'View Details',
  },
};


// --- tall ---------------------------------------------------------------------
export const Tall: Story = {
  name: 'tall  -  Pill CTA (in-content)',
  args: {
    variant: 'tall',
    children: 'View Details',
  },
  parameters: {
    docs: {
      description: {
        story:
          '36px pill button. White bg (#FFFFFF), 1px #DCDCDC border, #4A4A4A text. ' +
          'Hover: #EBF3FA bg, #005BA6 border and text. Use for inline CTAs within cards or table rows.',
      },
    },
  },
};

// --- link ---------------------------------------------------------------------
export const Link: Story = {
  name: 'link  -  Underlined text (dark)',
  args: {
    variant: 'link',
    children: 'View order history',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Underlined text link. Default: #4A4A4A. Hover: #005BA6. ' +
          'Use within body copy or table cells for inline navigation.',
      },
    },
  },
};

// --- linkBlue -----------------------------------------------------------------
export const LinkBlue: Story = {
  name: 'linkBlue  -  Blue underlined',
  args: {
    variant: 'linkBlue',
    children: 'Download invoice PDF',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Blue (#005BA6) underlined link. Always blue  -  no hover color change (only opacity). ' +
          'Use when the action should draw more attention than a plain link.',
      },
    },
  },
};

// --- iconButton ---------------------------------------------------------------
export const IconButton: Story = {
  name: 'iconButton  -  32px icon circle',
  args: {
    variant: 'iconButton',
    'aria-label': 'More options',
    children: '...',
  },
  parameters: {
    docs: {
      description: {
        story:
          '32px circular icon-only button. Transparent bg, 1px #DCDCDC border. ' +
          'Hover: #EBF3FA bg, #005BA6 border and icon. Always provide aria-label.',
      },
    },
  },
};

// --- All variants -------------------------------------------------------------
export const AllVariants: Story = {
  name: 'All Variants (side by side)',
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 24,
        alignItems: 'center',
        flexWrap: 'wrap',
        fontFamily: "'Source Sans 3', sans-serif",
        padding: 16,
        background: '#FAFAFA',
        borderRadius: 8,
        border: '1px solid #DCDCDC',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <InlineButton variant="tall">View Details</InlineButton>
        <p style={{ fontSize: 11, color: '#777', marginTop: 8, marginBottom: 0 }}>tall</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <InlineButton variant="link">Order history</InlineButton>
        <p style={{ fontSize: 11, color: '#777', marginTop: 8, marginBottom: 0 }}>link</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <InlineButton variant="linkBlue">Download PDF</InlineButton>
        <p style={{ fontSize: 11, color: '#777', marginTop: 8, marginBottom: 0 }}>linkBlue</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <InlineButton variant="iconButton" aria-label="More options">...</InlineButton>
        <p style={{ fontSize: 11, color: '#777', marginTop: 8, marginBottom: 0 }}>iconButton</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All four InlineButton variants. Hover each to see interactive states.',
      },
    },
  },
};

// --- Disabled states ----------------------------------------------------------
export const DisabledStates: Story = {
  name: 'Disabled States',
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', fontFamily: "'Source Sans 3', sans-serif", padding: 16 }}>
      <InlineButton variant="tall" disabled>View Details</InlineButton>
      <InlineButton variant="link" disabled>Order history</InlineButton>
      <InlineButton variant="linkBlue" disabled>Download PDF</InlineButton>
      <InlineButton variant="iconButton" disabled aria-label="More options">...</InlineButton>
    </div>
  ),
  parameters: {
    docs: { description: { story: 'All variants at disabled state  -  opacity 0.4, cursor not-allowed.' } },
  },
};

// --- In table context ---------------------------------------------------------
export const InTableContext: Story = {
  name: 'In Table Cell Context',
  render: () => (
    <table
      style={{
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: 14,
        borderCollapse: 'collapse',
        width: '100%',
        maxWidth: 600,
      }}
    >
      <thead>
        <tr style={{ background: '#F8F8F8', borderBottom: '2px solid #DCDCDC' }}>
          <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#4A4A4A' }}>Order #</th>
          <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#4A4A4A' }}>Status</th>
          <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, color: '#4A4A4A' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {[
          { id: 'PO-2024-0891', status: 'Approved' },
          { id: 'PO-2024-0892', status: 'Pending' },
          { id: 'PO-2024-0893', status: 'Delivered' },
        ].map((row) => (
          <tr key={row.id} style={{ borderBottom: '1px solid #DCDCDC' }}>
            <td style={{ padding: '10px 12px', color: '#4A4A4A' }}>{row.id}</td>
            <td style={{ padding: '10px 12px', color: '#4A4A4A' }}>{row.status}</td>
            <td style={{ padding: '10px 12px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <InlineButton variant="linkBlue">View</InlineButton>
              <InlineButton variant="link">Download</InlineButton>
              <InlineButton variant="iconButton" aria-label="More options for this order">...</InlineButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Typical usage: linkBlue for primary action, link for secondary, iconButton for overflow menu. ' +
          'All sit comfortably inside 40px table rows.',
      },
    },
  },
};

// --- Removed: tertiary migration note ----------------------------------------
export const TertiaryMigrationNote: Story = {
  name: 'MIGRATION: tertiary moved to Button',
  render: () => (
    <div
      style={{
        fontFamily: "'Source Sans 3', sans-serif",
        padding: 20,
        background: '#FFF8F0',
        border: '2px solid #FF9505',
        borderRadius: 8,
        maxWidth: 500,
      }}
    >
      <p style={{ margin: '0 0 12px', fontWeight: 700, color: '#4A4A4A', fontSize: 15 }}>
        Tertiary variant has been removed from InlineButton
      </p>
      <p style={{ margin: '0 0 16px', color: '#4A4A4A', fontSize: 14, lineHeight: 1.5 }}>
        The pill-shaped tertiary button (light gray #F1F1F1 background) is a standalone button
        style and belongs in the main Button component, not InlineButton.
      </p>
      <p style={{ margin: '0 0 8px', color: '#4A4A4A', fontSize: 13, fontWeight: 600 }}>
        Before:
      </p>
      <code
        style={{
          display: 'block',
          background: '#F1F1F1',
          padding: '8px 12px',
          borderRadius: 4,
          fontSize: 13,
          color: '#4A4A4A',
          marginBottom: 12,
        }}
      >
        {'<InlineButton variant="tertiary">View Details</InlineButton>'}
      </code>
      <p style={{ margin: '0 0 8px', color: '#4A4A4A', fontSize: 13, fontWeight: 600 }}>
        After:
      </p>
      <code
        style={{
          display: 'block',
          background: '#EBF3FA',
          padding: '8px 12px',
          borderRadius: 4,
          fontSize: 13,
          color: '#005BA6',
        }}
      >
        {'<Button variant="tertiary">View Details</Button>'}
      </code>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Migration guide for teams using `InlineButton variant="tertiary"`. ' +
          'Replace with `Button variant="tertiary"` from the Button component.',
      },
    },
  },
};
