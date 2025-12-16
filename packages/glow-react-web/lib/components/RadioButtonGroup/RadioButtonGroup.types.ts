import { LegendProps } from "_internals/Form";
import type { RadioButtonProps, InputValidation } from "components/index";

/**
 * Represents the direction type of radio buttons.
 * @type {"row" | "column"}
 */
export type RadioButtonDirection = "row" | "column";

/**
 * Props for the RadioButtonGroup.
 * @type RadioButtonGroupProps
 * @property {string} name - Applies a `name` attribute to each radio button.
 * @property {Omit<RadioButtonProps, "onChange">} options - Generates a radio button.
 * @property {LegendProps} [legend] - Generates a legend label above the radio buttons.
 * @property {RadioButtonDirection} [direction='column'] - The flex direction of the radio buttons.
 * @property {(value?: string | number | readonly string[]) => void} [onChange] - Callback is fired when a radio button is checked
 * @property {string} [helperText] - Generates a helper text underneath the radio buttons.
 * @property {InputValidation} [validated] - Set the validation state for every radio button in the group.
 * @property {boolean} [disabled] - Set the disabled attribute for every radio button in the group.
 * @property {string} [testID='radio-button-group'] - Set the testID on the container.
 */
export type RadioButtonGroupProps = {
  name: string;
  options: Omit<RadioButtonProps, "onChange">[];
  legend?: LegendProps;
  direction?: RadioButtonDirection;
  onChange?: (value?: string | number | readonly string[]) => void;
  helperText?: string;
  validated?: InputValidation;
  disabled?: boolean;
  testID?: string;
};
