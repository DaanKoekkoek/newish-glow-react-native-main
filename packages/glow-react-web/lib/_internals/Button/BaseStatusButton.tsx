import React from "react";
import styles from "./styles/Button.module.scss";
import type {
  BaseStatusButtonProps,
  SharedButtonProps,
} from "./BaseButton.types";
import { SharedButton } from "./SharedButton";
import { tokenClassNames } from "_utility";

export const BaseStatusButton = <C extends React.ElementType = "button">(
  props: BaseStatusButtonProps<C>,
) => {
  const {
    icon,
    children,
    className,
    prominence = "default",
    size = "default",
    status = "success",
    state = "default",
    fill = false,
    stretched = false,
    ignoreStretched = false,
    inverted = false,
    testID = "base-status-button",
    as,
    ...rest
  } = props;

  const hasIconAndText =
    (!!icon && !!children) || React.Children.count(children) > 1;

  const classes = tokenClassNames(
    styles,
    "button",
    styles[`button-size-${size}`],
    styles[`status-${prominence}-${status}`],
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
      [styles["anchor-fill"]]: as === "a" && !!fill,
    },
    className,
  );

  return (
    <SharedButton
      as={as}
      fill={fill}
      icon={icon}
      size={size}
      state={state}
      testID={testID}
      className={classes}
      {...(rest as SharedButtonProps<C>)}
    >
      {children}
    </SharedButton>
  );
};
