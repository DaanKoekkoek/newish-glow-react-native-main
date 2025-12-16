import type { Meta, StoryObj } from "@storybook/react";
import { renderCartesianVariants } from "@storybook/utils/renderVariants";
import { LargeSticker } from "./LargeSticker";
import type { CommonLargeStickerProps } from "./LargeSticker.types";
import { OdidoPalette } from "_internals/Color";
import { DefaultList } from "components/DefaultList";
import { Price } from "components/Price";

//@ts-expect-error type compability
const meta: Meta<CommonLargeStickerProps> = {
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
      options: ["default", ...OdidoPalette],
      defaultValue: "blue",
      description: "Set the colour palette of the Large Sticker.",
    },
  },
  args: {
    description: "Describe your promotion",
    variant: "default",
    type: "default",
    palette: "default",
    price: <Price beforeText="vanaf" value="10" size="lg" showVAT />,
    list: (
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
    ),
  },
} satisfies Meta<typeof LargeSticker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { type: "default" },
  parameters: {
    controls: {
      exclude: ["type", "price", "list", "className"],
    },
  },
};

export const USP: Story = {
  args: { type: "usp" },
  parameters: {
    controls: {
      exclude: ["price", "list", "className"],
    },
  },
};

export const _Variants: Story = {
  args: {
    variant: "default",
    type: "default",
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story showcases all the available variants of the LargeSticker component including different types (default/usp), variants (default/emphasised), palette colors, and glow effects. Each column represents a different styling variant.",
      },
    },
    controls: { disable: true },
  },
  render: () =>
    renderCartesianVariants(
      LargeSticker,
      {
        type: ["default", "usp"],
        variant: ["default", "emphasised"],
        palette: [
          "default",
          "yellow",
          "pink",
          "orange",
          "green",
          "red",
          "blue",
          "purple",
        ],
        description: "Describe your promotion",
        list: (
          <DefaultList
            items={[
              { icon: "checkmark", text: "Default" },
              { icon: "checkmark", text: "Feature 2" },
              { icon: "checkmark", text: "Feature 3" },
            ]}
            size="default"
            variant="icon"
          />
        ),
        price: <Price beforeText="vanaf" value="10" size="lg" showVAT />,
      },
      {
        groupBy: (props) => `Type: ${props.type}`,
      },
    ),
};
