import type { BreakpointKeys } from "_theming/breakpoints";
import { type IconProps } from "foundations/Icon";
import type { LayoutChangeEvent } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

export type SnackBarActionType = "dismiss" | "pause" | "resume";
export type SnackbarPosition = "top" | "bottom";
export type SnackbarItemStatusType =
  | "default"
  | "error"
  | "loading"
  | "success";
export type SnackbarItemIconPropsType = Pick<IconProps, "name" | "solid">;
export type SnackbarContext = "persists" | "default" | "modal";

export interface Snack {
  type: SnackbarItemStatusType;
  id: string;
  message: string;
  cancelButtonText?: string;
  accessabilityMessage?: string;
  icon?: SnackbarItemIconPropsType;
  duration?: number;
  position?: SnackbarPosition;
  createdAt: number;
  visible: boolean;
  height?: number;
  width?: number;
  context?: SnackbarContext;
  isSwipeable?: boolean;
}

export type SnackOptions = Partial<
  Pick<
    Snack,
    | "id"
    | "type"
    | "message"
    | "cancelButtonText"
    | "icon"
    | "accessabilityMessage"
    | "duration"
    | "position"
    | "context"
    | "isSwipeable"
  >
>;

export type DefaultSnackOptions = SnackOptions & {
  [key in SnackbarItemStatusType]?: SnackOptions;
};

/**
 * Represents the props for the Snackbar component.
 * @typedef SnackbarProps
 * @property {function(Snack): void} [onSnackShow] - Callback function that is called when a snack is shown.
 * @property {function(Snack): void} [onSnackHide] - Callback function that is called when a snack is hidden.
 * @property {function(Snack): void} [onSnackPress] - Callback function that is called when a snack is pressed.
 * @property {SnackbarContext} [context="persists"] - The key to identify the context of usage 'persists', 'modal' or 'default'.
 * @property {number} [topOffset=0] - The top offset of the Snackbar, for when a navigation or other element with high z-index is located at the top.
 * @property {string} [testID="snackbar"] - The testID of the Snackbar.
 * @property {EdgeInsets} [safeAreaInsets] - The safe area insets. The insets which are needed to not overlap system elements like status bar, notches, etc.
 */
export type SnackbarProps = {
  onSnackShow?: (snack: Snack) => void;
  onSnackHide?: (snack: Snack) => void;
  onSnackPress?: (snack: Snack) => void;
  context?: SnackbarContext;
  topOffset?: number;
  testID?: string;
  safeAreaInsets?: EdgeInsets;
};

/**
 * Represents the props for the SnackbarAnimator component.
 * @typedef SnackbarAnimatorProps
 * @property {BreakpointKeys} breakpoint - The breakpoint key.
 * @property {function} endPause - The function to end the pause.
 * @property {number} index - The index of the snack.
 * @property {number} offset - The offset of the snack.
 * @property {function(Snack): void} [onSnackHide] - Callback function that is called when a snack is hidden.
 * @property {function(Snack): void} [onSnackPress] - Callback function that is called when a snack is pressed.
 * @property {function(Snack): void} [onSnackShow] - Callback function that is called when a snack is shown.
 * @property {Snack} snack - The snack object.
 * @property {function} startPause - The function to start the pause.
 * @property {number} topOffset - The top offset of the Snackbar, for when a navigation or other element with high z-index is located at the top.
 * @property {function(string, number): void} updateHeight - The function to update the height of the snack.
 * @property {EdgeInsets} [safeAreaInsets] - The safe area insets. The insets which are needed to not overlap system elements like status bar, notches, etc.
 */
export interface SnackbarAnimatorProps {
  breakpoint: BreakpointKeys;
  endPause: () => void;
  index: number;
  offset: number;
  onSnackHide?: (snack: Snack) => void;
  onSnackPress?: (snack: Snack) => void;
  onSnackShow?: (snack: Snack) => void;
  snack: Snack;
  startPause: () => void;
  topOffset: number;
  updateHeight: (snackId: string, height: number) => void;
  safeAreaInsets?: EdgeInsets;
}

/**
 * Represents the props for the SnackbarItem component.
 * @typedef SnackbarItemProps
 * @property {function(): void} dismissSnack - The function to dismiss the snack.
 * @property {function(LayoutChangeEvent): void} [onLayout] - The function to handle the layout event.
 * @property {Snack} snack - The snack object.
 * @property {number} windowWidth - The width of the window.
 * @property {string} [testID] - The testID of the SnackbarItem.
 */

export type SnackbarItemProps = {
  dismissSnack: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  snack: Snack;
  windowWidth: number;
  testID?: string;
};
