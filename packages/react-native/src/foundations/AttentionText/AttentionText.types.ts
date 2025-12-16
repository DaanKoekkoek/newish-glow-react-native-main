import type { IconProps } from "foundations/Icon";

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
 * @property {IconProps["name"]} [icon] - Renders an optional glow-icon above the description message.
 * @property {"success" | "error"} [variant] - The AttentionText variant.
 */
export interface AttentionTextProps {
  children?: string;
  size?: AttentionTextSize;
  icon?: IconProps["name"];
  variant?: AttentionTextVariant;
  testID?: string | undefined;
}
