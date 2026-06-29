import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmptyState } from './emptyState';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = { args: { type: 'no-results' } };
export const NoResults: Story = { args: { type: 'no-results', action: { label: 'CLEAR FILTERS', onClick: () => {} } } };
export const NoData: Story = { args: { type: 'no-data' } };
export const FirstUse: Story = { args: { type: 'first-use', action: { label: 'GET STARTED', onClick: () => {} } } };
export const Error: Story = { args: { type: 'error', action: { label: 'TRY AGAIN', onClick: () => {} } } };
export const CustomTitle: Story = { args: { type: 'no-results', title: 'No Parts Found', description: 'Try adjusting your search or filter criteria.' } };
export const Inline: Story = { args: { type: 'no-results', size: 'inline' } };
