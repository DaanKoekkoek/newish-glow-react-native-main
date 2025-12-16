import { ReactNode } from "react";
import { IconNames } from "foundations/Icon";
import { AutoSuggestion } from "components/InputField";
import { BrandName } from "components/ThemeProvider";
import {
  BadgeStatusSize,
  BadgeStatusVariant,
} from "components/Badge/BadgeStatus/BadgeStatus.types";

/**
 * Represents a hyperlink with an optional URL.
 */
export type Link = {
  title: string;
  href?: string;
};

/**
 * Represents a collection of related links grouped under a common title, defining a submenu column
 */
export type SubmenuColumn = {
  title: string;
  links: Link[];
};

/**
 * Represents the content of a submenu
 */
export type SubmenuItem = {
  columns: SubmenuColumn[];
  featured?: React.ReactNode | React.ReactNode[]; // Explicitly allow both single node and array
};

/**
 * Represents a main navigation link that can have a submenu
 */
export type MainNavigationLink = {
  title: string;
  href?: string;
  submenu?: SubmenuItem;
};

/**
 * Type for navigation items in the metaNav
 * @property {string} label - Display text for the navigation item
 * @property {boolean} [active] - Whether the item is active
 * @property {string} [href] - Optional URL to navigate to
 * @property {() => void} [onClick] - Optional click handler for the navigation item
 */
export type MetaNavItem = {
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
};

/**
 * Represents the layout options for the Header component.
 * @type {"default" | "alternate"}
 */
export type HeaderLayout = "default" | "alternate";

/**
 * Header state types
 */
export type HeaderState = "default" | "level1" | "level2" | "search";

/**
 * Button options for the login button
 */
export interface LoginButtonOption {
  visible?: boolean;
  label?: string;
  loggedIn?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  hideLabel?: boolean;
  iconName?: IconNames;
}

/**
 * Button options for the search button
 */
export interface SearchButtonOption {
  visible?: boolean;
  label?: string;
  onHover?: () => void;
  hideLabel?: boolean;
  iconName?: IconNames;
}

/**
 * Button options for the shop button
 */
export interface ShopButtonOption {
  visible?: boolean;
  label?: string;
  value?: number;
  onClick?: () => void;
  onHover?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onTouchStart?: () => void;
  hideLabel?: boolean;
  iconName?: IconNames;
}

/**
 * Helper options configuration
 */
export interface HelpOptions {
  phone?: string;
  link?: ReactNode;
  status?: boolean;
}

/**
 * Button options for the header component
 */
export interface ButtonOptions {
  loginButton?: LoginButtonOption;
  searchButton?: SearchButtonOption;
  shopButton?: ShopButtonOption;
}

/**
 * Props for the Header component.
 * @property {MetaNavItem[]} [metaLinks] - Array of meta navigation items (optional)
 * @property {MainNavigationLink[]} [mainLinks] - Main navigation structure (optional)
 * @property {AutoSuggestion[]} searchAutoSuggestions - Auto-suggestions for the search field
 * @property {(query: string) => void} [onSearch] - Handler for search queries
 * @property {'default' | 'subtle'} [variant] - Visual variant of the header (optional, defaults to 'default')
 * @property {HeaderLayout} [layout] - Layout structure of the header (optional, defaults to 'default')
 * @property {boolean} [AFMbanner] - Whether to display AFM banner (optional, defaults to false)
 * @property {ReactNode} [submenu] - Content to render in the submenu when open (optional)
 * @property {BrandName} [brand] - Brand name for the logo (optional, defaults to "Odido")
 * @property {boolean} [sticky] - Whether the header should stick to the top when scrolling (optional, defaults to false)
 * @property {string} [className] - Additional class name to apply to the component (optional)
 * @property {string} [testID] - Test ID for component testing (optional)
 * @property {ButtonOptions} [buttonOptions] - Options for header buttons customization
 * @property {HelpOptions} [helpOptions] - Options for help section customization
 * @property {string} [logoHref] - URL for the logo link (optional)
 */
