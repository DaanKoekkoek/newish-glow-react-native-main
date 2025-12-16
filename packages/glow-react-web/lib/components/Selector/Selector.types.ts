import type { BadgeProps } from "../Badge";
import type { DefaultListProps } from "../DefaultList";
import type { PriceProps } from "../Price";
import type { TextLinkProps } from "../TextLink";
import type { BaseInputType } from "_internals/Form";
import type { OdidoPalette } from "_internals/Color";

/**
 * Base props for the Selector component.
 * @typedef {Object} SelectorPropsBase
 * @extends {Omit<BaseInputType, "disabled">}
 * @property {string} title - The title of the selector.
 * @property {string} id - Input Id of the selector.
 * @property {"default" | "inactive" | "error"} [state] - The state of the selector.
 * @property {(id: string, checked?: boolean) => void} [onChange] - The callback will fire when the selector value has changed.
 * @property {"radio" | "checkbox"} [type] - The type of selector to render. Can be "radio" or "checkbox".
 * @property {string} [promotion] - The promotion text to be displayed within the selector.
 * @property {TextLinkProps} [secondaryAction] - The secondary action element to be displayed within the selector.
 * @property {ReactElement} [highlight] - If provided, this text will be displayed as a highlight.
 * @property {string} [palette='default'] - Set the palette and glow gradient type.
 */
export type SelectorPropsBase = Omit<BaseInputType, "disabled"> & {
  title: string;
  id: string;
  state?: "default" | "inactive" | "error";
  onChange?: (id: string, checked?: boolean) => void;
  type?: "radio" | "checkbox";
  promotion?: string;
  secondaryAction?: TextLinkProps;
  highlight?: string;
  testID?: string;
  palette?: OdidoPalette;
};

/**
 * Props for the compact variant of the Selector component.
 * @typedef {Object} SelectorForOtherVariants
 * @property {"default" | "extended"} variant - The variant of the selector, either "default" or "extended".
 * @property {PriceProps} price - The price element to be displayed within the selector.
 * @property {BaadgeProps} [badge] - The badge element to be displayed within the selector.
 * @property {never} titleStrikethrough - Title strikethrough is not applicable for the compact variant.
 */
interface SelectorPropsForOtherVariants extends SelectorPropsBase {
  variant?: "default" | "extended";
  price?: PriceProps;
  badge?: BadgeProps;
  list?: never;
  titleStrikethrough?: never;
  description?: string;
}

/**
 * Props for the compact variant of the Selector component.
 * @typedef {Object} SelectorPropsForCompactVariant
 * @property {"compact"} variant - The variant of the selector, which is "compact".
 * @property {never} price - Price is not applicable for the compact variant.
 * @property {never} badge - Badge is not applicable for the compact variant.
 * @property {never} list - List is not applicable for the compact variant.
 * @property {never} titleStrikethrough - Title strikethrough is not applicable for the compact variant.
 * @property {never} description - Description is not applicable for the extended variant.
 */
interface SelectorPropsForCompactVariant extends SelectorPropsBase {
  variant?: "compact";
  price?: never;
  badge?: never;
  list?: never;
  titleStrikethrough?: never;
  description?: never;
}

/**
 * Props for the extended variant of the Selector component.
 * @typedef {Object} SelectorPropsForExtendedVariant
 * @property {"extended"} variant - The variant of the selector, which is "extended".
 * @property {ReactElement<typeof TempList>} list - The list element to be displayed within the selector.
 * @property {PriceProps} price - The price element to be displayed within the selector.
 * @property {BadgeProps} [badge] - The badge element to be displayed within the selector.
 * @property {string} [titleStrikethrough] - The title strikethrough text to be displayed within the selector.
 * @property {never} description - Description is not applicable for the extended variant.
 */
interface SelectorPropsForExtendedVariant extends SelectorPropsBase {
  variant?: "extended";
  list?: DefaultListProps;
  price?: PriceProps;
  badge?: BadgeProps;
  titleStrikethrough?: string;
  description?: never;
}

/**
 * Props for the Selector component.
 * @typedef {SelectorPropsBase | SelectorPropsForCompactVariant} SelectorProps
 */
export type SelectorProps =
  | SelectorPropsForCompactVariant
  | SelectorPropsForOtherVariants
  | SelectorPropsForExtendedVariant;
