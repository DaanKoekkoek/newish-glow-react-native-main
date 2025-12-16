import type { Meta, StoryObj } from "@storybook/react";
import { switchPaletteKeys } from "_theming/tokenLoader";
import React from "react";
import { View } from "react-native";

import { DottedGraph } from "./DottedGraph";
import type { DottedGraphProps } from "./DottedGraph.types";

const meta: Meta<DottedGraphProps> = {
  title: "DesignSystem/Components/Graph/DottedGraph",
  component: DottedGraph,
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
    size: "default",
    label: "hours left",
    value: "21",
    percentage: 10,
    palette: "default",
    variant: 24,
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 40, backgroundColor: "#858585" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof DottedGraph>;

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
