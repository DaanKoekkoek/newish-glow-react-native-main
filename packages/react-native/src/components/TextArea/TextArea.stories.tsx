import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { TextArea } from "./TextArea";
import type { TextAreaProps } from "./TextArea.types";

const meta: Meta<typeof TextArea> = {
  title: "DesignSystem/Components/Input/TextArea",
  component: TextArea,
  args: {
    label: { text: "Label", optional: false },
    placeholder: "Placeholder text",
    helperText: "Helper text",
    id: "id-of-input",
    numberOfLines: 10,
    disabled: false,
  },
  argTypes: {
    label: {
      description:
        "Renders a label that provide the input with additional context. You also have the option to set the input field as an optional field.",
    },
    id: {
      description:
        "Includes an id attribute to the label, along with an aria-labelledby attribute to the input field.",
    },
    value: {
      description: "The value to show for the text input.",
    },
    validated: {
      description: "Changes the state of the component based on validation.",
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    helperText: {
      description:
        "Helper text that is shown underneath the InputField. Is hidden when `state` is set to `error`.",
    },
    onChangeText: {
      type: "function",
    },
    onChange: {
      type: "function",
    },
    onFocus: {
      type: "function",
    },
    onBlur: {
      type: "function",
    },
  },
  render: function Render({ ...args }) {
    const [v, setValue] = useState(args.value);

    return (
      <TextArea {...args} value={v} onChangeText={(value) => setValue(value)} />
    );
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<TextAreaProps>;

export const Basic: Story = {};

export const Success: Story = {
  args: {
    validated: {
      success: true,
    },
  },
};

export const Error: Story = {
  args: {
    validated: {
      success: false,
      message: "Something went wrong!",
    },
  },
};
