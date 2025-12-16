import type { OdidoPalette, BreakpointKeys } from "_theming/index";
import type { SubscriptionHeroInfoType } from "components/SubscriptionHero";
import type React from "react";
import type { ViewStyle, ImageStyle, StyleProp } from "react-native";
import type { SharedValue } from "react-native-reanimated";

import type { GlowGradientTypes } from "../GlowGradient";
import type { ImageProps } from "../Image";

/**
 * Represents the color of the section
 * @type {"default" | "subtle" | "emphasised" | "image"}
 */
export type SectionVariant = "default" | "subtle" | "emphasised" | "image";

/**
 * Props for the section context provider.
 * @interface SectionContextProps
 * @property {Palette} [sectionPalette] - Palette for the section
 */
export interface SectionContextProps {
  sectionPalette?: OdidoPalette;
}

/**
 * Represents the padding removal of the section
 * @type {"default" | "none"}
 */
export type SectionPaddingType = "default" | "none";

/**
 * Represents the direction of the Stack children per breakpoint.
 * @type {Object.<BreakpointKeys, SectionPaddingType>}
 */
export type SectionPaddingPerBreakpointType = {
  [Breakpoint in BreakpointKeys]?: SectionPaddingType;
};

/**
 * Props for the Section.
 * @interface SectionProps
 * @property {SectionVariant} [variant='default'] - Sets a color on the Section.
 * @property {GlowGradientTypes} [glow='Glow1'] - Sets the gradient type when `variant` is set to `emphasised`.
 * @property {ImageProps} [image] - Sets an image as background on the Section.
 * @property {SectionPaddingType | SectionPaddingPerBreakpointType} [paddingTop] - Applies a custom padding to the top of the section.
 * @property {SectionPaddingType | SectionPaddingPerBreakpointType} [paddingBottom] - Applies a custom padding to the bottom of the section.
 * @property {number} [index] - Internally set via `Main`.
 * @property {React.ReactElement | React.ReactElement[]} [children] - Accepts `Grid` component(s).
 * @property {StyleProp<ViewStyle>} [style] - Additional styles. Applied on the top level of the section.
 * @property {StyleProp<ImageStyle>} [imageStyle] - Additional styles for the image.
 * @property {Palette} [palette] - Palette color (currently only available for Odido).
 */
export interface SectionProps {
  children: React.ReactElement | React.ReactElement[];
  variant?: SectionVariant;
  glow?: GlowGradientTypes;
  image?: ImageProps;
  paddingTop?: SectionPaddingType | SectionPaddingPerBreakpointType;
  paddingBottom?: SectionPaddingType | SectionPaddingPerBreakpointType;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  palette?: OdidoPalette;
}

/**
 * Props for the SectionInfo, used in TopNavigation.
 * @interface SectionInfoProps
 */
export interface SectionInfoProps {
  uuid: string;
  sectionHeight: SharedValue<number>;
  sectionVariant: SectionVariant;
  sectionPalette?: OdidoPalette;
  hasSubscriptionHero: undefined | SubscriptionHeroInfoType;
}
