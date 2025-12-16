import type { Meta } from "@storybook/react";
import React, { useState } from "react";

import { CheckboxGroup } from "./CheckboxGroup";
import type { CheckboxOnPressProps } from "../Checkbox";
import { Checkbox } from "../Checkbox";

const meta: Meta<typeof CheckboxGroup> = {
  title: "DesignSystem/Components/Input/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {
    errorMessage: { type: "string" },
    legend: {
      control: { type: "object" },
      description:
        "Specify the legend 'text', 'optionalText' and 'hasInfoIcon'",
    },
    helperText: { type: "string" },
    state: { control: "select", options: ["default", "inactive", "error"] },
  },
  args: {
    legend: {
      text: "Legend",
      optional: true,
      info: () => {
        alert("Indeterminate got clicked");
      },
    },
    state: "default",
    helperText: "Helper text here",
  },
  decorators: [(Story) => <Story />],
  render: function Render({ legend, helperText, state, errorMessage }) {
    const [selectedOptions, setSelectedOptions] = useState<
      Record<string, boolean | string>
    >({ "1": true });

    const onPress = ({ id, checked }: CheckboxOnPressProps) => {
      if (state !== "default") {
        return;
      }

      const isInSelectedOptions = !!selectedOptions[id];
      if (isInSelectedOptions && !checked) {
        setSelectedOptions({ ...selectedOptions, [id]: false });
      } else {
        setSelectedOptions({ ...selectedOptions, [id]: true });
      }
    };

    const checkboxOptions = [
      { id: "1", label: "Option 1" },
      { id: "2", label: "Option 2" },
      { id: "3", label: "Option 3" },
    ];

    return (
      <CheckboxGroup
        errorMessage={errorMessage}
        helperText={helperText}
        legend={legend}
        state={state}
      >
        {checkboxOptions.map(({ id, label }) => (
          <Checkbox
            key={id}
            id={id}
            label={label}
            onPress={onPress}
            checked={!!selectedOptions[id]}
            state={state}
          />
        ))}
      </CheckboxGroup>
    );
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};

export const Inactive: Story = {
  args: {
    state: "inactive",
  },
};

export const Error: Story = {
  args: {
    state: "error",
    errorMessage: "An error occurred",
  },
};
