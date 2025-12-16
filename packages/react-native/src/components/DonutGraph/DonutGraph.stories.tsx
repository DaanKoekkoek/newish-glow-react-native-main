import type { Meta, StoryObj } from "@storybook/react";
import { switchPaletteKeys } from "_theming/tokenLoader";
import React from "react";
import { View } from "react-native";

import { DonutGraph } from "./DonutGraph";
import type { DonutGraphProps } from "./DonutGraph.types";

const meta: Meta<DonutGraphProps> = {
  title: "DesignSystem/Components/Graph/DonutGraph",
  component: DonutGraph,
  argTypes: {
    size: {
      options: ["default", "lg"],
      control: {
        type: "select",
      },
    },
    palette: {
      control: { type: "select" },
      options: [...switchPaletteKeys],
      description: "Set the colour palette of the dot color.",
    },
  },
  args: {
    label: "days left",
    value: "20",
    size: "default",
    palette: "default",
    percentage: 10,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 40, backgroundColor: "#858585" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof DonutGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    args: { size: "default" },
    controls: {
      exclude: ["type"],
    },
  },
};
