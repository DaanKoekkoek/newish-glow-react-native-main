import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { DotNav } from "./DotNav";

const meta: Meta<typeof DotNav> = {
  title: "DesignSystem/Components/Slider/DotNav",
  component: DotNav,
  argTypes: {
    count: {
      description: "Total number of dots to render.",
      control: { type: "number" },
    },
    activeIndex: {
      description:
        "The index of the currently active dot. Can be controlled externally or updated internally via hybrid behavior.",
      control: { type: "number" },
    },
    timerDuration: {
      description:
        "Optional duration (in ms) for the active dot progress animation. After this duration, the dot automatically advances to the next one.",
      control: { type: "number" },
    },
    onDotClick: {
      description:
        "Callback fired when a dot is clicked. Receives the index of the clicked dot.",
    },
    onNext: {
      description:
        "Callback fired when the timer completes and the active dot moves to the next one.",
    },
  },
  args: {
    count: 5,
    onDotClick: (e) => action("onDotClick")(e),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithTimer: Story = {
  args: {
    timerDuration: 5000,
    onNext: action("onNext"),
  },
};
