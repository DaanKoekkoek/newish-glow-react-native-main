import { Heading } from "foundations/Heading";
import styles from "./Highlight.module.scss";
import type { HighlightProps } from "./Highlight.types";
import classNames from "classnames";
import { GlowGradient } from "foundations/GlowGradient";
import { tokenClassNames } from "_utility";

export const Highlight = ({
  variant = "default",
  state = "default",
  testID = "highlight",
  children,
  palette = "default",
  className,
  gradientClassName,
  textClassName,
}: HighlightProps) => {
  const isSpacious = variant === "spacious";
  const isCompact = variant === "compact";
  const isInactive = state === "inactive";

  return (
    <div
      className={tokenClassNames(
        styles,
        "highlight",
        {
          [styles["is-inactive"]]: isInactive,
          [styles["is-spacious"]]: isSpacious,
          [styles["is-compact"]]: isCompact,
        },
        className,
      )}
      data-testid={testID}
    >
      {state === "hover" && (
        <GlowGradient
          palette={palette}
          zIndex={0}
          className={classNames(
            styles["highlight-gradient"],
            gradientClassName,
          )}
        />
      )}
      <Heading
        as="span"
        size={isCompact ? "xs" : "sm"}
        className={classNames(styles["highlight-heading"], textClassName)}
      >
        {children}
      </Heading>
    </div>
  );
};
