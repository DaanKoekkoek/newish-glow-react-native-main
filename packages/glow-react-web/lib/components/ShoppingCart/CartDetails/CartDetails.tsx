import { Strong } from "foundations/Strong";

import type {
  CartDetailsProps,
  CartCategoryProps,
} from "./CartDetails.types.js";
import styles from "./CartDetails.module.scss";
import { tokenClassNames } from "_utility";

export const CartDetails = ({
  children,
  palette = "default",
}: CartDetailsProps) => {
  return (
    <div
      className={tokenClassNames(
        styles,
        "cart-details",
        styles[`cart-details-palette-${palette}`],
      )}
    >
      {children}
    </div>
  );
};

export const CartCategory = ({ title, children }: CartCategoryProps) => {
  return (
    <div className={styles["category-container"]}>
      <Strong className={styles["category-title"]} size="sm">
        {title}
      </Strong>
      {children}
    </div>
  );
};
