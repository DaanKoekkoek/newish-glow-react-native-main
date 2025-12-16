import { OdidoPalette } from "_internals/Color";
import { TextLinkProps } from "components/TextLink/TextLink.types";
import { IconNames } from "foundations/Icon";

/**
 * Represents the style of the HorizontalCard.
 * @type {"default" | "outline" | "color" | "subtle"}
 */
export type HorizontalCardVariant = "default" | "outline" | "color" | "subtle";

/**
 * Represents the icon position.
 * @type {"default" | "right"}
 */
export type HorizontalCardIconPosition = "default" | "right";

/**
 * Represents the types of HorizontalCard.
 * @type {"default" | "icon"}
 */
export type HorizontalCardTypes = "default" | "icon";
/**
 * Props interface for the HorizontalCard component.
 *
 * @interface HorizontalCardProps
 * @property {string} [title] - The title of the horizontal card.
 * @property {string | React.ReactNode} [children] - The children of the horizontal card.
 * @property {"default" | "outline" | "color" | "subtle"} [variant] - The variant style of the horizontal card.
 * @property {"default" | "right"} [iconPosition] - The icon position.
 * @property {OdidoPalette} [palette] - The color palette to use for the card.
 * @property {React.ReactNode} [textLink] - A React node for the text link component.
 * @property {string} [testID] - Optional test identifier for testing purposes.
 */

export interface HorizontalCardProps {
  title?: string;
  children?: string | React.ReactNode;
  icon?: IconNames;
  type?: HorizontalCardTypes;
  variant?: HorizontalCardVariant;
  palette?: OdidoPalette;
  iconPosition?: HorizontalCardIconPosition;
  textLink?: TextLinkProps;
  testID?: string;
}
