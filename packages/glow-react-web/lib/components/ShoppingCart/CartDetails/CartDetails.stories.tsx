import type { Meta } from "@storybook/react";
import { CartDetails, CartCategory } from "./CartDetails";
import { LineItem } from "../LineItem";
import { CartButton } from "../CartButton";
import { Discount } from "../Discount";
import { OdidoPalette } from "_internals/Color";

type StoryProps = React.ComponentProps<typeof CartDetails> & {
  showMoreInfo: boolean;
};

const meta: Meta<StoryProps> = {
  title: "DesignSystem/Components/ShoppingCart/CartDetails",
  component: CartDetails,
  args: {
    palette: "default",
    showMoreInfo: true,
  },
  argTypes: {
    palette: {
      control: { type: "select" },
      options: [...OdidoPalette],
      description: "Set the colour palette of CartDetails.",
    },
    showMoreInfo: {
      description:
        "Toggle whether the More Info icon is shown (only for Storybook purposes).",
      control: { type: "boolean" },
    },
    children: { control: { disable: true } },
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  render: function Render(args) {
    const { showMoreInfo, ...cartArgs } = args;

    const moreInfoIcon = showMoreInfo ? (
      <CartButton
        tooltip={{ description: "Meer info", tipPosition: "right" }}
        icon={{ name: "status-info" }}
      />
    ) : undefined;

    return (
      <CartDetails {...cartArgs}>
        {[0, 1].map((idx) => (
          <CartCategory title={`Category ${idx + 1}`} key={idx}>
            <LineItem
              title={`Line item ${idx + 1}`}
              currency="€"
              price="100,00"
              variant="default"
              discount={
                <Discount
                  title="Discount"
                  price="0,00"
                  currency="€"
                  moreInfo={moreInfoIcon}
                />
              }
            />
          </CartCategory>
        ))}
      </CartDetails>
    );
  },
};
