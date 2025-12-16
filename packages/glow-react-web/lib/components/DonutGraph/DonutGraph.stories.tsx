import type { Meta, StoryObj } from "@storybook/react";

import { DonutGraph } from "./DonutGraph";
import { SimWalletPalette } from "_internals/Color";

const meta: Meta<typeof DonutGraph> = {
  title: "DesignSystem/Components/Graph/DonutGraph",
  component: DonutGraph,
  argTypes: {
    palette: {
      control: { type: "select" },
      options: ["default", ...SimWalletPalette],
      defaultValue: "blue",
      description: "Set the colour palette.",
    },
  },
  args: { label: "Days left", value: "25", percentage: 25, size: "md" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
