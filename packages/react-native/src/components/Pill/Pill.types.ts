import type { PhoneBrand } from "foundations/PhoneBrand/PhoneBrand.types";

/**
 * Represents the state of Pill.
 * @type {"default" | "hover"}
 */
export type PillVariant = "default" | "logo";

/**
 * The function to call when the pill is selected or unselected.
 */
export type PillOnChange = (value: string) => unknown;

/**
 * Base props for the Pill component.
 * @interface PillPropsBase
 * @property {PillVariant} [variant='default'] - The variant of the selector, either "default" for text, or "logo" for brand.
 * @property {string} [title] - The title of the pill for the "default" variant.
 * @property {string} [brand] - The name of the brand to be displayed in the pill for the "logo" variant.
 * @property {boolean} [disabled] - Specifies whether the pill is disabled.
 * @property {PillOnChange} [onChange] - The function to call when the pill is selected or unselected.
 * @property {string} [value] - The value to be passed in the onChange function.
 */
export interface PillPropsBase {
  variant?: PillVariant;
  title?: string;
  brand?: PhoneBrand;
  disabled?: boolean;
  onChange?: PillOnChange;
  value: string;
  testID?: string;
}

/**
 * Props for the default variant of the Pill component.
 * @typedef {Object} PillPropsDefault
 * @property {PillVariant} [variant='default'] - The variant of the pill, which is "default".
 * @property {string} [title] - The title of the pill.
 * @property {string} [brand] - Brand is not applicable for the default variant.
 * @property {string} [testID] - The testID to be passed into Pressable component.
 */
export interface PillPropsDefault extends PillPropsBase {
  variant?: "default";
  title: string;
  brand?: never;
}

/**
 * Props for the default variant of the Pill component.
 * @typedef {Object} PillPropsLogo
 * @property {PillVariant} [variant='logo'] - The variant of the pill, which is "logo".
 * @property {string} [title] - The title is not applicable for the logo variant.
 * @property {string} [brand] - The brand name to be displayed in the pill.
 */
export interface PillPropsLogo extends PillPropsBase {
  variant: "logo";
  title?: never;
  brand: PhoneBrand;
}

/**
 * Props for the Pill component.
 * @typedef { PillPropsDefault | PillPropsLogo } PillProps
 */
export type PillProps = PillPropsDefault | PillPropsLogo;

export type PillChild = React.ReactElement<PillProps>;
