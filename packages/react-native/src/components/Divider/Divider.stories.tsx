import type { Meta } from "@storybook/react";
import React from "react";

import { Divider } from "./Divider";
import { Box } from "../Box";

const meta: Meta<typeof Divider> = {
  title: "DesignSystem/Components/Divider",
  component: Divider,
  argTypes: {
    prominence: {
      options: ["default", "subtle"],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["default", "strong"],
      control: {
        type: "select",
      },
    },
    inverted: {
      type: "boolean",
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {
    variant: "default",
  },
};

export const Subtle: Story = {
  args: {
    prominence: "subtle",
  },
};

export const Inverted: Story = {
  args: {
    inverted: true,
  },
  decorators: [
    (Story) => (
      <Box prominence="color" size="sm" palette="blue">
        <Story />
      </Box>
    ),
  ],
};
