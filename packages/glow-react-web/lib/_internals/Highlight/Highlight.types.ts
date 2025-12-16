import type React from "react";
import { OdidoPalette } from "..";

export type HighlightVariant = "default" | "compact" | "spacious";

export type HighlightState = "default" | "hover" | "inactive";

/**
 * Highlight atom props
 * @interface HighlightProps
 * @property {string | React.ReactElement} [children] - The contents of the Highlight
 * @property {HighlightVariant} [variant='default'] - The style variant of the Higlight
 * @property {HighlightState} [state='default'] - The state of the Highlight
 * @property {string} [className] - Additional styling to overrule the base style of the container.
 * @property {string} [gradientClassName] - Additional styling to overrule the gradient style of the container.
 * @property {string} [textClassName] - Additional styling to overrule the text style of the container.
 * @property {string} [testID='highlight'] - testID
 */
export type HighlightProps = {
  children: string | React.ReactElement;
  variant?: HighlightVariant;
  state?: HighlightState;
  palette?: OdidoPalette;
  className?: string;
  gradientClassName?: string;
  textClassName?: string;
  testID?: string;
};
