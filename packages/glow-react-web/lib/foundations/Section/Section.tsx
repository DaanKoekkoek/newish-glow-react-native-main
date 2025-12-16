import styles from "./Section.module.scss";
import type { SectionProps } from "./Section.types";
import { GlowGradient } from "..";
import { tokenClassNames } from "_utility";

export const Section = ({
  paddingTop = "default",
  variant = "default",
  palette = "default",
  image,
  className,
  children,
  type = "default",
  testID = "section",
  as: Tag = "section",
  ...props
}: SectionProps) => {
  return (
    <Tag
      className={tokenClassNames(
        styles,
        "section",
        styles[`section-${variant}`],
        styles[`section-palette-${palette}`],
        {
          [styles[`section-subtle`]]: variant === "subtle",
        },
        className,
        {
          [styles["section-padding-top-none"]]: paddingTop === "none",
          [styles["section-padding-top-lg"]]: paddingTop === "lg",
        },
      )}
      style={
        variant === "image" && !!image
          ? { backgroundImage: `url(${image.src || image.localSrc})` }
          : undefined
      }
      aria-label={variant === "image" && image ? image.alt : undefined}
      data-section-type={type}
      data-testid={testID}
      {...props}
    >
      {variant === "emphasised" ? (
        <div>
          <GlowGradient
            palette={palette}
            zIndex={0}
            className={styles["section-glow-gradient"]}
          />
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  );
};
