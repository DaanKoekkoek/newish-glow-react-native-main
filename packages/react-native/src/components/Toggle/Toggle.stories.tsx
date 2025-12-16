import type { Meta } from "@storybook/react";
import React from "react";

import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "DesignSystem/Components/Input/Toggle",
  component: Toggle,
  argTypes: {
    ariaLabel: {
      description: "Specify the label text for the Toggle.",
    },
    onPress: { action: "onPress" },
    isSelected: { control: { type: "boolean" } },
    inactive: { control: { type: "boolean" } },
    size: {
      control: { type: "select", options: ["default", "lg", "xl"] },
      description: "Specify the size of the Toggle.",
    },
    labelText: {
      control: {
        type: "select",
        options: ["Ja/Nee", "Yes/No", "Aan/Uit", "On/Off"],
      },
      description: "Specify the label of the Toggle with a `size` of `xl`.",
    },
    label: {
      description: "Specify the label text for the Toggle.",
      control: { type: "boolean" },
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {
    ariaLabel: "test",
    isSelected: true,
    inactive: false,
    isHovered: false,
    label: true,
    size: "xl",
    labelText: "Ja/Nee",
  },
};
