import type React from "react";
import type { StyleProp, TextStyle, TextProps } from "react-native";

/**
 * Represents the text alignment of strong.
 * @type {"left" | "right" | "center"}
 */
export type StrongAlignment = "left" | "right" | "center";

/**
 * Represents the font size of strong.
 * @type {"lg" | "default" | "sm" | "xs" | "xxs"}
 */
export type StrongSize = "lg" | "default" | "sm" | "xs" | "xxs";

/**
 * Represents the colors of strong.
 * @type {"default" | "inverted"}
 */
export type StrongColor = "default" | "inverted";

/**
 * Props interface for the Strong component.
 * @interface StrongProps
 * @property {StrongAlignment} [alignment] - The text alignment of strong.
 * @property {StrongSize} [size] - The text size of strong.
 * @property {React.ReactNode} [children] - The text content of strong.
 * @property {StrongColor} [alignemnt] - The text color for strong.
 * @property {StyleProp<TextStyle>} [style] - Additional styling for strong.
 * @property {boolean} [allowFontScaling='true'] - Native allowFontScaling prop.
 */
export interface StrongProps extends TextProps {
  alignment?: StrongAlignment;
  size?: StrongSize;
  children?: React.ReactNode;
  color?: StrongColor;
  style?: StyleProp<TextStyle>;
  allowFontScaling?: boolean;
}
