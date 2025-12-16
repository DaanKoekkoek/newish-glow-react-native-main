import type { Meta, StoryObj } from "@storybook/react";

import { Pay } from "./Pay";

const meta: Meta<typeof Pay> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/Payments",
  component: Pay,
  argTypes: {
    service: {
      options: ["iDEAL", "iDIN"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    service: "iDEAL",
  },
  parameters: {
    status: {
      type: ["qaPassed", "devReviewed"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Ideal: Story = {};

export const Idin: Story = {
  args: {
    service: "iDIN",
  },
};
