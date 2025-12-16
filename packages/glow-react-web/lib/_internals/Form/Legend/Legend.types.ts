export interface LegendProps {
  /**
   * The text displayed as the label for the legend.
   *
   * @type {string}
   * @memberof LegendProps
   */
  label?: string;

  /**
   * The tag used as wrapper for the legend
   *
   * @type {keyof JSX.IntrinsicElements | React.ElementType}
   * @memberof LegendProps
   */
  as?: keyof JSX.IntrinsicElements | React.ElementType;

  /**
   * Indicates value for optional label.
   *
   * @type {string}
   * @memberof LegendProps
   */
  optionalText?: string;

  /**
   * Adds an id to the label for accessibility.
   *
   * @type {(string | (() => void))}
   * @memberof LegendProps
   */
  id?: string;

  /**
   * Provides additional information about the input field.
   * This can be:
   * - A string to display as text
   * - A callback function to trigger (e.g. open a modal)
   * - A tooltip configuration object
   * - A React element (to pass a custom Tooltip component)
   *
   * @type {string | (() => void) | TooltipInfo | React.ReactElement}
   * @memberof LegendProps
   */
  info?: string | (() => void) | TooltipInfo | React.ReactElement;

  /**
   * TestID for the label, which can be used in unit tests.
   *
   * @type {string}
   * @memberof LegendProps
   */
  testID?: string;
  className?: string;
}

/**
 * Props for the tooltip configuration in legend info icons.
 * @interface TooltipInfo
 * @property {string} description - Content displayed inside the tooltip.
 * @property {('left'|'right')} [tipPosition] - Horizontal position of the tooltip relative to the target.
 * @property {boolean} [closeButton] - Whether to display a close icon in the tooltip.
 * @property {boolean} [animated] - Whether the tooltip should have an animated appearance.
 */
export interface TooltipInfo {
  description: string;
  tipPosition?: "left" | "right";
  closeButton?: boolean;
  animated?: boolean;
}
