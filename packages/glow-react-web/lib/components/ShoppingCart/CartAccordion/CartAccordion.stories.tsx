import { Meta, StoryObj } from "@storybook/react";
import { LineItem } from "components/ShoppingCart/LineItem/LineItem.js";
import { CartButton } from "../CartButton/CartButton.js";
import { CartDescription } from "../CartDescription/CartDescription.js";
import { CartDetails, CartCategory } from "../CartDetails/CartDetails.js";
import { CartAccordion, CartAccordionRow } from "./CartAccordion.js";
import { CartAccordionProps } from "./CartAccordion.types.js";

type StoryProps = CartAccordionProps & {
  showExtraLine: boolean;
  showPromotion: boolean;
  showDescription: boolean;
};

const meta: Meta<StoryProps> = {
  title: "DesignSystem/Components/ShoppingCart/CartAccordion",
  component: CartAccordion,
  args: {
    showExtraLine: true,
    showPromotion: true,
    showDescription: true,
    topDivider: true,
    bottomDivider: true,
  },
  argTypes: {
    cartAccordionRows: { control: false },
    extraLine: { control: false },
    topDivider: {
      control: "boolean",
      description: "Toggle the top divider",
    },
    bottomDivider: {
      control: "boolean",
      description: "Toggle the bottom divider",
    },
    showDescription: {
      control: "boolean",
      description:
        "Toggle whether the description is displayed in the accordion rows (only for Storybook purposes).",
    },
    showExtraLine: {
      control: "boolean",
      description:
        "Toggle whether the extra line is displayed (only for Storybook purposes).",
    },
    showPromotion: {
      control: "boolean",
      description:
        "Toggle whether the promotion is displayed (only for Storybook purposes).",
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({
    showExtraLine,
    showPromotion,
    showDescription,
    topDivider,
    bottomDivider,
  }) => {
    const cartAccordionRows = [
      <CartAccordionRow
        key="row-1"
        title="Maandelijks"
        beforePrice="€0,00"
        price={{ value: "0,00", size: "sm" }}
        description={
          showDescription ? (
            <CartDescription
              lines={[
                <LineItem
                  title={"Line Item"}
                  moreInfo={
                    <CartButton
                      tooltip={{
                        description: "Meer info",
                        tipPosition: "right",
                      }}
                      icon={{ name: "status-info" }}
                    />
                  }
                />,
              ]}
            />
          ) : undefined
        }
        promotion={showPromotion ? "Promotion" : undefined}
        cartDetails={
          <CartDetails>
            <CartCategory title="Category title">
              <LineItem title="Line item" price="0,00" currency="€" />
              <LineItem title="Line item" price="0,00" currency="€" />
            </CartCategory>
            <CartCategory title="Category title">
              <LineItem title="Line item" price="0,00" currency="€" />
            </CartCategory>
          </CartDetails>
        }
      />,
      <CartAccordionRow
        key="row-2"
        title="Eenmalig"
        beforePrice="€0,00"
        price={{ value: "0,00", size: "sm" }}
        cartDetails={
          <CartDetails>
            <CartCategory title="Category title">
              <LineItem title="Line item" price="0,00" currency="€" />
            </CartCategory>
          </CartDetails>
        }
      />,
    ];

    return (
      <CartAccordion
        topDivider={topDivider}
        bottomDivider={bottomDivider}
        cartAccordionRows={cartAccordionRows}
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
