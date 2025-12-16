import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { NumberInput } from "./NumberInput";

const meta = {
  title: "DesignSystem/Components/Input/NumberInput",
  component: NumberInput,
  argTypes: {
    value: {
      type: "number",
    },
    size: {
      control: "select",
      options: ["default", "sm"],
    },
    state: {
      control: "select",
      options: ["default", "error", "success", "disabled"],
    },
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Uncontrolled = {};

export const Controlled: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = React.useState(5);
    const handleChange = (_, newValue: number) => setValue(newValue);
    return <NumberInput {...args} value={value} onChange={handleChange} />;
  },
};

export const Small = {
  args: {
    size: "sm",
    showControls: true,
  },
};

export const Disabled = {
  args: {
    state: "disabled",
  },
};

export const Error = {
  args: {
    state: "error",
  },
};

export const Success = {
  args: {
    state: "success",
  },
};
