import type { ParagraphProps } from "foundations/index";
import type { StyleProp, TextStyle } from "react-native";

/**
 * Represents the attention text functional colors.
 * @type {"success" | "error" | "warning" | "information"}
 */
export type AttentionVariant = "success" | "error" | "warning" | "information";

/**
 * Attention atom props
 * @interface AttentionProps
 * @extends {Pick<ParagraphProps, "size">}
 * @property {string} [text] - The contents of the attention text
 * @property {AttentionVariant} [variant='success'] -  The color of the attention text
 * @property {StyleProp<TextStyle>} [style] - Optional styling to overrule the Paragraph within Attention
 * @property {boolean} [allowFontScaling='true'] - Native allowFontScaling prop.
 */
export interface AttentionProps extends Pick<ParagraphProps, "size"> {
  text: string;
  variant?: AttentionVariant;
  style?: StyleProp<TextStyle>;
  allowFontScaling?: boolean;
}
