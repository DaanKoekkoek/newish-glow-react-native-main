import { PromotionalCardProps } from "./PromotionalCard.types";
import styles from "./PromotionalCard.module.scss";
import classNames from "classnames";
import { Paragraph } from "foundations/Paragraph";
import { Heading } from "foundations/Heading";
import { TextLink } from "components/TextLink";
import { tokenClassNames } from "_utility";

export const PromotionalCard = ({
  title = "",
  description,
  content = "default",
  variant = "default",
  palette = "default",
  textLink,
  image,
  countdown,
  testID = "promotional-card",
}: PromotionalCardProps) => {
  return (
    <div
      className={tokenClassNames(
        styles,
        "promotional-card",
        styles[`promotional-content-${content}`],
        styles[`promotional-variant-${variant}`],
        styles[`content-${content}-${palette}`],
        {
          [styles[`palette-${palette}`]]: variant === "emphasised",
        },
      )}
      data-testid={testID}
    >
      <div className={styles["text-container"]}>
        {title && (
          <Heading as="h3" size="md" className={styles[`heading-${variant}`]}>
            {title}
          </Heading>
        )}

        {description && (
          <Paragraph className={styles[`description-${variant}`]}>
            {description}
          </Paragraph>
        )}

        {countdown && content === "countdown" && (
          <div className={styles["countdown-container"]}>{countdown}</div>
        )}

        {textLink && (
          <TextLink
            {...textLink}
            className={classNames(
              textLink.className,
              styles["promotional-text-link"],
              styles[`text-link-${variant}`],
            )}
          />
        )}
      </div>

      {image && content === "image" && (
        <div className={styles["image-container"]}>{image}</div>
      )}
    </div>
  );
};
