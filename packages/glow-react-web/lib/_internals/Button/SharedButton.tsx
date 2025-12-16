import React from "react";
import styles from "./styles/Button.module.scss";
import { BaseButtonIcon } from "./BaseButtonIcon";
import { Spinner, type SpinnerSize } from "components/Spinner";
import type {
  BaseButtonSize,
  PolymorphicRef,
  SharedButtonProps,
} from "./BaseButton.types";
import { useGenerateClassNames } from "_global-hooks";
import classNames from "classnames";

const getSpinnerSize = (size?: BaseButtonSize): SpinnerSize => {
  switch (size) {
    case "sm":
      return "sm";
    case "default":
    case "lg":
    default:
      return "default";
  }
};

export const SharedButton = React.forwardRef(
  <C extends React.ElementType = "button">(
    {
      as,
      icon,
      children,
      state,
      className,
      testID,
      size,
      onClick,
      ariaLabel,
      fill,
      ...props
    }: SharedButtonProps<C>,
    ref: PolymorphicRef<C>, // ✨ typed ref
  ) => {
    const Component = as || "button";
    const isDisabled = state === "inactive" || state === "loading";
    const isLoading = state === "loading";
    const fillClass = useGenerateClassNames(styles, fill, "fill");

    return (
      <Component
        ref={ref}
        className={classNames(fillClass, className)}
        tabIndex={Component !== "button" && isDisabled ? -1 : undefined}
        onClick={onClick}
        data-testid={testID}
        disabled={Component === "button" ? isDisabled : undefined}
        aria-busy={isLoading === true ? isLoading : undefined}
        aria-label={ariaLabel}
        {...props}
      >
        {isLoading && (
          <Spinner
            size={getSpinnerSize(size)}
            className={styles["button-loading-icon"]}
          />
        )}
        {icon && icon.position !== "right" && (
          <BaseButtonIcon buttonIconSize={size} {...icon} />
        )}
        <span className={styles["button-label"]}>{children}</span>
        {icon && icon.position === "right" && (
          <BaseButtonIcon buttonIconSize={size} {...icon} />
        )}
      </Component>
    );
  },
);
