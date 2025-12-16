import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { AppIcon } from "./AppIcon";

const meta: Meta<typeof AppIcon> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/AppIcon",
  component: AppIcon,
  argTypes: {
    app: {
      options: [
        "Klik & Klaar",
        "TV",
        "TV Anywhere",
        "Thuis Veilig Online",
        "Overal Veilig Online",
        "Hosted Voice",
        "Essential",
        "Klantkampioen",
      ],
      control: {
        type: "select",
      },
    },
  },
  args: {
    brand: "Odido",
    app: "Klik & Klaar",
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
