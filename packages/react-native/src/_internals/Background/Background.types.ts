import type {
  GlowGradientDefaultBrightness,
  GlowGradientTypes,
} from "foundations/GlowGradient";
import type { ImageProps } from "foundations/Image";
import type React from "react";
import type { ViewStyle, StyleProp } from "react-native";

/**
 * Represents the color of the background
 * @type {"default" | "emphasised" | "image"}
 */
export type BackgroundVariant = "default" | "subtle" | "emphasised" | "image";

/**
 * Props for the Background.
 * @interface BackgroundProps
 * @property {BackgroundVariant} [variant='default'] - Sets a color on the Background.
 * @property {GlowGradientTypes} [glow='Glow1'] - Sets the gradient type when `variant` is set to `emphasised`.
 * @property {ImageProps} [image] - Sets an image as background on the Background.
 * @property {React.ReactElement | React.ReactElement[]} [children] - Accepts `Grid` component(s).
 * @property {ViewStyle} [backgroundStyle] - Additional styles. Applied on the top level of the background.
 * @property {Palette} [palette] - Palette color (currently only available for Odido).
 * @property {GlowGradientDefaultBrightness} [brightness] - Brightness value.
 */
export interface BackgroundProps {
  children: React.ReactElement | React.ReactElement[];
  variant?: BackgroundVariant;
  brightness?: GlowGradientDefaultBrightness;
  glow?: GlowGradientTypes;
  image?: ImageProps;
  backgroundStyle?: StyleProp<ViewStyle>;
}
