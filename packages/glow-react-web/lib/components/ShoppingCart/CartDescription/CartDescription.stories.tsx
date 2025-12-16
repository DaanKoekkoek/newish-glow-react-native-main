import { Meta, StoryObj } from "@storybook/react";
import { CartDescription } from "./CartDescription";
import { LineItem } from "../LineItem";
import { CartButton } from "../CartButton";

const meta: Meta<typeof CartDescription> = {
  title: "DesignSystem/Components/ShoppingCart/CartDescription",
  component: CartDescription,
  args: {
    lines: [
      <LineItem title="Line Item" price="0,00" currency="€" />,
      <LineItem
        title="LineItem"
        price="0,00"
        currency="€"
        moreInfo={
          <CartButton
            tooltip={{ description: "Meer info", tipPosition: "right" }}
            icon={{ name: "status-info" }}
          />
        }
      />,
      <LineItem title="Line Item" price="0,00" currency="€" />,
    ],
  },
  argTypes: {
    lines: {
      control: { type: "array" },
      description: "Array of LineItem components displayed in the cart",
    },
  },
};

export default meta;

type Story = StoryObj<typeof CartDescription>;

export const Basic: Story = {};

export const TwoLines: Story = {
  args: {
    lines: [
      <LineItem title="Line Item" price="0,00" currency="€" />,
      <LineItem
        title="Line Item"
        price="0,00"
        currency="€"
        moreInfo={
          <CartButton
            tooltip={{ description: "Meer info", tipPosition: "right" }}
            icon={{ name: "status-info" }}
          />
        }
      />,
    ],
  },
};

export const OneLine: Story = {
  args: {
    lines: [
      <LineItem
        title="Line Item"
        price="0,00"
        currency="€"
        moreInfo={
          <CartButton
            tooltip={{ description: "Meer info", tipPosition: "right" }}
            icon={{ name: "status-info" }}
          />
        }
      />,
    ],
  },
};
