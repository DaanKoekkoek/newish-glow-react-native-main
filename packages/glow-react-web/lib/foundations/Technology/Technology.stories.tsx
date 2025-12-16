import type { Meta, StoryObj } from "@storybook/react";

import { Technology } from "./Technology";

const meta: Meta<typeof Technology> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/Technology",
  component: Technology,
  argTypes: {
    type: {
      options: ["Klik & Klaar", "Fiber", "DSL", "Internet + TV"],
      control: {
        type: "select",
      },
    },
    state: {
      options: ["information", "success"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    type: "Klik & Klaar",
  },
  parameters: {
    status: {
      type: ["qaPassed", "devReviewed"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
