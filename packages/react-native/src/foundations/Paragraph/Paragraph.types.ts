import type React from "react";
import type { StyleProp, TextStyle, TextProps } from "react-native";

/**
 * Represents the horizontal text alignment for paragraph
 * @type {"left" | "right" | "center"}
 */
export type ParagraphAlignment = "left" | "right" | "center";

/**
 * Represents the available sizes for paragraph
 * @type {"lg" | "default" | "sm" | "xs" | "xxs"}
 */
export type ParagraphSize = "lg" | "default" | "sm" | "xs" | "xxs";

/**
 * Represents the colors the paragraph
 * @type {"default" | "inverted"}
 */
export type ParagraphColor = "default" | "inverted";

type DataType = `data-${string}`;

type DataAttributes = Omit<
  TextProps,
  "alignment" | "children" | "color" | "id" | "size" | "style" | "testID"
> & {
  [key: DataType]: string | number | boolean | undefined;
};

/**
 * Props for Paragraph.
 * @interface ParagraphProps
 * @property {string} [id] - The id of the paragraph
 * @property {ParagraphColor} [color='default'] - The text color of the paragraph.
 * @property {DataAttributes} [dataAttributes] - Additional data attributes to be added to the paragraph.
 * @property {ParagraphAlignment} [alignment='left'] - Sets the text alignment of the paragraph.
 * @property {ParagraphSize} [size='md'] - Sets the size of the paragraph text.
 * @property {React.ReactNode} [children] - The content of the paragraph.
 * @property {StyleProp<TextStyle>} [style] - Additional styling for the paragraph.
 * @property {boolean} [allowFontScaling='true'] - Native allowFontScaling prop.
 * @property {string} [testID] - Test ID, for querying in unit tests.
 */
export interface ParagraphProps extends TextProps {
  id?: string;
  color?: ParagraphColor;
  dataAttributes?: DataAttributes;
  alignment?: ParagraphAlignment;
  size?: ParagraphSize;
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  allowFontScaling?: boolean;
  testID?: string;
}
