import type { SectionProps } from "foundations/Section/Section.types";

type ShopSectionPaddingTop = "none" | "default" | "lg";

/**
 * Represents `ShopSection` properties.
 * @type {ShopSectionProps}
 * @extends {SectionProps}
 * @property {React.ReactNode} [above] - Renders content above the children
 * @property {React.ReactNode} [aside] - Renders content on the right side of children
 * @property {ShopSectionPaddingTop} [paddingTop] - Set a paddingTop
 */
export interface ShopSectionProps
  extends Omit<SectionProps, "type" | "paddingTop"> {
  aside?: React.ReactNode;
  above?: React.ReactNode;
  paddingTop?: ShopSectionPaddingTop;
}
