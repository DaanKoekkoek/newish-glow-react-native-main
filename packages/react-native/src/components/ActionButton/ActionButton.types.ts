import type { CommonPalette } from "_theming/tokenLoader";
import type { IconProps } from "foundations/Icon";
import type React from "react";
import type { ViewStyle, GestureResponderEvent } from "react-native";

/**
 * Represents the different prominence colors of the action button.
 * @type {"default" | "emphasised"}
 */
export type ActionButtonProminence = "default" | "emphasised";

/**
 * Represents the different states of the action button.
 * @type {"loading" | "disabled"}
 */
export type ActionButtonState = "loading" | "disabled";

/**
 * Represents the different sizes of the action button.
 * @type {"sm" | "default"}
 */
export type ActionButtonIconSize = "sm" | "default" | "md";
/**
 * Props for the Action Button component.
 * @interface ActionButtonProps
 * @property {(event: GestureResponderEvent) => void} [onPress] - onPress callback of the action button.
 * @property {IconProps["name"]} [icon] - The icon name.
 * @property {string} [label] - The label, placed underneath the icon of the action button.
 * @property {ActionButtonState} [state] - The state of the action button.
 * @property {ActionButtonProminence} [prominence] - The prominence color of the action button.
 * @property {boolean} [inverted] - Applies inverted text- and background color on the action button.
 * @property {ViewStyle} [style] - Applies additional styling
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface ActionButtonProps {
  onPress(event: GestureResponderEvent): void;
  label: string;
  icon: IconProps["name"];
  state?: ActionButtonState;
  prominence?: ActionButtonProminence;
  inverted?: boolean;
  style?: ViewStyle;
  testID?: string | undefined;
  palette?: CommonPalette;
}

/**
 * Represents the prominence colors of the action button icon.
 * @type {"default" | "emphasised"}
 */
export type ActionButtonIconProminence = ActionButtonProminence;

/**
 * Props for the Action Button Icon component.
 * @interface ActionButtonIconProps
 * @property {ActionButtonIconProminence} [prominence] - The prominence color of the action button icon.
 * @property {boolean} [stretched] - Whether the Pressable area of the action button should stretch to its parents' boundaries.
 * @property {ActionButtonIconSize} [size='default'] - The size of the action button icon.
 */
export interface ActionButtonIconProps
  extends Omit<ActionButtonProps, "prominence" | "label"> {
  prominence?: ActionButtonIconProminence;
  stretched?: boolean;
  size?: ActionButtonIconSize;
}

/**
 * Props for the Action Button Group component.
 * @interface ActionButtonGroupProps
 * @property {React.ReactElement | React.ReactElement[]} [children] - Children of the ActionButtonGroup.
 */
export interface ActionButtonGroupProps {
  children: React.ReactElement | React.ReactElement[];
}
