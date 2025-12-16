import { ProductHeroProps } from "./ProductHero.types";
import styles from "./ProductHero.module.scss";
import classNames from "classnames";
import { Visual } from "_internals/Assets";
import { tokenClassNames } from "_utility";

export const ProductHero = ({
  variant = "default",
  image,
  largeSticker,
  status,
  testID = "product-hero",
}: ProductHeroProps) => {
  return (
    <div
      className={tokenClassNames(styles, "product-hero")}
      data-testid={testID}
    >
      <div className={styles["product-hero-image-container"]}>
        <Visual
          resizeMode="cover"
          {...image}
          className={styles["product-hero-image"]}
          renderType="foreground"
          noPadding="all"
          testID={`${testID}-image`}
        />
        {!!largeSticker && (
          <div
            className={classNames(
              styles["product-hero-large-sticker"],
              styles[`variant-${variant}`],
            )}
            data-testid={`${testID}-large-sticker`}
          >
            {largeSticker}
          </div>
        )}
      </div>
      {!!status && (
        <div className={styles["product-hero-status"]}>{status}</div>
      )}
    </div>
  );
};
