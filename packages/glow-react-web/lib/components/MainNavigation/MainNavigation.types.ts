import type { BannerCardProps } from "_internals/Card";
import type { OdidoPalette } from "_internals/Color";
import type { DropdownPanelProps } from "_internals/Navigation";
import type { CartDropdownProps } from "_internals/ShoppingCart/CartDropdown";
import type { IconNames } from "foundations/Icon";
import type { BadgeStatusProps } from "components/Badge";
import type { InputAutosuggestionProps } from "components/InputField";
import type { StatusProps } from "components/Status";
import { AgentBarProps } from "components/AgentBar";
import { LogosProps } from "foundations/Logos";

/**
 * Represents a simple link within the navigation.
 * @extends {Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, "target">}
 * @property {string} label - Display text of the link.
 * @property {string} [href] - Destination URL.
 * @property {string} [title] - Optional accessible title text.
 * @property {() => void} [onClick] - Optional onClick handler.
 */
export type MainNavigationBaseLink = Pick<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "lang"
> & {
  label: string;
  href?: string;
  title?: string;
  onClick?: () => void;
};

/**
 * Represents a standard navigation link used for cart or user panels.
 * @extends {MainNavigationBaseLink}
 * @property {BadgeStatusProps} [badge] - Optional badge displayed next to the link (e.g., number of items).
 */
type NavigationActionLink = Omit<MainNavigationBaseLink, "label"> & {
  badge?: BadgeStatusProps;
};

/**
 * Represents a single navigation item.
 * @extends {Partial<MainNavigationBaseLink>}
 * @property {MainNavigationLink[]} [sublinks] - Nested sub-navigation items.
 */
export type MainNavigationLink = Partial<MainNavigationBaseLink> & {
  sublinks?: MainNavigationLink[];
};

/**
 * Represents a unique identifier for a navigation branch.
 * @property {string | number} id - Unique ID for the branch, used to track active navigation levels.
 */
export type BranchId = {
  id: string | number;
};

export type MainNavigationMoveLogo =
  | {
      search: boolean;
      level: boolean;
    }
  | boolean;

/**

* Represents a branch (column) in the main navigation structure.
* @extends {BranchId}
* @extends {Partial<MainNavigationBaseLink>}
* @property {MainNavigationLink[]} links - Collection of navigation links under this branch.
* @property {BannerCardProps[]} [promotions] - Optional promotional banners related to this branch.
  */
export type MainNavigationTree = BranchId &
  Partial<MainNavigationBaseLink> & {
    links?: MainNavigationLink[];
    promotions?: BannerCardProps[];
  };

/**
 * Represents a service link with an associated icon (e.g., customer service).
 * @property {string} href - Destination URL.
 * @property {IconNames} icon - Icon name for the link.
 * @property {string} [phoneNumber] - Intended to render a phone number. Only visible when `layout` is set to `alternate`.
 * @property {MainNavigationBaseLink} [openingHours] - Link to render opening hours. Only visible when `layout` is set to `alternate`.
 */
export type MainNavigationServiceLink = {
  href: string;
  icon: IconNames;
  phoneNumber?: string;
  openingHours?: MainNavigationBaseLink;
};

/**
 * Represents a meta link (top-level small navigation link such as “Login”, “Help”, etc.).
 * @extends {MainNavigationBaseLink}.
 * @property {boolean} [active] - Indicates if the meta link is currently active.
 */
export type MainNavigationMetaLink = MainNavigationBaseLink & {
  active?: boolean;
};

/**
 * Defines the set of actionable elements in the main navigation (cart, user).
 * @property {Object} [cart] - Cart button configuration and optional dropdown panel.
 * @property {NavigationActionLink} cart.link - Link properties for the cart button.
 * @property {CartDropdownProps} [cart.panel] - Optional dropdown panel configuration for the cart.
 * @property {Object} [user] - User button configuration and optional dropdown panel.
 * @property {NavigationActionLink} user.link - Link properties for the user button.
 * @property {DropdownPanelProps} [user.panel] - Optional dropdown panel configuration for the user.
 */
export type MainNavigationActions = {
  cart?: {
    link: NavigationActionLink;
    panel?: CartDropdownProps;
  };
  user?: {
    link: NavigationActionLink & { initials?: string };
    panel?: DropdownPanelProps;
  };
};

