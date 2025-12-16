import type { Meta, StoryObj } from "@storybook/react";

import { RadioButton } from "./RadioButton";

const meta: Meta<typeof RadioButton> = {
  title: "DesignSystem/Components/Input/RadioButton",
  component: RadioButton,
  argTypes: {
    label: {
      description: "Adds a label text to the left of the radio button",
    },
  },
  args: {
    label: "Label text",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "default",
    id: "default-radio",
  },
};

export const Error: Story = {
  args: {
    name: "error",
    id: "error-radio",
    validated: {
      valid: false,
    },
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled",
    id: "disabled-radio",
    disabled: true,
  },
  render: (args) => {
    return (
      <>
        <RadioButton {...args} />
        <RadioButton {...args} checked />
      </>
    );
  },
};
