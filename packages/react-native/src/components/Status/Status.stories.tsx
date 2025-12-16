import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { Status } from "./Status";

const meta: Meta = {
  title: "DesignSystem/Components/Status",
  component: Status,
  argTypes: {
    type: {
      options: ["success", "warning", "error"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    statusText: "Status",
    type: "success",
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