/**
 * Defines the search functionality in the main navigation.
 * @extends {InputAutosuggestionProps}
 * @property {() => void} [onSearchClose] - Callback handler that is fired when closing the search bar. Can be used to clear out the input on close.
 * @property {boolean} [open] - Allows user to control the open/closed state of the searchbar.
 */
export type MainNavigationControlSearch = InputAutosuggestionProps & {
  onSearchClose?: () => void;
  open?: boolean;
};

export type MainNavigationAriaLabel = {
  menu: {
    open: string;
    close: string;
    return: string;
  };
  search: {
    open: string;
    close: string;
  };
  service?: string;
  backdrop?: string;
};

/**
 * Additional configuration for the main navigation component.
 * Combines control elements, service links, search, and accessibility labels.
 * @property {StatusProps} [status] - Optional status indicator (e.g., system messages).
 * @property {MainNavigationServiceLink} [customerService] - Customer service link with icon.
 * @property {MainNavigationControlSearch} [search] - Search configuration including placeholder and suggestions.
 * @property {MainNavigationAriaLabel} [ariaLabel] - Collection of ARIA labels for improved accessibility.
 * @property {string} [routeKey] - Enforces a menu reset on change.
 */
export type MainNavigationAdditions = MainNavigationActions & {
  status?: StatusProps;
  customerService?: MainNavigationServiceLink;
  search?: MainNavigationControlSearch;
  ariaLabel?: MainNavigationAriaLabel;
  routeKey?: string;
};

/**
 * Represents the logo configuration within the main navigation.
 * @extends {Partial<Omit<MainNavigationBaseLink, "label">>}
 * @property {BrandName} [brand] - The brand identity displayed by the logo.
 * @property {videSrc} [videoSrc] - Adds a video as background to the logo. Only applicable for `odido` brand.
 */
export type MainNavigationLogo = LogosProps &
  Partial<Omit<MainNavigationBaseLink, "label">> & {
    videoSrc?: string;
  };

/**
 * Visual variant options for the main navigation component.
 * @type {"default" | "subtle"}
 * * `'default'`: Standard, fully featured navigation.
 * * `'subtle'`: Minimal variant used on pages that should not distract from content.
 */
export type MainNavigationVariant = "default" | "subtle";

/**
 * Layout options for the main navigation component.
 * @type {"default" | "alternate"}
 * * `'default'`: Logo to the left.
 * * `'alternate'`: Logo in the middle. Additional content visible when `variant` is set to `subtle`.
 */
export type MainNavigationLayout = "default" | "alternate";

/**
 * Props for the MainNavigation component.
 * @extends {MainNavigationAdditions}
 * @property {MainNavigationTree[]} [navigationTree] - Primary navigation structure defining all branches and items.
 * @property {MainNavigationVariant} [variant='default'] - Visual variant of the navigation.
 * @property {MainNavigationLayout} [layout='default'] - The layout of the main navigation bar and its contents
 * @property {boolean} [afmBanner] - Whether to display the AFM banner.
 * @property {AgentBarProps} [agentBar] - Renders an agentbar above the main navigation.
 * @property {boolean} [sticky='false'] - Whether to make the main navigation sticky on top of the page.
 * @property {MainNavigationBaseLink} [skip] - Accessibility skip link configuration.
 * @property {MainNavigationLogo} [logo] - Logo configuration.
 * @property {OdidoPalette} [palette] - Color palette for theming.
 * @property {MainNavigationMetaLink[]} [metaLinks] - Optional meta navigation links.
 * @property {string} [testID='main-navigation'] - applied on the nav tag of the main-navigation.
 */
export type MainNavigationProps = MainNavigationAdditions &
  Pick<React.HTMLProps<HTMLElement>, "lang"> & {
    navigationTree?: MainNavigationTree[];
    variant?: MainNavigationVariant;
    layout?: MainNavigationLayout;
    afmBanner?: boolean;
    agentBar?: AgentBarProps;
    sticky?: boolean;
    skip?: MainNavigationBaseLink;
    logo?: MainNavigationLogo;
    palette?: OdidoPalette;
    metaLinks?: MainNavigationMetaLink[];
    testID?: string;
  };

/**
 * Identifiers used for panel states within the navigation.
 * Includes dynamic branch panels, cart, user, and search.
 * @example
 * "branch-id" | "branch-1" | "cart" | "user" | "search"
 */
export type PanelID =
  | `branch-${string}`
  | `branch-${number}`
  | "cart"
  | "user"
  | "search";
