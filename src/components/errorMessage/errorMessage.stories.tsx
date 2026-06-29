import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ErrorMessage } from './errorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = { args: { message: 'This field is required' } };
export const EmailError: Story = { args: { message: 'Please enter a valid email address' } };
export const PasswordError: Story = { args: { message: 'Password must be at least 8 characters' } };
export const ServerError: Story = { args: { message: 'Unable to connect. Please try again.' } };
export const AllExamples: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24, maxWidth: 400 }}>
      <ErrorMessage message="This field is required" />
      <ErrorMessage message="Please enter a valid email address" />
      <ErrorMessage message="Password must be at least 8 characters long" />
      <ErrorMessage message="Unable to process your request. Please try again." />
    </div>
  ),
};
