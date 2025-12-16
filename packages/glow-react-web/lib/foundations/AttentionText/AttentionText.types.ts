import type { IconNames } from "foundations/Icon";

/**
 * Represents the size of the AttentionText.
 * @type {"sm" | "default"}
 */
export type AttentionTextSize = "sm" | "default";

/**
 * Represents the variant of the AttentionText.
 * @type {"success" | "error"}
 */
export type AttentionTextVariant = "success" | "error";

/**
 * Props for the AttentionText.
 * @interface AttentionTextProps
 * @property {string} [children] - The AttentionText message.
 * @property {AttentionTextSize} [size='default'] - The AttentionText size.
 * @property {IconNames} [icon] - The name of the icon to display next to the list item content. Refer to the Icons enumeration for possible values.
 * @property {"success" | "error"} [variant] - The AttentionText variant.
 */
export interface AttentionTextProps {
  children?: string;
  size?: AttentionTextSize;
  icon?: IconNames;
  variant?: AttentionTextVariant;
  testID?: string;
}
