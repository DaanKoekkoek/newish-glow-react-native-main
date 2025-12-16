import { Heading } from "foundations/Heading";
import styles from "./CartDropdownTotal.module.scss";
import { CartDropdownTotalProps } from "./CartDropdownTotal.types";
import { Price } from "components/Price";
import { tokenClassNames } from "_utility";

export const CartDropdownTotal = ({
  totalPerMonth,
  totalOneTime,
}: CartDropdownTotalProps) => {
  return (
    <div className={tokenClassNames(styles, "cart-dropdown-total")}>
      <div className={styles.row}>
        <Heading as="span" className={styles.label} size="xs">
          {totalPerMonth.label}
        </Heading>
        <Price value={totalPerMonth.value} size="sm" />
      </div>
      <div className={styles.row}>
        <Heading as="span" className={styles.label} size="xs">
          {totalOneTime.label}
        </Heading>
        <Price value={totalOneTime.value} size="sm" />
      </div>
    </div>
  );
};
