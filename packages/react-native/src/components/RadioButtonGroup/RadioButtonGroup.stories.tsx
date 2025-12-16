import type { Meta } from "@storybook/react";
import React from "react";

import { RadioButtonGroup } from "./RadioButtonGroup";

const meta: Meta<typeof RadioButtonGroup> = {
  title: "DesignSystem/Components/Input/RadioButtonGroup",
  component: RadioButtonGroup,
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
    helperText: "Helper text here",
    legend: {
      text: "Legend",
      optional: true,
      info: () => {
        alert("Indeterminate got clicked");
      },
    },
    onPress: (id) => {
      console.log(`onPress: ${id}`);
    },
    options: [
      { id: "1", value: "1", label: "Option 1" },
      { id: "2", value: "2", label: "Option 2" },
      { id: "3", value: "3", label: "Option 3" },
    ],
    state: "default",
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};

export const DefaultSelection: Story = {
  args: {
    options: [
      { id: "1", value: "1", label: "Option 1" },
      { id: "2", value: "2", label: "Option 2", checked: true },
      { id: "3", value: "3", label: "Option 3" },
    ],
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
    errorMessage: "An error occurred",
  },
};

export const WithLongLabels: Story = {
  args: {
    state: "default",
    direction: "horizontal",
    options: [
      {
        id: "1",
        value: "1",
        label:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        checked: true,
      },
      {
        id: "2",
        value: "2",
        label: "Lorem ipsum dolor sit amet.",
      },
      {
        id: "3",
        value: "3",
        label: "Lorem ipsum dolor sit amet.",
      },
    ],
  },
};
