import type { Meta, StoryObj } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import React from "react";

import { Stepper } from "./Stepper.horizontal";

const metaHorizontal: Meta = {
  title: "DesignSystem/Components/ProgressIndicators/Stepper/Horizontal",
  component: Stepper,
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
    palette: {
      control: { type: "select" },
      options: [...odidoPaletteKeys],
      description: "Set the colour palette of the Box.",
    },
  },
  args: {
    activeStep: 3,
    children: [
      <Stepper.Step key="step-1" title="Step 1 label" />,
      <Stepper.Step key="step-2" title="Step 2 label with extra long title" />,
      <Stepper.Step key="step-3" title="Step 3 label" />,
      <Stepper.Step key="step-4" title="Step 4 label with extra long title" />,
      <Stepper.Step key="step-5" title="Step 5 label" />,
    ],
    palette: "default",
  },
  decorators: [(Story) => <Story />],
} satisfies Meta<typeof Stepper>;

export default metaHorizontal;

type Story = StoryObj<typeof metaHorizontal>;

export const Horizontal: Story = {};
