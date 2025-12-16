import type { BreakpointKey } from "_theming/breakpoints";

/**
 * Represents variants options of the Counter.
 * @type {"default" | "hoursOnly" }
 */

import { OdidoPalette } from "_internals/Color";

export type CounterVariant = "default" | "hoursOnly";

/**
 * Represents the prominence styling options of the Counter.
 * @type {"default" | "subtle" }
 */

export type CounterProminence = "default" | "subtle";

/**
 * Represents number of digits displayed
 * @type { 1 | 2 | 3 | 4 }
 */

export type CounterDigits = 1 | 2 | 3 | 4;

/**
 * Represents the different sizes of the Counter.
 * @type {"default" | "lg"}
 */
export type SizeType = "default" | "lg";

export type SizePerBreakpointType = {
  [Breakpoint in BreakpointKey]?: SizeType;
};

/**
 * Props for the Counter component.
 * @interface CounterProps
 * @property {string} targetDate - The end date for the counter.
 * @property {CounterProminence} [prominence] - The prominence styling of the counter.
 * @property {SizeType | SizePerBreakpointType} [size] - The size of the counter. Can also be set per breakpoint.
 * @property {CounterVariant} [variant] - The variant of the counter.
 * @property {CounterDigits} [digits] - The number of digits for the counter.
 * @property {string} [digitDaysLabel] - The label of digits 1 for the counter.
 * @property {Palette} [palette] - Palette style for the counter.
 * @property {boolean} [freeze] -- Freeze the timer used for testing purpose only/
 * @property {string} [testID] - Used to locate this view in end-to-end tests.
 * @property {() => void} [onCompleted] - Function to call when the countdown completed
 */
export interface CounterProps {
  targetDate: string;
  prominence?: CounterProminence;
  size?: SizeType | SizePerBreakpointType;
  digits?: CounterDigits;
  variant?: CounterVariant;
  palette?: OdidoPalette;
  digitDaysLabel?: string;
  freeze?: boolean;
  testID?: string;
  onCompleted?: () => void;
}
