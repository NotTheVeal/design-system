import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

// ─── Simple inline SVG icons for stories (no import dependency) ───────────────

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="8" rx="7" ry="4.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="2" fill="currentColor" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="3,8 6,12 13,4" stroke="#0E7C55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="6.5" stroke="#DC2626" strokeWidth="1.5" />
    <line x1="8" y1="5" x2="8" y2="9" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.75" fill="#DC2626" />
  </svg>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'disabled'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    size: 'medium',
    state: 'default',
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    label: 'Search',
    placeholder: 'Search parts…',
    size: 'small',
  },
};

export const MediumSize: Story = {
  name: 'Medium Size',
  args: {
    label: 'Part number',
    placeholder: 'Enter part number',
    size: 'medium',
  },
};

export const LargeSize: Story = {
  name: 'Large Size',
  args: {
    label: 'Description',
    placeholder: 'Enter a description',
    size: 'large',
    helperText: 'Large inputs are 80px tall for prominent form fields.',
  },
};

export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    label: 'Username',
    placeholder: 'john.doe',
    helperText: 'Letters and numbers only, 3–20 characters.',
    size: 'medium',
  },
};

export const ErrorState: Story = {
  name: 'Error State',
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    value: 'invalid-email',
    state: 'error',
    helperText: 'Please enter a valid email address.',
    trailingIcon: <AlertIcon />,
    size: 'medium',
    onChange: () => {},
  },
};

export const SuccessState: Story = {
  name: 'Success State',
  args: {
    label: 'Username',
    placeholder: 'john.doe',
    value: 'johndoe',
    state: 'success',
    helperText: 'Username is available.',
    trailingIcon: <CheckIcon />,
    size: 'medium',
    onChange: () => {},
  },
};

export const DisabledState: Story = {
  name: 'Disabled State',
  args: {
    label: 'Account ID',
    value: 'ACC-000123',
    state: 'disabled',
    helperText: 'This field is read-only.',
    size: 'medium',
  },
};

export const WithLeadingIcon: Story = {
  name: 'With Leading Icon',
  args: {
    label: 'Search',
    placeholder: 'Search parts catalog…',
    leadingIcon: <SearchIcon />,
    size: 'medium',
  },
};

export const WithTrailingIcon: Story = {
  name: 'With Trailing Icon',
  args: {
    label: 'Password',
    placeholder: '••••••••',
    type: 'password',
    trailingIcon: <EyeIcon />,
    size: 'medium',
  },
};

export const FullWidth: Story = {
  name: 'Full Width',
  args: {
    label: 'Full-width input',
    placeholder: 'Stretches to fill container width',
    fullWidth: true,
    size: 'medium',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Input label="Small (32px)" placeholder="Small input" size="small" />
      <Input label="Medium (40px)" placeholder="Medium input" size="medium" />
      <Input label="Large (80px)" placeholder="Large input" size="large" />
    </div>
  ),
};

export const AllStates: Story = {
  name: 'All States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Input label="Default" placeholder="Default state" state="default" />
      <Input
        label="Error"
        placeholder="Error state"
        state="error"
        helperText="Something went wrong."
        trailingIcon={<AlertIcon />}
      />
      <Input
        label="Success"
        placeholder="Success state"
        state="success"
        helperText="Looks good!"
        trailingIcon={<CheckIcon />}
      />
      <Input label="Disabled" value="Disabled input" state="disabled" />
    </div>
  ),
};
