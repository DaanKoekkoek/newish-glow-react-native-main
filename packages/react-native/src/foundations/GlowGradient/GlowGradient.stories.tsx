import type { Meta } from "@storybook/react";
import React from "react";
import { View } from "react-native";

import { GlowGradient } from "./GlowGradient";
import { gradientVariants } from "./GlowGradient.constants";

const meta: Meta<typeof GlowGradient> = {
  title: "DesignSystem/Foundations/Assets/Gradients/GlowGradient",
  component: GlowGradient,
  args: {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      height: "100%",
    },
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: gradientVariants,
      description: "Set the glow gradient variant.",
    },
    brightness: {
      control: { type: "select" },
      options: ["dark", "light"],
      description: "Set the glow gradient intensity.",
    },
    style: {
      description:
        "Style that is applied on the wrapper of both the default and additional Svg (when `renderAs` is set to `animated`).",
    },
    animatedStyle: {
      description:
        "animatedStyle is applied on the additional Svg (when `renderAs` is set to `animated`.",
    },
    mask: {
      description:
        "Changes the `<svg />` into a `<g />`. Only use this when you want to nest the gradient inside another `<Svg />`.",
    },
    renderAs: {
      control: { type: "select" },
      option: ["static", "animated"],
      description:
        "Render an additional Svg for animations when set to `animated`.",
    },
  },
  decorators: [
    (Story) => (
      <View style={{ aspectRatio: 1 / 1, maxWidth: 300 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {
    type: "Glow1",
  },
};
