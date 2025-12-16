import { TextLinkProps } from "..";

/**
 * Represents the properties for the `UserNavigation` component.
 *
 * @property {TextLinkProps & { initials: string }} [myAccountLink] - Configuration for the **My Account** link. Inherits `TextLinkProps` with an additional `initials` field to display within the Avatar.
 * @property {TextLinkProps} [logoutLink] - Configuration for the **Logout** link. Directly passed to the `TextLink` component.
 * @property {string} [testID] - Optional `data-testid` attribute for testing purposes.
 */
export type UserNavigationProps = {
  myAccountLink?: TextLinkProps & {
    initials: string;
  };
  logoutLink?: TextLinkProps;
  testID?: string;
};
