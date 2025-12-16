import type { BreakpointKey } from "_theming/breakpoints";
import type { VisualProps } from "_internals/Assets";
import type { SelectorPropsBase } from "../Selector.types";
import type { IconProps } from "foundations/Icon";

export type SelectorLightDirectionType = "vertical" | "horizontal";

export type SelectorLightDirectionPerBreakpointType = {
  [Breakpoint in BreakpointKey]?: SelectorLightDirectionType;
};

/**
 * Props for the SelectorLight component.
 * @typedef {SelectorLightProps}
 * @extends {Omit<SelectorPropsBase, "title" | "highlight" | "promotion" | "secondaryAction">}
 * @property {VisualProps} [image] - Renders an image. Takes presedence over `icon`.
 * @property {Omit<IconProps, "size" | "solid">} [icon] - Generates an icon of glow variant.
 * @property {React.ReactNode} [title] - Renders a title
 * @property {SelectorLightDirectionType | SelectorLightDirectionPerBreakpointType} [direction='horizontal'] - Content direction.
 * @property {string} [highlight] - Renders a highlight above the selector.
 */
export type SelectorLightProps = Omit<
  SelectorPropsBase,
  "title" | "highlight" | "promotion" | "secondaryAction"
> & {
  image?: VisualProps;
  icon?: Omit<IconProps, "size" | "solid">;
  title: React.ReactNode;
  direction?:
    | SelectorLightDirectionType
    | SelectorLightDirectionPerBreakpointType;
  highlight?: string;
};
