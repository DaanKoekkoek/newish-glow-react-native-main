import {
  CartAccordionRow,
  CartDescription,
  CartDetails,
  CartProduct,
  LineItem,
  Discount,
  CartButton,
  CartCategory,
  CartAccordion,
  CartSummary,
  CartSummaryRow,
  ProductGroupList,
  ProductGroup,
} from ".";
import type { ShoppingCartProps } from "./ShoppingCart.types";
import type { ComplexOption } from "@storybook/utils/complexOptions";
import { Button, TextLink, Tooltip } from "components/index";
import { Icon } from "foundations/index";

export const callToActionOptions: ComplexOption<
  ShoppingCartProps["callToAction"]
>[] = [
  {
    label: "Variant PDP",
    value: [
      <Button as="a" prominence="emphasised" key="btn-1" fill>
        Button text
      </Button>,
      <Button as="a" prominence="secondary" key="btn-2" fill>
        Button text
      </Button>,
    ],
  },
  {
    label: "Variant Extras",
    value: [
      <Button as="a" prominence="emphasised" key="btn-1" fill>
        Button text
      </Button>,
      <TextLink href="#" key="btn-2">
        Text Link
      </TextLink>,
    ],
  },
  {
    label: "Variant Shopping Cart Page",
    value: [
      <Button as="a" prominence="emphasised" key="btn-1" fill>
        Button text
      </Button>,
      <Button as="a" prominence="secondary" key="btn-2" fill>
        Button text
      </Button>,
    ],
  },
  {
    label: "Variant Checkout",
    value: undefined,
  },
  {
    label: "Variant PDP 2",
    value: [
      <Button as="a" state="inactive" prominence="emphasised" key="btn-1" fill>
        Button text
      </Button>,
    ],
  },
];

export const headingOptions: ComplexOption<ShoppingCartProps["heading"]>[] = [
  {
    label: "Variant PDP",
    value: {
      title: "Shopping Cart PDP",
      info: (
        <CartButton
          tooltip={{ description: "Meer info" }}
          icon={{ name: "status-info" }}
        />
      ),
      showDivider: true,
      promotion: "Promotion",
    },
  },
  {
    label: "Variant Extras",
    value: {
      title: "Shopping Cart Extras",
      info: (
        <CartButton
          tooltip={{ description: "Meer info" }}
          icon={{ name: "status-info" }}
        />
      ),
      showDivider: true,
      promotion: "Promotion",
    },
  },
  {
    label: "Variant Shopping Cart Page",
    value: undefined,
  },
  {
    label: "Variant Checkout",
    value: {
      title: "Je bestelling",
      info: <TextLink href="#">Wijzig</TextLink>,
    },
  },
  {
    label: "Variant PDP inactive",
    value: {
      title: "Shopping Cart PDP",
      info: (
        <CartButton
          tooltip={{ description: "Meer info" }}
          icon={{ name: "status-info" }}
        />
      ),
      showDivider: true,
      promotion: "Promotion",
    },
  },
];

