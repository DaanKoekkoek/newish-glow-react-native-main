import type { Meta, StoryObj } from "@storybook/react";
import { LargeSticker } from "components/LargeSticker";
import { Status } from "components/Status";
import React from "react";

import { ProductHero } from "./ProductHero";
import type { ProductHeroProps } from "./ProductHero.types";

const meta: Meta<ProductHeroProps> = {
  title: "DesignSystem/Components/Hero/ProductHero",
  component: ProductHero,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    image: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      alt: "Alt text",
      ratio: "16/9",
    },
  },
  argTypes: {
    status: {
      description:
        "Must be a Status Component, used to display the status of the product",
      control: { disable: true },
    },
    image: {
      description:
        "Must be a Image Component, used to display the image of the product",
      control: { disable: true },
    },
    largeSticker: {
      description:
        "Must be a LargeSticker Component, used to display the large sticker of the product",
      control: { disable: true },
    },
  },
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    status: <Status statusText="Status" type="success" />,
    largeSticker: {
      type: "usp",
      list: (
        <LargeSticker.List variant="icon">
          <LargeSticker.ListItem icon="checkmark">
            List item 1
          </LargeSticker.ListItem>
          <LargeSticker.ListItem icon="checkmark">
            List item 2
          </LargeSticker.ListItem>
        </LargeSticker.List>
      ),
    },
  },
  parameters: {
    controls: {
      exclude: ["variant"],
    },
  },
};

export const DefaultWith5Items: Story = {
  args: {
    variant: "default",
    status: <Status statusText="Status" type="success" />,
    largeSticker: {
      type: "usp",
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
          <LargeSticker.ListItem icon="checkmark">
            List item 4
          </LargeSticker.ListItem>
          <LargeSticker.ListItem icon="checkmark">
            List item 5
          </LargeSticker.ListItem>
        </LargeSticker.List>
      ),
    },
  },
  parameters: {
    controls: {
      exclude: ["variant"],
    },
  },
};

export const Promo: Story = {
  args: {
    variant: "promo",
    status: <Status statusText="Status" type="success" />,
    largeSticker: {
      type: "default",
      description: `Describe your\npromotion`,
      price: <LargeSticker.Price value="10" showAsterisk beforeText="vanaf" />,
    },
  },
  parameters: {
    controls: {
      exclude: ["variant"],
    },
  },
};
