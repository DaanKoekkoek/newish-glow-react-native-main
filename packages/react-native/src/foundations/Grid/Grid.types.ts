import type { BreakpointKeys } from "_theming/breakpoints";
import type { ColumnBreakpoints } from "_theming/tokenLoader";
import type React from "react";
import type { StyleProp, ViewStyle } from "react-native";
export type { ColumnBreakpoints };

export type RequiredColumnBreakpoints = Required<ColumnBreakpoints>;

/**
 * Maps to the token value for defining the column min- and max width.
 * @interface ColumnCountWidth
 * @property {[key: string]: ColumnBreakpoints}
 */
export interface ColumnCountWidth {
  [key: string]: ColumnBreakpoints;
}

/**
 * Represents the rendering direction of the `Grid.Column` components.
 * @type {"row" | "row-reverse"}
 */
export type GridDirection = "row" | "row-reverse";

/**
 * Represents the direction of the Grid.Column for each breakpoint.
 * @type {Object.<BreakpointKeys, GridDirection>}
 */
export type GridDirectionPerBreakpoint = {
  [key in BreakpointKeys]?: GridDirection;
};

/**
 * Represents the fluid sizing of the Grid for each breakpoint.
 * @type {Object.<BreakpointKeys, boolean>}
 */
export type FluidPerBreakpoint = {
  [Breakpoint in BreakpointKeys]?: boolean;
};

/**
 * Represents the wrapping style of the `Grid.Column` items.
 * @type {"wrap" | "wrap-reverse"}
 */
export type GridWrap = "wrap" | "wrap-reverse";

/**
 * Represents the variant of the `Grid`.
 * @type {"default" | "narrow" | "box"}
 */
export type GridVariant = "default" | "narrow" | "box";

/**
 * Represents the variant of the `Grid`.
 * @interface GridContextProps
 * @property {BreakpointKeys} [breakpoint] - Contains current breakpoint's key value.
 * @property {RequiredColumnBreakpoints} [gridColumns] - When a breakpoint from `ColumnBreakpoints` is applied on the `Grid`, it'll automatically be applied on the `Grid.Column` as well.
 */
export interface GridContextProps {
  breakpoint: BreakpointKeys;
  gridColumns?: RequiredColumnBreakpoints;
}

/**
 * Represents `Grid` properties.
 * @interface GridProps
 * @extends ColumnBreakpoints
 * @property {GridDirection | GridDirectionPerBreakpoint} [direction='row'] - Defines the rendering direction of the `Grid.Column`.
 * @property {GridVariant} [variant='default'] - Defines the size variant of the `Grid`.
 * @property {React.Element | React.Element[]} [children] - Accepts `Grid.Column`.
 * @property {ViewStyle} [containerStyle] - Additional styling applied on the `Grid` container.
 * @property {ViewStyle} [rowStyle] - Additional styling applied on the `Grid` row.
 * @property {boolean | FluidPerBreakpoint} [fluid='false'] - Sets the container to a maxWidth of `100%`, as well as removing the margins.
 */
export interface GridProps extends ColumnBreakpoints {
  direction?: GridDirection | GridDirectionPerBreakpoint;
  variant?: GridVariant;
  children?: React.ReactElement | React.ReactElement[];
  containerStyle?: StyleProp<ViewStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  fluid?: boolean | FluidPerBreakpoint;
  mobileSmall?: ColumnBreakpoints["mobileSmall"];
  mobile?: ColumnBreakpoints["mobile"];
  tablet?: ColumnBreakpoints["tablet"];
  laptop?: ColumnBreakpoints["laptop"];
  desktop?: ColumnBreakpoints["desktop"];
}

/**
 * Represents `Grid.Column` properties.
 * @interface ColumnProps
 * @extends ColumnBreakpoints
 * @property {React.ReactNode | React.ReactNode[]} [children] - Children of the `Grid.Column`.
 * @property {ViewStyle} [style] - Additional styling applied on the `Grid.Column`.
 */
export interface ColumnProps extends ColumnBreakpoints {
  children?: React.ReactNode | React.ReactNode[];
  style?: StyleProp<ViewStyle>;
  mobileSmall?: ColumnBreakpoints["mobileSmall"];
  mobile?: ColumnBreakpoints["mobile"];
  tablet?: ColumnBreakpoints["tablet"];
  laptop?: ColumnBreakpoints["laptop"];
  desktop?: ColumnBreakpoints["desktop"];
}
