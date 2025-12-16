import { Meta, StoryObj } from "@storybook/react";
import { CartDropdownTotal } from "./CartDropdownTotal";

const meta: Meta = {
  title: "DesignSystem/_internals/ShoppingCart/CartDropdown/CartDropdownTotal",
  component: CartDropdownTotal,
  args: {
    totalOneTime: {
      label: "Totaal eenmalig",
      value: "123",
    },
    totalPerMonth: {
      label: "Totaal per maand",
      value: "69",
    },
  },
  argTypes: {},
};

export default meta;

type Story = StoryObj;

export const Default: Story = {};
