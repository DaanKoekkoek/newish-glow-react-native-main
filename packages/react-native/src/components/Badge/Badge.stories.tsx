import type { Meta, StoryObj } from "@storybook/react";
import { odidoPaletteKeys, switchPaletteKeys } from "_theming/tokenLoader";
import React from "react";

import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "DesignSystem/Components/Badge/Badge",
  component: Badge,
  argTypes: {
    prominence: {
      options: ["default", "subtle", "outline"],
      control: {
        type: "select",
      },
    },
    palette: {
      control: { type: "select" },
      options: [...odidoPaletteKeys, ...switchPaletteKeys],
      description: "Set the colour palette of the segmented tab's background.",
    },
  },
  args: {
    text: "Badge",
    prominence: "default",
    inactive: false,
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
