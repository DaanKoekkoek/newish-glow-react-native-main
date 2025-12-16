import type { ImageProps } from "foundations/Image";
import { AddonListListItemProps } from "./AddonListItem/AddonListItem.types";
import { OdidoPalette } from "_internals/Color";

/**
 * Props for the Attention element in a list item.
 * @interface AttentionProps
 * @property {string} text - The text to display in the attention element.
 * @property {"information" | "success" | "warning" | "error"} variant - The visual style of the attention element.
 */
export type AttentionProps = {
  text: string;
  variant: "information" | "success" | "warning" | "error";
};

/**
 * AddonList component for displaying a list of items.
 * This component supports different list styles including icon lists, numbered lists, and bulleted lists.
 *
 * @component
 * @example
 * <AddonList title="My List" variant="Icon" title="My List">
 *   <AddonListItem>Item 1</AddonListItem>
 *   <AddonListItem>Item 2</AddonListItem>
 * </AddonList>
 *
 * @property {string} [headerText] - The text to display in the header.
 * @property {ImageProps} [headerImage] - The image to display in the header.
 * @property {function} [onListItemClick] - Callback for when the item is clicked with index of clicked item.
 * @property {OdidoPalette} [palette='default'] - Generates a gradient color in the header of the AddonList.
 * @property {AddonListListItemProps[]} items - The items of AddonList. Should contain AddonListItem.
 * @property {(index: number) => void} onListItemClick - Callback handler after clicking on of the `items`.
 */

export interface AddonListProps {
  headerText?: string;
  headerImage?: ImageProps;
  palette?: OdidoPalette;
  items: AddonListListItemProps[];
  onListItemClick: (index: number) => void;
}

/**
 * Properties to pass into the AddonList's Header
 * @property {string} [headerText] - The text to display in the header.
 * @property {ImageProps} [headerImage] - The image to display in the header.
 * @property {OdidoPalette} [palette] - Generates a gradient color
 */
export interface AddonListHeaderProps {
  headerImage?: ImageProps;
  headerText?: string;
  palette?: OdidoPalette;
}
