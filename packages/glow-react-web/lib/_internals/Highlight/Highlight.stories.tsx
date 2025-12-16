import type { Meta } from "@storybook/react";

import { Highlight } from "./Highlight";

const meta: Meta<typeof Highlight> = {
  title: "DesignSystem/_internals/Components/Highlight",
  component: Highlight,
  args: {
    variant: "default",
    state: "default",
    children: "Highlight",
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["default", "compact", "spacious"],
      },
    },
    state: {
      control: {
        type: "select",
        options: ["default", "inactive"],
      },
    },
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};
