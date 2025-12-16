import type { Meta } from "@storybook/react";
import { Discount, DiscountGroup } from "./Discount";
import { CartButton } from "../CartButton/CartButton";
import { DiscountProps } from "./Discount.types";

type StoryProps = DiscountProps & {
  showMoreInfo: true | false;
};

const meta: Meta<StoryProps> = {
  title: "DesignSystem/Components/ShoppingCart/Discount",
  component: Discount,
  args: {
    title: "Discount",
    price: "0,00",
    currency: "€",
    showMoreInfo: true,
  },
  argTypes: {
    title: {
      description:
        "The title or label of the discount (e.g., 'Black Friday Discount')",
      control: { type: "text" },
    },
    price: {
      description: "The numerical value of the discount (e.g., '10,00')",
      control: { type: "text" },
    },
    currency: {
      description: "The currency symbol displayed with the price (e.g., '€')",
      control: { type: "text" },
    },
    showMoreInfo: {
      description:
        "Toggle whether the More Info icon is shown (only for storybook purposes).",
      control: { type: "boolean" },
    },
    moreInfo: { control: { disable: true } },
  },
};

export default meta;

type Story = typeof meta;

export const Basic: Story = {
  render: function Render(args) {
    const { showMoreInfo, ...rest } = args;

    const moreInfoIcon = showMoreInfo ? (
      <CartButton
        tooltip={{ description: "Meer info", tipPosition: "left" }}
        icon={{ name: "status-info" }}
      />
    ) : undefined;

    return (
      <DiscountGroup
        discounts={[
          <Discount key="d1" {...rest} moreInfo={moreInfoIcon} />,
          <Discount
            key="d2"
            title="Second Discount"
            price="5,00"
            currency="€"
            moreInfo={moreInfoIcon}
          />,
        ]}
      />
    );
  },
};
