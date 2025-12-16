import { IconNames } from "foundations/Icon";
import { PriceContextProps } from "_internals/Typography";
import { OdidoPalette } from "_internals/Color";
import { ImageProps } from "foundations/Image";
import { HeadingProps } from "foundations/Heading";
import { HighlightProps } from "_internals/Highlight/Highlight.types";

/**
 * Set the background and border render type
 * @type {"default" | "outline" | "alternate" | "emphasised"}
 */
export type DefaultCardVariant =
  | "default"
  | "outline"
  | "alternate"
  | "emphasised";

/**
 * Set the image render type
 * @type {"illustration" | "image" | "icon" | "none" | "mini"}
 */
export type DefaultCardImageType =
  | "illustration"
  | "image"
  | "icon"
  | "none"
  | "mini";

/**
 * Props for the DefaultCard.
 * @type DefaultCardProps
 * @property {HeadingProps} title - Title of the DefaultCard.
 * @property {DefaultCardImageType} [type="none"] - The image rendering type of the DefaultCard.
 * @property {ImageProps} [image] - Accepts all Image properties.
 * @property {ImageProps} [illustration] - Accepts all Image properties.
 * @property {string} [badgeText] - Renders a Badge above the title.
 * @property {string} [highlightText] - Renders a highlight label above the DefaultCard.
 * @property {IconNames} [icon] - Accepts an IconName.
 * @property {PriceContextProps} [price] - Accepts all of PriceProps, along with `disclaimer`, `description` and `moreInfo`.
 * @property {React.ReactNode} [children] - Additional children content rendered underneath the title.
 * @property {DefaultCardVariant} [variant] - The border and background rendering type of the DefaultCard.
 * @property {React.ReactElement | React.ReactElement[]} [callToAction] - Accepts a combination of TextLink and/or Button.
 * @property {OdidoPalette} [palette="default"] - Palette color of the DefaultCard. Only applicable for the Odido brand.
 * @property {string} [testID="default-card"] - TestID applied on the container.
 */
export type DefaultCardProps = {
  title: HeadingProps;
  type?: DefaultCardImageType;
  image?: ImageProps;
  illustration?: ImageProps;
  badgeText?: string;
  highlightText?: HighlightProps["children"];
  icon?: IconNames;
  price?: PriceContextProps;
  children?: React.ReactNode;
  variant?: DefaultCardVariant;
  callToAction?: React.ReactElement | React.ReactElement[];
  palette?: OdidoPalette;
  testID?: string;
};

/**
 * Props for the DefaultCardBadge.
 * @type DefaultCardBadgeProps
 * @property {OdidoPalette} palette - Palette color applied on the Badge.
 * @property {string} [badgeText] - Badge text
 */
export type DefaultCardBadgeProps = {
  palette: OdidoPalette;
  badgeText?: string;
};
