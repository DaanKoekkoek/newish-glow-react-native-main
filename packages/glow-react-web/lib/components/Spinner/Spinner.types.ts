import { OdidoPalette } from "_internals/Color";

/**
 * Represents the container size of the Spinner
 * @type {"default" | "sm"}
 */
export type SpinnerSize = "default" | "sm";

/**
 * Represents the icon color of the Spinner
 * @type {"default" | "inverted"}
 */
export type SpinnerColor = "default" | "inverted";

/**
 * Props for Spinner.
 * @interface SpinnerProps
 * @property {React.CSSProperties} [style] - Apply additional styling to the spinner icon
 * @property {string} [className] - Apply additional className styling to the spinner icon
 * @property {SpinnerSize} [size] - Sets the size of the spinner
 * @property {SpinnerColor} [color='default'] - Spinner icon color
 * @property {string} [testID='spinner-icon'] - testID of the spinner icon
 * @property {OdidoPalette} [palette] - The color palette to use for the glow effect
 */
export interface SpinnerProps {
  size?: SpinnerSize;
  style?: React.CSSProperties;
  className?: string;
  color?: SpinnerColor;
  testID?: string;
  palette?: OdidoPalette;
}
