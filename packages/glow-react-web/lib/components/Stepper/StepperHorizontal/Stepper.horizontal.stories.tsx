import type { Meta, StoryObj } from "@storybook/react";

import { HorizontalStep, Stepper } from "./Stepper.horizontal";
import { OdidoPalette } from "_internals/Color/Palette";

const metaHorizontal: Meta = {
  title: "DesignSystem/Components/ProgressIndicators/Stepper/Horizontal",
  component: Stepper,
  argTypes: {
    palette: {
      control: { type: "select" },
      options: [undefined, ...OdidoPalette],
      description: "Set the colour palette of the Box.",
    },
  },
  args: {
    activeStep: 3,
    children: [
      <HorizontalStep key="step-1" title="Step 1 label" />,
      <HorizontalStep
        key="step-2"
        title="Step 2 label with extra long title"
      />,
      <HorizontalStep key="step-3" title="Step 3 label" />,
      <HorizontalStep
        key="step-4"
        title="Step 4 label with extra long title"
      />,
      <HorizontalStep key="step-5" title="Step 5 label" />,
    ],
    palette: "default",
  },
} satisfies Meta<typeof Stepper>;

export default metaHorizontal;

type Story = StoryObj<typeof metaHorizontal>;

export const Horizontal: Story = {};
