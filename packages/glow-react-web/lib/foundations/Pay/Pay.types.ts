export type PayServiceProps = (props: Record<string, string>) => JSX.Element;

export type PayServices = "iDEAL" | "iDIN";

/**
 * Props for the Pay component.
 * @interface PayProps
 * @property {PayServices} service - The payment service to display the logo for.
 * @property {string} [testID] - Optional. Used to locate this view in end-to-end tests.
 * @property {string} [ariaLabel] - Adds an aria-label to the pay icon.
 */
export type PayProps = {
  service: PayServices;
  testID?: string;
  ariaLabel?: string;
};
