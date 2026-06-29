import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DropdownMenu from './dropdownMenu';

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**PS Design System ÃÂ¢Ã¢ÂÂ¬Ã¢ÂÂ DropdownMenu**

Action and navigation dropdown menus. **Distinct from Select** ÃÂ¢Ã¢ÂÂ¬Ã¢ÂÂ use \`Select\` for form data
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
- \`Enter\` / \`Space\` / \`ArrowDown\` ÃÂ¢Ã¢ÂÂ¬Ã¢ÂÂ opens menu and focuses first item
- \`ArrowDown\` / \`ArrowUp\` ÃÂ¢Ã¢ÂÂ¬Ã¢ÂÂ navigate items
- \`Enter\` ÃÂ¢Ã¢ÂÂ¬Ã¢ÂÂ select focused item
- \`Escape\` ÃÂ¢Ã¢ÂÂ¬Ã¢ÂÂ close menu
- \`Tab\` ÃÂ¢Ã¢ÂÂ¬Ã¢ÂÂ close menu and move focus

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
  name: 'Default ÃÂ¢Ã¢ÂÂ¬Ã¢ÂÂ 3-dot overflow menu',
  args: {
    trigger: (
      <button
        style={{ width: 32, height: 32, borderRadius: '50%', border: '1px solid #DCDCDC', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#4A4A4A', fontFamily: "'Source Sans 3', sans-serif" }}
        aria-label="More options"
      >
        ÃÂ¢Ã¢ÂÂ¹ÃÂ¯
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
  args: {
    trigger: 'Options',
    items: [
      { label: 'Download', icon: (React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }), React.createElement('polyline', { points: '7 10 12 15 17 10' }), React.createElement('line', { x1: '12', y1: '15', x2: '12', y2: '3' }))), value: 'download' },
      { label: 'Share', icon: (React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('circle', { cx: '18', cy: '5', r: '3' }), React.createElement('circle', { cx: '6', cy: '12', r: '3' }), React.createElement('circle', { cx: '18', cy: '19', r: '3' }), React.createElement('line', { x1: '8.59', y1: '13.51', x2: '15.42', y2: '17.49' }), React.createElement('line', { x1: '15.41', y1: '6.51', x2: '8.59', y2: '10.49' }))), value: 'share' },
      { label: 'Delete', icon: (React.createElement('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: '#E00000', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }, React.createElement('polyline', { points: '3 6 5 6 21 6' }), React.createElement('path', { d: 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' }), React.createElement('line', { x1: '10', y1: '11', x2: '10', y2: '17' }), React.createElement('line', { x1: '14', y1: '11', x2: '14', y2: '17' }))), value: 'delete', danger: true },
    ],
  },
};
export const WithDangerItem: Story = {
  name: 'With Danger Item',
  args: {
    trigger: (
      <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px', height: 36, border: '1px solid #DCDCDC', borderRadius: 4, background: '#FFFFFF', cursor: 'pointer', fontSize: 14, color: '#4A4A4A', fontFamily: "'Source Sans 3', sans-serif" }}>
        More actions ÃÂ¢Ã¢ÂÂÃÂ¾
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
        Actions ÃÂ¢Ã¢ÂÂÃÂ¾
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
