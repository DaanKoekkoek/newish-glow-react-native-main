import type { DiscountGroupProps, DiscountProps } from "./Discount.types";
import { Paragraph } from "foundations/Paragraph";
import styles from "./Discount.module.scss";
import { useShoppingCart } from "../ShoppingCartContext";
import { tokenClassNames } from "_utility";

export const Discount = ({
  title,
  price,
  currency,
  moreInfo,
}: DiscountProps) => {
  const { active } = useShoppingCart();

  return (
    <Paragraph
      as="div"
      size="sm"
      className={tokenClassNames(styles, "discount", {
        [styles.inactive]: !active,
      })}
    >
      <div className={styles["discount-title-wrapper"]}>
        <div className={styles["discount-text-title"]}>{title}</div>
        {moreInfo && (
          <div className={styles["discount-more-info"]}>{moreInfo}</div>
        )}
      </div>
      <div className={styles["discount-price-grid"]}>
        <div className={styles["discount-text-currency"]}>{`-${currency}`}</div>
        <div className={styles["discount-text-price"]}>{price}</div>
      </div>
    </Paragraph>
  );
};

export const DiscountGroup = ({ discounts }: DiscountGroupProps) => {
  return (
    <div className={styles["discount-group"]}>
      {discounts.map((discount, index) => (
        <div key={index} className={styles["discount-group-item"]}>
          {discount}
        </div>
      ))}
    </div>
  );
};