export type HeaderProps = {
  metaLinks?: MetaNavItem[];
  mainLinks?: MainNavigationLink[];
  searchAutoSuggestions: AutoSuggestion[];
  onSearch?: (query: string) => void;
  variant?: "default" | "subtle";
  layout?: HeaderLayout;
  AFMbanner?: boolean;
  submenu?: ReactNode;
  brand?: BrandName;
  sticky?: boolean;
  className?: string;
  testID?: string;
  buttonOptions?: ButtonOptions;
  helpOptions?: HelpOptions;
  logoHref?: string;
};

/**
 * Props for the MetaNav component.
 * @property {ReactNode} [children] - Content to be rendered inside the component (optional)
 * @property {string[]} [itemList] - List of meta items to display for simplified functionality (optional)
 * @property {string} [active] - ID of the active meta item (optional)
 * @property {(id: string) => void} [onSelect] - Handler called when an item is selected (optional)
 * @property {string} [className] - Additional class name to apply to the component (optional)
 * @property {string} [testID] - Test ID for component testing (optional)
 */
export interface MetaNavProps {
  children?: ReactNode;
  itemList?: string[];
  active?: string;
  onSelect?: (id: string) => void;
  className?: string;
  testID?: string;
}

/**
 * Props for the MetaItem component - used to render individual MetaNavItems
 * @property {ReactNode} [children] - Content to be rendered inside the component (optional)
 * @property {boolean} [active] - Whether the item is active (optional)
 * @property {string} [id] - ID for the meta item, used to match with active prop in MetaNav (optional)
 * @property {string} [className] - Additional class name to apply to the component (optional)
 * @property {string} [testID] - Test ID for component testing (optional)
 * @property {string} [href] - URL to navigate to (optional). If onClick is provided, this will be ignored
 * @property {() => void} [onClick] - Click event handler (optional). When provided, the component will prevent default
 * link navigation behavior and call this handler instead
 */
export interface MetaItemProps {
  children?: ReactNode;
  active?: boolean;
  id?: string;
  className?: string;
  testID?: string;
  href?: string;
  onClick?: () => void;
}

/**
 * Props for the HeaderMenuButton component.
 * @property {string} label - Label for the button
 * @property {ReactNode} [icon] - Icon to display with the button (optional)
 * @property {boolean} [active] - Whether the button is active (optional)
 * @property {boolean} [hideLabel] - Whether to hide the button label (optional)
 * @property {string} [className] - Additional class name to apply to the component (optional)
 * @property {string} [testID] - Test ID for component testing (optional)
 * @property {() => void} [onClick] - Click event handler (optional)
 * @property {() => void} [onMouseEnter] - Mouse enter event handler (optional)
 * @property {() => void} [onMouseLeave] - Mouse leave event handler (optional)
 * @property {(event: React.TouchEvent) => void} [onTouchStart] - Touch start event handler for mobile devices (optional)
 * @property {string} [href] - URL to navigate to, will render as an anchor when provided (optional)
 */
export interface MenuButtonProps {
  label: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  active?: boolean;
  hideLabel?: boolean;
  className?: string;
  testID?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onTouchStart?: (event: React.TouchEvent) => void;
  href?: string;
}

/**
 * Props for the HeaderSubmenu component.
 * @property {ReactNode} [children] - Content to be rendered inside the submenu
 * @property {string} [className] - Additional class name to apply to the component (optional)
 * @property {string} [testID] - Test ID for component testing (optional)
 * @property {() => void} [onMouseEnter] - Mouse enter event handler
 * @property {() => void} [onMouseLeave] - Mouse leave event handler
 */
