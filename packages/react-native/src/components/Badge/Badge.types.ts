import type { OdidoPalette } from "_theming/tokenLoader";

/**
 * Represents the style of Badge.
 * @type {"default" | "subtle" | "outline"}
 */
export type BadgeProminence = "default" | "subtle" | "outline";

/**
 * DefaultListItem component for displaying an individual item within a DefaultList.
 * Items can optionally include an icon and support custom content including strings and React components.
 * @interface BadgeProps
 * @property {string} [text] - The name of the icon to display next to the list item content. Refer to the Icons enumeration for possible values.
 * @property {BadgeProminence} [prominence='default'] - Badge prominence color
 * @property {boolean} [inactive] - Badge inactive style.
 * @property {Palette} [palette] - Palette style for the badge (only available for Odido).
 * @property {string | undefined} [testID] - TestID for the badge.
 */
export interface BadgeProps {
  text: string;
  prominence?: BadgeProminence;
  inactive?: boolean;
  palette?: OdidoPalette;
  testID?: string | undefined;
}
