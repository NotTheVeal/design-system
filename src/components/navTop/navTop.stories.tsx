import type { Meta, StoryObj } from '@storybook/react';
import NavTop from './navTop';

const meta: Meta<typeof NavTop> = {
  title: 'Components/NavTop',
  component: NavTop,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavTop>;

const Logo = () => (
  <div style={{ fontWeight: 700, fontSize: 18, color: '#005BA6', fontFamily: "'Source Sans Pro', sans-serif", letterSpacing: '-0.02em' }}>
    PartsSource
  </div>
);

const navItems = [
  { label: 'Dashboard', href: '#', active: true },
  { label: 'Orders', href: '#' },
  { label: 'Catalog', href: '#' },
  { label: 'Service', href: '#' },
  { label: 'Reports', href: '#' },
];

export const Default: Story = {
  render: () => (
    <NavTop logo={<Logo />} items={navItems} />
  ),
};

export const WithActions: Story = {
  render: () => (
    <NavTop
      logo={<Logo />}
      items={navItems}
      actions={
        <button style={{ padding: '6px 20px', background: '#005BA6', color: '#fff', border: '2px solid #005BA6', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: "'Source Sans Pro', sans-serif" }}>
          New Order
        </button>
      }
    />
  ),
};

export const SingleItem: Story = {
  render: () => (
    <NavTop
      logo={<Logo />}
      items={[{ label: 'Dashboard', href: '#', active: true }]}
    />
  ),
};
