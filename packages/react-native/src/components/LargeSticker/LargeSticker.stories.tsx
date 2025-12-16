import type { Meta, StoryObj } from "@storybook/react";
import { odidoPaletteKeys } from "_theming/tokenLoader";
import { glowGradientVariants } from "foundations/GlowGradient/GlowGradient.constants";
import React from "react";
import { View } from "react-native";

import { LargeSticker } from "./LargeSticker";
import type { LargeStickerProps } from "./LargeSticker.types";

const meta: Meta<LargeStickerProps> = {
  title: "DesignSystem/Components/Sticker/LargeSticker",
  component: LargeSticker,
  argTypes: {
    variant: {
      options: ["default", "emphasised"],
      control: {
        type: "select",
      },
    },
    palette: {
      control: { type: "select" },
      options: ["default", ...odidoPaletteKeys],
      description: "Set the colour palette of the Large Sticker.",
    },
    glow: {
      control: "select",
      options: glowGradientVariants,
      description:
        "Glow background color of the modal header. Requires `image` and `headerComponent`.",
    },
  },
  args: {
    description: "Describe your\npromotion",
    variant: "default",
    type: "default",
    palette: "default",
    price: <LargeSticker.Price beforeText="vanaf" value="10" size="lg" />,
    list: (
      <LargeSticker.List variant="icon">
        <LargeSticker.ListItem icon="checkmark">
          List item 1
        </LargeSticker.ListItem>
        <LargeSticker.ListItem icon="checkmark">
          List item 2
        </LargeSticker.ListItem>
        <LargeSticker.ListItem icon="checkmark">
          List item 3
        </LargeSticker.ListItem>
      </LargeSticker.List>
    ),
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 40 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof LargeSticker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  //@ts-expect-error
  args: {},
  parameters: {
    args: { type: "default" },
    controls: {
      exclude: ["type"],
    },
  },
};

export const USP: Story = {
  //@ts-expect-error
  args: { type: "usp" },
  parameters: {
    controls: {
      exclude: ["description", "type"],
    },
  },
  render: () => {
    return (
      <View style={{ gap: 16, flexDirection: "row" }}>
        <LargeSticker
          type="usp"
          palette="blue"
          list={
            <LargeSticker.List variant="icon">
              <LargeSticker.ListItem icon="checkmark">
                List item 1
              </LargeSticker.ListItem>
              <LargeSticker.ListItem icon="checkmark">
                List item 2
              </LargeSticker.ListItem>
            </LargeSticker.List>
          }
        />

        <LargeSticker
          type="usp"
          palette="green"
          list={
            <LargeSticker.List variant="icon">
              <LargeSticker.ListItem icon="checkmark">
                List item 1
              </LargeSticker.ListItem>
              <LargeSticker.ListItem icon="checkmark">
                List item 2
              </LargeSticker.ListItem>
              <LargeSticker.ListItem icon="checkmark">
                List item 3
              </LargeSticker.ListItem>
            </LargeSticker.List>
          }
        />

        <LargeSticker
          type="usp"
          palette="pink"
          list={
            <LargeSticker.List variant="icon">
              <LargeSticker.ListItem icon="checkmark">
                List item 1
              </LargeSticker.ListItem>
              <LargeSticker.ListItem icon="checkmark">
                List item 2
              </LargeSticker.ListItem>
              <LargeSticker.ListItem icon="checkmark">
                List item 3
              </LargeSticker.ListItem>
              <LargeSticker.ListItem icon="checkmark">
                List item 4
              </LargeSticker.ListItem>
            </LargeSticker.List>
          }
        />

        <LargeSticker
          type="usp"
          palette="orange"
          list={
            <LargeSticker.List variant="icon">
              <LargeSticker.ListItem icon="checkmark">
                List item 1
              </LargeSticker.ListItem>
              <LargeSticker.ListItem icon="checkmark">
                List item 2
              </LargeSticker.ListItem>
              <LargeSticker.ListItem icon="checkmark">
                List item 3
              </LargeSticker.ListItem>
              <LargeSticker.ListItem icon="checkmark">
                List item 4
              </LargeSticker.ListItem>
              <LargeSticker.ListItem icon="checkmark">
                List item 5
              </LargeSticker.ListItem>
            </LargeSticker.List>
          }
        />
      </View>
    );
  },
};
