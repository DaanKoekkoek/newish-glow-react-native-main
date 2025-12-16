import type { Meta, StoryObj } from "@storybook/react";

import { BadgeStatus } from ".";

const baseParamsToExclude = ["className", "testID"];

const meta: Meta<typeof BadgeStatus> = {
  title: "DesignSystem/Components/Badge/BadgeStatus",
  component: BadgeStatus,
  argTypes: {
    size: {
      options: ["default", "sm"],
      control: {
        type: "select",
      },
    },
    type: {
      options: ["default", "icon"],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["default", "success", "error"],
      control: {
        type: "select",
      },
    },
  },
  parameters: {
    controls: {
      exclude: baseParamsToExclude,
    },
  },
  args: {
    count: 1,
    variant: "default",
    type: "default",
    size: "default",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  parameters: {
    controls: {
      exclude: [...baseParamsToExclude, "variant"],
    },
  },
  args: {
    variant: "error",
    type: "icon",
  },
};

export const Success: Story = {
  parameters: {
    controls: {
      exclude: [...baseParamsToExclude, "variant"],
    },
  },
  args: {
    variant: "success",
    type: "icon",
  },
};
