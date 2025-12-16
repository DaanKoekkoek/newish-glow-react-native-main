import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import type { ImageSourcePropType } from "react-native";
import { View } from "react-native";

import { DefaultSticker } from "./DefaultSticker";
import type {
  DefaultStickerDefaultTypeProps,
  DefaultStickerImageTypeProps,
} from "./DefaultSticker.types";

const meta: Meta<typeof DefaultSticker> = {
  title: "DesignSystem/Components/Sticker/DefaultSticker",
  component: DefaultSticker,
  argTypes: {
    text: { control: "text" },
    type: { control: "radio", options: ["default", "image"] },
    variant: { control: "radio", options: ["default", "emphasised"] },
  },
  args: {
    text: "Describe your promotion",
    type: "default",
    variant: "default",
    palette: "default",
  },
  decorators: [
    (Story) => (
      <View>
        <Story />
      </View>
    ),
  ],
};

export default meta;

export const Basic: StoryObj<DefaultStickerDefaultTypeProps> = {
  args: {
    type: "default",
    text: "Describe your promotion",
    variant: "default",
    palette: "default",
  },
};

export const WithImage: StoryObj<DefaultStickerImageTypeProps> = {
  args: {
    type: "image",
    image: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      localSrc:
        "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP" as ImageSourcePropType,
      alt: "alt",
      imageStyle: { height: 56, width: 112 },
    },
  },
};
