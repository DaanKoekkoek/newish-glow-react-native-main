import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { StoreButton } from "./StoreButton";

const meta: Meta<typeof StoreButton> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/StoreButton",
  component: StoreButton,
  argTypes: {
    prominence: {
      options: ["default", "secondary"],
      control: {
        type: "select",
      },
    },
    brand: {
      options: ["Apple", "Google"],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["default", "inverted"],
      control: {
        type: "select",
      },
    },
  },
  args: {
    brand: "Apple",
    prominence: "default",
    variant: "default",
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
