export type PhoneBrandNameProps = (
  props: Record<string, string>,
) => JSX.Element;

/**
 * Available phone brand names
 * @type {string}
 */
export type PhoneBrandName =
  | "Alcatel"
  | "Android"
  | "Apple"
  | "Emporia"
  | "Fairphone"
  | "Google"
  | "Motorola"
  | "Oppo"
  | "Samsung"
  | "Xiaomi";

/**
 * PhoneBrand component props
 * @property {PhoneBrandName} brand - Phone brand name
 * @property {"default" | "inactive"} [state] - Phone brand state
 * @property {BrandLogoVariant} [variant] - Color variant for the logo
 * @property {string} [ariaLabel] - Format string for accessibility label (use {brand} as placeholder)
 * @property {string} [testID] - Test ID for component
 * @property {string} [className] - Additional class name applied on the parent container.
 */
export type PhoneBrandProps = {
  brand: PhoneBrandName;
  state?: "default" | "inactive";
  variant?: BrandLogoVariant;
  ariaLabel?: string;
  testID?: string;
  className?: string;
};

/**
 * Available color variants for logos.
 * @type {"default" | "inverted"}
 */
export type BrandLogoVariant = "default" | "inverted";
