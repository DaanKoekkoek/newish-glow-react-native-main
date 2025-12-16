import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CartDropdown } from "./CartDropdown";
import { CartDropdownProps } from "./CartDropdown.types";

const generateProducts = (products: number) =>
  Array.from({ length: products }, () => ({
    title: "Product title",
    description: "Description",
    image: {
      src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
      alt: "Product",
    },
  }));

const meta: Meta<typeof CartDropdown> = {
  title: "DesignSystem/_internals/ShoppingCart/CartDropdown",
  component: CartDropdown,
  argTypes: {
    type: {
      control: "radio",
      options: ["empty", "withItems"],
      description:
        "Defines the type of dropdown — `'empty'` shows an empty cart message, `'withItems'` displays a list of cart products.",
      table: {
        category: "State",
        defaultValue: { summary: "empty" },
        type: { summary: "'empty' | 'withItems'" },
      },
    },
    footer: {
      control: "radio",
      options: ["default", "none"],
      description:
        "Controls footer visibility. `'default'` shows the divider and footer content; `'none'` hides the footer section entirely.",
      table: {
        category: "Footer",
        defaultValue: { summary: "default" },
        type: { summary: "'default' | 'none'" },
      },
    },
    footerChildren: {
      control: false,
      description:
        "Optional React node rendered above the total or CTA button inside the footer. Can be used for extra links or notes.",
      table: { category: "Footer" },
    },
    callToAction: {
      control: false,
      description:
        "Props passed to the `Button` component used as the main call-to-action (e.g. *Go to checkout*).",
      table: {
        category: "Footer",
        type: { summary: "ButtonProps" },
      },
    },
    total: {
      control: false,
      description:
        "Optional cart total information displayed above the CTA button. Accepts `CartDropdownTotalProps`.",
      table: { category: "Content" },
    },
    items: {
      control: false,
      description:
        "Array of product objects to render within the dropdown when `type='withItems'`. Each entry uses `CartDropdownProductProps`.",
      table: {
        category: "Content",
        type: { summary: "CartDropdownProductProps[]" },
      },
    },
    maxHeight: {
      control: "boolean",
      description:
        "If `true`, constrains the list area to a maximum height and enables internal scrolling for large item lists.",
      table: {
        category: "Layout",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    emptyTitle: {
      control: "text",
      description:
        "Text displayed when the cart is empty and `type='empty'`. Usually something like *Your cart is empty*.",
      table: { category: "Empty State" },
    },
    palette: {
      control: "select",
      options: ["default", "light", "dark", "brand"], // adjust based on your OdidoPalette values
      description:
        "Applies a color palette to the empty-state background. Uses `OdidoPalette` tokens.",
      table: {
        category: "Appearance",
        defaultValue: { summary: "default" },
        type: { summary: "OdidoPalette" },
      },
    },
    className: {
      control: false,
      description: "Optional additional class name for custom styling.",
      table: { category: "Styling" },
    },
    animated: {
      control: "boolean",
      description:
        "Enables staggered entrance animations for dropdown content when `true`.",
      table: {
        category: "Animation",
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
  },
  args: {
    emptyTitle: "Je winkelwagen is leeg",
    footer: "default",
    total: {
      totalOneTime: {
        label: "Totaal eenmalig",
        value: "123",
      },
      totalPerMonth: {
        label: "Totaal per maand",
        value: "69",
      },
    },
    callToAction: {
      onClick: action("cartDropdown.onClick"),
      children: "Naar winkelwagen",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

type CartDropdownStory = StoryObj<
  CartDropdownProps & {
    products: number;
  }
>;

export const Default: CartDropdownStory = {
  argTypes: {
    products: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6, 7],
      description: "Number of panel dropdown items (1–7).",
    },
  },
  args: {
    type: "withItems",
    products: 2,
  },
  parameters: {
    controls: {
      exclude: ["items", "type", "footerChildren"],
    },
  },
  render: ({ products, ...args }) => {
    return <CartDropdown {...args} items={generateProducts(products)} />;
  },
};

export const Empty: Story = {
  args: {
    type: "empty",
  },
  parameters: {
    controls: {
      exclude: ["total", "items", "maxHeight", "type", "footerChildren"],
    },
  },
};
