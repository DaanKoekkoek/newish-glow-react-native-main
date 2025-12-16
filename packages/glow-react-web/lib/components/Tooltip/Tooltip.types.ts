type TooltipPosition = "left" | "right";

/**
 * Props for the Tooltip component.
 * @interface TooltipProps
 * @property {string} description - Unique identifier for the tooltip.
 * @property {React.ReactElement | React.ReactElement[]} [children] - Child elements to be wrapped by the tooltip.
 * @property {boolean} [animated] - Whether the tooltip should have an animated appearance.
 * @property {boolean} [closeButton] - Whether to display a close icon in the tooltip.
 * @property {string} [testID] - Test identifier for testing frameworks.
 * @property {TooltipPosition} [tipPosition] - Horizontal position of the tooltip relative to the target element.
 * @property {boolean} [active] - Whether the tooltip is active (visible) or not.
 */
export interface TooltipProps {
  description: string;
  children?: React.ReactElement | React.ReactElement[] | string;
  animated?: boolean;
  closeButton?: boolean;
  testID?: string;
  tipPosition?: TooltipPosition;
  active?: boolean;
}
