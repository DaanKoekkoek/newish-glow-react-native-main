/**
 * The divider has default or subtle prominence.
 * @type {('default'|'subtle')}
 */
export type DividerProminence = "default" | "subtle";

/**
 * The divider has default or strong variants.
 * @type {'default'|'strong'}
 */
export type DividerVariant = "default" | "strong";

/**
 * A divider is a thin line that groups content in lists and layouts.
 * It can be used to separate content in a list, a layout, or a card.
 * It can also be used to create a visual separation between different sections of content.
 *
 * @interface DividerProps
 * @property {DividerProminence} [prominence] - The divider has default or subtle prominence.
 * @property {DividerVariant} [variant] - The divider has default or strong variants.
 * @property {boolean} [inverted] - Inverts the color.
 * @property {string} [className] - Apply additional classes into the divider.
 * @property {string} [testID] - Used to locate this element in end-to-end tests.
 */
export type DividerProps = {
  prominence?: DividerProminence;
  variant?: DividerVariant;
  inverted?: boolean;
  className?: string;
  testID?: string;
};
