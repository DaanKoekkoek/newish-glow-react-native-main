import { tokenClassNames } from "_utility";
import styles from "./Badge.module.scss";
import { type BadgeProps } from "./Badge.types";

export const Badge = ({
  text,
  prominence = "default",
  state = "default",
  palette = "default",
  testID,
}: BadgeProps) => {
  const inactive = state === "inactive";

  return (
    <div
      className={tokenClassNames(
        styles,
        "badge",
        styles[`badge-prominence-${prominence}`],
        styles[`badge-palette-${palette}`],
        {
          [styles[`is-inactive`]]: inactive,
        },
      )}
      data-testid={testID}
    >
      {text}
    </div>
  );
};
