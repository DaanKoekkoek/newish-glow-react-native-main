import classNames from "classnames";

import type { SpinnerProps } from "./Spinner.types";
import styles from "./Spinner.module.scss";
import { GlowIcon, Icon, IconProps } from "foundations/Icon";
import { tokenClassNames } from "_utility";

const Spinner = ({
  style,
  className,
  size = "default",
  color = "default",
  testID = "spinner-icon",
  palette,
}: SpinnerProps) => {
  const spinnerConfig = {
    testID: testID,
    style: style,
    name: "loading",
  } as IconProps;

  return (
    <span
      role="status"
      aria-busy="true"
      aria-live="polite"
      className={tokenClassNames(styles, "spinner")}
    >
      {palette ? (
        <GlowIcon
          maskClassName={classNames(
            styles["spinner-icon"],
            styles[`spinner-icon-color-${color}`],
            styles[`spinner-icon-size-${size}`],
            className,
          )}
          palette={palette}
          zIndex={0}
          {...spinnerConfig}
        />
      ) : (
        <Icon
          className={classNames(
            styles["spinner-icon"],
            styles[`spinner-icon-color-${color}`],
            styles[`spinner-icon-size-${size}`],
            className,
          )}
          {...spinnerConfig}
        />
      )}
    </span>
  );
};

export { Spinner };
