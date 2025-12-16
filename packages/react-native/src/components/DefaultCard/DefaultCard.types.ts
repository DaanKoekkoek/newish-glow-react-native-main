import type { PriceContextProps } from "_internals/PriceContext/PriceContext.types";
import type { BreakpointKeys } from "_theming/breakpoints";
import type { OdidoPalette } from "_theming/tokenLoader";
import type { GlowIconProps } from "foundations/GlowIcon/GlowIcon.types";
import type { ImageProps } from "foundations/Image/Image.types";
import type React from "react";

/**
 * Represents the visual image type of the default card
 * @type {"illustration" | "image" | "icon" | "none"}
 */
export type DefaultCardVisual = "illustration" | "image" | "icon" | "none";

/**
 * Represents the visual container type of the default card
 * @type {"default" | "outline" | "alternate" | "emphasized"}
 */
export type DefaultCardVariant =
  | "default"
  | "outline"
  | "alternate"
  | "emphasized";

export type NonEmphasizedCardVariant = Exclude<
  DefaultCardVariant,
  "emphasized"
>;

/**
 * Base props icon variant of the default card
 * @interface DefaultCardIconProps
 * @extends {Omit<GlowIconProps, "zIndex" | "type">, Partial<Pick<GlowIconProps, "zIndex" | "type">>}
 */
export interface DefaultCardIconProps
  extends Omit<GlowIconProps, "zIndex" | "type">,
    Partial<Pick<GlowIconProps, "zIndex" | "type">> {}

/**
 * Base props for the default card
 * @interface DefaultCardProps
 * @property {DefaultCardVisual} [visual='none'] - Sets the possible visual of the component.
 * @property {React.ReactElement} [title] - Title to display on the card
 * @property {React.ReactElement} [paragraph] - Paragraph text to display. Rendered above the `list`
 * @property {ImageProps} [image] - Image to be displayed
 * @property {string} [badgeText] - Text to display on a possible badge
 * @property {DefaultCardVariant} [variant='default'] - Variant of the card
 * @property {string} [highlightText] - Text to display on a possible highlight
 * @property {React.ReactElement} [callToAction] - Implementation of CallToAction internal component that is comprised of buttons/textlink. The card is only pressable (clickable) if this component is passed and it has (at least) one button
 * @property {React.ReactElement} [list] - DefaultList to display on the card. Rendered beneath `content`
 * @property {Palette} [palette] - Colour palette
 * @property {React.ReactElement} [price] - Price to possibly display on the card
 * @property {DefaultCardIconProps} [icon] - Icon to possibly display on the card
 */
export type DefaultCardProps = {
  visual: DefaultCardVisual;
  title: React.ReactElement;
  paragraph: React.ReactElement;
  image?: ImageProps;
  badgeText?: string;
  variant?: DefaultCardVariant;
  highlightText?: string;
  callToAction?: React.ReactElement;
  list?: React.ReactElement;
  palette?: OdidoPalette;
  price?: PriceContextProps;
  icon?: DefaultCardIconProps;
};

/**
 * Badge props for the default card
 * @interface DefaultCardBadgeProps
 * @extends {Pick<DefaultCardProps, "badgeText" | "palette" | "variant">}
 * @property {boolean} [illustrationOrImage] - Whether the default card contains an image and is of the illustration or image variant.
 */
export interface DefaultCardBadgeProps
  extends Pick<DefaultCardProps, "badgeText" | "palette" | "variant"> {
  illustrationOrImage: boolean;
}

/**
 * Outer container of the default card
 * @interface DefaultCardContainerProps
 * @extends DefaultCardProps
 * @property {BreakpointKeys} [breakpoint] - Current breakpoint
 * @property {boolean} [isHovered] - Whether the default card is hovered
 */
export interface DefaultCardContainerProps extends DefaultCardProps {
  breakpoint: BreakpointKeys;
  isHovered: boolean;
}

/**
 * The content of the default card
 * @interface DefaultCardContentProps
 * @extends DefaultCardProps
 * @property {boolean} [isHovered] - Whether the default card is hovered
 */
export interface DefaultCardContentProps extends DefaultCardProps {
  isHovered: boolean;
}
