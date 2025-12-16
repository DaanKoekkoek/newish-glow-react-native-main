import { Meta, StoryObj } from "@storybook/react";
import { CartProduct } from "./CartProduct";
import { CartProductProps } from "./CartProduct.types";

type StoryProps = CartProductProps & {
  showDescriptions: boolean;
};

const meta: Meta<StoryProps> = {
  title: "DesignSystem/Components/ShoppingCart/CartProduct",
  component: CartProduct,
  args: {
    image: {
      src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
      alt: "Product",
    },
    title: "Product Title",
    description: ["Description1", "Description2"],
    showDescriptions: true,
  },
  argTypes: {
    image: { control: false },
    showDescriptions: {
      control: "boolean",
      description: "Toggle description visibility (for Storybook purposes).",
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Basic: Story = {
  render: (args) => (
    <CartProduct
      {...args}
      description={args.showDescriptions ? args.description : []}
    />
  ),
};
