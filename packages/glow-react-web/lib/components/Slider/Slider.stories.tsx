import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "./Slider";
import { OdidoPalette } from "_internals/Color";
import { useTheme } from "components/ThemeProvider";

const meta: Meta<typeof Slider> = {
  title: "DesignSystem/Components/Input/Slider",
  component: Slider,
  args: {
    minValue: 1,
    maxValue: 100,
    legend: false,
  },
  argTypes: {
    value: {
      description:
        "The current value of the slider. Controls the thumb position and the progress fill.",
      control: "number",
    },
    minValue: {
      description:
        "The minimum selectable value. Defines the left-most position of the slider thumb.",
      control: "number",
    },
    maxValue: {
      description:
        "The maximum selectable value. Defines the right-most position of the slider thumb.",
      control: "number",
    },
    step: {
      description:
        "The amount the value increases or decreases when interacting with the slider (dragging or using arrow keys).",
      control: "number",
    },
    palette: {
      description:
        "Determines the color palette used for the slider track and filled progress segment.",
      control: "select",
      options: [undefined, ...OdidoPalette],
    },
    legend: {
      description:
        "If enabled, displays a horizontal legend of tick values under the slider. Automatically condenses into ‘6+’ when the range produces more than 6 ticks.",
      control: "boolean",
    },
    className: {
      description:
        "Custom class name passed to the root slider wrapper for additional styling.",
      control: "text",
    },
    onValueChange: {
      description:
        "Callback fired whenever the slider value changes (drag, keyboard, or direct input interaction). Provides the new numeric value.",
      action: "changed",
    },
  },
  render: (args) => {
    const { brand } = useTheme();
    return <Slider {...args} brand={brand} />;
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
