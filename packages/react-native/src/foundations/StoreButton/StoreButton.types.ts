export type StoreBrand = "Apple" | "Google";

export type StoreButtonProminence = "default" | "secondary";

export type StoreButtonVariant = "default" | "inverted";

/**
 *
 * @interface StoreButtonProps
 * @property {StoreBrand} [brand] - The brand of the Store Button
 * @property {StoreButtonProminence} [prominence='default'] - Store Button prominence color
 * @property {StoreButtonVariant} [variant='default'] - Store button variant
 */
export interface StoreButtonProps {
  brand: StoreBrand;
  prominence?: StoreButtonProminence;
  variant?: StoreButtonVariant;
}

export type StoreButtonSvgProps = Omit<StoreButtonProps, "brand">;
