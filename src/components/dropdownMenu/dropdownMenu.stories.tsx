import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DropdownMenu from './dropdownMenu';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**PS Design System — DropdownMenu**

Action and navigation dropdown menus. **Distinct from Select** — use \`Select\` for form data
collection; use \`DropdownMenu\` for action menus, navigation, and context menus.

### Visual Spec
| Token | Value |
|-------|-------|
| Menu bg | #FFFFFF |
| Menu border | 1px solid #DCDCDC |
| Menu radius | 4px |
| Menu shadow | 0 4px 12px rgba(0,47,72,0.12) |
| Item height | 36px |
| Item padding | 0 16px |
| Item font | Source Sans 3, 14px, weight 400 |
| Item text (default) | #4A4A4A |
| Item hover bg | #EBF3FA |
| Item hover text | #005BA6 |
| Danger text | #E00000 |
| Divider | 1px solid #F1F1F1 |
| Disabled opacity | 0.4 |

### Keyboard Navigation
- \`Enter\` / \`Space\` / \`ArrowDown\` — opens menu and focuses first item
- \`ArrowDown\` / \`ArrowUp\` — navigate items
- \`Enter\` — select focused item
- \`Escape\` — close menu
- \`Tab\` — close menu and move focus

### Select vs DropdownMenu
- **Select**: Form field, returns a value for form submission, shows current selection
- **DropdownMenu**: Action trigger, fires callbacks, no persistent selection display
        `.trim(),
      },
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default — 3-dot overflow menu',
  args: {
    trigger: (
      <button
        style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #DCDCDC', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#4A4A4A', fontFamily: "'Source Sans 3', sans-serif" }}
        aria-label="More options"
      >
        ⋯
      </button>
    ),
    items: [
      { label: 'View details', value: 'view' },
      { label: 'Edit', value: 'edit' },
      { label: 'Duplicate', value: 'duplicate' },
      { label: 'Export PDF', value: 'export' },
      { label: 'Delete', value: 'delete', danger: true, divider: true },
    ],
    placement: 'bottom-left',
    onSelect: (value) => console.log('Selected:', value),
  },
};

export const WithIcons: Story = {
  name: 'With Icons',
  args: {
    trigger: (
      <button style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', height: 36, border: '1px solid #DCDCDC', borderRadius: 4, background: '#FFFFFF', cursor: 'pointer', fontSize: 14, color: '#4A4A4A', fontFamily: "'Source Sans 3', sans-serif" }}>
        Actions ▾
      </button>
    ),
    items: [
      { label: 'View', value: 'view', icon: '👁' },
      { label: 'Edit', value: 'edit', icon: '�️' },
      { label: 'Download', value: 'download', icon: '⬇️' },
      { label: 'Share', value: 'share', icon: '↗️' },
      { label: 'Delete', value: 'delete', icon: '🗑', danger: true, divider: true },
    ],
    placement: 'bottom-left',
  },
};

export const WithDangerItem: Story = {
  name: 'With Danger Item',
  args: {
    trigger: (
      <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px', height: 36, border: '1px solid #DCDCDC', borderRadius: 4, background: '#FFFFFF', cursor: 'pointer', fontSize: 14, color: '#4A4A4A', fontFamily: "'Source Sans 3', sans-serif" }}>
        More actions ▾
      </button>
    ),
    items: [
      { label: 'Approve requisition', value: 'approve' },
      { label: 'Reject requisition', value: 'reject' },
      { label: 'Cancel requisition', value: 'cancel', danger: true, divider: true },
    ],
    placement: 'bottom-left',
  },
};

export const WithDisabledItems: Story = {
  name: 'With Disabled Items',
  args: {
    trigger: (
      <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px', height: 36, border: '1px solid #DCDCDC', borderRadius: 4, background: '#FFFFFF', cursor: 'pointer', fontSize: 14, color: '#4A4A4A', fontFamily: "'Source Sans 3', sans-serif" }}>
        Actions ▾
      </button>
    ),
    items: [
      { label: 'Approve', value: 'approve' },
      { label: 'Reject', value: 'reject', disabled: true },
      { label: 'Request info', value: 'request' },
      { label: 'Escalate', value: 'escalate', disabled: true },
    ],
    placement: 'bottom-left',
  },
};
