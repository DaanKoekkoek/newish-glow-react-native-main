import type { Meta, StoryObj } from "@storybook/react";
import { useId, useState } from "react";

import { useEffect } from "react";
import { NumberInput } from "./NumberInput";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";
import { NumberInputProps } from "./NumberInput.types";

const meta: Meta<typeof NumberInput> = {
  title: "DesignSystem/Components/Input/NumberInput",
  component: NumberInput,
  argTypes: {
    value: {
      control: { type: "number" },
      defaultValue: 1,
    },
    size: {
      control: "select",
      options: ["default", "sm"],
      defaultValue: "default",
    },
    state: {
      control: "select",
      options: ["default", "error", "valid", "inactive"],
      defaultValue: "default",
    },
    min: {
      control: { type: "number" },
      defaultValue: 1,
    },
    max: {
      control: { type: "number" },
      defaultValue: 999,
    },
    step: {
      control: { type: "number" },
      defaultValue: 1,
    },
  },
  args: {
    size: "default",
    state: "default",
    min: 1,
    max: 999,
    step: 1,
    value: 2,
  },
  parameters: {
    controls: {
      exclude: ["id", "testID", "defaultValue", "masked"],
    },
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    // Sync internal state with Storybook controls
    useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    return (
      <NumberInput {...args} value={value} id={useId()} onChange={setValue} />
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    value: 10,
  },
};

export const Inactive: Story = {
  args: {
    state: "inactive",
  },
};

export const Error: Story = {
  args: {
    state: "error",
  },
};

export const Valid: Story = {
  args: {
    state: "valid",
  },
};

export const _Variants: Story = {
  render: (props) =>
    renderCartesianVariants(
      (props: NumberInputProps) => {
        const [value, setValue] = useState(1);
        return (
          <NumberInput {...props} value={value} onChange={(v) => setValue(v)} />
        );
      },
      {
        ...props,
        state: ["default", "inactive", "error", "valid"],
        size: ["default", "sm"],
      },
      {
        groupBy: (props) => `State: ${props.state}`,
      },
    ),
  parameters: {
    controls: { disable: true },
  },
};