export const childrenOptions: ComplexOption<ShoppingCartProps["children"]>[] = [
  {
    label: "Variant PDP",
    value: [
      <CartAccordion
        extraLine={
          <LineItem
            key="line"
            title="Verzekering"
            currency="€"
            price="100,00"
            variant="default"
            onRemove={() => {}}
            description={"Description"}
            discount={<Discount title="Discount" price="0,00" currency="€" />}
          />
        }
        cartAccordionRows={[
          <CartAccordionRow
            key="row-1"
            title="Maandelijks"
            beforePrice="€0,00"
            price={{ value: "0,00", size: "sm" }}
            cartDetails={
              <CartDetails
                children={[
                  <CartCategory title="Line item - default">
                    <LineItem
                      title="Line item"
                      price="0,00"
                      currency="€"
                      onRemove={() => {}}
                      description={"Description"}
                    />
                  </CartCategory>,
                  <CartCategory title="Line item - Free item">
                    <LineItem
                      title="Line item - Free item"
                      price="0,00"
                      currency="€"
                      variant="free item"
                    />
                  </CartCategory>,
                  <CartCategory title="Line item - Short description">
                    <LineItem
                      title="Line item"
                      price="0,00"
                      currency="€"
                      variant="short description"
                    />
                  </CartCategory>,
                ]}
              />
            }
          />,
          <CartAccordionRow
            key="row-2"
            title="Eenmalig"
            beforePrice="€0,00"
            price={{ value: "0,00", size: "sm" }}
            description={<CartDescription lines={["Description"]} />}
            cartDetails={
              <>
                <CartDetails>
                  <CartCategory title="Category title">
                    <LineItem title="Line item" price="100" currency="€" />
                  </CartCategory>
                </CartDetails>
              </>
            }
          />,
        ]}
      />,
      <Tooltip description="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
        <TextLink size="sm">
          <Icon name="status-info" />
          Meer info
        </TextLink>
      </Tooltip>,
    ],
  },
  {
    label: "Variant PDP Inactive",
    value: [
      <>
        <CartAccordion
          extraLine={
            <LineItem
              key="line"
              title="Verzekering"
              currency="€"
              price="100,00"
              variant="default"
              onRemove={() => {}}
              description="Description"
              discount={<Discount title="Discount" price="0,00" currency="€" />}
            />
          }
          cartAccordionRows={[
            <CartAccordionRow
              key="row-1"
              title="Maandelijks"
              beforePrice="€0,00"
              price={{ value: "0,00", size: "sm" }}
              cartDetails={
                <CartDetails>
                  <CartCategory title="Line item - default">
                    <LineItem
                      title="Line item"
                      price="0,00"
                      currency="€"
                      onRemove={() => {}}
                      description="Description"
                    />
                  </CartCategory>
                  <CartCategory title="Line item - Free item">
                    <LineItem
                      title="Line item - Free item"
                      price="0,00"
                      currency="€"
                      variant="free item"
                    />
                  </CartCategory>
                  <CartCategory title="Line item - Short description">
                    <LineItem
                      title="Line item - Short description"
                      price="0,00"
                      currency="€"
                      variant="short description"
                    />
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
                    <LineItem title="Line item" price="100" currency="€" />
                  </CartCategory>
                </CartDetails>
              }
            />,
          ]}
        />
      </>,
      <Tooltip
        active={false}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      >
        <TextLink size="sm" inactive>
          <Icon name="status-info" />
          Meer info
        </TextLink>
      </Tooltip>,
    ],
  },
  {
    label: "Variant Extras 2",
    value: [
      <>
        <CartAccordion
          extraLine={
            <LineItem
              key="line"
              title="Verzekering"
              currency="€"
              price="100,00"
              variant="default"
              onRemove={() => {}}
              description="Description"
              discount={<Discount title="Discount" price="0,00" currency="€" />}
            />
          }
          cartAccordionRows={[
            <CartAccordionRow
              key="row-1"
              title="Maandelijks"
              beforePrice="€0,00"
              price={{ value: "0,00", size: "sm" }}
              cartDetails={
                <CartDetails>
                  <CartCategory title="Line item - default">
                    <LineItem
                      title="Line item"
                      price="0,00"
                      currency="€"
                      onRemove={() => {}}
                      description="Description"
                      discount={[
                        <Discount title="Discount" price="0,00" currency="€" />,
                        <Discount title="Discount" price="0,00" currency="€" />,
                        <Discount title="Discount" price="0,00" currency="€" />,
                      ]}
                    />
                  </CartCategory>
                  <CartCategory title="Line item - Free item">
                    <LineItem
                      title="Line item - Free item"
                      price="0,00"
                      currency="€"
                      variant="free item"
                    />
                  </CartCategory>
                  <CartCategory title="Line item - Short description">
                    <LineItem
                      title="Line item - Short description"
                      price="0,00"
                      currency="€"
                      variant="short description"
                    />
                  </CartCategory>
                </CartDetails>
              }
            />,
            <CartAccordionRow
              key="row-2"
              title="Eenmalig"
              beforePrice="€0,00"
              price={{ value: "0,00", size: "sm" }}
              description={"Description"}
              cartDetails={
                <CartDetails>
                  <CartCategory title="Category title">
                    <LineItem title="Line item" price="100" currency="€" />
                  </CartCategory>
                </CartDetails>
              }
            />,
          ]}
        />
      </>,
    ],
  },
  {
    label: "Variant Shopping Cart Page",
    value: [
      <CartSummary
        cartSummaryRows={[
          <CartSummaryRow
            key="row-1"
            title="Maandelijks"
            promotion="Promotion"
            price="0,00"
            cartDetails={
              <CartDetails>
                <CartCategory title="Category title">
                  <LineItem
                    title="Line item"
                    price="0,00"
                    currency="€"
                    description="Description"
                  />
                </CartCategory>
                <CartCategory title="Category title">
                  <LineItem
                    title="Line item"
                    price="0,00"
                    currency="€"
                    description="Description"
                  />
                </CartCategory>
              </CartDetails>
            }
          />,
          <CartSummaryRow
            key="row-2"
            title="Eenmalig"
            price="0,00"
            cartDetails={
              <CartDetails>
                <CartCategory title="Category title">
                  <LineItem
                    title="Line item"
                    price="0,00"
                    currency="€"
                    description="Description"
                  />
                </CartCategory>
              </CartDetails>
            }
          />,
        ]}
        expandLinkText="Uitleg van je kosten"
      />,
    ],
  },
];

