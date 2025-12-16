import { LegendProps } from "_internals/Form";
import { InputValidation } from "components/InputField";

/**
 * Represents an individual option in a select dropdown.
 * @type SelectOption
 * @property {string} value - The unique value associated with the option.
 * @property {string} name - The display name for the option.
 * @property {string} [group] - Optional group name to categorize options using optgroup elements.
 */
export type SelectOption = {
  value: string;
  name: string;
  group?: string;
};

/**
 * Props for the Select component.
 * @type SelectProps
 * @property {string} id - The unique ID for the select input.
 * @property {SelectOption[]} options - A list of options to display in the select dropdown. Options with a 'group' property will be automatically grouped.
 * @property {LegendProps} [legend] - Optional label to display above the select input.
 * @property {string} [placeholder] - Optional placeholder text for the select input.
 * @property {boolean} [inactive] - Optional flag to disable the select input.
 * @property {string} [value] - The selected value for the select input.
 * @property {(val: string) => void} [onChange] - Optional callback function that is called when the selected option changes.
 * @property {string} [helperText] - Optional helper text to display beneath the select input.
 * @property {InputValidation} [validated] - Optional validation state for the input (e.g., 'valid', 'invalid').
 * @property {string} [testID="select"] - Optional test ID for automated testing.
 */
export type SelectProps = {
  id: string;
  options: SelectOption[];
  legend?: LegendProps;
  placeholder?: string;
  inactive?: boolean;
  value?: string;
  onChange?: (val: string) => void;
  helperText?: string;
  validated?: InputValidation;
  testID?: string;
};
