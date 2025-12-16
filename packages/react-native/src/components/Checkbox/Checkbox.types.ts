import type { ReactElement } from "react";
import type { ViewStyle } from "react-native";

import type { CheckboxState } from "../CheckboxGroup";
import type { InputLabelProps } from "../InputField";

export type CheckboxOnPressProps = { id: string; checked: boolean };

/**
 * Props for the Checkbox component.
 * @typedef {Object} CheckboxProps
 * @property {string} [accessibilityLabelledBy] - Accessibility requirement, but gets filled automatically when using ControlGroup component.
 * @property {boolean} [checked] - Specifies whether the checkbox is checked.
 * @property {string} [containerStyle] - The style of the container.
 * @property {string} [errorMessage] - The error message to display when there's an error.
 * @property {string} [helperText] - The text to help the user understand the options and the content of the options.
 * @property {string} [id] - The id to update the state with.
 * @property {boolean} [indeterminate] - Specify whether the checkbox is indeterminate.
 * @property {string | React.ReactElement} [label] - The label for the checkbox.
 * @property {InputLabelProps} [legend] - The legend for the checkbox. I can provide some extra context or information about the checkbox.
 * @property {(isChecked: boolean) => void} [onPress] - Callback function to be called when the checkbox is pressed.
 * @property {CheckboxState} [state] - The state of the checkbox. Can be 'default', 'inactive' or 'error'.
 * @property {string | undefined} [testID] - The state of the checkbox. Can be 'default', 'inactive' or 'error'.
 * @property {boolean} [isHovered] - Represents whether the checkbox is in a hovered state.
 */
export interface CheckboxProps {
  accessibilityLabelledBy?: string;
  checked?: boolean;
  containerStyle?: ViewStyle;
  errorMessage?: string;
  helperText?: string;
  id: string;
  indeterminate?: boolean;
  label?: string | ReactElement;
  legend?: InputLabelProps;
  onPress: ({ id, checked }: CheckboxOnPressProps) => void;
  state?: CheckboxState;
  testID?: string;
  isHovered?: boolean;
}
