import type { StyleProp, TextStyle, ViewStyle } from "react-native";

/**
 * Represents the container size of the Spinner
 * @type {"default" | "sm"}
 */
export type SpinnerSize = "default" | "sm";

/**
 * Represents the token format of the SpinnerSize
 * @type {[K in SpinnerSize as K extends "default" ? "sm" : K]: number}
 */
export type SpinnerSizeTokenFormat = {
  [K in SpinnerSize as K extends "default" ? "sm" : K]: number;
};

/**
 * Represents the icon color of the Spinner
 * @type {"default" | "inverted"}
 */
export type SpinnerColor = "default" | "inverted";

/**
 * Represents the token format of the SpinnerColor
 * @type {[K in SpinnerColor]: string}
 */
export type SpinnerColorTokenFormat = {
  [K in SpinnerColor]: string;
};

/**
 * Props for Spinner.
 * @interface SpinnerProps
 * @property {StyleProp<ViewStyle>} [containerStyle] - Apply additional styling to the container of the spinner
 * @property {StyleProp<ViewStyle>} [style] - Apply additional styling to the spinner icon
 * @property {SpinnerSize} [size] - Sets the size of the spinner
 * @property {SpinnerColor} [color='default'] - Spinner icon color
 */
export interface SpinnerProps {
  size?: SpinnerSize;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<TextStyle>;
  color?: SpinnerColor;
}

export interface SpinnerIconProps
  extends Omit<Required<SpinnerProps>, "containerStyle" | "style"> {
  testID: string;
  style?: StyleProp<TextStyle>;
  size: SpinnerSize;
}
