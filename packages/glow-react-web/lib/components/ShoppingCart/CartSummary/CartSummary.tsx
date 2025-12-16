import { Divider } from "components/Divider";
import { TextLink } from "components/TextLink";
import { Strong } from "foundations/Strong";
import React, { useState } from "react";
import type {
  CartSummaryRowProps,
  CartSummaryProps,
} from "./CartSummary.types.js";
import classNames from "classnames";
import { Icon, Paragraph } from "foundations/index.js";
import styles from "./CartSummary.module.scss";
import { tokenClassNames } from "_utility";

export const CartSummary = ({
  cartSummaryRows,
  expandLinkText,
  extraLine,
}: CartSummaryProps) => {
  const [rowsOpen, setRowsOpen] = useState(true);

  return (
    <div className={tokenClassNames(styles, "cart-summary")}>
      <div>
        {cartSummaryRows.map((item, index) => (
          <React.Fragment key={`${index}-${item.props.title}`}>
            {index === 1 && <Divider prominence="subtle" />}
            <item.type {...item.props} open={rowsOpen} />

            {extraLine && index === 0 && (
              <>
                <Divider prominence="subtle" />
                <div className={styles["extra-line"]}>{extraLine}</div>
              </>
            )}
          </React.Fragment>
        ))}
        <Divider prominence="subtle" />
      </div>

      <TextLink size="sm" onClick={() => setRowsOpen(!rowsOpen)}>
        {expandLinkText}
        <Icon name={rowsOpen ? "chevron-up" : "chevron-down"} size="sm" />
      </TextLink>
    </div>
  );
};

export const CartSummaryRow = ({
  title,
  beforePrice,
  price,
  currency = "€",
  cartDetails,
  open = true,
  promotion,
}: CartSummaryRowProps) => (
  <>
    <div className={styles["row-container"]}>
      <div className={styles.content}>
        <div className={styles.row}>
          <Strong className={styles.title}>{title}</Strong>
          <div className={styles["price-container"]}>
            {beforePrice && (
              <Strong
                className={classNames(styles.text, styles["before-price"])}
              >
                {beforePrice}
              </Strong>
            )}
            <Paragraph as="div" size="sm" className={styles.price}>
              <Strong className={classNames(styles.text, styles.currency)}>
                {currency}
              </Strong>
              <Strong className={classNames(styles.text, styles.price)}>
                {price}
              </Strong>
            </Paragraph>
          </div>
        </div>
        {promotion && (
          <Paragraph as="span" size="sm" className={styles.promotion}>
            {promotion}
          </Paragraph>
        )}
      </div>
    </div>
    {open && cartDetails && (
      <div className={styles["cart-details"]}>{cartDetails}</div>
    )}
  </>
);
