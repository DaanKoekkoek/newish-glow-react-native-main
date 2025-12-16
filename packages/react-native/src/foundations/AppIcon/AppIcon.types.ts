export type AppIconBrand = "Odido";

/**
 * Represents the available addons.
 * @type {"Klik & Klaar" | "TV" | "TV Anywhere" | "Thuis Veilig Online" | "Overal Veilig Online" | "Hosted Voice" | "Essential" | "Klantkampioen"}
 */
export type AppName =
  | "Klik & Klaar"
  | "TV"
  | "TV Anywhere"
  | "Thuis Veilig Online"
  | "Overal Veilig Online"
  | "Hosted Voice"
  | "Essential"
  | "Klantkampioen";

/**
 * @interface AppIconComponentProps
 * @property {AppIconBrand} [brand] - The brand of the AppIcon Button
 * @property {AppName} [prominence='default'] - AppIcon Button prominence color
 * @property {disabled} [disabled='false'] - whether it's disabled
 */
export interface AppIconComponentProps {
  brand: AppIconBrand;
  app: AppName;
  disabled?: boolean;
}

export interface AppIconProps {
  size: string | number;
  disabled: boolean;
  children?: React.ReactElement;
}
