import type { DividerProps } from "./Divider.types";
import styles from "./Divider.module.scss";
import { tokenClassNames } from "_utility";

export const Divider = ({
  prominence = "default",
  variant = "default",
  inverted = false,
  className,
  testID = "divider",
}: DividerProps) => (
  <hr
    className={tokenClassNames(
      styles,
      styles.divider,
      styles[`divider-prominence-${prominence}`],
      styles[`divider-variant-${variant}`],
      {
        [styles["is-inverted"]]: inverted,
      },
      className,
    )}
    data-testid={testID}
  />
);
