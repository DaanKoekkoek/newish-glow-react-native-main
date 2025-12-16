import { Strong } from "foundations/Strong";
import styles from "./DefaultSticker.module.scss";
import { type DefaultStickerProps } from "./DefaultSticker.types";
import classNames from "classnames";
import { GlowGradient } from "foundations/GlowGradient";
import { tokenClassNames } from "_utility";

export const DefaultSticker = ({
  text,
  image,
  type = "default",
  variant = "default",
  palette = "default",
  testID = "default-sticker",
}: DefaultStickerProps) => {
  if (text === undefined && image === undefined) {
    throw new Error("DefaultSticker must have either text or image prop.");
  }
  return (
    <div
      data-testid={testID}
      className={tokenClassNames(
        styles,
        "default-sticker",
        styles[`default-sticker-variant-${variant}`],
        styles[`default-sticker-palette-${palette}`],
      )}
    >
      {variant === "emphasised" && (
        <GlowGradient
          palette={palette}
          zIndex={1}
          className={classNames(styles["default-sticker-gradient"])}
        />
      )}
      {type === "default" ? (
        <Strong size="sm" className={styles["default-sticker-text"]}>
          {text}
        </Strong>
      ) : (
        image
      )}
    </div>
  );
};
