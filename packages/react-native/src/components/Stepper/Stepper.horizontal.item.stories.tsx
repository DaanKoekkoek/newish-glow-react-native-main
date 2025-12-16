import type { Meta, StoryObj } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import React from "react";

import { Stepper } from "./";

const meta = {
  title: "DesignSystem/Components/ProgressIndicators/Stepper/Horizontal/Item",
  component: Stepper.Step,
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
    status: {
      name: "Status",
      control: "select",
      options: ["active", "completed", "inactive"],
      defaultValue: "default",
    },
    palette: {
      control: { type: "select" },
      options: [...odidoPaletteKeys],
      description: "Set the colour palette of the Box.",
    },
  },
  args: {
    title: "Title 1",
    status: "active",
    palette: "default",
  },
} satisfies Meta<typeof Stepper.Step>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Item: Story = {
  render: function Render({ ...args }) {
    return (
      <Stepper palette={args.palette}>
        <Stepper.Step title={args.title} status={args.status} />
      </Stepper>
    );
  },
};
