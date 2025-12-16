import type { ReactElement } from "react";

import type { Badge } from "../Badge";
import type { DefaultList } from "../DefaultList";
import type { Price } from "../Price";
import type { TextLink } from "../TextLink";

/**
 * Base props for the Selector component.
 * @typedef {Object} SelectorPropsBase
 * @property {() => void} onPress - The function to call when the selector is pressed.
 * @property {string} title - The title of the selector.
 * @property {"radio" | "checkbox"} [type] - The type of selector to render. Can be "radio" or "checkbox".
 * @property {boolean} [selected] - Specifies whether the selector is selected.
 * @property {"default" | "inactive"} state - The state of the selector.
 * @property {string} [promotion] - The promotion text to be displayed within the selector.
 */
interface SelectorPropsBase {
  onPress: () => void;
  title: string;
  type?: "radio" | "checkbox";
  selected?: boolean;
  state: "default" | "inactive";
  promotion?: string;
  secondaryAction?: ReactElement<typeof TextLink>;
  highlight?: string;
}

/**
 * Props for the compact variant of the Selector component.
 * @typedef {Object} SelectorForOtherVariants
 * @property {"default" | "extended"} variant - The variant of the selector, either "default" or "extended".
 * @property {ReactElement<typeof Price>} price - The price element to be displayed within the selector.
 * @property {ReactElement<typeof Badge>} [badge] - The badge element to be displayed within the selector.
 * @property {never} titleStrikethrough - Title strikethrough is not applicable for the compact variant.
 */
interface SelectorPropsForOtherVariants extends SelectorPropsBase {
  variant: "default" | "extended";
  price?: ReactElement<typeof Price>;
  badge?: ReactElement<typeof Badge>;
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
  variant: "compact";
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
 * @property {ReactElement<typeof Price>} price - The price element to be displayed within the selector.
 * @property {ReactElement<typeof Badge>} [badge] - The badge element to be displayed within the selector.
 * @property {string} [titleStrikethrough] - The title strikethrough text to be displayed within the selector.
 * @property {never} description - Description is not applicable for the extended variant.
 */
interface SelectorPropsForExtendedVariant extends SelectorPropsBase {
  variant: "extended";
  list: ReactElement<typeof DefaultList>;
  price?: ReactElement<typeof Price>;
  badge?: ReactElement<typeof Badge>;
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
