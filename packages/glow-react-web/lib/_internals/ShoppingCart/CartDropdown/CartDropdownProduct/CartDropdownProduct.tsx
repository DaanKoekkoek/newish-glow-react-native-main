import { Strong } from "foundations/Strong";
import styles from "./CartDropdownProduct.module.scss";
import { CartDropdownProductProps } from "./CartDropdownProduct.types";
import { Image } from "foundations/Image";
import { Paragraph } from "foundations/Paragraph";
import { CartDropdownAnimation } from "../CartDropdownAnimation";
import { tokenClassNames } from "_utility";

export const CartDropdownProduct = ({
  image,
  title,
  description,
  animated = false,
}: CartDropdownProductProps) => {
  return (
    <div className={tokenClassNames(styles, "cart-dropdown-product")}>
      {!!image && (
        <Image
          className={styles.image}
          {...image}
          resizeMode="contain"
          alt={image?.alt ?? "Product image"}
        />
      )}
      <CartDropdownAnimation
        animated={animated}
        delay={0.8}
        className={styles["text-container"]}
      >
        <Strong className={styles.title} size="sm">
          {title}
        </Strong>
        <div className={styles.description}>
          <Paragraph size="sm" as="span">
            {description}
          </Paragraph>
        </div>
      </CartDropdownAnimation>
    </div>
  );
};
