/**
 * Represents the size of the Price
 * @type {"sm" | "default" | "lg" | "xl"}
 */
export type PriceSize = "sm" | "default" | "lg" | "xl";

/**
 * Represents the state of the Price
 * @type {"default" | "inactive"}
 */
export type PriceState = "default" | "inactive" | "error";

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
 * @property {boolean} [showVAT] - Displays the VAT description underneath the Price
 * @property {boolean} [showFrequency] - Displays the /mnd as a suffix to the Price
 * @property {boolean} [showMinus] - Displays the minus sign for negative value
 * @property {boolean} [showAsterisk] - Displays the /mnd with asterisk (*). Required showMonth to be enabled
 * @property {string} [className] - additional class name to style for the outer container of the Price.
 * @property {string} [colorClassName] - additional class name to style color text of the Price.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface PriceProps {
  value?: string;
  fromValue?: string;
  beforeText?: string;
  state?: PriceState;
  size?: PriceSize;
  inverted?: boolean;
  showCurrency?: boolean;
  showAsterisk?: boolean;
  showVAT?: boolean;
  showFrequency?: boolean;
  showMinus?: boolean;
  className?: string;
  colorClassName?: string;
  testID?: string | undefined;
}
