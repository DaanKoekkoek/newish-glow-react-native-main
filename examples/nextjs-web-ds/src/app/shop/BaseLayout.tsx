"use client";

import { Button } from "@odido-portals/glow-react-web/button";
import { Heading } from "@odido-portals/glow-react-web/heading";
import { Icon } from "@odido-portals/glow-react-web/icon";
import { ShopSection } from "@odido-portals/glow-react-web/shop-section";
import { TextLink } from "@odido-portals/glow-react-web/text-link";
import type { BrandName } from "@odido-portals/glow-react-web/theme-provider";
import { usePathname, useRouter } from "next/navigation";

import type { BaseType } from "../base.types";

import {
  ShoppingCart,
  CartAccordion,
  CartAccordionRow,
  CartDetails,
  CartCategory,
  LineItem,
  CartDescription,
  Discount,
} from "@/app/ClientComponents";
import { CodeSnippet } from "@/app/CodeSnippet";
import { usePersistentStateReadOnly } from "@/app/hooks";

type ShopBaseLayout = BaseType & {
  type?: "split" | "single";
  title?: string;
  hideWhenVisibleRef?: React.RefObject<HTMLDivElement>;
};

export default function BaseLayout({
  children,
  type = "split",
  title,
  code,
  hideWhenVisibleRef,
}: ShopBaseLayout) {
  const router = useRouter();
  const pathName = usePathname();
  const brand = usePersistentStateReadOnly<BrandName>("odido", "odido");

  const isPDP = pathName.includes("/shop/pdp");
  const isCheckout = pathName.includes("/shop/checkout/winkelwagen");

  const buttonText = isPDP
    ? "Ga naar winkelwagen"
    : isCheckout
      ? "Ga naar gegevens"
      : "Button text";
  const linkTarget = isPDP
    ? "/shop/checkout/winkelwagen"
    : "/shop/checkout/gegevens";

  return (
    <ShopSection
      variant={brand === "sim-wallet" ? "subtle" : "default"}
      above={
        !!title && (
          <Heading size="xl" as="h1">
            {title}
          </Heading>
        )
      }
      aside={
        type === "split" && (
          <ShoppingCart
            ref={hideWhenVisibleRef}
            footnote="Footnote"
            heading={{
              info: <Icon name="status-info" size="sm" />,
              showDivider: true,
              title: "Shopping Cart",
            }}
            callToAction={
              pathName.match(/gegevens\/?$/)
                ? undefined
                : [
                    <Button
                      key="btn-1"
                      as="a"
                      fill
                      prominence="emphasised"
                      onClick={() => router.push(linkTarget)}
                    >
                      {buttonText}
                    </Button>,
                    <Button key="btn-2" as="a" fill prominence="secondary">
                      Button text
                    </Button>,
                  ]
            }
          >
            <CartAccordion
              cartAccordionRows={[
                <CartAccordionRow
                  key="monthly"
                  beforePrice="€0,00"
                  cartDetails={
                    <CartDetails key="detail-1">
                      <CartCategory title="Line item - default">
                        <LineItem
                          currency="€"
                          description="Description"
                          discount={[
                            <Discount
                              key="discount-1"
                              currency="€"
                              price="0,00"
                              title="Discount"
                            />,
                            <Discount
                              key="discount-1"
                              currency="€"
                              price="0,00"
                              title="Discount"
                            />,
                            <Discount
                              key="discount-1"
                              currency="€"
                              price="0,00"
                              title="Discount"
                            />,
                          ]}
                          price="0,00"
                          title="Line item"
                        />
                      </CartCategory>
                      <CartCategory title="Line item - Free item">
                        <LineItem
                          currency="€"
                          price="0,00"
                          title="Line item - Free item"
                          variant="free item"
                        />
                      </CartCategory>
                      <CartCategory title="Line item - Short description">
                        <LineItem
                          currency="€"
                          price="0,00"
                          title="Line item - Free item"
                          variant="short description"
                        />
                      </CartCategory>
                    </CartDetails>
                  }
                  description={<CartDescription lines={["Description"]} />}
                  price={{
                    size: "sm",
                    value: "0,00",
                  }}
                  title="Maandelijks"
                />,
                <CartAccordionRow
                  key="one-off"
                  beforePrice="€0,00"
                  cartDetails={
                    <>
                      <CartDetails>
                        <CartCategory title="Category title">
                          <LineItem
                            currency="€"
                            price="100"
                            title="Line item"
                          />
                        </CartCategory>
                      </CartDetails>
                    </>
                  }
                  price={{
                    size: "sm",
                    value: "0,00",
                  }}
                  title="Eenmalig"
                />,
              ]}
            />
            <TextLink>
              <Icon name="status-info" size="sm" /> Meer info
            </TextLink>
          </ShoppingCart>
        )
      }
    >
      {children} {!!code && <CodeSnippet code={code} />}
    </ShopSection>
  );
}
