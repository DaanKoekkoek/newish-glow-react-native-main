import type { BreakpointKey } from "_theming/breakpoints";
import type { ColumnSizeOptions } from "../Grid";
import { BreakpointValues } from "_utility";

/**
 * Defines the direction of the stack layout.
 * @type {"row" | "column" | "row-reverse" | "column-reverse"}
 */
export type StackDirectionType =
  | "row"
  | "column"
  | "row-reverse"
  | "column-reverse";

/**
 * Defines stack direction per breakpoint.
 * @type {Object.<BreakpointKey, StackDirectionType>}
 */
export type StackDirectionPerBreakpointType = {
  [Breakpoint in BreakpointKey]?: StackDirectionType;
};

/**
 * Defines spacing values between stack items.
 * @type {0 | 50 | 100 | 150 | 200 | 300 | 400 | 500 | 600 | 800 | 1000}
 */
export type StackGapSize =
  | 0
  | 50
  | 100
  | 150
  | 200
  | 300
  | 400
  | 500
  | 600
  | 800
  | 1000;

/**
 * Defines gap size per breakpoint.
 * @type {Object.<BreakpointKey, StackGapSize>}
 */
export type StackGapPerBreakpointSize = {
  [Breakpoint in BreakpointKey]?: StackGapSize;
};

/**
 * Defines preset gap types.
 * @type {"lg" | "sm" | "default"}
 */
export type StackGapType = "lg" | "sm" | "default";

/**
 * Defines gap type per breakpoint.
 * @type {Object.<BreakpointKey, StackGapSize>}
 */
export type StackGapPerBreakpointType = {
  [Breakpoint in BreakpointKey]?: StackGapSize;
};

/**
 * Defines alignment options for stack items.
 * @type {"center" | "flex-start" | "flex-end" | "stretch" | "baseline"}
 */
export type StackAlignItemsType =
  | "center"
  | "flex-start"
  | "flex-end"
  | "stretch"
  | "baseline";

/**
 * Defines alignment per breakpoint.
 * @type {Object.<BreakpointKey, StackAlignItemsType>}
 */
export type StackAlignItemsPerBreakpointType = {
  [Breakpoint in BreakpointKey]?: StackAlignItemsType;
};

/**
 * Defines justification options for stack content.
 * @type {"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "stretch"}
 */
export type StackJustifycontentType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "stretch";

/**
 * Defines justification per breakpoint.
 * @type {Object.<BreakpointKey, StackJustifycontentType>}
 */
export type StackJustifyContentPerBreakpointType = {
  [Breakpoint in BreakpointKey]?: StackJustifycontentType;
};

/**
 * Defines wrapping behavior of stack items.
 * @type {"wrap" | "nowrap" | "wrap-reverse"}
 */
export type StackWrapType = "wrap" | "nowrap" | "wrap-reverse";

/**
 * Defines wrapping behavior per breakpoint.
 * @type {Object.<BreakpointKey, StackWrapType>}
 */
export type StackWrapPerBreakpointType = {
  [Breakpoint in BreakpointKey]?: StackWrapType;
};

/**
 * Props for the Stack component.
 * @type StackProps
 * @property {StackDirectionType | StackDirectionPerBreakpointType} [direction] - Defines the layout direction of the stack.
 * @property {StackGapType | StackGapPerBreakpointType | StackGapSize | StackGapPerBreakpointSize} [gap] - Sets spacing between stack items.
 * @property {StackAlignItemsType | StackAlignItemsPerBreakpointType} [alignItems] - Aligns items along the cross axis.
 * @property {StackAlignItemsType | StackAlignItemsPerBreakpointType} [alignSelf] - Aligns the stack itself within its parent.
 * @property {StackJustifycontentType | StackJustifyContentPerBreakpointType} [justifyContent] - Justifies items along the main axis.
 * @property {boolean | Object.<BreakpointKey, boolean>} [grow] - Enables flex-grow behavior.
 * @property {boolean | Object.<BreakpointKey, boolean>} [shrink] - Enables flex-shrink behavior.
 * @property {keyof JSX.IntrinsicElements | React.ElementType} [as] - Custom element type to render.
 * @property {Partial<BreakpointValues<ColumnSizeOptions>> | ColumnSizeOptions} [columnSize] - Defines column sizing for grid layout.
 * @property {React.ReactNode} [children] - Stack content.
 * @property {StackWrapType | StackWrapPerBreakpointType} [wrap] - Controls wrapping of stack items.
 * @property {React.CSSProperties} [style] - Inline styles.
 * @property {string} [className] - Additional class name.
 * @property {string} [testID] - Identifier for testing.
 */
export type StackProps = {
  direction?: StackDirectionType | StackDirectionPerBreakpointType;
  gap?:
    | StackGapType
    | StackGapPerBreakpointType
    | StackGapSize
    | StackGapPerBreakpointSize;
  alignItems?: StackAlignItemsType | StackAlignItemsPerBreakpointType;
  alignSelf?: StackAlignItemsType | StackAlignItemsPerBreakpointType;
  justifyContent?:
    | StackJustifycontentType
    | StackJustifyContentPerBreakpointType;
  grow?:
    | boolean
    | {
        [key in BreakpointKey]?: boolean;
      };
  shrink?:
    | boolean
    | {
        [key in BreakpointKey]?: boolean;
      };
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  size?: Partial<BreakpointValues<ColumnSizeOptions>> | ColumnSizeOptions;
  columnSize?: Partial<BreakpointValues<ColumnSizeOptions>> | ColumnSizeOptions;
  children?: React.ReactNode;
  wrap?: StackWrapType | StackWrapPerBreakpointType;
  style?: React.CSSProperties;
  className?: string;
  testID?: string;
};
