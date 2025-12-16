import type { glyphmap } from "@odido-portals/glow-icon/fonts";
import type { svgIconsWeb } from "@odido-portals/glow-icon/svg-icons-web";
import { OdidoPalette } from "_internals/Color";

export type IconSize = "default" | "sm" | "md" | "lg" | "xl" | "xxl";

type SvgBrandTypes = typeof svgIconsWeb;
type SvgVariantTypes = keyof SvgBrandTypes[keyof SvgBrandTypes];

export type SvgIconNames =
  keyof (typeof svgIconsWeb)[keyof SvgBrandTypes][SvgVariantTypes];

/**
 * Represents the available icon names.
 * @type {keyof typeof glyphmap}
 */
export type IconNames = keyof typeof glyphmap;

/**
 * Props for the Icon component.
 * @interface IconProps
 * @property {(IconNames)} [name] - The name of the font icon.
 * @property {string} [className] - Additional className for styling the font icon.
 * @property {IconSize} [size] - Size options for the font icon and svg icon.
 * @property {boolean} [solid='false'] - Whether the icon should be in `solid` style or `outline` style. Defaults to `outline`.
 * @property {string} [testID] - testID of the icon.
 * @property {React.ReactElement} [children] - Passing in children will convert the icon into an svg. Requires a `<G />` tag or any other React-Native-SVG tag (besides `<Svg />`). Used as background for a mask.
 * @property {React.CSSProperties} [style] - Additional styling to overrule the existing one
 * @property {OdidoPalette} [palette='default'] - glow variation, renders a GlowIcon instead.
 */

export interface IconProps {
  name: IconNames;
  className?: string;
  maskClassName?: string;
  size?: IconSize;
  solid?: boolean;
  testID?: string;
  style?: React.CSSProperties;
  palette?: OdidoPalette;
}
