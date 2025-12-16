import type { BreakpointKeys } from "_theming/breakpoints";
import type {
  GridProps,
  HeadingRenderType,
  SectionProps,
} from "foundations/index";
import type React from "react";

/**
 * Represents the paddingTop options
 * @type {"none" | "default"}
 */
export type MySectionPadding = "none" | "default";

/**
 * Represents the heading title size
 * @type {"md" | "lg" | "xl"}
 */
export type MySectionTitleSize = "md" | "lg" | "xl";

/**
 * Represents the padding of the section for each breakpoint.
 * @type {Object.<BreakpointKeys, MySectionPadding>}
 */
export type MySectionPaddingPerBreakpoint = {
  [key in BreakpointKeys]?: MySectionPadding;
};

/**
 * Props for the MySection component.
 * @interface MySectionProps
 * @extends {Omit<SectionProps, "paddingTop">}
 */
export interface MySectionProps extends Omit<SectionProps, "paddingTop"> {
  paddingTop?: MySectionPadding | MySectionPaddingPerBreakpoint;
}

/**
 * Props for the MySection.Title component.
 * @interface MySectionTitleProps
 * @property {MySectionTitleSize} [size='md'] Set the title font size (partially based off of Heading's available sizes).
 * @property {string} [children] - The text of the heading
 */
export interface MySectionTitleProps {
  size?: MySectionTitleSize;
  as?: HeadingRenderType;
  children?: string;
}

/**
 * Props for the MySection.Grid component.
 * @interface MySectionGridProps
 * @extends {Partial<Pick<GridProps>, "direction" | "mobileSmall" | "mobile" | "tablet" | "laptop" | "desktop">}
 * @property {React.ReactElement | React.ReactElement[]} [children] - Rendered as columns within MySection.Grid
 */
export interface MySectionGridProps
  extends Partial<
    Pick<
      GridProps,
      "direction" | "mobileSmall" | "mobile" | "tablet" | "laptop" | "desktop"
    >
  > {
  children: React.ReactElement | React.ReactElement[];
}
