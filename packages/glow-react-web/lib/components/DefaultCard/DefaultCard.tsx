import classNames from "classnames";
import { DefaultCardProps, DefaultCardBadgeProps } from "./DefaultCard.types";
import styles from "./DefaultCard.module.scss";
import { PriceContext } from "_internals/Typography";
import { Badge } from "components/Badge";
import { Heading, GlowGradient, GlowIcon } from "foundations/index";
import { CallToActions } from "_internals/Navigation";
import { Visual } from "_internals/Assets";
import { Highlight } from "_internals/Highlight";
import { tokenClassNames } from "_utility";

export const DefaultCard = ({
  title,
  badgeText,
  highlightText,
  icon,
  image,
  price,
  children,
  variant,
  callToAction,
  type = "none",
  palette = "default",
  testID = "default-card",
}: DefaultCardProps) => {
  const hasImage =
    type === "image" || type === "illustration" || type === "mini";
  const hasHighlight = !!highlightText && type !== "mini";
  const hasContentAbove = hasImage || hasHighlight;

  return (
    <div
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "default-card",
        styles[`default-card-variant-${variant}`],
        styles[`default-card-type-${type}`],
        styles[`has-${palette}-palette`],
        {
          [styles["default-card-highlight-outline"]]: hasHighlight,
          [styles["default-card-no-content-above"]]: !hasContentAbove,
          [styles[`default-card-variant-${variant}-highlight`]]: hasHighlight,
        },
      )}
    >
      {!!highlightText && highlightText !== "" && type !== "mini" && (
        <Highlight
          className={styles["default-card-highlight"]}
          textClassName={styles["default-card-highlight-text"]}
          palette={palette}
        >
          {highlightText}
        </Highlight>
      )}
      {(type === "image" || type === "mini" || type === "illustration") &&
        !!image && (
          <div className={styles["default-card-image"]}>
            <Visual
              {...image}
              noPadding="all"
              type={type}
              background={
                variant === "default" ||
                (variant === "emphasised" && type !== "illustration")
                  ? variant
                  : "default"
              }
              fill={["height"]}
              palette={palette}
              className={classNames(styles["default-card-image-style"], {
                [styles["default-card-image-illustration"]]:
                  type === "illustration",
              })}
              renderType="foreground"
            >
              <div className={styles["default-card-image-content"]}>
                <DefaultCardBadge palette={palette} badgeText={badgeText} />
              </div>
            </Visual>
          </div>
        )}
      <div className={styles["default-card-content"]}>
        {type === "icon" && !!icon && (
          <GlowIcon name={icon} size="xl" palette={palette} zIndex={1} />
        )}
        <div className={styles["default-card-title"]}>
          {type !== "image" && type !== "mini" && type !== "illustration" && (
            <DefaultCardBadge palette={palette} badgeText={badgeText} />
          )}
          {!!title && (
            <Heading as="h3" {...title} size={type !== "mini" ? "lg" : "xs"} />
          )}
        </div>
        {!!children && type !== "mini" && (
          <div className={styles["default-card-content-children"]}>
            {children}
          </div>
        )}
        {!!price && (
          <PriceContext
            {...price}
            className={styles["default-card-price"]}
            size={type === "mini" ? "sm" : undefined}
          />
        )}
        {!!callToAction && (
          <CallToActions
            className={styles["default-card-call-to-action"]}
            fill={true}
          >
            {callToAction}
          </CallToActions>
        )}
      </div>
      {variant === "emphasised" && !highlightText && (
        <GlowGradient
          zIndex={1}
          palette={palette}
          className={classNames(styles["default-card-gradient"])}
        />
      )}
    </div>
  );
};

const DefaultCardBadge = ({ palette, badgeText }: DefaultCardBadgeProps) => {
  return badgeText ? (
    <div className={styles["default-card-badge"]}>
      <Badge palette={palette} text={badgeText} />
    </div>
  ) : null;
};
