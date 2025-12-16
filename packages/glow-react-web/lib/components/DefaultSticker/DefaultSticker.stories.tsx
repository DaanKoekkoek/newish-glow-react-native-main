import type { Meta, StoryObj } from "@storybook/react";

import { DefaultSticker } from "./DefaultSticker";
import { OdidoPalette } from "_internals/Color";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";
import { DefaultStickerProps } from "./DefaultSticker.types";

const meta: Meta<typeof DefaultSticker> = {
  title: "DesignSystem/Components/Sticker/DefaultSticker",
  component: DefaultSticker,
  argTypes: {
    text: { control: "text" },
    type: { control: "radio", options: ["default", "image"] },
    variant: { control: "radio", options: ["default", "emphasised"] },
    palette: {
      control: { type: "select" },
      options: [...OdidoPalette],
      description: "Set the colour palette of the segmented tab's background.",
    },
    image: {
      control: false,
      description: "Image to display on the DefaultSticker.",
    },
  },
  args: {
    text: "Describe your promotion",
    type: "default",
    variant: "default",
    palette: "default",
    image: (
      <img
        src="https://assets.odido.nl/1600x900/a2c094c8eb/mid-hero-stocksy_txpfcee7f02fc0400_originaldelivery_4220176.WebP"
        alt="alt text"
      />
    ),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Describe your promotion",
    type: "default",
    variant: "default",
    palette: "default",
  },
};

export const Emphasised: Story = {
  parameters: {
    controls: {
      exclude: ["palette", "image"],
    },
    image: {
      description: "Image to display on the DefaultSticker.",
    },
  },
  args: {
    text: "Describe your promotion",
    variant: "emphasised",
  },
};

export const Image: Story = {
  parameters: {
    controls: {
      exclude: ["text", "palette"],
    },
    image: {
      description: "Image to display on the DefaultSticker.",
    },
  },
  args: {
    type: "image",
    variant: "default",
  },
};

export const ImageEmphasised: Story = {
  parameters: {
    controls: {
      exclude: ["text", "palette"],
    },
    image: {
      description: "Image to display on the DefaultSticker.",
    },
  },
  args: {
    type: "image",
    variant: "emphasised",
  },
};

export const _Variants: Story = {
  render: (props) => {
    return renderCartesianVariants(
      (props: DefaultStickerProps) => <DefaultSticker {...props} />,
      {
        ...props,
        type: ["default", "image"],
        variant: ["default", "emphasised"],
        palette: [...OdidoPalette],
      },
      {
        groupBy: [
          (props) => `Variant: ${props.variant}`,
          (props) => `Type: ${props.type}`,
        ],
      },
    );
  },
};