export const checkoutChildrenOptions = {
  label: "Variant Checkout",
  value: (products: number) => [
    <ProductGroupList
      productGroups={Array.from({ length: products }, () => (
        <ProductGroup
          title="Mobiel"
          products={[
            <CartProduct
              image={{
                src: "https://assets.odido.nl/305x450/671d6313b9/dvi-back-front_apple_iphone_15promax_kleur2_305x450_v1.webp",
                alt: "Alt text",
              }}
              title="Product title"
              description={["Description", "Description2"]}
            />,
          ]}
        />
      ))}
    />,
    <CartSummary
      cartSummaryRows={[
        <CartSummaryRow
          key="row-1"
          title="Maandelijks"
          beforePrice="€0,00"
          price={"0,00"}
          cartDetails={
            <CartDetails
              children={
                <>
                  <CartCategory title="Line item - default">
                    <LineItem
                      title="Line item"
                      price="0,00"
                      currency="€"
                      onRemove={() => {}}
                      description={"Description"}
                      discount={[
                        <Discount title="Discount" price="0,00" currency="€" />,
                        <Discount title="Discount" price="0,00" currency="€" />,
                        <Discount title="Discount" price="0,00" currency="€" />,
                      ]}
                    />
                  </CartCategory>
                  <CartCategory title="Line item - Free item">
                    <LineItem
                      title="Line item - Free item"
                      price="0,00"
                      currency="€"
                      variant="free item"
                    />
                  </CartCategory>
                  <CartCategory title="Line item - Short description">
                    <LineItem
                      title="Line item - Free item"
                      price="0,00"
                      currency="€"
                      variant="short description"
                    />
                  </CartCategory>
                </>
              }
            />
          }
        />,
        <CartSummaryRow
          key="row-2"
          title="Eenmalig"
          beforePrice="€0,00"
          price={"0,00"}
          cartDetails={
            <>
              <CartDetails>
                <CartCategory title="Category title">
                  <LineItem title="Line item" price="100" currency="€" />
                </CartCategory>
              </CartDetails>
            </>
          }
        />,
      ]}
      extraLine={
        <LineItem
          key="line"
          title="Verzekering"
          currency="€"
          price="100,00"
          variant="default"
          onRemove={() => {}}
          description={"Description"}
          discount={<Discount title="Discount" price="0,00" currency="€" />}
        />
      }
      expandLinkText="Uitleg van je kosten"
    ></CartSummary>,
  ],
};
