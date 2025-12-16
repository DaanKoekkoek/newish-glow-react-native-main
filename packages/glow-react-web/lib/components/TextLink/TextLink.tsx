import classNames from "classnames";
import React from "react";

import styles from "./TextLink.module.scss";
import type { TextLinkProps, TextLinkSize } from "./TextLink.types";
import { Icon, type IconSize } from "foundations/Icon";
import { ensureExhaustive, tokenClassNames } from "_utility";
import { BaseText } from "_internals/Typography";

const getIconSize = (size: TextLinkSize): IconSize => {
  switch (size) {
    case "xs":
      return "sm";
    case "lg":
      return "md";
    case "sm":
    case "inherit":
    case "default":
      return "default";
  }
};

export const TextLink = ({
  children,
  className: propClassName,
  textClassName,
  ignoreStretched = false,
  inverted = false,
  size = "inherit",
  stretched = false,
  textStyle,
  testID = "text-link",
  inactive,
  ...props
}: TextLinkProps) => {
  const hasIcon = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === Icon,
  );

  props.as = props.as ?? "a";

  const className = tokenClassNames(
    styles,
    "text-link",
    styles[`size-${size}`],
    {
      [styles.disabled]: inactive,
      [styles[`is-inverted`]]: !!inverted,
      [styles["is-stretched"]]: stretched,
      [styles["is-button"]]: props.as === "button",
      [styles["has-ignore-stretched"]]: ignoreStretched,
      [styles["text-and-icon"]]: !!hasIcon,
      [styles["text-only"]]: !hasIcon,
    },
    size === "xs" ? styles.columnGapSm : styles.columnGap,
    propClassName,
  );

  switch (props.as) {
    case "a": {
      const { as, ...rest } = props;
      void as;
      return (
        <a className={className} {...rest} data-testid={testID}>
          <TextLinkChildren
            children={children}
            inverted={inverted}
            size={size}
            textStyle={textStyle}
            textClassName={textClassName}
          />
        </a>
      );
    }
    case "button": {
      const { as, target, type = "button", ...rest } = props;
      void as;
      void target;
      return (
        <button
          type={type}
          className={className}
          {...rest}
          disabled={inactive}
          data-testid={testID}
        >
          <TextLinkChildren
            children={children}
            inverted={inverted}
            size={size}
            textStyle={textStyle}
            textClassName={textClassName}
          />
        </button>
      );
    }
    default:
      return ensureExhaustive(props.as);
  }
};

const TextLinkChildren = ({
  children,
  inverted,
  size = "inherit",
  textStyle,
  textClassName,
  lang = "nl",
}: Pick<
  TextLinkProps,
  "children" | "inverted" | "size" | "textStyle" | "textClassName" | "lang"
>) => {
  return (
    <>
      {React.Children.toArray(children).map((child, index) => {
        if (typeof child === "string") {
          return (
            <BaseText
              lang={lang}
              key={`link-text-${index}`}
              style={textStyle}
              className={classNames(styles["text-link-text"], textClassName, {
                [styles[`is-inverted`]]: !!inverted,
              })}
            >
              {child}
            </BaseText>
          );
        }

        if (React.isValidElement(child) && child.type === Icon) {
          return (
            <Icon
              key={child.key || `link-icon-${index}`}
              size={getIconSize(size)}
              className={classNames(styles.icon, {
                [styles[`is-inverted`]]: !!inverted,
              })}
              style={child.props.style}
              {...child.props}
            />
          );
        }

        if (React.isValidElement(child)) {
          return child;
        }
      })}
    </>
  );
};
