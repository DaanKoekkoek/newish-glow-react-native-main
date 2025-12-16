import type { Meta } from "@storybook/react";
import React from "react";

import { Logos } from "./Logos";
import type { LogosProps } from "./Logos.types";

const meta: Meta<LogosProps> = {
  title: "DesignSystem/Foundations/Assets/LogosAndVisuals/Logos",
  component: Logos,
  args: {
    size: "default",
    variant: "default",
  },
  argTypes: {
    brand: {
      control: "select",
      description:
        "Renders logo of a specific brand. Uses the `<ThemeProvider />` brand context when the property is not set.",
      options: [undefined, "odido", "ben", "simpel"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "lg", "xl"],
      description:
        "Whether the component is rendered as the default size, Lg or Xl. Can be applied per breakpoint.",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "inverted"],
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};
