import { OdidoPalette } from "_internals/Color";
import { TextLinkProps } from "components/TextLink/TextLink.types";

/**
 * Represents the type of the PromotionalCard.
 * @type {"default" | "countdown" | "image"}
 */

export type PromotionalCardType = "default" | "countdown" | "image";

/**
 * Represents the style of the PromotionalCard.
 * @type {"default" | "emphasised" | "black-friday"}
 */
export type PromotionalCardVariant = "default" | "emphasised" | "black-friday";

/**
 * Props interface for the PromotionalCard component.
 *
 * @interface PromotionalCardProps
 * @property {string} [title] - The title of the promotional card.
 * @property {string} [description] - The description of the promotional card.
 * @property {"default" | "countdown" | "image"} [content] - The content type of the promotional card.
 * @property {"default" | "emphasised" | "black-friday"} [variant] - The variant style of the promotional card.
 * @property {OdidoPalette} [palette] - The color palette to use for the card.
 * @property {React.ReactNode} [textLink] - A React node for the text link component.
 * @property {React.ReactNode} [image] - A React node for the image component.
 * @property {React.ReactNode} [countdown] - A React node for the countdown component.
 * @property {string} [testID] - Optional test identifier for testing purposes.
 */

export interface PromotionalCardProps {
  title?: string;
  description?: string;
  content?: PromotionalCardType;
  variant?: PromotionalCardVariant;
  palette?: OdidoPalette;
  textLink?: TextLinkProps;
  image?: React.ReactNode;
  countdown?: React.ReactNode;
  testID?: string;
}
