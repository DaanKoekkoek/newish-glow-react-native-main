import type { StickyBarProps } from "components/StickyBar";
import type React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

/**
 * Props for the MainProvider component.
 * @interface MainProvidersProps
 * @extends MainProps, Pick<MainProps, "hasSnackbar" | "hasStickybar" | "hasTopNavigation">
 * @property {React.ReactNode} [children] - Children containing main providers
 */
export interface MainProvidersProps
  extends Pick<MainProps, "hasSnackbar" | "hasStickybar" | "hasTopNavigation"> {
  children?: React.ReactNode;
}

/**
 * Props for the Main component.
 * @interface MainProps
 * @property {React.ReactElement | React.ReactElement[]} [children] - Accepts a group of `Section` components.
 * @property {boolean} [hasSnackbar] - If true, a `Snackbar` component will be enabled.
 * @property {boolean} [hasStickybar] - If true, a `Stickybar` component will be enabled.
 * @property {boolean} [hasStickyHeader] - Sticks the `headerComponent` at the top of the viewport.
 * @property {boolean} [hasTopNavigation] - If true a `TopNavigation` component will be enabled. Also offers the possibility to set the title of the TopNavigation if no SubscriptionHero is on the page.
 * @property {React.ReactElement} [headerComponent] - Should be a `Header` component.
 * @property {React.ReactElement} [footerComponent] - Should be a `Footer` component.
 * @property {React.ReactElement} [itemSeparator] - A ReactElement that is placed inbetween `Section` components, but not at the start and end.
 * @property {React.ReactElement} [mainSeparator] - A ReactElement that is placed at the start of the Main and at the end.
 * @property {number} [windowSize={2}] - The amount of `Section` components that get rendered before its visible in the viewport.
 * @property {SnackbarPosition} [snackbarPosition] - The position of the `Snackbar` component.
 * @property {EdgeInsets} [safeAreaInsets] - The safe area insets. The insets which are needed to not overlap system elements like status bar, notches, etc.
 */
export interface MainProps {
  children: React.ReactElement | React.ReactElement[];
  hasSnackbar?: boolean;
  hasStickybar?: boolean;
  hasStickyHeader?: boolean;
  hasTopNavigation?: boolean;
  headerComponent?: React.ReactElement;
  footerComponent?: React.ReactElement;
  itemSeparator?: React.ReactElement;
  mainSeparator?: React.ReactElement;
  windowSize?: number;
  safeAreaInsets?: EdgeInsets;
}
/**
 * Represents an array of Section components passed into Main.
 * @type {data: React.ReactElement[]}
 */
export type MainSections = {
  data: React.ReactElement[];
};

export interface RenderedItemProps {
  item: React.ReactElement;
  styles: {
    stickyTopOffset: (stickyBarHeight: number) => StyleProp<ViewStyle>;
  };
  stickyBarHeight: number;
  stickyBarContent?: StickyBarProps | null;
}
