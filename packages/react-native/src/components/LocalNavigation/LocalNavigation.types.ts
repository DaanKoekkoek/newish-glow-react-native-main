import type { CommonPalette } from "_theming/tokenLoader";
import type { GlowGradientTypes } from "foundations/GlowGradient";
import type { IconNames } from "foundations/Icon";

export type ActionPosition = "right" | "left";

/**
 * Represents the color of the LocalNavigation
 * @type {"default" | "subtle" | "emphasised"}
 */
export type Prominence = "default" | "subtle" | "emphasised";

/**
 * Represents the variant of the LocalNavigation
 * @type {"default" | "compact"}
 */
export type Variant = "default" | "compact";

/**
 * Represents the available sizes for title
 * @type {"default" | "lg"}
 */
export type TitleSize = "default" | "lg";

/**
 * Props for LocalNavigation action
 * @property {string} [title] - title of action
 * @property {string} [icon] - icon of action
 * @property {void} [onPress] - onPRess callback of action
 */
export interface Action {
  title: string;
  onPress: () => void;
  icon: IconNames;
}

/**
 * Props for the LocalNavigationProminence.
 * @interface LocalNavigationProps
 * @property {Prominence} [prominence='default'] - Sets a color on the LocalNavigation.
 * @property {Variant} [variant='default'] - Sets a color on the LocalNavigation.
 * @property {GlowGradientTypes} [glow='Glow1'] - Sets the gradient type when `variant` is set to `emphasised`.
 * @property {Palette} [palette] - Palette color (currently only available for Odido).
 * @property {Action} [rightAction] - right action of the LocalNavigation
 * @property {Action} [leftAction] - left action of the LocalNavigation
 * @property {string} [testID] - testID of the LocalNavigation
 */
export interface BaseLocalNavigationProps {
  prominence?: Prominence;
  variant?: Variant;
  glow?: GlowGradientTypes;
  palette?: CommonPalette;
  title?: string;
  titleSize?: TitleSize;
  rightAction?: Action;
  leftAction?: Action;
  testID?: string;
}

export interface DefaultLocalNavigationProps extends BaseLocalNavigationProps {
  variant: "default";
  paragraph?: string;
}

export interface CompactLocalNavigationProps extends BaseLocalNavigationProps {
  variant: "compact";
}

export type LocalNavigationProps =
  | DefaultLocalNavigationProps
  | CompactLocalNavigationProps;
