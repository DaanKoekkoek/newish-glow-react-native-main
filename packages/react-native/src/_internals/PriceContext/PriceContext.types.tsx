import type { PriceProps } from "components/Price";

/**
 * PriceContext atom props
 * @interface PriceContextProps
 * @property {PriceProps} [priceProps] - Accepts properties of Price
 * @property {string} [description] - Renders a description underneath the Price
 * @property {string} [disclaimer] - Renders a disclaimer underneath the description
 * @property {React.ReactElement} [moreInfo] - Renders a ReactElement as suffix to the Price
 * @property {string} [testID="price-context"] - testID string. Is passed down into Price
 */
export interface PriceContextProps {
  priceProps: PriceProps;
  description?: string;
  disclaimer?: string;
  moreInfo?: React.ReactElement;
  testID?: string;
}
