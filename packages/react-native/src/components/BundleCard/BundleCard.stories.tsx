import type { Meta, StoryObj } from "@storybook/react";
import { switchPaletteKeys, odidoPaletteKeys } from "_theming/tokenLoader";

import { BundleCard } from "./BundleCard";
import type { BundleCardProps } from "./BundleCard.types";

const meta: Meta<BundleCardProps> = {
  title: "DesignSystem/Components/Card/BundleCard",
  component: BundleCard,
  args: {
    topLabel: "Product name",
    bottomLabel: "Bundle name",
    variant: "default",
  },
} satisfies Meta<typeof BundleCard>;

export default meta;

type Story = StoryObj<BundleCardProps>;

export const Default: Story = {
  args: {
    variant: "default",
    graphProps: {
      percentage: 20,
      value: "10",
      label: "days left",
    },
  },
  parameters: {
    controls: {
      exclude: ["graphProps", "onPressButton", "variant"],
    },
    palette: {
      control: { type: "select" },
      options: ["default", ...odidoPaletteKeys, ...switchPaletteKeys],
      description: "Set the colour palette",
    },
  },
};

export const RunningLow: Story = {
  args: {
    variant: "runningLow",
    graphProps: {
      percentage: 20,
      value: "10",
      label: "days left",
    },
  },
  parameters: {
    controls: {
      exclude: ["graphProps", "onPressButton", "variant"],
    },
  },
};

export const Empty: Story = {
  args: {
    variant: "empty",
  },
  parameters: {
    controls: {
      exclude: ["graphProps", "onPressButton", "variant"],
    },
  },
};
