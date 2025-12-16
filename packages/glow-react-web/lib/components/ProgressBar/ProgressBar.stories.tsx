import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar, ProgressBarStep } from "./ProgressBar";
import { OdidoPalette } from "_internals/Color";

const meta: Meta<typeof ProgressBar> = {
  title: "DesignSystem/Components/ProgressIndicators/ProgressBar",
  component: ProgressBar,
  argTypes: {
    palette: {
      control: { type: "select" },
      options: [...OdidoPalette],
      defaultValue: "default",
      description: "Set the colour palette of progress bar",
    },
  },
  args: {
    palette: "default",
    progress: 44,
    children: [
      <ProgressBarStep active title="Start 1" key="step1" />,
      <ProgressBarStep title="Step 2" key="step2" />,
      <ProgressBarStep title="Step 3" key="step3" />,
      <ProgressBarStep title="Step 4" key="step4" />,
    ],
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const CustomSteps: Meta<typeof ProgressBarStep> = {
  title: "DesignSystem/Components/ProgressBar",
  component: ProgressBarStep,
  parameters: {
    controls: {
      exclude: ["palette", "progress", "children"],
    },
  },
  args: {
    title: "Custom text",
    active: true,
  },
  render: (args) => (
    <ProgressBar progress={50}>
      <ProgressBarStep title="Step 1" key="custom-step-1" />
      <ProgressBarStep
        title={args.title}
        active={args.active}
        key="custom-step-2"
      />
      <ProgressBarStep title="Step 3" key="custom-step-3" />
      <ProgressBarStep title="Step 4" key="custom-step-4" />
    </ProgressBar>
  ),
};
