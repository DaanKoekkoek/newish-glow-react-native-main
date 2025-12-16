import { OdidoPalette } from "_internals/Color";
import type { CartDropdownTotalProps } from "./CartDropdownTotal";
import type { CartDropdownProductProps } from "./CartDropdownProduct";
import type { ButtonProps } from "components/Button";

/**
 * Set the visibility of footer
 * @type {"default" | "none"}
 */
export type CartDropdownFooter = "default" | "none";

/**
 * Set the type of cart dropdown panel
 * @type {"empty" | "withItems"}
 */
export type CartDropdownType = "empty" | "withItems";

/**
 * Props for the `CartDropdown` component.
 * @type {CartDropdownProps}
 * @property {CartDropdownType} [type] - Type of Cart dropdown panel (e.g. `default`, `empty`, etc.).
 * @property {CartDropdownFooter} [footer] - Footer component used for additional actions.
 * @property {React.ReactNode} [footerChildren] - Extra children rendered inside the footer.
 * @property {ButtonProps} [callToAction] - Required CTA element (e.g. button) displayed in the dropdown.
 * @property {CartDropdownTotalProps} [total] - Total price details shown at the bottom of the dropdown.
 * @property {CartDropdownProductProps[]} [items] - List of products rendered in the dropdown.
 * @property {boolean} [maxHeight] - Whether the dropdown should take full height of the panel.
 * @property {string} [emptyTitle] - Title text shown when the dropdown is of type `empty`.
 * @property {OdidoPalette} [palette="default"] - Background palette color applied to the empty card.
 * @property {string} [className] - Additional className, applied on the container of the CartDropdown.
 * @property {boolean} [animated="false"] - Stagger animates its contents when set to `true`.
 */
export type CartDropdownProps = {
  type?: CartDropdownType;
  footer?: CartDropdownFooter;
  footerChildren?: React.ReactNode;
  callToAction?: ButtonProps<React.ElementType>;
  total?: CartDropdownTotalProps;
  items?: CartDropdownProductProps[];
  maxHeight?: boolean;
  emptyTitle?: string;
  palette?: OdidoPalette;
  className?: string;
  animated?: boolean;
};
