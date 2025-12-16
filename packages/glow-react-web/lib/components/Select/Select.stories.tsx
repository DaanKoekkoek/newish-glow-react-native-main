import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Select } from "./Select";
import { useState } from "react";
import type { SelectProps } from "./Select.types";

const meta: Meta<typeof Select> = {
  title: "DesignSystem/Components/Input/Select",
  component: Select,
  argTypes: {
    legend: {
      description:
        "Adds the option to add label text and extra contents above the select input.",
    },
    helperText: {
      description:
        "Adds helper text below the select input. It is hidden when validation is set to `validated: { success: false }`.",
    },
    placeholder: {
      description:
        "Displays placeholder text in the select input. It is replaced with the selected value once an option is chosen.",
    },
    value: {
      description: "Holds the current selected option's value.",
    },
    options: {
      description:
        "Accepts an array of objects with the shape `{ value: string, name: string, group?: string }` to populate the select options. Options with a 'group' property will be automatically grouped.",
    },
    validated: {
      description:
        "Accepts an object with a `success: boolean` property to indicate validation state. Optionally, if `success` is `false`, you can pass a `message` to display an error message.",
    },
    testID: {
      description:
        "Generates a `testID` for the container of the component, useful for testing purposes.",
    },
    onChange: {
      action: "onChange",
      description:
        "Fires when an option is selected, passing the selected value.",
    },
    inactive: {
      type: "boolean",
      defaultValue: false,
      description:
        "Disables the select input when set to `true`, preventing user interaction.",
    },
  },
  args: {
    legend: {
      label: "Label",
      info: {
        description: "Info tooltip text",
        tipPosition: "right",
        closeButton: false,
        animated: true,
      },
      optionalText: "Extra text",
    },
    helperText: "Helper message",
    placeholder: "Placeholder message",
    inactive: false,
    options: [
      {
        name: "Tomato",
        value: "tomato",
      },
      {
        name: "Orange",
        value: "orange",
      },
      {
        name: "Grapefruit",
        value: "grapefruit",
      },
      {
        name: "Extra long piece of text that should trigger overflow",
        value: "long text",
      },
      {
        name: "Strawberry",
        value: "strawberry",
      },
      {
        name: "Banana",
        value: "banana",
      },
      {
        name: "Apple",
        value: "apple",
      },
      {
        name: "Pear",
        value: "pear",
      },
    ],
  },
  render: (args: SelectProps) => {
    const [value, setValue] = useState("");

    const handleChange = (value: string) => {
      args.onChange ? action(args.onChange(value)!) : null;
      setValue(value);
    };

    return (
      <Select {...args} value={value} onChange={(val) => handleChange(val)} />
    );
  },
  decorators: [
    (Story, args) => (
      <form>
        <Story {...args} />
      </form>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "default-select",
  },
};

export const Inactive: Story = {
  args: {
    id: "inactive-select",
    inactive: true,
  },
};

export const Valid: Story = {
  args: {
    id: "success-select",
    validated: {
      valid: true,
    },
  },
};

export const Error: Story = {
  args: {
    id: "error-select",
    validated: {
      valid: false,
      message: "An error occurred",
    },
  },
};

export const GroupedOptions: Story = {
  args: {
    id: "grouped-select",
    options: [
      {
        name: "Apple",
        value: "apple",
        group: "Fruits",
      },
      {
        name: "Banana",
        value: "banana",
        group: "Fruits",
      },
      {
        name: "Orange",
        value: "orange",
        group: "Fruits",
      },
      {
        name: "Carrot",
        value: "carrot",
        group: "Vegetables",
      },
      {
        name: "Broccoli",
        value: "broccoli",
        group: "Vegetables",
      },
      {
        name: "Potato",
        value: "potato",
        group: "Vegetables",
      },
      {
        name: "Milk",
        value: "milk",
        group: "Dairy",
      },
      {
        name: "Cheese",
        value: "cheese",
        group: "Dairy",
      },
    ],
    helperText: "Select an item from grouped options",
  },
};
