import classNames from "classnames";
import styles from "./LineItem.module.scss";
import type { LineItemProps } from "./LineItem.types";
import { CartButton } from "../CartButton";
import { Paragraph } from "foundations/Paragraph";
import { useShoppingCart } from "../ShoppingCartContext";
import { tokenClassNames } from "_utility";

export const LineItem = ({
  variant = "default",
  title,
  currency,
  price,
  moreInfo,
  description,
  onRemove,
  discount,
}: LineItemProps) => {
  const { active } = useShoppingCart();
  const isShortDescription = variant === "short description";
  const isFreeItem = variant === "free item";

  const discountContent =
    !isShortDescription && discount ? (
      Array.isArray(discount) ? (
        discount.map((d, index) => (
          <Paragraph
            size="sm"
            key={index}
            className={classNames(styles.text, {
              [styles["text-inactive"]]: !active,
            })}
          >
            {d}
          </Paragraph>
        ))
      ) : (
        <div
          className={classNames(styles.text, {
            [styles["text-inactive"]]: !active,
          })}
        >
          {discount}
        </div>
      )
    ) : null;

  return (
    <Paragraph
      as="div"
      size="sm"
      data-line-item
      className={tokenClassNames(styles, "line-item")}
    >
      {onRemove && !isShortDescription && (
        <div className={styles["remove-button"]}>
          <CartButton onClick={onRemove} icon={{ name: "status-error" }} />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles["title-wrapper"]}>
            <div
              className={classNames(styles.text, {
                [styles["short-description"]]: isShortDescription,
              })}
            >
              {title}
              {moreInfo && (
                <div className={styles["text-tooltip"]}>{moreInfo}</div>
              )}
            </div>
          </div>

          {!isFreeItem ? (
            <div className={styles["price-grid"]}>
              {variant === "default" && (
                <>
                  <div className={classNames(styles.price, styles.currency)}>
                    {currency}
                  </div>
                  <div className={styles.price}>{price}</div>
                </>
              )}
            </div>
          ) : (
            <div className={styles["free-item"]}>
              <div className={styles.text}>Gratis</div>
            </div>
          )}
        </div>

        {description && (
          <div
            className={classNames(styles.description, {
              [styles["short-description"]]: isShortDescription,
              [styles.inactive]: !active,
            })}
          >
            {description}
          </div>
        )}

        {discountContent}
      </div>
    </Paragraph>
  );
};
