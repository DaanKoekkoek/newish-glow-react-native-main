import { Divider, Price } from "components/index.js";
import React, { useState } from "react";
import { CartButton } from "../CartButton/CartButton.js";
import styles from "./CartAccordion.module.scss";
import {
  CartAccordionProps,
  CartAccordionRowProps,
} from "./CartAccordion.types.js";
import classNames from "classnames";
import { Paragraph } from "foundations/index.js";
import { useShoppingCart } from "../ShoppingCartContext";
import { BaseText } from "_internals/index.js";
import { tokenClassNames } from "_utility";

export const CartAccordion = ({
  cartAccordionRows,
  extraLine,
  topDivider = true,
  bottomDivider = true,
}: CartAccordionProps) => {
  const { active } = useShoppingCart();

  return (
    <BaseText as="div" className={tokenClassNames(styles, "cart-accordion")}>
      {topDivider && <Divider prominence="subtle" />}
      {cartAccordionRows.map((cartAccordionRow, index) => (
        <React.Fragment
          key={`${index}-${React.isValidElement(cartAccordionRow) && cartAccordionRow.props?.title ? cartAccordionRow.props.title : "default-title"}`}
        >
          {index > 0 && <Divider prominence="subtle" />}
          {React.isValidElement(cartAccordionRow) && (
            <CartAccordionRow
              {...(cartAccordionRow.props as CartAccordionRowProps)}
            />
          )}
          {extraLine && index === 0 && (
            <>
              <Divider prominence="subtle" />
              <div
                className={classNames(styles["extra-line"], {
                  [styles["text-inactive"]]: !active,
                })}
              >
                {extraLine}
              </div>
            </>
          )}
        </React.Fragment>
      ))}
      {bottomDivider && <Divider prominence="subtle" />}
    </BaseText>
  );
};

export const CartAccordionRow = ({
  title,
  beforePrice,
  price,
  cartDetails,
  description,
  promotion,
}: CartAccordionRowProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { active } = useShoppingCart();

  return (
    <div
      className={tokenClassNames(styles, "cart-accordion-row", {
        [styles["accordion-closed"]]: !open && (!!description || !!promotion),
      })}
    >
      <div
        className={classNames(styles["cart-accordion"], {
          [styles["cart-accordion-open"]]: open,
          [styles["cart-accordion-closed"]]: !open,
        })}
      >
        <div className={styles.content}>
          <div className={styles.row}>
            <button
              type="button"
              className={classNames(styles.title, {
                [styles["text-inactive"]]: !active,
              })}
              onClick={() => {
                if (active) setOpen(!open);
              }}
            >
              <Paragraph as="span" className={styles["title-paragraph"]}>
                {title}
              </Paragraph>
              <div className={styles["price-container"]}>
                <>
                  <div
                    className={classNames(styles.text, {
                      [styles["text-inactive"]]: !active,
                    })}
                  >
                    {beforePrice}
                  </div>
                  <Price
                    {...price}
                    colorClassName={active ? "" : styles["price-inactive"]}
                  />
                  <CartButton
                    as="span"
                    icon={{ name: open ? "chevron-up" : "chevron-down" }}
                  />
                </>
              </div>
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className={styles["cart-details-container"]}>{cartDetails}</div>
      )}
      {(promotion || description) && (
        <div className={styles["open-extras"]}>
          {promotion && (
            <Paragraph
              as="div"
              size="sm"
              className={classNames(styles.promotion, {
                [styles["text-inactive"]]: !active,
              })}
            >
              {promotion}
            </Paragraph>
          )}
          {description && (
            <div
              className={classNames(styles["text-inactive"], {
                [styles.inactive]: !active,
              })}
            >
              {description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
