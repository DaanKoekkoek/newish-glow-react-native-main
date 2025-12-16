import type { BreakpointKeys } from "_theming/breakpoints";
import type { ViewStyle, StyleProp } from "react-native";

/**
 * Represents the direction type of the Stack children.
 * @type {"row" | "column" | "row-reverse" | "column-reverse"}
 */
export type StackDirectionType =
  | "row"
  | "column"
  | "row-reverse"
  | "column-reverse";

/**
 * Represents the direction of the Stack children per breakpoint.
 * @type {Object.<BreakpointKeys, StackDirectionType>}
 */
export type StackDirectionPerBreakpointType = {
  [Breakpoint in BreakpointKeys]?: StackDirectionType;
};

/**
 * Represents the gap type between Stack children.
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
 * Represents the gap of the Stack children per breakpoint.
 * @type {Object.<BreakpointKeys, StackGapSize>}
 */
export type StackGapPerBreakpointSize = {
  [Breakpoint in BreakpointKeys]?: StackGapSize;
};

/**
 * Represents the gap size presets
 * @type {"lg" | "sm" | "default"}
 */
export type StackGapType = "lg" | "sm" | "default";

/**
 * Represents the gap of the Stack children per breakpoint.
 * @type {Object.<BreakpointKeys, StackGapType>}
 */
export type StackGapPerBreakpointType = {
  [Breakpoint in BreakpointKeys]?: StackGapType;
};

/**
 * Represents the alignment options for Stack children along the cross axis.
 * @type {"center" | "flex-start" | "flex-end" | "stretch" | "baseline"}
 */
export type StackAlignItemsType =
  | "center"
  | "flex-start"
  | "flex-end"
  | "stretch"
  | "baseline";

/**
 * Represents the alignment options for Stack children along the cross axis per breakpoint.
 * @type {Object.<BreakpointKeys, StackAlignItemsType>}
 */
export type StackAlignItemsPerBreakpointType = {
  [Breakpoint in BreakpointKeys]?: StackAlignItemsType;
};

/**
 * Represents the alignment of Stack children along the main axis.
 * @type {"flex-start" | "flex-end" | "center" | "space-between" | "space-around"}
 */
export type StackJustifycontentType =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around";

/**
 * Represents the alignment options for Stack children along the main axis per breakpoint.
 * @type {Object.<BreakpointKeys, StackJustifycontentType>}
 */
export type StackJustifyContentPerBreakpointType = {
  [Breakpoint in BreakpointKeys]?: StackJustifycontentType;
};

/**
 * Represents the wrap behavior of Stack children.
 * @type {"wrap" | "nowrap" | "wrap-reverse"}
 */
export type StackWrapType = "wrap" | "nowrap" | "wrap-reverse";

/**
 * Represents the wrap behavior of Stack children per breakpoint.
 * @type {Object.<BreakpointKeys, StackWrapType>}
 */
export type StackWrapPerBreakpointType = {
  [Breakpoint in BreakpointKeys]?: StackWrapType;
};

/**
 * Props for the Stack component.
 * @interface StackProps
 * @property {StackDirectionType | StackDirectionPerBreakpointType} [direction='vertical'] - Direction of the stack layout per breakpoint.
 * @property {StackGapType | StackGapPerBreakpointType | StackGapPerBreakpointSize} gap - Spacing between stack items per breakpoint.
 * @property {StackAlignItemsType | StackAlignItemsPerBreakpointType} [alignItems='center'] - Alignment of stack items along the cross axis.
 * @property {StackJustifycontentType | StackJustifyContentPerBreakpointType} [justifyContent='flexStart'] - Alignment of stack items along the main axis.
 * @property {boolean | { [key in keyof typeof breakpoints]?: boolean }} [grow] - Whether the Stack component should allow to grow to fill the available space.
 * @property {boolean | { [key in keyof typeof breakpoints]?: boolean }} [shrink] - Whether the Stack component should allow to shrink if necessary.
 * @property {React.ReactNode} [children] - The child elements to be rendered within the stack.
 * @property {WrapType | WrapPerBreakpointType} [wrap] - Whether the Stack should wrap the content or not.
 * @property {ViewStyle} [style] - Pass in additional styles to the Stack.
 */
export interface StackProps {
  direction?: StackDirectionType | StackDirectionPerBreakpointType;
  gap?:
    | StackGapType
    | StackGapPerBreakpointType
    | StackGapSize
    | StackGapPerBreakpointSize;
  alignItems?: StackAlignItemsType | StackAlignItemsPerBreakpointType;
  justifyContent?:
    | StackJustifycontentType
    | StackJustifyContentPerBreakpointType;
  grow?: boolean | { [key in BreakpointKeys]?: boolean };
  shrink?: boolean | { [key in BreakpointKeys]?: boolean };
  children?: React.ReactNode;
  wrap?: StackWrapType | StackWrapPerBreakpointType;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
