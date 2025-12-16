import type React from "react";
import type { StyleProp, TextStyle } from "react-native";

/**
 * Represents the DOM rendering type of the heading.
 * @type {"h1" | "h2" | "h3" | "h4" | "h5" | "h6"}
 */
export type HeadingRenderType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Represents the horizontal alignment of the heading.
 * @type {"left" | "center"}
 */
export type HeadingAlignment = "left" | "center";

/**
 * Represents the sizes of the heading.
 * @type {"xl" | "lg" | "md" | "sm" | "xs"}
 */
export type HeadingSize = "xl" | "lg" | "md" | "sm" | "xs";

/**
 * Represents the colors of heading.
 * @type {"default" | "inverted"}
 */
export type HeadingColor = "default" | "inverted";

/**
 * Props interface for the Heading component.
 * @interface HeadingProps
 * @property {HeadingSize} [size] - The size of the heading.
 * @property {React.ReactNode} - The content of the heading.
 * @property {HeadingRenderType} [as] - The DOM rendering output of the heading.
 * @property {HeadingAlignment} [alignemnt] - The horizontal alignment of the text within heading.
 * @property {StyleProp<TextStyle>} [style] - Additional styling for the heading.
 * @property {HeadingCoor} [color='default'] - Color of the heading.
 * @property {boolean} [allowFontScaling='true'] - Native allowFontScaling prop.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */
export interface HeadingProps {
  size: HeadingSize;
  children: React.ReactNode;
  as?: HeadingRenderType;
  alignment?: HeadingAlignment;
  style?: StyleProp<TextStyle>;
  color?: HeadingColor;
  allowFontScaling?: boolean;
  testID?: string | undefined;
}
