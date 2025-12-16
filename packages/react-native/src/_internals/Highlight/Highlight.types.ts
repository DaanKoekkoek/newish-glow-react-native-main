import type React from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type HighlightVariant = "default" | "compact" | "spacious";

export type HighlightState = "default" | "hover" | "inactive";

/**
 * Highlight atom props
 * @interface HighlightProps
 * @property {string | React.ReactElement} [children] - The contents of the Highlight
 * @property {HighlightVariant} [variant='default'] - The style variant of the Higlight
 * @property {HighlightState} [state='default'] - The state of the Highlight
 * @property {boolean} [selected] - Whether the Highlight should appear in selected. Can be combined with state.
 * @property {StyleProp<ViewStyle>} [style] - Additional styling to overrule the base style of the container.
 */
export type HighlightProps = {
  children: string | React.ReactElement;
  variant?: HighlightVariant;
  state?: HighlightState;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
};
