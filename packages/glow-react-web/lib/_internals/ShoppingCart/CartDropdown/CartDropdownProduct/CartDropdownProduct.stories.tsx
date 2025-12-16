import { Meta, StoryObj } from "@storybook/react";
import { CartDropdownProduct } from "./CartDropdownProduct";

const meta: Meta = {
  title:
    "DesignSystem/_internals/ShoppingCart/CartDropdown/CartDropdownProduct",
  component: CartDropdownProduct,
  args: {
    image: {
      src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
      alt: "Product",
    },
    title: "Product Title",
    description: "Description",
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
