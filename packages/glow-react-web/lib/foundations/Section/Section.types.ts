import type React from "react";
import type { ImageProps } from "../Image";
import type { OdidoPalette } from "_internals/Color";
import type { HeadingRenderType, HeadingSize } from "foundations/Heading";

type SectionTitleSize = Extract<HeadingSize, "xl" | "lg" | "md">;

export type SectionTitle = {
  text: string;
  as?: HeadingRenderType;
  size: SectionTitleSize;
};

/**
 * Represents the color of the section
 * @type {"default" | "subtle" | "emphasised" | "image"}
 */
export type SectionVariant = "default" | "subtle" | "emphasised" | "image";

/**
 * Props for the section context provider.
 * @interface SectionPaletteProps
 * @property {Palette} [sectionPalette] - Palette for the section
 */
export interface SectionPaletteProps {
  sectionPalette?: OdidoPalette;
}

/**
 * Represents the padding removal of the section
 * @type {"default" | "none"}
 */
export type SectionPaddingType = "default" | "none" | "lg";

/**
 * Represents the section type, allows grid to inherit a different max-width based on type
 * @type {"default" | "my"}
 */
export type SectionType = "default" | "my" | "my-sidebar" | "shop";

/**
 * Props for the Section.
 * @interface SectionProps
 * @property {SectionVariant} [variant='default'] - Sets a color on the Section.
 * @property {ImageProps} [image] - Sets an image as background on the Section.
 * @property {SectionPaddingType | SectionPaddingPerBreakpointType} [paddingTop] - Applies a custom padding to the top of the section.
 * @property {React.ReactNode| React.ReactNode[]} [children] - Accepts `Grid` component(s).
 * @property {string} [className] - Additional className. Applied on the top level of the section.
 * @property {Palette} [palette] - Palette color (currently only available for Odido).
 * @property {string} [testID] - testID applied on the parent container of the section
 * @property {string} [id] - id applied on the parent container of the section
 * @property {"section" | "nav"} [as='section'] - renders a different tag type.
 */
export interface SectionProps {
  children: React.ReactNode | React.ReactNode[];
  variant?: SectionVariant;
  image?: ImageProps;
  paddingTop?: SectionPaddingType;
  className?: string;
  palette?: OdidoPalette;
  type?: SectionType;
  testID?: string;
  id?: string | undefined;
  as?: "section" | "nav";
}
