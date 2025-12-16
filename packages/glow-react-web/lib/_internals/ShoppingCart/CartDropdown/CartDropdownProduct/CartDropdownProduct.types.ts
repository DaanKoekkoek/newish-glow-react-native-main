import type { ImageProps } from "foundations/Image";

/**
 * Props for a Cart Product component
 * @interface CartDropdownProductProps
 * @property {ImageProps} image - Image component props
 * @property {string} title - Title of the product
 * @property {string} description - Description of the product
 * @property {boolean} [animated="false"] - Stagger animates its contents when set to `true`.
 */
export type CartDropdownProductProps = {
  image: ImageProps;
  title: string;
  description: string;
  animated?: boolean;
};
