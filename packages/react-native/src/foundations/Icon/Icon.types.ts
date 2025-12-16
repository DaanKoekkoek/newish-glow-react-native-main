import type { glyphmap, Brand } from "@odido-portals/glow-icon/fonts";
import type { svgIconsNative } from "@odido-portals/glow-icon/svg-icons-native";
import type { StyleProp, TextStyle } from "react-native";

export type IconSize = "default" | "sm" | "md" | "lg" | "xl" | "xxl";

type SvgBrandTypes = typeof svgIconsNative;
type SvgVariantTypes = keyof SvgBrandTypes[keyof SvgBrandTypes];

export type SvgIconNames =
  keyof (typeof svgIconsNative)[keyof SvgBrandTypes][SvgVariantTypes];

/**
 * Represents the available icon names.
 * @type {keyof typeof glyphmap}
 */
export type IconNames = keyof typeof glyphmap;

/**
 * Props for the Icon component.
 * @interface IconProps
 * @property {keyof typeof benGlyphmap | keyof typeof odidoGlyphmap | string} [name] - The name of the font icon.
 * @property {StyleProp<TextStyle>} [style] - Additional styling for the font icon.
 * @property {IconSize} [size] - Size options for the font icon and svg icon.
 * @property {boolean} [solid='false'] - Whether the icon should be in `solid` style or `outline` style. Defaults to `outline`.
 * @property {string} [testID] - testID of the icon.
 * @property {React.ReactElement} [children] - Passing in children will convert the icon into an svg. Requires a `<G />` tag or any other React-Native-SVG tag (besides `<Svg />`). Used as background for a mask.
 * @property {Brand} [brand] - Specifies the brand that is needed to define the icon set.
 * @property {boolean} [allowFontScaling='true'] - Native allowFontScaling prop.
 * @property {boolean} [autoWidth] - Allow to set icon width to 'auto' value
 */
export interface IconProps {
  name: keyof typeof glyphmap | string;
  style?: StyleProp<TextStyle>;
  size?: IconSize;
  solid?: boolean;
  testID?: string;
  brand?: Brand | "switch";
  allowFontScaling?: boolean;
  autoWidth?: boolean;
}

export interface MaskIconProps extends IconProps {
  children?: React.ReactElement;
}
