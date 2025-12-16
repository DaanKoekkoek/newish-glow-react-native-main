import type { Meta } from "@storybook/react";
import React from "react";

import { Highlight } from "./Highlight";

const meta: Meta<typeof Highlight> = {
  title: "DesignSystem/Components/Highlight",
  component: Highlight,
  args: {
    variant: "default",
    state: "default",
    selected: false,
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
        options: ["default", "hover", "inactive"],
      },
    },
    selected: {
      options: [true, false],
      control: {
        type: "radio",
      },
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  render: function Render({ ...args }) {
    return <Highlight {...args} />;
  },
};
