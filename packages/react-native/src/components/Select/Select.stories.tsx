import type { ItemValue } from "@react-native-picker/picker/typings/Picker";
import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "DesignSystem/Components/Input/Select",
  component: Select,
  argTypes: {
    label: {
      type: "string",
      description:
        "Renders a label that provide the input with additional context. here we also ",
    },
    id: {
      type: "string",
      description:
        "Includes an id attribute to the label, along with an aria-labelledby attribute to the input field.",
    },
    value: {
      type: "string",
      description: "The value to show for the text input.",
    },
    validated: {
      description: "Changes the state of the component based on validation",
    },
    helperText: {
      type: "string",
      description:
        "Helper text that is shown underneath the InputField. Is hidden when `state` is set to `error`.",
    },
    placeholder: {
      type: "string",
      description:
        "The text that appears in the select when no option is selected.",
    },
    disabled: {
      type: "boolean",
      description: "Disables the input field.",
    },
    onFocus: {
      type: "function",
    },
    onBlur: {
      type: "function",
    },
    onValueChange: {
      type: "function",
    },
    showHint: { control: { type: "boolean" } },
  },
  args: {
    placeholder: "Maak je keuze",
    validated: undefined,
    id: "id-of-select",
    helperText: "Helper text",
    options: [
      {
        label: "Option 1",
        value: "option1",
      },
      {
        label: "Option 2",
        value: "option2",
      },
      {
        label: "Option 3",
        value: "option3",
      },
    ],
  },
  render: function WrappedSelect(args) {
    const [{ value }, updateArgs] = useArgs();

    return (
      <Select
        {...args}
        value={value}
        onValueChange={(value, _) => updateArgs({ value })}
      />
    );
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    onValueChange: (value: ItemValue, index: number) =>
      console.log(value, index),
  },
};

export const Disabled: Story = {
  args: {
    label: {
      text: "Label",
      optional: false,
    },
    disabled: true,
  },
};

export const Success: Story = {
  args: {
    label: {
      text: "Label",
      optional: false,
    },
    validated: {
      success: true,
    },
  },
};

export const Error: Story = {
  args: {
    label: {
      text: "Label",
      optional: false,
    },
    validated: {
      success: false,
      message: "This is an error message",
    },
  },
};

export const OptionalWithInfo: Story = {
  args: {
    label: {
      text: "Label",
      optional: true,
      info: "More Info",
    },
  },
};
