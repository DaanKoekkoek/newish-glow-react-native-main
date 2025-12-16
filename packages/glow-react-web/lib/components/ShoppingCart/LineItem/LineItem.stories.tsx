import { Meta } from "@storybook/react";
import { LineItem } from "./LineItem";
import { Discount } from "../Discount";
import { LineItemProps } from "./LineItem.types";
import { CartButton } from "../CartButton";

type StoryProps = LineItemProps & {
  showDescription: boolean;
  showDiscount: boolean;
  showMoreInfo: boolean;
};

const meta: Meta<StoryProps> = {
  title: "DesignSystem/Components/ShoppingCart/LineItem",
  component: LineItem,
  args: {
    title: "Line item",
    currency: "€",
    price: "0,00",
    variant: "default",
    description: "Description",
    showDescription: true,
    showDiscount: true,
    showMoreInfo: true,
  },
  argTypes: {
    title: {
      control: "text",
      description: "Title of the line item (e.g., product name)",
    },
    price: {
      control: "text",
      description:
        "Price of the line item as a formatted string (e.g., '100,00')",
    },
    currency: {
      control: "text",
      description: "Currency symbol or code (e.g., '€', '$')",
    },
    variant: {
      control: "radio",
      options: ["default", "free item", "short description"],
      description:
        "Controls the layout and behavior of the line item:\n- **default**: Standard layout with title, price, description, etc.\n- **free item**: Displays 'Gratis' instead of price.\n- **short description**: Compact layout with minimal info.",
    },
    moreInfo: {
      control: { disable: true },
      description: "Element for additional info",
    },
    onRemove: {
      control: { disable: true },
      description: "Callback executed when the item is removed",
    },
    discount: {
      control: { disable: true },
      description: "Discount information (React element(s))",
    },
    description: {
      description: "Text description of the line item",
      control: { type: "text" },
    },
    showDescription: {
      control: "boolean",
      description: "Toggle description visibility",
    },
    showDiscount: {
      control: "boolean",
      description: "Toggle discount visibility",
    },
    showMoreInfo: {
      control: "boolean",
      description: "Toggle moreInfo icon visibility",
    },
  },
};

export default meta;
type Story = typeof meta;

const buildMoreInfo = () => (
  <CartButton
    tooltip={{ description: "Meer info", tipPosition: "right" }}
    icon={{ name: "status-info" }}
  />
);

const buildDiscounts = () => [
  <Discount
    key="discount-1"
    title="Discount"
    price="0,00"
    currency="€"
    moreInfo={buildMoreInfo()}
  />,
  <Discount
    key="discount-2"
    title="Discount"
    price="0,00"
    currency="€"
    moreInfo={buildMoreInfo()}
  />,
];

export const Basic: Story = {
  render: ({ showDescription, showDiscount, showMoreInfo, ...args }) => (
    <LineItem
      {...args}
      description={showDescription ? args.description : undefined}
      discount={showDiscount ? buildDiscounts() : undefined}
      moreInfo={showMoreInfo ? buildMoreInfo() : undefined}
    />
  ),
};

export const FreeItem: Story = {
  args: {
    ...meta.args,
    title: "Free Item",
    price: "0,00",
    variant: "free item",
  },
  render: ({ showDescription, showDiscount, showMoreInfo, ...args }) => (
    <LineItem
      {...args}
      description={showDescription ? args.description : undefined}
      discount={
        showDiscount ? (
          <Discount title="Discount" price="0,00" currency="€" />
        ) : undefined
      }
      moreInfo={showMoreInfo ? buildMoreInfo() : undefined}
    />
  ),
};

export const ShortDescription: Story = {
  args: { variant: "short description" },
  render: ({ showMoreInfo, ...args }) => (
    <LineItem {...args} moreInfo={showMoreInfo ? buildMoreInfo() : undefined} />
  ),
};
