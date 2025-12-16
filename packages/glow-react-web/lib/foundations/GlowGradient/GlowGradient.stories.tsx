import type { Meta } from "@storybook/react";

import { GlowGradient } from "./GlowGradient";
import { OdidoPalette } from "_internals/Color";
import { glowGradientVariants } from "./GlowGradient.constants";

const meta: Meta<typeof GlowGradient> = {
  title: "DesignSystem/Foundations/Assets/Gradients/GlowGradient",
  component: GlowGradient,
  args: {
    style: {
      width: "100%",
      height: "100%",
    },
  },
  argTypes: {
    zoom: {
      options: [true, false, "vertical", "horizontal"],
    },
    palette: {
      options: [...OdidoPalette],
    },
    type: {
      options: [undefined, ...glowGradientVariants],
    },
    style: {
      description: "Style that is applied on the wrapper of the gradient.",
    },
    mask: {
      description:
        "Changes the `<svg />` into a `<g />`. Only use this when you want to nest the gradient inside another `<Svg />`.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ aspectRatio: 1 / 1, maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};
