import {
  StoreButtonProps,
  StoreBrandProps,
  StoreBrand,
} from "./StoreButton.types";
import styles from "./StoreButton.module.scss";

import { Apple } from "./assets/Apple.tsx";
import { Google } from "./assets/Google.tsx";
import { tokenClassNames } from "_utility";

const brands: Record<StoreBrand, StoreBrandProps> = {
  Apple: Apple,
  Google: Google,
};

export const StoreButton = ({
  brand = "Apple",
  prominence = "default",
  variant = "default",
  inverted = false,
  ariaLabel,
}: StoreButtonProps) => {
  const BrandComponent = brands[brand];
  const accessibilityLabel = ariaLabel ?? brand;

  return (
    <BrandComponent
      aria-label={accessibilityLabel}
      className={tokenClassNames(styles, "store-button", {
        [styles[`store-button-${prominence}`]]: prominence !== "default",
        [styles[`store-button-${variant}`]]: !inverted && variant !== "default",
        [styles[`store-button-${brand.toLowerCase()}`]]: true, // Apply brand-specific class for tokens
        [styles[`is-inverted`]]: inverted, // Used for specific layouts like Footers
        [styles["store-button-default"]]:
          prominence && prominence === "default" && variant === "default",
      })}
      data-testid={`${brand}-store-button`}
      data-prominence={prominence}
      data-variant={variant}
    />
  );
};
