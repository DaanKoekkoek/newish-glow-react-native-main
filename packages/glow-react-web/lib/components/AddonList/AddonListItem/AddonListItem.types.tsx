import type { ReactElement } from "react";
import { AttentionProps } from "../AddonList.types";
/**
 * AddonListItem component for displaying a list item.
 * This component supports different list item styles including icon lists, numbered lists, and bulleted lists.
 *
 * @component
 * @example
 * <AddonListItem icon="checkmark">Item 1</AddonListItem>
 *
 * @property {string} [variant='default'] - Whether the list item is a default or added variant. This determines which button will be displayed.
 * @property {string} actionLabel - The label for the button.
 * @property {ReactElement} [AddOn] - The extra content to display in the list item.
 * @property {string} title - The title of the list item.
 * @property {string} [description] - The description of the list item.
 * @property {AttentionProps} [attention] - Optional attention message with variant styling.
 * @property {boolean} [isDesktop=false] - Whether the list item is displayed on a desktop device.
 * @property {function} [onClick] - Callback for when the item is clicked.
 */
export interface AddonListListItemProps {
  attention?: AttentionProps;
  variant?: ItemVariant;
  actionLabel?: string;
  addOn?: ReactElement;
  title: string;
  description?: string;
  onClick?: () => void;
}

export type ItemVariant = "default" | "added";
