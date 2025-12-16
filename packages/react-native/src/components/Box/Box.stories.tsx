import type { Meta, StoryObj } from "@storybook/react";
import { odidoPaletteKeys, switchPaletteKeys } from "_theming/tokenLoader";
import { gradientVariants } from "foundations/GlowGradient/GlowGradient.constants";
import { Paragraph, Stack } from "foundations/index";
import React from "react";
import { View } from "react-native";

import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "DesignSystem/Components/Box",
  component: Box,
  argTypes: {
    prominence: {
      options: ["default", "outline", "emphasised", "color"],
      control: {
        type: "select",
      },
    },
    gradient: {
      control: "select",
      options: gradientVariants,
      description:
        "Changes the glow gradient color of the `Box`. Only applicable when `prominence` is set to `emphasised`, and the theme brand is set to `Odido`.",
    },
    size: {
      description: "Changes the border radius and padding of the `Box`.",
      options: ["default", "sm"],
      control: {
        type: "select",
      },
    },
    children: {
      description: "Accepts `React.ReactElement` or `React.ReactElement[]`",
      control: false,
    },
    grow: {
      description:
        "Applies `flexGrow: 1` to the Box. Allows it to scale up to its parents' boundaries.",
    },
    style: {
      description:
        "Accepts `ViewStyle`. Applies additional styling to the Box. The `prominence` property will have priority over the styling from this property.",
      control: false,
    },
    palette: {
      control: { type: "select" },
      options: [...odidoPaletteKeys, ...switchPaletteKeys],
      description: "Set the colour palette of the Box.",
    },
  },
  args: {
    prominence: "default",
    children: <Paragraph>Box content</Paragraph>,
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const GrowEnabled: Story = {
  decorators: [
    (Story) => (
      <Stack direction="row">
        <View style={{ width: "50%" }}>
          <Story />
        </View>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra
          augue a purus dictum, consectetur suscipit nibh imperdiet. Etiam
          volutpat in tellus at commodo. Suspendisse ornare tortor congue justo
          consequat, vitae vulputate tellus lobortis. Duis tempor felis non
          semper suscipit. Praesent quis nisl quis nulla ultrices pharetra nec
          ac nibh. Vivamus sodales magna ligula, a gravida ligula porta nec.
          Nulla et rhoncus dolor, eget accumsan nunc. Sed a nunc euismod,
          ultrices orci a, volutpat lacus. Ut interdum tempus est, in faucibus
          nunc pretium vitae. Morbi blandit diam lacus, vel facilisis est
          hendrerit quis. Suspendisse egestas ultricies est.
        </Paragraph>
      </Stack>
    ),
  ],
};
