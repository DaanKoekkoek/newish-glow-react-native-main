import type { PickerItemProps } from "@react-native-picker/picker";
import type { InputLabelProps, InputValidation } from "components/InputField";

export type TimePickerMinutesStep = 1 | 5 | 10;

export interface TimePickerOptions extends PickerItemProps {}

export interface TimePickerValues {
  minutes: string;
  hours: string;
}

/**
 * Props for the Time Picker.
 * @interface TimePickerProps
 *
 * @property {InputLabelProps} [label] - Label
 * @property {TimePickerOptions} [hoursOptions] - Array of hours allowed for this Time Picker
 * @property {TimePickerMinutesStep} [minutesStep=5] - The step by which minutes are displayed in the control. Default is 5
 * @property {boolean} [disabled={false}] - Indicates whether the time picker is disabled
 * @property {string} [placeholderHours] - Placeholder for the Hours control
 * @property {string} [placeholderMinutes] - Placeholder for the Minutes control
 * @property {string} [helperText] - Helper text displayed below the input field to provide additional information
 * @property {(values: TimePickerValues) => void} [onValueChange] - Callback to be fired when the time has been selected
 * @property {string} [testID]
 */
export interface TimePickerProps {
  hoursOptions: TimePickerOptions[];
  label?: InputLabelProps;
  validated?: InputValidation;
  minutesStep?: TimePickerMinutesStep;
  disabled?: boolean;
  placeholderHours?: string;
  placeholderMinutes?: string;
  helperText?: string;
  onValueChange?: (values: TimePickerValues) => void;
  testID?: string;
}
