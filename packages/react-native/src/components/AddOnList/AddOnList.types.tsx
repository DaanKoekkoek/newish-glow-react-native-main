import type { AttentionProps } from "_internals/Attention";
import type { CommonPalette } from "_theming/tokenLoader";
import type { ImageProps } from "foundations/Image";
import type React from "react";
import type { ReactElement } from "react";
import type { GestureResponderEvent } from "react-native";

type HeaderImage = {
  localSrc?: ImageProps["localSrc"];
  src?: ImageProps["src"];
  alt?: ImageProps["alt"];
};

/**
 * AddOnList component for displaying a list of items.
 * This component supports different list styles including icon lists, numbered lists, and bulleted lists.
 *
 * @component
 * @example
 * <AddOnList title="My List" variant="Icon" title="My List">
 *   <AddOnListItem>Item 1</AddOnListItem>
 *   <AddOnListItem>Item 2</AddOnListItem>
 * </AddOnList>
 *
 * @prop {(React.ReactElement[])} [children] - The list items to be displayed.
 * @prop {string} [headerText] - The text to display in the header.
 * @prop {HeaderImage} [headerImage] - The image to display in the header.
 */

export interface AddOnListProps {
  headerText?: string;
  headerImage?: HeaderImage;
  children?: React.ReactElement[];
}

/**
 * Properties to pass into the AddOnList's Header
 * @prop {string} [headerText] - The text to display in the header.
 * @prop {HeaderImage} [headerImage] - The image to display in the header.
 * @prop {number} [viewHeight] - The height to set the header component to.
 *
 */
export interface AddOnListHeaderProps {
  headerImage?: HeaderImage;
  headerText?: string;
  viewHeight: number;
}

/**
 * AddOnListItem component for displaying a list item.
 * This component supports different list item styles including icon lists, numbered lists, and bulleted lists.
 *
 * @component
 * @example
 * <AddOnListItem icon="checkmark">Item 1</AddOnListItem>
 *
 * @property {string} [variant='default'] - Whether the list item is a default or added variant. This determines which button will be displayed.
 * @property {boolean} [isFirstChild=false] - Whether the list item is the first child of the list.
 * @property {boolean} [isLastChild=false] - Whether the list item is the last child of the list.
 * @property {string} actionLabel - The label for the button.
 * @property {ReactElement} [AddOn] - The extra content to display in the list item.
 * @property {string} title - The title of the list item.
 * @property {string} [description] - The description of the list item.
 * @property {AttentionProps} [attention] - Attention text
 * @property {boolean} [isDesktop=false] - Whether the list item is displayed on a desktop device.
 * @property {function} [onPress] - Callback for when the item is clicked.
 */
export interface AddOnListListItemProps {
  attention?: AttentionProps;
  variant?: ItemVariant;
  isFirstChild?: boolean;
  isLastChild?: boolean;
  actionLabel?: string;
  addOn?: ReactElement;
  title: string;
  description?: string;
  isDesktop?: boolean;
  palette?: CommonPalette;
  onPress: (e: GestureResponderEvent) => void;
}

export type ItemVariant = "default" | "added";
