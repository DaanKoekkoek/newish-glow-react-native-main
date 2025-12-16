import type { BreakpointKeys } from "_theming/breakpoints";
import type React from "react";
import type { ViewStyle, LayoutChangeEvent } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

import type { ModalProps } from "../Modal";

/**
 * Represents the position type of a sticky bar.
 * @type {"top" | "bottom"}
 */
export type StickyBarPosition = "top" | "bottom";

/**
 * Represents the width type for a StickyBar component.
 * @type {"default" | "narrow"}
 */
export type StickyBarWidth = "default" | "narrow";

/**
 * Represents the layout type for a StickyBar component.
 * @type {"default" | "stacked"}
 */
export type StickyBarLayout = "default" | "stacked";

/**
 * Represents the position type of a sticky bar per breakpoint.
 * @type {StickyBarLayoutPerBreakpoint}
 */
export type StickyBarLayoutPerBreakpoint = {
  [Breakpoint in BreakpointKeys]?: StickyBarLayout;
};

/**
 * Represents the props for the button.
 * @interface StickyBarButtonProps
 * @property {string} [text] - The button label text.
 * @property {() => void} [onPress] - The onPress callback handler
 */
export interface StickyBarButtonProps {
  text: string;
  onPress: () => void;
}

/**
 * Props for the StickyBar content.
 * @interface StickyBarContentProps
 * @property {React.ReactNode} [children] - Children of the content area of the sticky bar.
 */
export interface StickyBarContentProps {
  children?: React.ReactNode;
}

/**
 * Props for the StickyBar modal.
 * @interface StickyBarContentProps
 * @property {string} [title] - Title of the modal,
 * @property {React.ReactNode} [children] - Children rendered within the modal body.
 */
export interface StickyBarModalProps extends Omit<ModalProps, "title"> {
  title: string;
  children: React.ReactNode;
}

/**
 * Props for the StickyBar component.
 * @interface StickyBarProps
 * @property {StickyBarPosition} [position='default'] - The vertical position of the sticky bar.
 * @property {StickyBarWidth} [width='default'] - The column width within the sticky bar.
 * @property {StickyBarModalProps} [modal] - Optional modal.
 * @property {StickyBarLayout | StickyBarLayoutPerBreakpoint} [layout='default'] - The content layout within the column of the sticky bar
 * @property {StickyBarButtonProps} [button] - Optional button.
 * @property {React.ReactElement | React.ReactElement[]} [children] - Additional content, placed before the `button`.
 * @property {(event: LayoutChangeEvent) => void} [onLayout] - Callback that is fired on layout change.
 * @property {number} [scrollbarOffset=0] - The offset of the scrollbar.
 * @property {EdgeInsets} [safeAreaInsets] - The safe area insets. The insets which are needed to not overlap system elements like status bar, notches, etc.
 * @property {ViewStyle} [style] - Additional style, applied on the outer container of the sticky bar.
 * @property {ViewStyle} [animatedStyle] - Additional animated style.
 */
export interface StickyBarProps {
  position?: StickyBarPosition;
  width: StickyBarWidth;
  modal?: StickyBarModalProps;
  layout?: StickyBarLayout | StickyBarLayoutPerBreakpoint;
  button?: StickyBarButtonProps;
  children?: React.ReactElement | React.ReactElement[];
  onLayout?: (event: LayoutChangeEvent) => void;
  scrollbarOffset?: number;
  safeAreaInsets?: EdgeInsets;
  style?: ViewStyle;
  animatedStyle?: ViewStyle;
}
