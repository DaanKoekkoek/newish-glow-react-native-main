import type { Meta } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { action } from "@storybook/addon-actions";

import { ChangeEvent } from "react";
import { Toggle } from "./Toggle";

const meta: Meta = {
  title: "DesignSystem/Components/Input/Toggle",
  component: Toggle,
  argTypes: {
    onChange: { type: "function" },
    inactive: { control: { type: "boolean" } },
    size: {
      control: { type: "select" },
      description: "Specify the size of the Toggle.",
    },
    labelText: {
      control: {
        type: "select",
      },
      description: "Specify the label of the Toggle with a `size` of `xl`.",
    },
    testID: {
      description: "TestID applied on the input element.",
    },
  },
  args: {
    size: "xl",
    checked: false,
    inactive: false,
    labelText: "aanuit",
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    const onChangeHandler = (event: ChangeEvent) => {
      updateArgs({ checked: (event.target as HTMLInputElement).checked });
      action("onChange")(event);
    };

    return (
      <Toggle
        {...args}
        size={args.size}
        labelText={args.labelText}
        disabled={args.inactive}
        onChange={onChangeHandler}
        checked={args.checked}
        id="unique id"
      />
    );
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};
