import type { IconNames } from "foundations/Icon";

/**
 * Props for the FixedSettingsNavigation component.
 * @interface FixedSettingsNavigationProps
 * @property {string} [initials] - User initials to display in the avatar circle
 * @property {string} [backToMainHref='/'] - URL for "Terug naar Odido.nl" link
 * @property {string} [backToMainLabel='Terug naar Odido.nl'] - Label for back to main link
 * @property {string} [serviceHref='/service'] - URL for "Naar service" link
 * @property {string} [serviceLabel='Naar service'] - Label for service link
 * @property {string} [userLabel='Mijn account'] - Label for user account section
 * @property {string} [productLabel='Internet + TV'] - Label for product/service name
 * @property {IconNames} [productIcon='internet'] - Icon name for the product
 * @property {React.CSSProperties} [style] - Additional styling for the root element
 * @property {string} [testID='fixed-settings-navigation'] - testID for testing
 */
export interface FixedSettingsNavigationProps {
  initials?: string;
  backToMainHref?: string;
  backToMainLabel?: string;
  serviceHref?: string;
  serviceLabel?: string;
  userLabel?: string;
  userProfileHref?: string;
  productLabel?: string;
  productIcon?: IconNames;
  style?: React.CSSProperties;
  testID?: string;
}
