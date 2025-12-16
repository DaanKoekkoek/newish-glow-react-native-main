import type { StrongProps } from "./Strong.types";
import styles from "./Strong.module.scss";
import { tokenClassNames } from "_utility";

export const Strong = ({
  children,
  className,
  size,
  alignment,
  testID = "strong",
}: StrongProps) => {
  return (
    <strong
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "strong",
        {
          [styles[`strong-align-${alignment}`]]: alignment,
          [styles[`strong-size-${size}`]]: size,
        },
        className,
      )}
    >
      {children}
    </strong>
  );
};
