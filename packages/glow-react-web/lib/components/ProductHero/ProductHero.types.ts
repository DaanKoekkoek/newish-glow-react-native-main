import type { ImageProps } from "foundations/Image";
import React from "react";

/**
 * Props for the Product hero item.
 * @interface ProductHeroProps
 * @property {React.ReactElement} [variant] - The variant of the product hero.
 * @property {React.ReactElement} image - Accepts a `<Image />` component.
 * @property {React.ReactElement} [largeSticker] - Accepts a `<LargeSticker />` component.
 * @property {React.ReactElement} [status] - Accepts a `<Status />` component.
 * @property {string} [testID] - The test ID for the component.
 */
export interface ProductHeroProps {
  variant?: "default" | "promo";
  image: ImageProps;
  largeSticker?: React.ReactElement;
  status?: React.ReactElement;
  testID?: string;
}
