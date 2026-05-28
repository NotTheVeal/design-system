import type { Meta, StoryObj } from "@storybook/react";
import DatePicker from "./datePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "DatePicker component from the PartsSource design system.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    selectedDate: { control: "date" },
    onDateSelect: { action: "called" },
    className: { control: "text" },
    ariaLabel: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    selectedDate: new Date(2024, 0, 15),
    onDateSelect: () => {},
    ariaLabel: "Select date",
  },
};

export const WithSelectedDate: Story = {
  args: {
    selectedDate: new Date(2024, 5, 20),
    onDateSelect: () => {},
    ariaLabel: "Select date",
  },
};
