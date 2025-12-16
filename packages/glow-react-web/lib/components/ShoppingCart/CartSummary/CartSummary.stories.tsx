import { CartDetails } from "../CartDetails";
import { CartCategory } from "../CartDetails/CartDetails";
import { LineItem } from "../LineItem";
import { CartSummary, CartSummaryRow } from "./CartSummary";
import type { Meta, StoryObj } from "@storybook/react";
import { CartSummaryProps } from "./CartSummary.types";
import { CartButton } from "../CartButton";

type StoryProps = CartSummaryProps & {
  showExtraLine: boolean;
  categories: number;
};

const meta: Meta<StoryProps> = {
  title: "DesignSystem/Components/ShoppingCart/CartSummary",
  component: CartSummary,
  args: {
    showExtraLine: false,
    categories: 2,
  },
  argTypes: {
    cartSummaryRows: { control: false },
    expandLinkText: { type: "string" },
    showExtraLine: {
      control: "boolean",
      description:
        "Toggle whether the extra line is displayed (only for Storybook purposes).",
    },
    categories: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6, 7, 8],
      description: "Number of LineItem components in mockCartDetails.",
    },
  },
};

export default meta;

const makeMockCartDetails = (count: number) => (
  <CartDetails>
    {Array.from({ length: count }, (_, i) => (
      <CartCategory title="Category title">
        <LineItem
          key={i}
          title={`Line item ${i + 1}`}
          currency="€"
          price={`${i * 10},00`}
          variant="default"
        />
      </CartCategory>
    ))}
  </CartDetails>
);

export const Basic: StoryObj<StoryProps> = {
  render: ({ showExtraLine, categories }) => {
    const cartSummaryRows = [
      <CartSummaryRow
        key="monthly"
        title="Maandelijks"
        price="0,00"
        currency="€"
        cartDetails={makeMockCartDetails(categories)}
      />,
      <CartSummaryRow
        key="one-time"
        title="Eenmalig"
        beforePrice=""
        price="0,00"
        currency="€"
        cartDetails={makeMockCartDetails(categories)}
      />,
    ];

    return (
      <CartSummary
        cartSummaryRows={cartSummaryRows}
        expandLinkText="Show details"
        extraLine={
          showExtraLine ? (
            <LineItem
              title="Line item"
              currency="€"
              price="100,00"
              variant="default"
              moreInfo={
                <CartButton
                  tooltip={{ description: "Meer info", tipPosition: "right" }}
                  icon={{ name: "status-info" }}
                />
              }
            />
          ) : undefined
        }
      />
    );
  },
};
