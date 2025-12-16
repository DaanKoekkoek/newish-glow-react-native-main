import { NumberFieldProps } from "_internals/Form/NumberField";
import type { InputVariant } from "../InputField/Input.types";

/**
 * Type representing the possible states of a NumberInput component.
 * Extends the standard InputVariant to include the "inactive" state.
 *
 * @typedef {InputVariant} NumberInputState
 * @see InputVariant
 */
export type NumberInputState = InputVariant;

/**
 * Props interface for the NumberInput component.
 * Provides a numeric input field with increment/decrement buttons.
 *
 * @interface NumberInputProps
 * @extends {Omit<NumberFieldProps, "state">}
 * @property {number | string} [value] - Current value of the input field. Can be provided as a number or string.
 * @property {"default" | "sm"} [size="default"] - Size variant of the component.
 * @property {NumberInputState} [state="default"] - Visual state of the component. Only "default", "error", "valid", and "inactive" are supported.
 * @property {number} [min=1] - Minimum allowed value. Values lower than this will be clamped to this value.
 * @property {number} [max=999] - Maximum allowed value. Values higher than this will be clamped to this value.
 * @property {number} [step=1] - The amount to increase or decrease by when using the increment/decrement buttons.
 * @property {(value: number) => void} [onIncrement] - Callback fired when the value is incremented. Not called when maximum value is reached.
 * @property {(value: number) => void} [onDecrement] - Callback fired when the value is decremented. Not called when minimum value is reached.
 */
export interface NumberInputProps extends Omit<NumberFieldProps, "state"> {
  value?: number | string;
  size?: "default" | "sm";
  state?: NumberInputState;
  min?: number;
  max?: number;
  step?: number;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
}

/**
 * Props interface for the internal button components used in NumberInput.
 * These control the increment/decrement functionality.
 *
 * @interface NumberInputButtonProps
 * @property {"min" | "plus"} type - Button type - "min" for decrement, "plus" for increment.
 * @property {() => void} onClick - Handler for button click events.
 * @property {boolean} [inactive] - Buttons become inactive when the value reaches min/max limits or when the NumberInput is in `inactive` state.
 * @property {"left" | "right"} [position] - Position of the button relative to the input field.
 */
export type NumberInputButtonProps = {
  type: "min" | "plus";
  onClick: () => void;
  inactive?: boolean;
  position?: "left" | "right";
};
