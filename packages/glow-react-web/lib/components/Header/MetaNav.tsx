import { MetaNavProps } from "./Header.types";
import styles from "./Header.module.scss";
import classNames from "classnames";
import { MetaItem } from "./MetaItem";

export const MetaNav = ({
  children,
  itemList,
  active,
  onSelect,
  className,
  testID,
}: MetaNavProps): JSX.Element => {
  return (
    <div className={styles["meta-nav"]}>
      <nav
        className={classNames(styles["meta-nav-content"], className)}
        data-testid={testID}
      >
        {/* If children are provided, render them directly */}
        {children}

        {/* If itemList is provided, generate MetaItems */}
        {!children &&
          itemList?.map((item, index) => (
            <MetaItem
              key={index}
              id={item}
              active={active === item}
              onClick={() => onSelect?.(item)}
            >
              {item}
            </MetaItem>
          ))}
      </nav>
    </div>
  );
};
