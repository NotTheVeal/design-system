import type { Meta, StoryObj } from '@storybook/react';
import FileUpload from './fileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    label: { control: 'text' },
    onFileChange: { action: 'called' },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    className: 'className',
    label: 'Label',
    onFileChange: () => {},
  },
};

