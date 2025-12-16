import { Meta, StoryObj } from "@storybook/react";
import { ShoppingCart } from "./ShoppingCart";
import {
  callToActionOptions,
  headingOptions,
  childrenOptions,
  checkoutChildrenOptions,
} from "./ShoppingCart.mocks";
import { ShoppingCartProps } from "./ShoppingCart.types";
import { Column, Grid } from "foundations/Grid";

type StoryProps = ShoppingCartProps & {
  showSecondCallToAction: boolean;
  showFootnote: boolean;
  showMoreInfo: boolean;
};

const meta: Meta<StoryProps> = {
  title: "DesignSystem/Components/ShoppingCart/ShoppingCart",
  argTypes: {
    heading: {
      control: { disable: true },
      description:
        "An object with the following shape: `{ title: string; info?: ReactElement; showDivider?: boolean }`. Used to render the shopping cart's heading area with optional supporting content and a divider.",
    },
    children: {
      control: { disable: true },
      description:
        "Content displayed inside the shopping cart. Should only contain atoms related to the `ShoppingCart`. Accepts `ReactNode`.",
    },
    callToAction: {
      control: { disable: true },
      description:
        "Optional action elements rendered below the cart content. Typically includes `<Button />` or `<TextLink />`. Accepts `ReactNode`.",
    },
    footnote: {
      control: { disable: true },
      description: "Display additional text underneath `callToAction`.",
    },

    showSecondCallToAction: {
      control: "boolean",
      description:
        "Toggle whether the call to action section is displayed (only for Storybook purposes).",
    },
    showFootnote: {
      control: "boolean",
      description:
        "Toggle whether the footnote section is displayed (only for Storybook purposes).",
    },
    showMoreInfo: {
      control: "boolean",
      description:
        "Toggle whether the More Info icon is shown (only for Storybook purposes).",
    },
  },
  args: {
    heading: headingOptions[0].value,
    children: childrenOptions[0].value,
    callToAction: callToActionOptions[0].value,
    footnote: "Footnote",
    showSecondCallToAction: true,
    showFootnote: true,
    showMoreInfo: true,
  },
  component: ShoppingCart,
};

export default meta;

type Story = StoryObj<StoryProps>;

export const PDP: Story = {
  args: {
    showSecondCallToAction: true,
    showFootnote: true,
    showMoreInfo: true,
  },
  render: ({ showSecondCallToAction, showFootnote, showMoreInfo, ...args }) => {
    return (
      <Grid>
        <Column>
          <ShoppingCart
            {...args}
            heading={{
              ...args.heading,
              title: args.heading?.title ?? "Shopping Cart PDP",
              info: showMoreInfo ? args.heading?.info : undefined,
            }}
            callToAction={
              showSecondCallToAction
                ? args.callToAction
                : callToActionOptions[4].value
            }
            footnote={showFootnote ? args.footnote : undefined}
          />
        </Column>
        <Column>
          <ShoppingCart
            {...args}
            active={false}
            children={childrenOptions[1].value}
            heading={headingOptions[4].value}
            callToAction={callToActionOptions[4].value}
            footnote={showFootnote ? args.footnote : undefined}
          />
        </Column>
      </Grid>
    );
  },
};

export const Extras: Story = {
  args: {
    showSecondCallToAction: true,
    showFootnote: true,
    showMoreInfo: true,
    heading: headingOptions[1].value,
    children: childrenOptions[1].value,
    callToAction: callToActionOptions[1].value,
  },
  argTypes: {
    showSecondCallToAction: { control: { disable: true } },
  },
  render: ({ showSecondCallToAction, showFootnote, showMoreInfo, ...args }) => {
    return (
      <Grid>
        <Column>
          <ShoppingCart
            {...args}
            heading={{
              ...args.heading,
              title: args.heading?.title ?? "Shopping Cart Extra's",
              info: showMoreInfo ? args.heading?.info : undefined,
            }}
            callToAction={
              showSecondCallToAction
                ? args.callToAction
                : callToActionOptions[4].value
            }
            footnote={showFootnote ? args.footnote : undefined}
          />
        </Column>
        <Column>
          <ShoppingCart
            {...args}
            children={childrenOptions[2].value}
            heading={{
              ...args.heading,
              title: args.heading?.title ?? "Shopping Cart Extra's",
              info: showMoreInfo ? args.heading?.info : undefined,
            }}
            callToAction={
              showSecondCallToAction
                ? args.callToAction
                : callToActionOptions[4].value
            }
            footnote={showFootnote ? args.footnote : undefined}
          />
        </Column>
      </Grid>
    );
  },
};

export const ShoppingCartPage: Story = {
  args: {
    showSecondCallToAction: true,
    showFootnote: true,
    heading: headingOptions[2].value,
    children: childrenOptions[3].value,
  },
  render: ({ showSecondCallToAction, showFootnote, ...args }) => {
    return (
      <ShoppingCart
        {...args}
        callToAction={
          showSecondCallToAction
            ? args.callToAction
            : callToActionOptions[4].value
        }
        footnote={showFootnote ? args.footnote : undefined}
      />
    );
  },
};

type CheckoutStory = StoryObj<
  StoryProps & {
    products: number;
  }
>;

export const Checkout: CheckoutStory = {
  args: {
    showSecondCallToAction: false,
    showFootnote: true,
    heading: headingOptions[3].value,
    callToAction: undefined,
    products: 1,
  },
  argTypes: {
    products: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5],
      description: "Number of product groups in checkout (1–5).",
    },
  },
  render: ({ showFootnote, products, ...args }) => {
    return (
      <ShoppingCart
        {...args}
        children={checkoutChildrenOptions.value(products)}
        footnote={showFootnote ? args.footnote : undefined}
      />
    );
  },
};
