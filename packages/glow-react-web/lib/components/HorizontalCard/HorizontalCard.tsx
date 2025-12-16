import React from "react";
import { HorizontalCardProps } from "./HorizontalCard.types";
import styles from "./HorizontalCard.module.scss";
import classNames from "classnames";
import { Paragraph } from "foundations/Paragraph";
import { Heading } from "foundations/Heading";
import { TextLink } from "components/TextLink";
import { GlowIcon } from "foundations/Icon";
import { tokenClassNames } from "_utility";

export const HorizontalCard = ({
  title = "",
  children,
  variant = "default",
  type = "default",
  palette = "default",
  textLink,
  icon,
  iconPosition = "default",
  testID = "horizontal-card",
}: HorizontalCardProps) => {
  return (
    <div
      className={tokenClassNames(styles, "horizontal-card", {
        [styles["subtle"]]: variant === "subtle",
        [styles[`palette-${palette}`]]: variant === "color",
        [styles["outline"]]: variant === "outline",
        [styles[`outline-${palette}`]]: variant === "outline",
        [styles[`position`]]: iconPosition === "right",
      })}
      data-testid={testID}
    >
      {icon && type === "icon" && iconPosition === "default" && (
        <GlowIcon name={icon} size="xl" palette={palette} zIndex={1} />
      )}

      <div className={styles["content"]}>
        {!!title && (
          <Heading as="h3" size="md">
            {title}
          </Heading>
        )}
        {!!children &&
          (React.isValidElement(children) ? (
            children
          ) : (
            <Paragraph className={styles[`description-${variant}`]}>
              {children}
            </Paragraph>
          ))}

        {!!textLink && (
          <TextLink
            {...textLink}
            className={classNames(
              textLink.className,
              styles["horizontal-card-link"],
            )}
          />
        )}
      </div>

      {icon && type === "icon" && iconPosition === "right" && (
        <GlowIcon name={icon} size="xl" palette={palette} zIndex={1} />
      )}
    </div>
  );
};
