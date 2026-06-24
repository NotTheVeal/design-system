import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `**PS Design System 2.0 — Tooltip**

Midnight (#002F48) background, white text. Uses \`position: fixed\` so it renders correctly above all containers.

| Property | Value |
|---|---|
| bg | #002F48 (Midnight) |
| text | #FFFFFF, 13px, weight 400 |
| padding | 6px 10px |
| border-radius | 4px |
| max-width | 240px |
| placement | top / bottom / left / right |
| arrow | 6px triangle toward trigger |

**Hover** any button in the stories below to see the tooltip.`.trim(),
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 320, height: 160, border: '1px dashed #DCDCDC', borderRadius: 8,
    fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: '#AAAAAA',
    flexDirection: 'column', gap: 8, position: 'relative',
  }}>
    <p style={{ margin: 0, marginBottom: 12 }}>↑ hover the button</p>
    {children}
  </div>
);

export const Top: Story = {
  name: 'Placement — Top (default)',
  render: () => (
    <Wrapper>
      <Tooltip content="View order details" placement="top">
        <button style={{
          padding: '10px 20px', borderRadius: 4, border: '1px solid #DCDCDC',
          fontFamily: "'Source Sans 3', sans-serif", fontSize: 14,
          background: '#FFFFFF', cursor: 'pointer', color: '#4A4A4A',
        }}>
          View Details
        </button>
      </Tooltip>
    </Wrapper>
  ),
};

export const Bottom: Story = {
  name: 'Placement — Bottom',
  render: () => (
    <Wrapper>
      <Tooltip content="Opens below the trigger" placement="bottom">
        <button style={{ padding: '10px 20px', borderRadius: 4, border: '1px solid #DCDCDC', fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, background: '#FFFFFF', cursor: 'pointer', color: '#4A4A4A' }}>
          Hover Me
        </button>
      </Tooltip>
    </Wrapper>
  ),
};

export const Left: Story = {
  name: 'Placement — Left',
  render: () => (
    <Wrapper>
      <Tooltip content="Tooltip on left" placement="left">
        <button style={{ padding: '10px 20px', borderRadius: 4, border: '1px solid #DCDCDC', fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, background: '#FFFFFF', cursor: 'pointer', color: '#4A4A4A' }}>
          Hover Me
        </button>
      </Tooltip>
    </Wrapper>
  ),
};

export const Right: Story = {
  name: 'Placement — Right',
  render: () => (
    <Wrapper>
      <Tooltip content="Tooltip on right" placement="right">
        <button style={{ padding: '10px 20px', borderRadius: 4, border: '1px solid #DCDCDC', fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, background: '#FFFFFF', cursor: 'pointer', color: '#4A4A4A' }}>
          Hover Me
        </button>
      </Tooltip>
    </Wrapper>
  ),
};

export const LongContent: Story = {
  name: 'Long content (wraps at 240px)',
  render: () => (
    <Wrapper>
      <Tooltip content="This is a longer tooltip message that will wrap at 240px max-width per the PS Design System specification." placement="top">
        <button style={{ padding: '10px 20px', borderRadius: 4, border: '1px solid #DCDCDC', fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, background: '#FFFFFF', cursor: 'pointer', color: '#4A4A4A' }}>
          Long Tooltip
        </button>
      </Tooltip>
    </Wrapper>
  ),
};

export const AllPlacements: Story = {
  name: 'All 4 placements',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontFamily: "'Source Sans 3', sans-serif" }}>
      {(['top','bottom','left','right'] as const).map(p => (
        <div key={p} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 120, border: '1px dashed #DCDCDC', borderRadius: 6, flexDirection: 'column', gap: 4 }}>
          <p style={{ margin: 0, fontSize: 11, color: '#AAAAAA' }}>{p}</p>
          <Tooltip content={`${p} tooltip`} placement={p}>
            <button style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #DCDCDC', fontSize: 13, background: '#FFFFFF', cursor: 'pointer', color: '#4A4A4A' }}>
              Hover
            </button>
          </Tooltip>
        </div>
      ))}
    </div>
  ),
};
