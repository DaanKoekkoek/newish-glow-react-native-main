import React from "react";
import classNames from "classnames";
import { ShoppingCartProps } from "./ShoppingCart.types";
import styles from "./ShoppingCart.module.scss";
import { Heading, Paragraph } from "foundations/index";
import { CartProductProps } from ".";
import { ShoppingCartContext } from "./ShoppingCartContext";
import { tokenClassNames } from "_utility";

export const ShoppingCart = React.forwardRef<HTMLDivElement, ShoppingCartProps>(
  ({ heading, children, callToAction, footnote, active = true }, ref) => {
    return (
      <ShoppingCartContext.Provider value={{ active }}>
        <div className={tokenClassNames(styles, "shopping-cart")} ref={ref}>
          {!!heading && (
            <div className={styles["shopping-cart-heading"]}>
              <div className={styles["shopping-cart-title-and-info"]}>
                <Heading size="md" as="h3">
                  {heading.title}
                </Heading>
                {heading.info}
              </div>
              <Paragraph
                size="sm"
                className={classNames(styles.promotion, {
                  [styles["promotion-inactive"]]: !active,
                })}
              >
                {heading.promotion}
              </Paragraph>
            </div>
          )}
          <div className={styles["shopping-cart-children"]}>
            {React.Children.map(children, (child, index) => {
              if (!React.isValidElement(child)) return child;

              const isProduct = isCartProduct(child);

              return (
                <div
                  key={index}
                  className={classNames(styles["shopping-cart-child"], {
                    [styles["shopping-cart-product-child"]]: isProduct,
                  })}
                >
                  {child}
                </div>
              );
            })}
          </div>
          {(!!callToAction || !!footnote) && (
            <div className={styles["shopping-cart-cta-footnote"]}>
              {!!callToAction && (
                <div className={styles["shopping-cart-cta"]}>
                  {callToAction}
                </div>
              )}
              {!!footnote && (
                <Paragraph
                  className={classNames(styles["shopping-cart-footnote"], {
                    [styles["shopping-cart-footnote-inactive"]]: !active,
                  })}
                  size="xs"
                >
                  {footnote}
                </Paragraph>
              )}
            </div>
          )}
        </div>
      </ShoppingCartContext.Provider>
    );
  },
);

const isCartProduct = (
  element: React.ReactNode,
): element is React.ReactElement<CartProductProps> =>
  React.isValidElement(element) &&
  typeof element.props === "object" &&
  element.props !== null &&
  "image" in element.props; // required prop
