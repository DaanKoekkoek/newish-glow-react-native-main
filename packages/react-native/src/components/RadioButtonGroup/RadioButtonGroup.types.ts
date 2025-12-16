import type { ViewStyle } from "react-native";

import type { InputLabelProps } from "../InputField";

export type RadioButtonGroupState = "default" | "inactive" | "error";
export type RadioButtonGroupDirection = "horizontal" | "vertical";
export type RadioButtonOnPress = (args: { id: string; value: string }) => void;

/**
 * Props for the RadioButton component.
 * @typedef {Object} RadioButtonProps
 * @property {boolean} [checked] - Whether the radio it's value is 'true' or 'false'.
 * @property {string} [id] - The id to update the state with.
 * @property {string} [value] - The value to update the state with.
 * @property {string} [label] - The label, used to describe the option to select.
 * @property {RadioButtonOnPress} [onPress] - Callback function to be called when the radio is pressed.
 * @property {RadioButtonGroupState} [state] - The state, can be 'default', 'inactive' or 'error'.
 * @property {ViewStyle} [style] - Additional styling passed down from the parent component.
 * @property {string | undefined} [testID] - The testID, can be used for unit tests.
 */
export interface RadioButtonProps {
  checked?: boolean;
  id: string;
  value: string;
  label?: string;
  onPress: (args: { id: string; value: string }) => void;
  state?: RadioButtonGroupState;
  style?: ViewStyle;
  testID?: string;
}

export type RadioButtonGroupOptions = Pick<
  RadioButtonProps,
  "id" | "label" | "state" | "testID" | "value" | "checked"
>;

/**
 * Props for the RadioButtonGroup component.
 * @typedef {Object} RadioButtonGroupProps
 * @property {string} [accessibilityLabel] - Accessibility requirement, in web semantics this would be "name". Typically used to group the radio buttons under one topic / name.
 * @property {RadioButtonGroupDirection} [direction] - The direction of the appearance in the interface, can be 'horizontal' or 'vertical'.
 * @property {string} [errorMessage] - The error message to display when there's an error.
 * @property {string} [helperText] - The text to help the user understand the options and the content of the options.
 * @property {InputLabelProps} [legend] - The legend, can provide some extra context or information about the RadioButton.
 * @property {RadioButtonOnPress} [onPress] - Callback function to be called when one of the <RadioButton /> children is pressed.
 * @property {RadioButtonGroupOptions[]} [options] - The options to display, each option should have an id, label and state.
 * @property {RadioButtonGroupState} [state] - The state, can be 'default', 'inactive' or 'error'.
 * @property {string | undefined} [testID] - The testID, can be used for unit tests.
 */
export interface RadioButtonGroupProps {
  accessibilityLabel: string;
  direction?: RadioButtonGroupDirection;
  errorMessage?: string;
  helperText?: string;
  legend?: InputLabelProps;
  onPress: RadioButtonOnPress;
  options?: RadioButtonGroupOptions[];
  state?: RadioButtonGroupState;
  testID?: string;
}
