import classNames from "classnames";
import styles from "./CartDropdown.module.scss";
import { CartDropdownProps } from "./CartDropdown.types";
import { Icon } from "foundations/Icon";
import { Paragraph } from "foundations/Paragraph";
import { Divider } from "components/Divider";
import { CartDropdownTotal } from "./CartDropdownTotal/CartDropdownTotal";
import { Button } from "components/Button";
import { CartDropdownProduct } from "./CartDropdownProduct";
import { CartDropdownAnimation } from "./CartDropdownAnimation";
import { tokenClassNames } from "_utility";

export const CartDropdown = ({
  footer = "default",
  footerChildren,
  items,
  type = "empty",
  emptyTitle,
  palette = "default",
  callToAction,
  maxHeight,
  total,
  className,
  animated = false,
}: CartDropdownProps) => {
  const withItems = type === "withItems";

  return (
    <div className={tokenClassNames(styles, "cart-dropdown", className)}>
      <div>
        {withItems ? (
          <CartDropdownAnimation
            className={classNames(styles["cart-dropdown-top"], {
              [styles["cart-dropdown-max-height"]]: maxHeight,
            })}
            maxHeight={maxHeight}
            animated={animated}
            delay={0.4}
          >
            {items?.map((item) => (
              <CartDropdownProduct key={item.title} {...item} />
            ))}
          </CartDropdownAnimation>
        ) : (
          <CartDropdownAnimation
            animated={animated}
            delay={0.4}
            className={classNames(
              styles["cart-dropdown-empty"],
              styles[`cart-dropdown-palette-${palette}`],
            )}
          >
            <Icon
              className={styles["cart-dropdown-icon"]}
              name="shop"
              size="lg"
            />
            <Paragraph
              className={styles["cart-dropdown-empty-title"]}
              size="sm"
            >
              {emptyTitle}
            </Paragraph>
          </CartDropdownAnimation>
        )}
      </div>
      {footer === "default" && callToAction && callToAction.children && (
        <>
          <Divider prominence="subtle" />
          <CartDropdownAnimation
            animated={animated}
            delay={0.5}
            className={styles["cart-dropdown-footer"]}
          >
            {footerChildren ||
              (withItems && total && (
                <div className={styles["cart-dropdown-footer-content"]}>
                  {footerChildren && footerChildren}
                  {withItems && total && <CartDropdownTotal {...total} />}
                </div>
              ))}
            <Button
              {...callToAction}
              fill
              prominence={withItems ? "emphasised" : "default"}
            />
          </CartDropdownAnimation>
        </>
      )}
    </div>
  );
};
