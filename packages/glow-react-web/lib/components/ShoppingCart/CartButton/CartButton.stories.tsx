import { Meta } from "@storybook/react";
import { CartButton } from "./CartButton.js";
import { glyphmap } from "@odido-portals/glow-icon/fonts";
import { createComplexControl } from "@storybook/utils/complexOptions";

const iconOptions = Object.keys(glyphmap).map((iconName) => ({
  label: iconName,
  value: { name: iconName },
}));

const meta: Meta<typeof CartButton> = {
  title: "DesignSystem/Components/ShoppingCart/CartButton",
  component: CartButton,
  args: {
    icon: {
      name: "status-info",
      size: "sm",
    },
    onClick: () => alert("Cart button clicked!"),
  },
  argTypes: {
    icon: {
      ...createComplexControl(iconOptions, "select"),
      description:
        "Icon to be displayed inside the CartButton. Must be an object `{ name: string }` corresponding to a valid glyph name.",
      table: {
        type: {
          summary:
            "{ name: IconNames; size?: IconSize; solid?: boolean; brand?: BrandName; }",
        },
        defaultValue: { summary: "{ name: 'status-info' }" },
      },
    },
    onClick: {
      description: "Callback function invoked when the CartButton is clicked.",
      tooltip: {
        control: { disable: true },
      },
      table: {
        type: {
          summary: "() => void",
        },
      },
    },
    tooltip: {
      control: { disable: true },
    },
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {};

export const WithTooltip: Story = {
  args: {
    tooltip: {
      description: "Click for more information",
    },
  },

  render: function Render({ ...args }) {
    return <CartButton {...args} />;
  },
};