export interface HeaderSubmenuProps {
  children?: ReactNode;
  className?: string;
  testID?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

/**
 * Props for the HeaderMain component.
 * @property {ReactNode} [children] - Content to be rendered inside the component (optional)
 * @property {ReactNode[]} [leftColumnItems] - Items to render in the left column (optional)
 * @property {ReactNode[]} [rightColumnItems] - Items to render in the right column (optional)
 * @property {MainNavigationLink[]} [mainLinks] - Main navigation items for mobile menu
 * @property {'default' | 'subtle'} [variant] - Visual variant of the header (optional)
 * @property {HeaderState} [headerState] - Current state of the header
 * @property {(state: HeaderState) => void} [onHeaderStateChange] - Function called when header state needs to change
 * @property {HeaderLayout} [layout] - Layout structure of the header (optional)
 * @property {BrandName} [brand] - Brand name for the logo (optional, defaults to "odido")
 * @property {string} [className] - Additional class name to apply to the component (optional)
 * @property {string} [testID] - Test ID for component testing (optional)
 * @property {(query: string) => void} [onSearch] - Handler for search queries
 */
export interface HeaderMainProps {
  children?: ReactNode;
  leftColumnItems?: ReactNode[];
  rightColumnItems?: ReactNode[];
  mainLinks?: MainNavigationLink[];
  searchAutoSuggestions: AutoSuggestion[];
  variant?: "default" | "subtle";
  headerState?: HeaderState;
  onHeaderStateChange?: (state: HeaderState) => void;
  searchInputField?: ReactNode;
  layout?: HeaderLayout;
  brand?: BrandName;
  className?: string;
  key?: string;
  testID?: string;
  onSearch?: (query: string) => void;
  logoHref?: string;
}

/**
 * Props for the Submenu component.
 * @property {SubmenuItem} [submenuItem] - The active submenu item to display
 * @property {boolean} open - Whether the submenu is open
 * @property {string} [testID] - Test ID for testing purposes
 * @property {() => void} [onMouseEnter] - Mouse enter event handler
 * @property {() => void} [onMouseLeave] - Mouse leave event handler
 * @property {() => void} [onTouchStart] - Touch start event handler
 */
export interface SubmenuProps {
  submenuItem?: SubmenuItem;
  open: boolean;
  testID?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onTouchStart?: () => void; // New touch handler
}

/**
 * Props for the HeaderBadgedIcon component.
 * @property {IconNames} iconName - Name of the icon to display
 * @property {string} [iconSize] - Size of the icon
 * @property {BadgeStatusVariant} [badgeVariant] - Status badge variant ("success", "error", etc.)
 * @property {number} [badgeValue] - Value for the badge (for numeric badges)
 * @property {BadgeStatusSize} [badgeSize] - Size of the badge
 * @property {string} [className] - Additional class name to apply to the component
 * @property {string} [testID] - Test ID for component testing
 */
export interface HeaderBadgedIconProps {
  iconName: IconNames;
  iconSize?: "default" | "sm" | "lg";
  badgeVariant?: BadgeStatusVariant;
  badgeValue?: number;
  badgeSize?: BadgeStatusSize;
  className?: string;
  testID?: string;
}

/**
 * Props for the HeaderNavHelp component.
 * @property {string} phoneNumber - Phone number to display
 * @property {boolean} isOpen - Whether the help service is currently open
 * @property {ReactNode} link - Link to be rendered in the second row
 * @property {string} [className] - Additional class name to apply to the component
 * @property {string} [testID] - Test ID for component testing
 */
export interface HeaderNavHelpProps {
  phoneNumber: string;
  isOpen: boolean;
  link: ReactNode;
  className?: string;
  testID?: string;
}

/**
 * Props for the HeaderMobileSubmenu component.
 * @property {HeaderState} headerState - Current state of the header
 * @property {MainNavigationLink[]} [mainLinks] - Main navigation items for mobile menu
 * @property {SubmenuItem} [activeSubmenuItem] - The active submenu item to display
 * @property {(index: number) => void} [onLinkClick] - Handler for clicking on a link
 * @property {() => void} [onBackClick] - Handler for back button
 * @property {() => void} [onCloseClick] - Handler for close button
 * @property {string} [testID] - Test ID for component testing
 */
export interface HeaderMobileSubmenuProps {
  headerState: HeaderState;
  mainLinks?: MainNavigationLink[];
  activeSubmenuItem?: SubmenuItem;
  onLinkClick?: (index: number) => void;
  onBackClick?: () => void;
  onCloseClick?: () => void;
  testID?: string;
}
