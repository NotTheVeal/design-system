import type { Meta, StoryObj } from '@storybook/react';
import CtaBar from './ctaBar';

const meta: Meta<typeof CtaBar> = {
  title: 'Components/CtaBar',
  component: CtaBar,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    primaryButtonLabel: { control: 'text' },
    secondaryButtonLabel: { control: 'text' },
    onPrimaryButtonClick: { action: 'called' },
    onSecondaryButtonClick: { action: 'called' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CtaBar>;

export const Default: Story = {
  args: {
    title: 'Sample Title',
    description: 'A brief description.',
    primaryButtonLabel: 'primaryButtonLabel',
    secondaryButtonLabel: 'secondaryButtonLabel',
    onPrimaryButtonClick: () => {},
    onSecondaryButtonClick: () => {},
    className: 'className',
  },
};

