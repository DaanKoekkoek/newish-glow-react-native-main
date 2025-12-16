import type { OdidoPalette } from "_theming/tokenLoader";
import type { GlowGradientTypes } from "foundations/GlowGradient";
import type { ImageProps } from "foundations/Image";
import type { SectionVariant } from "foundations/Section";

/**
 * Represents none padding type of the shop section
 * @type {"none"}
 */
export type ShopSectionNoPaddingType = "none";

/**
 * Represents the padding types of the shop section
 * @type {"default" | "large" | "none"}
 */
export type ShopSectionPaddingType = "default" | "large";

/**
 * Props for the ShopSection.
 * @interface ShopSectionProps
 * @property {SectionVariant} [variant='default'] - Sets a color on the Shop Section.
 * @property {GlowGradientTypes} [glow='Glow1'] - Sets the gradient type when `variant` is set to `emphasised`.
 * @property {React.ReactElement | React.ReactElement[]} [children] - Accepts `Main` and `Side` component(s).
 * @property {ShopSectionPaddingType | ShopSectionNoPaddingType} [paddingTop] - Sets a top padding on the Shop Section.
 * @property {ShopSectionPaddingType} [paddingTop] - Sets a bottom padding on the Shop Section.
 * @property {boolean} [showSidepanel] - Toggle visibility of aside column.
 * @property {ImageProps} [image] - Sets an image as background on the Section.
 */
export interface ShopSectionProps {
  children: React.ReactElement | React.ReactElement[];
  variant?: SectionVariant;
  glow?: GlowGradientTypes;
  paddingTop?: ShopSectionPaddingType | ShopSectionNoPaddingType;
  paddingBottom?: ShopSectionPaddingType;
  showSidepanel?: boolean;
  image?: ImageProps;
  palette?: OdidoPalette;
}
