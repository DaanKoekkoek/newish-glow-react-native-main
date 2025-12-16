import { OdidoPalette } from "_internals/Color";

/**
 * Represents the style of Box.
 * @type {"default" | "outline" | "emphasised"}
 */
export type BoxProminence = "default" | "color" | "outline" | "emphasised";

/**
 * Represents the direction type of Box.
 * @type {"vertical" | "horizontal"}
 */
export type BoxDirection = "vertical" | "horizontal";

/**
 * Props for the Box.
 * @interface BoxProps
 * @property {React.ReactElement | React.ReactElement[]} [children] - Children placed within the Box
 * @property {BoxProminence} [prominence='default'] - The style of the Box
 * @property {boolean} [grow] - Applies a `flex: 1` to the Box.
 * @property {ViewStyle} [style] - Additional styling for the Box.
 * @property {Palette} [palette] - colour palette for the Box component
 * @property {string} [testID] - testID of the box
 */
export interface BoxProps {
  children: React.ReactElement | React.ReactElement[];
  prominence?: BoxProminence;
  grow?: boolean;
  style?: React.CSSProperties;
  size?: "default" | "sm";
  palette?: OdidoPalette;
  testID?: string;
  className?: string;
}
