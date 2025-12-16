import { useState } from "react";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

import { RadioButtonGroup } from "./RadioButtonGroup";

const meta: Meta<typeof RadioButtonGroup> = {
  title: "DesignSystem/Components/input/RadioButtonGroup",
  component: RadioButtonGroup,
  argTypes: {
    onChange: {
      type: "function",
      description: "Fired when a radio button is checked.",
    },
    helperText: {
      description: "Generates a helper text underneath the radio buttons.",
    },
    legend: {
      description:
        "Generates a legend label, along with the option to pass in additional components",
    },
    name: {
      description: "Generates a name for each of the radio buttons",
    },
    options: {
      description: "Accepts properties from the `<RadioButton />` component",
    },
    testID: {
      description: "Generates a testID at the container of the component",
    },
    direction: {
      options: ["row", "column"],
      control: { type: "select" },
      description: "Set the flex direction of the radio buttons",
    },
    validated: {
      description:
        "Applies a state to each of the `<RadioButton />` component within `<RadioButtonGroup />`.",
    },
  },
  args: {
    onChange: action("onChange"),
    helperText: "Helper",
    legend: {
      label: "Legend",
      optionalText: "Optional",
      info: () => {
        alert("Indeterminate got clicked");
      },
    },
  },
  render: (args) => {
    const [selected, setSelected] = useState(
      args.options.find((option) => option.checked)?.value,
    );

    const handleSelection = (
      value?: string | number | readonly string[] | undefined,
    ) => {
      setSelected(value);
      args.onChange?.(value); // Triggers action in Storybook
    };

    const optionsWithState = args.options.map((option) => ({
      ...option,
      checked: option.value === selected,
    }));

    return (
      <RadioButtonGroup
        {...args}
        options={optionsWithState}
        onChange={handleSelection}
        validated={selected ? { valid: true } : args.validated}
      />
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "default",
    options: [
      {
        id: "radio-default-1",
        label: "Radio 1",
        value: "value 1",
        checked: true,
      },
      {
        id: "radio-default-2",
        label: "Radio 2",
        value: "value 2",
      },
      {
        id: "radio-default-3",
        label: "Radio 3",
        value: "value 3",
      },
    ],
  },
};

export const Error: Story = {
  args: {
    name: "error",
    validated: {
      valid: false,
      message: "An error occurred",
    },
    options: [
      {
        id: "radio-error-1",
        label: "Radio 1",
        value: "value 1",
      },
      {
        id: "radio-error-2",
        label: "Radio 2",
        value: "value 2",
      },
      {
        id: "radio-error-3",
        label: "Radio 3",
        value: "value 3",
      },
    ],
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled",
    disabled: true,
    options: [
      {
        id: "radio-disabled-1",
        label: "Radio 1",
        value: "value 1",
        checked: true,
      },
      {
        id: "radio-disabled-2",
        label: "Radio 2",
        value: "value 2",
      },
      {
        id: "radio-disabled-3",
        label: "Radio 3",
        value: "value 3",
      },
    ],
  },
};
