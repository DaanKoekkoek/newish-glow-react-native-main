/**
 * Represents the height of the divider
 * @type {"default" | "subtle"}
 */
export type DividerProminence = "default" | "subtle";

/**
 * Represents the base color of the divider
 * @type {"default" | "strong"}
 */
export type DividerVariant = "default" | "strong";

/**
 * A divider is a thin line that groups content in lists and layouts.
 * It can be used to separate content in a list, a layout, or a card.
 * It can also be used to create a visual separation between different sections of content.
 */
/**
 * Props for the Divider component.
 * @interface DividerProps
 * @property {DividerProminence} [prominence] - The prominence color intesity of the divider.
 * @property {DividerStyle} [variant] - The style of the divider.
 * @property {boolean} [inverted] - Set the divider to a inverted color.
 * @property {string | undefined} [testID] - Used to locate this view in end-to-end tests.
 */

export interface DividerProps {
  prominence?: DividerProminence;
  variant?: DividerVariant;
  inverted?: boolean;
  testID?: string | undefined;
}
