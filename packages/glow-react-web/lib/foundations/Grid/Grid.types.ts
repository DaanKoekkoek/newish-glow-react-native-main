import { BreakpointValues } from "_utility";
import type { BreakpointKey } from "_theming/breakpoints";

/**
 * Represents the available sizes of the Column.
 * @type {1|2|3|4|5|6|7|8|9|10|11|12}
 */
export type ColumnSizeOptions =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

/**
 * Represents the keys of the `BreakpointValues` object.
 * @type {keyof BreakpointValues<unknown>}
 */
export type BreakpointKeys = keyof BreakpointValues<unknown>;

/**
 * Represents the available directions of the grid
 * @type {"row" | "row-reverse"}
 */
type DirectionType = "row" | "row-reverse";

/**
 * Represents the available max-width values of the grid
 * @type {"default" | "narrow" | "box"}
 */
type GridWidth = "default" | "narrow" | "box";

type NoGuttersPerBreakpointType = {
  [Breakpoint in BreakpointKey]?: boolean;
};

/**
 * Represents `Grid` properties.
 * @type {GridProps}
 * @property {DirectionType | BreakpointValues<DirectionType>} [direction] - Sets the `flex-direction` of the grid
 * @property {boolean} [fluid] - Sets the max-width of the grid to 100% if set to `true`
 * @property {React.ReactNode} [children] - Accepts Columns of the grid
 * @property {string} [containerClassName] - Additional className classes for container wrapped around the grid
 * @property {string} [gridClassName] - Additional className classes for the grid within the container
 * @property {Partial<BreakpointValues<ColumnSizeOptions>> | ColumnSizeOptions} [columnSize] - Accepts a single `ColumnSizeOption` or an object containing breakpoints along with a `ColumnSizeOption`
 * @property {boolean | NoGuttersPerBreakpointType} [noGutters='false'] - Removes horizontal padding and margin from column and container.
 * @property {GridWidth} [width='default'] - Set a different width to the grid.
 * @property {string} [testID='grid'] - Additional test id on the grid and its contents (container - grid - column).
 */
export type GridProps = {
  direction?: DirectionType | BreakpointValues<DirectionType>;
  fluid?: boolean;
  children: React.ReactNode;
  containerClassName?: string;
  gridClassName?: string;
  columnSize?: Partial<BreakpointValues<ColumnSizeOptions>> | ColumnSizeOptions;
  noGutters?: boolean | NoGuttersPerBreakpointType;
  width?: GridWidth;
  testID?: string;
};

/**
 * Represents `Column` properties.
 * @type {ColumnProps}
 * @property {React.ReactNode} [children] - Accepts any type of children
 * @property {string} [columnSizeClasses] - Passed down column size classes of the `Grid` component using `ColumnSizeOptions`
 * @property {string} [className] - Additional className classes applied on the column
 * @property {Partial<BreakpointValues<ColumnSizeOptions>>} [size] - Sets the column size using `ColumnSizeOptions`
 * @property {string} [testID='column'] - Apply an additional test id to the column
 */
export type ColumnProps = {
  children: React.ReactNode;
  columnSizeClasses?: string;
  className?: string;
  size?: Partial<BreakpointValues<ColumnSizeOptions>>;
  testID?: string;
};
