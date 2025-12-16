import type { Meta, StoryObj } from "@storybook/react";
import { Status } from "components/Status";
import { ProductHero } from "./ProductHero";
import type { ProductHeroProps } from "./ProductHero.types";
import { LargeSticker } from "components/LargeSticker";
import { DefaultList } from "components/DefaultList";
import { Price } from "components/Price";
import {
  createComplexControl,
  type ComplexOption,
} from "@storybook/utils/complexOptions";

const statusOptions: ComplexOption<ProductHeroProps["status"]>[] = [
  {
    label: "none",
    value: undefined,
  },
  {
    label: "Status",
    value: <Status statusText="Available" type="success" />,
  },
];

const imageOptions: ComplexOption<ProductHeroProps["image"]>[] = [
  {
    label: "Image",
    value: {
      src: "https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP",
      alt: "Alt text",
    },
  },
];

const largeStickerOptions: ComplexOption<ProductHeroProps["largeSticker"]>[] = [
  {
    label: "none",
    value: undefined,
  },
  {
    label: "LargeSticker",
    value: (
      <LargeSticker
        type="usp"
        list={
          <DefaultList
            inverted
            items={[
              {
                icon: "checkmark",
                text: "List item 1",
              },
              {
                icon: "checkmark",
                text: "List item 2",
              },
              {
                icon: "checkmark",
                text: "List item 3",
              },
            ]}
            size="default"
            variant="icon"
          />
        }
      />
    ),
  },
  {
    label: "LargeSticker (promotional)",
    value: (
      <LargeSticker
        type="default"
        variant="default"
        palette="default"
        description="Describe your promotion"
        price={<Price beforeText="vanaf" size="lg" value="10" />}
      />
    ),
  },
];

const meta: Meta<ProductHeroProps> = {
  title: "DesignSystem/Components/Hero/ProductHero",
  component: ProductHero,
  parameters: {
    controls: {
      exclude: ["variant"],
    },
  },
  argTypes: {
    status: {
      ...createComplexControl(statusOptions),
      description:
        "Must be a Status Component, used to display the status of the product",
    },
    image: {
      ...createComplexControl(imageOptions),
      description:
        "Must be a Image Component, used to display the image of the product",
    },
    largeSticker: {
      ...createComplexControl(largeStickerOptions),
      description:
        "Must be a LargeSticker Component, used to display the large sticker of the product",
    },
  },
  args: {
    variant: "default",
    image: imageOptions[0].value,
    largeSticker: largeStickerOptions[1].value,
    status: statusOptions[1].value,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
