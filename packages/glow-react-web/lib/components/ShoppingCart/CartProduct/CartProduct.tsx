import { Strong } from "foundations/Strong";
import styles from "./CartProduct.module.scss";
import { CartProductProps } from "./CartProduct.types";
import { Image } from "foundations/Image";
import classNames from "classnames";
import { Paragraph } from "foundations/Paragraph";
import { tokenClassNames } from "_utility";

export const CartProduct = ({
  image,
  title,
  description,
  palette = "default",
}: CartProductProps) => {
  return (
    <div className={tokenClassNames(styles, "cart-product")}>
      <div
        className={classNames(
          styles["image-background"],
          styles[`image-background-${palette}`],
        )}
      >
        {!!image && (
          <Image
            className={styles.image}
            {...image}
            resizeMode="contain"
            alt={image?.alt ?? "Product image"}
          />
        )}
      </div>
      <div className={styles["text-container"]}>
        <Strong className={styles.title} size="sm">
          {title}
        </Strong>
        <div className={classNames(styles.text, styles.description)}>
          {description &&
            description.map((line, index) => (
              <Paragraph size="sm" as="span" key={index}>
                {line}
              </Paragraph>
            ))}
        </div>
      </div>
    </div>
  );
};
