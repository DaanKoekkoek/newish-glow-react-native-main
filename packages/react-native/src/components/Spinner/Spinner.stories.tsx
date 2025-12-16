import type { Meta } from "@storybook/react";
import React from "react";

import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "DesignSystem/Components/ProgressIndicators/Spinner",
  component: Spinner,
  argTypes: {
    color: {
      control: "select",
      options: ["default", "inverted"],
    },
    size: {
      options: ["default", "sm"],
      control: "select",
      description: "Set the size of the spinner",
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};
