import type { ImageProps } from "foundations/Image";
import { OdidoPalette } from "_internals/Color";

/**
 * Props for a Cart Product component
 * @interface CartProductProps
 * @property {ImageProps} image - Image component props
 * @property {string} title - Title of the product
 * @property {string[]} description - Description of the product
 * @property {OdidoPalette} [palette] - Color palette for the product
 */
export type CartProductProps = {
  image: ImageProps;
  title: string;
  description?: string[];
  palette?: OdidoPalette;
};
