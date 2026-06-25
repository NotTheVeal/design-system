import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './emptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
  argTypes: { variant: { control: 'select', options: ['default', 'search', 'error', 'no-data'] } },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: { title: 'No Parts Found', description: 'Try adjusting your search or filter criteria to find what you need.', ctaLabel: 'Clear Filters', variant: 'default' },
};
export const SearchEmpty: Story = {
  args: { title: 'No Results for "MRI Coil"', description: 'We could not find any parts matching your search. Try different keywords or browse by category.', ctaLabel: 'Browse Catalog', secondaryLabel: 'Contact Support', variant: 'search' },
};
export const ErrorState: Story = {
  args: { title: 'Something Went Wrong', description: 'We encountered an error loading your data. Please try again or contact support if the issue persists.', ctaLabel: 'Try Again', secondaryLabel: 'Contact Support', variant: 'error' },
};
export const NoData: Story = {
  args: { title: 'No Orders Yet', description: 'Once you place your first order, it will appear here.', ctaLabel: 'Start Shopping', variant: 'no-data' },
};
export const CtaOnly: Story = {
  args: { title: 'Your Cart is Empty', ctaLabel: 'Browse Parts', variant: 'default' },
};
