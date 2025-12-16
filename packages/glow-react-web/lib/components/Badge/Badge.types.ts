import type { OdidoPalette } from "_internals/Color";

/**
 * Represents the style of Badge.
 * @type {"default" | "subtle" | "outline"}
 */
export type BadgeProminence = "default" | "subtle" | "outline";

/**
 * Represents the state of Badge.
 * @type {"default" | "inactive"}
 */
export type BadgeState = "default" | "inactive" | "error";

/**
 * @interface BadgeProps
 * @property {string} text - Text to display on the badge.
 * @property {BadgeProminence} [prominence='default'] - Badge prominence color
 * @property {BadgeState} [state] - Badge state.
 * @property {OdidoPalette} [palette] - Palette style for the badge (only available for Odido).
 * @property {string | undefined} [testID] - TestID for the badge.
 */
export interface BadgeProps {
  text: string;
  prominence?: BadgeProminence;
  state?: BadgeState;
  palette?: OdidoPalette;
  testID?: string;
}
