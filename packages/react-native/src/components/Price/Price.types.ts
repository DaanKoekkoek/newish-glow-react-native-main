import type { ViewStyle } from "@expo/html-elements/build/primitives/View";

/**
 * Represents the size of the Price
 * @type {"sm" | "default" | "lg" | "xl"}
 */
export type PriceSize = "sm" | "default" | "lg" | "xl";

/**
 * Represents the state of the Price
 * @type {"default" | "disabled"}
 */
export type PriceState = "default" | "disabled";

/**
 * Props for the Price.
 * @interface PriceProps
 * @property {string} [value=''] - The value of the Price
 * @property {string} [fromValue=''] - The discount value of the Price
 * @property {string} [beforeText=''] - The before text of the Price
 * @property {PriceState} [state='default'] - The state of the Price
 * @property {PriceSize} [size='default'] - The size of the Price
 * @property {boolean} [inverted] - Sets the style of price to inverted
 * @property {boolean} [showCurrency] - Displays the currency before the price value
 * @property {boolean} [showDecimal] - Displays the decimal value after the whole integer
 * @property {boolean} [showVAT] - Displays the VAT description underneath the Price
 * @property {boolean} [showFrequency] - Displays the /mnd as a suffix to the Price
 * @property {boolean} [showAsterisk] - Displays the /mnd with asterisk (*). Required showMonth to be enabled
 * @property {ViewStyle} [style] - style for the outer container of the Price.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface PriceProps {
  value: string;
  fromValue?: string;
  beforeText?: string;
  state?: PriceState;
  size?: PriceSize;
  inverted?: boolean;
  showCurrency?: boolean;
  showDecimal?: boolean;
  showAsterisk?: boolean;
  showVAT?: boolean;
  showFrequency?: boolean;
  style?: ViewStyle;
  testID?: string | undefined;
}
