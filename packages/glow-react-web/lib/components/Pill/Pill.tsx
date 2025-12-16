import classNames from "classnames";
import { PillProps } from "./Pill.types";
import styles from "./Pill.module.scss";
import { PhoneBrand } from "foundations/PhoneBrand";
import { tokenClassNames } from "_utility";

export const Pill = ({
  title,
  variant = "default",
  brand,
  state = "default",
  onChange,
  testID = "pill",
  palette = "default",
  id,
  ...inputProps
}: PillProps) => {
  return (
    <div className={tokenClassNames(styles, "pill")} data-testid={testID}>
      <input
        disabled={state === "inactive"}
        type="checkbox"
        onChange={onChange}
        className={styles["pill-input"]}
        id={id}
        {...inputProps}
      />
      <label
        className={classNames(
          styles["pill-label"],
          styles[`pill-label-palette-${palette}`],
        )}
        htmlFor={id}
      >
        {variant === "logo" && brand ? (
          <PhoneBrand
            brand={brand}
            state={state}
            className={styles["pill-logo"]}
          />
        ) : (
          <span className={styles["pill-title"]}>{title}</span>
        )}
      </label>
    </div>
  );
};
