import type { OdidoPalette } from "_theming/tokenLoader";

/**
 * Represents variants options of the Counter.
 * @type {"default" | "hoursOnly" }
 */

export type counterVariant = "default" | "hoursOnly";

/**
 * Represents the prominence styling options of the Counter.
 * @type {"default" | "subtle" }
 */

export type CounterProminence = "default" | "subtle";

/**
 * Represents the prominence styling options of the Counter.
 * @type { 1 | 2 | 3 | 4 }
 */

export type counterDigits = 1 | 2 | 3 | 4;

/**
 * Represents the different sizes of the Counter.
 * @type {"default" | "large"}
 */
export type sizeType = "default" | "large";

/**
 * Props for the Counter component.
 * @interface CounterProps
 * @property {string} targetDate - The end date for the counter.
 * @property {CounterProminence} [prominence] - The prominence styling of the counter.
 * @property {sizeType} [size] - The size of the counter.
 * @property {counterVariant} [variant] - The variant of the counter.
 * @property {counterDigits} [digits] - The number of digits for the counter.
 * @property {counterDigits} [digitDaysLabel] - The label of digits 1 for the counter.
 * @property {Palette} [palette] - Palette style for the counter.
 * @property {boolean} [freeze] -- Freeze the timer used for testing purpose only/
 * @property {string} [testID] - Used to locate this view in end-to-end tests.
 * @property {() => void}  onCompleted - Function to call when the countdown completed
 */
export interface CounterProps {
  targetDate: string;
  prominence?: CounterProminence;
  size?: sizeType;
  digits?: counterDigits;
  variant?: counterVariant;
  palette?: OdidoPalette;
  digitDaysLabel?: string;
  freeze?: boolean;
  testID?: string;
  onCompleted?: () => void;
}
