export type StoreBrandProps = (props: Record<string, string>) => JSX.Element;

export type StoreBrand = "Apple" | "Google";

export type StoreButtonProminence = "default" | "secondary";

export type StoreButtonVariant = "default" | "inverted";

/**
 * Props for the StoreButton component.
 *
 * @interface StoreButtonProps
 * @property {StoreBrand} [brand] - The brand of the Store Button
 * @property {StoreButtonProminence} [prominence='default'] - Store Button prominence color
 * @property {StoreButtonVariant} [variant='default'] - Store button variant
 * @property {string} [ariaLabel] - Add additional aria-label to the store button icon.
 */
export interface StoreButtonProps {
  brand: StoreBrand;
  prominence?: StoreButtonProminence;
  variant?: StoreButtonVariant;
  inverted?: boolean;
  ariaLabel?: string;
}
