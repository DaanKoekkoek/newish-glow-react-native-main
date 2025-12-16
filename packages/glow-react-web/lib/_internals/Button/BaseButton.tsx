import React from "react";
import styles from "./styles/Button.module.scss";
import { SharedButton } from "./SharedButton";
import type {
  BaseButtonProps,
  PolymorphicRef,
  SharedButtonProps,
} from "./BaseButton.types";
import { tokenClassNames } from "_utility";
export const BaseButton = React.forwardRef(
  <C extends React.ElementType = "button">(
    props: BaseButtonProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
    const {
      icon,
      children,
      className,
      prominence = "default",
      size = "default",
      state = "default",
      fill = false,
      stretched = false,
      ignoreStretched = false,
      inverted = false,
      testID = "base-button",
      as,
      ...rest
    } = props;

    const hasIconAndText =
      (!!icon && !!children) || React.Children.count(children) > 1;

    return (
      <SharedButton
        as={as}
        fill={fill}
        ref={ref}
        icon={icon}
        size={size}
        state={state}
        testID={testID}
        className={tokenClassNames(
          styles,
          "button",
          styles[`button-size-${size}`],
          styles[`button-prominence-${prominence}`],
          {
            [styles["has-icon-left-and-text"]]:
              hasIconAndText && icon?.position === "right",
            [styles["has-icon-right-and-text"]]:
              hasIconAndText && icon?.position !== "right",
            [styles["has-icon-only"]]: !!icon && !children,
            [styles["is-inverted"]]: inverted,
            [styles["is-loading"]]: state === "loading",
            [styles["button-stretched"]]: stretched,
            [styles["button-ignore-stretched"]]: ignoreStretched,
          },
          className,
        )}
        {...(rest as SharedButtonProps<C>)}
      >
        {children}
      </SharedButton>
    );
  },
);
