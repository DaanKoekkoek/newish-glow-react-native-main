import { Divider } from "components/Divider";
import { Strong } from "foundations/Strong";

import type {
  ProductGroupListProps,
  ProductGroupProps,
} from "./ProductGroupList.types";

import styles from "./ProductGroupList.module.scss";
import { tokenClassNames } from "_utility";

export const ProductGroupList = ({ productGroups }: ProductGroupListProps) => {
  return (
    <div className={tokenClassNames(styles, "product-group-list")}>
      {productGroups.map((productGroup) => (
        <>{productGroup}</>
      ))}
    </div>
  );
};

export const ProductGroup = ({ title, products }: ProductGroupProps) => {
  return (
    <div className={styles["product-group-list"]}>
      <Divider prominence="subtle" />
      <div className={styles["product-group-container"]}>
        <Strong className={styles.title}>{title}</Strong>
        {products.map((product) => (
          <>{product}</>
        ))}
      </div>
    </div>
  );
};
