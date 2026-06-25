import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './skeleton';

const meta: Meta<typeof Skeleton> = {
title: 'Components/Skeleton',
component: Skeleton,
parameters: { layout: 'padded' },
tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const TextLine: Story = {
args: {
height: 16,
width: '60%',
},
};

export const Heading: Story = {
args: {
height: 28,
width: '40%',
},
};

export const Circle: Story = {
args: {
height: 48,
circle: true,
},
};

export const NoAnimation: Story = {
args: {
height: 16,
width: '50%',
animate: false,
},
};

export const ProductCardSkeleton: Story = {
render: () => (
<div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, border: '1px solid #DCDCDC', borderRadius: 4, width: 320 }}>
<Skeleton height={160} width="100%" borderRadius={4} />
<Skeleton height={20} width="70%" />
<Skeleton height={16} width="50%" />
<div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
<Skeleton height={16} width={80} />
<Skeleton height={16} width={60} />
</div>
<Skeleton height={40} width="100%" borderRadius={4} />
</div>
),
};

export const TableRowSkeleton: Story = {
render: () => (
<div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
{[1, 2, 3, 4].map((i) => (
<div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F1F1F1' }}>
<Skeleton height={36} width={36} circle />
<Skeleton height={16} width={180} />
<Skeleton height={16} width={100} />
<Skeleton height={16} width={80} />
<Skeleton height={24} width={64} borderRadius={12} />
</div>
))}
</div>
),
};

// ── NEW NAMED STORIES ─────────────────────────────────────────────────────────

/** DataTable — full table skeleton with header row and data rows */
export const DataTable: Story = {
render: () => (
<div style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '1px solid #DCDCDC', borderRadius: 4, overflow: 'hidden', fontFamily: "'Source Sans 3', sans-serif" }}>
{/* Table header */}
<div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', gap: 0, padding: '10px 16px', background: '#005BA6' }}>
{[140, 120, 60, 80, 70].map((w, i) => (
<Skeleton key={i} height={12} width={w} animate={false} style={{ background: 'rgba(255,255,255,0.25)' }} />
))}
</div>
{/* Data rows */}
{[1, 2, 3, 4, 5].map((row) => (
<div key={row} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr', gap: 0, padding: '12px 16px', borderBottom: '1px solid #F1F1F1', background: row % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
<Skeleton height={14} width={row % 2 === 0 ? 160 : 140} />
<Skeleton height={14} width={row % 2 === 0 ? 110 : 130} />
<Skeleton height={14} width={50} />
<Skeleton height={14} width={65} />
<Skeleton height={22} width={60} borderRadius={3} />
</div>
))}
</div>
),
};

/** ProductCard — product card skeleton */
export const ProductCard: Story = {
render: () => (
<div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, border: '1px solid #DCDCDC', borderRadius: 4, width: 280, background: '#FFFFFF' }}>
{/* Image */}
<Skeleton height={180} width="100%" borderRadius={4} />
{/* Part number */}
<Skeleton height={13} width={90} />
{/* Title */}
<Skeleton height={18} width="85%" />
<Skeleton height={18} width="60%" />
{/* Price row */}
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
<Skeleton height={22} width={80} />
<Skeleton height={14} width={50} />
</div>
{/* Availability */}
<Skeleton height={13} width={120} />
{/* CTA button */}
<Skeleton height={40} width="100%" borderRadius={4} />
</div>
),
};

/** ListCard — list card skeleton (horizontal layout) */
export const ListCard: Story = {
render: () => (
<div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
{[1, 2, 3].map((i) => (
<div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16, border: '1px solid #DCDCDC', borderRadius: 4, background: '#FFFFFF' }}>
{/* Thumbnail */}
<Skeleton height={72} width={72} borderRadius={4} />
{/* Content */}
<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
<Skeleton height={13} width={80} />
<Skeleton height={17} width="70%" />
<div style={{ display: 'flex', gap: 12 }}>
<Skeleton height={13} width={60} />
<Skeleton height={13} width={80} />
</div>
</div>
{/* Price + CTA */}
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
<Skeleton height={20} width={64} />
<Skeleton height={36} width={110} borderRadius={4} />
</div>
</div>
))}
</div>
),
};

/** SearchBar — search bar skeleton */
export const SearchBar: Story = {
render: () => (
<div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 640 }}>
{/* Search input */}
<div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
<Skeleton height={40} width="100%" borderRadius={4} />
<Skeleton height={40} width={100} borderRadius={4} />
</div>
{/* Filter chips row */}
<div style={{ display: 'flex', gap: 8 }}>
{[80, 110, 90, 100, 70].map((w, i) => (
<Skeleton key={i} height={28} width={w} borderRadius={14} />
))}
</div>
{/* Result count */}
<Skeleton height={13} width={160} />
{/* Results */}
{[1, 2, 3, 4].map((i) => (
<div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid #F1F1F1' }}>
<Skeleton height={48} width={48} borderRadius={4} />
<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
<Skeleton height={15} width={i % 2 === 0 ? '60%' : '45%'} />
<Skeleton height={13} width={i % 2 === 0 ? '40%' : '55%'} />
</div>
<Skeleton height={20} width={70} />
</div>
))}
</div>
),
};

/** PageLayout — full page layout skeleton */
export const PageLayout: Story = {
render: () => (
<div style={{ display: 'flex', gap: 24, width: '100%', fontFamily: "'Source Sans 3', sans-serif" }}>
{/* Left sidebar */}
<div style={{ width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
<Skeleton height={40} width="100%" borderRadius={4} />
<div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8 }}>
{[120, 90, 140, 80, 110, 95, 130].map((w, i) => (
<Skeleton key={i} height={14} width={w} />
))}
</div>
<div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
<Skeleton height={11} width={60} />
{[100, 85, 115, 90].map((w, i) => (
<Skeleton key={i} height={14} width={w} />
))}
</div>
</div>

{/* Main content */}
<div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
{/* Page header */}
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
<Skeleton height={28} width={220} />
<Skeleton height={14} width={160} />
</div>
<div style={{ display: 'flex', gap: 8 }}>
<Skeleton height={40} width={120} borderRadius={4} />
<Skeleton height={40} width={100} borderRadius={4} />
</div>
</div>

{/* KPI row */}
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
{[1, 2, 3, 4].map((i) => (
<div key={i} style={{ border: '1px solid #DCDCDC', borderRadius: 4, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
<Skeleton height={13} width={80} />
<Skeleton height={32} width={100} />
<Skeleton height={12} width={60} />
</div>
))}
</div>

{/* Table skeleton */}
<div style={{ border: '1px solid #DCDCDC', borderRadius: 4, overflow: 'hidden' }}>
<div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr', gap: 0, padding: '10px 16px', background: '#005BA6' }}>
{[120, 100, 70, 80].map((w, i) => (
<Skeleton key={i} height={12} width={w} animate={false} style={{ background: 'rgba(255,255,255,0.25)' }} />
))}
</div>
{[1, 2, 3, 4, 5, 6].map((row) => (
<div key={row} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr', gap: 0, padding: '12px 16px', borderBottom: '1px solid #F1F1F1', background: row % 2 === 0 ? '#FAFAFA' : '#FFFFFF' }}>
<Skeleton height={14} width={row % 3 === 0 ? 150 : 120} />
<Skeleton height={14} width={row % 2 === 0 ? 90 : 110} />
<Skeleton height={14} width={55} />
<Skeleton height={22} width={65} borderRadius={3} />
</div>
))}
</div>
</div>
</div>
),
};
