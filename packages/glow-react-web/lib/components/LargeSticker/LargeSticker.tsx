import { DefaultList } from "components/DefaultList";
import { Price } from "components/Price";
import { Heading } from "foundations/Heading";
import styles from "./LargeSticker.module.scss";
import type { LargeStickerProps } from "./LargeSticker.types";
import { GlowGradient } from "foundations/GlowGradient";
import { tokenClassNames } from "_utility";

export const LargeSticker = ({
  palette = "default",
  variant = "default",
  price,
  list,
  className,
  testID = "large-sticker",
  ...props
}: LargeStickerProps) => {
  const type = props.type ?? "default";
  const backgroundVariant = variant === "default" ? "subtle" : variant;
  const defaultListInverted =
    list?.props.inverted &&
    (backgroundVariant === "subtle" || variant === "emphasised");

  let description;

  if (props.type === "default") {
    description = props.description;
  }

  return (
    <div
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "large-sticker",
        styles[`large-sticker-palette-${palette}`],
        className,
        {
          [styles["large-sticker-variant-emphasised"]]:
            variant === "emphasised",
        },
      )}
    >
      {variant === "emphasised" && (
        <GlowGradient
          palette={palette}
          preserveAspectRatio="none"
          zIndex={1}
          className={styles["large-sticker-gradient"]}
        />
      )}
      {description && (
        <Heading as="h3" className={styles["large-sticker-text"]} size="xs">
          {description}
        </Heading>
      )}
      {type === "default" && price && (
        <Price
          className={styles.price}
          colorClassName={styles["large-sticker-price"]}
          {...price.props}
          size="lg"
        />
      )}
      {type === "usp" && list && (
        <DefaultList
          {...list.props}
          variant="icon"
          inverted={defaultListInverted}
          palette={palette}
          className={styles["large-sticker-list"]}
        />
      )}
    </div>
  );
};
