import { glyphmap as IconsMap } from "@odido-portals/glow-icon/fonts";
import type { Meta } from "@storybook/react";
import React from "react";

import { GlowIcon } from "./GlowIcon";
import { gradientVariants } from "../GlowGradient/GlowGradient.constants";

const meta: Meta<typeof GlowIcon> = {
  title: "DesignSystem/Foundations/Assets/Gradients/GlowIcon",
  component: GlowIcon,
  args: {
    name: "alert",
    size: "xxl",
    solid: false,
  },
  argTypes: {
    name: {
      control: { type: "select" },
      options: Object.keys(IconsMap),
      description: "Available icons coming from the `Glow-Icon` repository.",
    },
    solid: {
      description: "Sets icon variant.",
    },
    style: {
      description:
        "Style that is applied on the wrapper of both the default and additional Icon (when `renderAs` is set to `animated`).",
    },
    animatedStyle: {
      description:
        "animatedStyle is applied on the additional Svg (when `renderAs` is set to `animated`.",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "default", "md", "lg", "xl", "xxl"],
      description:
        "Available icon sizes coming from the `Glow-Icon` repository.",
    },
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
    renderAs: {
      control: { type: "select" },
      option: ["static", "animated"],
      description:
        "Render an additional Svg for animations when set to `animated`.",
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  args: {
    type: "Glow1",
  },
};
