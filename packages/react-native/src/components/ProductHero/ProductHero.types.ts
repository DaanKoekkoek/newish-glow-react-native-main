import type { LargeStickerProps } from "components/LargeSticker";
import type { StatusProps } from "components/Status";
import type { ImageProps } from "foundations/Image";

/**
 * Represents variants options of the Product Hero.
 * @type {"default" | "promo" }
 */

export type ProductHeroVariant = "default" | "promo";

/**
 * Props for the Product hero item.
 * @interface ProductHeroProps
 * @property {React.ReactElement} [variant] - The variant of the product hero.
 * @property {ImageProps} [image] - Image to be displayed.
 * @property {React.ReactElement} [largeSticker] - Accepts a `<LargeSticker />` component.
 * @property {React.ReactElement} [status] - Accepts a `<Status />` component.
 */

export interface ProductHeroProps {
  variant?: ProductHeroVariant;
  image: ImageProps;
  largeSticker?: LargeStickerProps;
  status?: React.ReactElement<StatusProps>;
}
