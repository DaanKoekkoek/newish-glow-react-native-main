import type React from "react";
import type { StyleProp, TextStyle } from "react-native";

/**
 * Represents the horizontal text alignment for display
 * @type {"left" | "center"}
 */
export type DisplayAlignment = "left" | "center";

/**
 * Represents the available sizes for display
 * @type {"md" | "sm"}
 */
export type DisplaySize = "md" | "sm";

/**
 * Represents the colors of display
 * @type {"default" | "inverted"}
 */
export type DisplayColor = "default" | "inverted";

/**
 * Props for Display.
 * @interface DisplayProps
 * @property {DisplayAlignment} [alignment='left'] - Sets the text alignment of the display.
 * @property {DisplayColor} [color='default'] - Sets the text color for display.
 * @property {DisplaySize} [size='md'] - Sets the size of the display text.
 * @property {React.ReactNode} [children] - The content of the display.
 * @property {TextStyle} [style] - Additional styling for the display.
 * @property {boolean} [allowFontScaling='true'] - Native allowFontScaling prop.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface DisplayProps {
  alignment?: DisplayAlignment;
  color?: DisplayColor;
  size?: DisplaySize;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  allowFontScaling?: boolean;
  testID?: string | undefined;
}
