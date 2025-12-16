import { OdidoPalette } from "_internals/Color";
import type { SectionPaddingType } from "foundations/Section";

/**
 * Props for the HeroSection.
 * @type HeroSectionProps
 * @property {React.ReactElement | React.ReactElement[]} children - Should contain `<Hero />` components only.
 * @property {string} [title] - The title shown above the children.
 * @property {string | React.ReactElement} [description] - The description shown inbetween the `title` and `children`.
 * @property {SectionPaddingType} [paddingTop='default'] - Adds or removes padding top on the section.
 * @property {OdidoPalette | OdidoPalette[]} [palette='default'] - Accepts an array of palettes or a single palette. The array maps to the amount of `children` and passes the matching index into that child. A single palette applies it to every children.
 */
export type HeroSectionProps = {
  children: React.ReactElement | React.ReactElement[];
  title?: string;
  description?: string | React.ReactElement;
  paddingTop?: SectionPaddingType;
  palette?: OdidoPalette | OdidoPalette[];
};
