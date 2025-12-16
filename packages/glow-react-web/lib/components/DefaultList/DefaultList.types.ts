import type { IconNames } from "foundations/Icon";
import type { OdidoPalette } from "_internals/Color";

/**
 * Defines the list variant for `DefaultList`.
 * @type {DefaultListVariant}
 * @property {"icon"} - Displays an icon to the left of each list item
 * @property {"iconColored"} - Displays an icon with palette-based coloring
 * @property {"numbered"} - Displays a numbered (ordered) list
 * @property {"bullet"} - Displays a bulleted (unordered) list
 */
export type DefaultListVariant = "icon" | "iconColored" | "numbered" | "bullet";

/**
 * Defines the size options for `DefaultList`.
 * @type {DefaultListSize}
 * @property {"default"} - Default size for text and spacing
 * @property {"sm"} - Small size for text and spacing
 */
export type DefaultListSize = "default" | "sm";

/**
 * Represents a single item within the `DefaultList`.
 * @type {DefaultListItemProps}
 * @property {React.ReactNode} text - The text or content of the list item
 * @property {IconNames} [icon] - Optional icon to display (used in icon-based variants)
 */
export type DefaultListItemProps = {
  text: React.ReactNode;
  icon?: IconNames;
  palette?: OdidoPalette;
};

/**
 * Defines the state options for `DefaultList`.
 * @type {DefaultListState}
 * @property {"default"} - Default state, applied on the text and bullet, number or icon.
 * @property {"inactive"} - Inactive state, applied on the text and bullet, number or icon.
 */
export type DefaultListState = "default" | "inactive" | "error";

/**
 * Represents the properties for the `DefaultList` component.
 * @type {DefaultListProps}
 * @property {DefaultListVariant} [variant='bullet'] - The visual style of the list
 * @property {DefaultListSize} [size='default'] - The size of the list items
 * @property {boolean} [inverted=false] - Apply inverted (e.g. dark mode) styling
 * @property {DefaultListState} [state='default'] - Visual state of the list items
 * @property {DefaultListItemProps[]} items - The list items to display
 * @property {string} [testID] - Optional test identifier for testing purposes
 * @property {OdidoPalette} [palette] - Palette color for `iconColored` variant
 * @property {string} [className] - Additional className applied on the parent element.
 */
export type DefaultListProps = {
  variant?: DefaultListVariant;
  size?: DefaultListSize;
  inverted?: boolean;
  state?: DefaultListState;
  items: DefaultListItemProps[];
  testID?: string;
  palette?: OdidoPalette;
  className?: string;
};
