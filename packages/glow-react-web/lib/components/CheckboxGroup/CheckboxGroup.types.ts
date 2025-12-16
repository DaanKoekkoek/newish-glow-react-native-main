import type { ReactElement } from "react";

import type { CheckboxProps, CheckboxState } from "../Checkbox/Checkbox.types";
import { LegendProps } from "_internals/Form";

/**
 * Component props.
 * @typedef {Object} CheckboxGroupProps
 * @property {(ReactElement<CheckboxProps> | ReactElement<CheckboxProps>)[]} children - Children restricted to Checkbox components.
 * @property {string} [errorMessage] - The error message to display the content of the error.
 * @property {string} [helperText] - A descriptive message to help the user to make an interaction.
 * @property {LegendProps} [legend] - The legend position at the top, can be used for additional information.
 * @property {CheckboxState} [state] - The state of the checkbox. Can be 'default', 'inactive' or 'error'.
 * @property {string} [testID] - The testID to be used in the component.
 */

export interface CheckboxGroupProps {
  children?: ReactElement<CheckboxProps> | ReactElement<CheckboxProps>[];
  errorMessage?: string;
  helperText?: string;
  legend?: LegendProps;
  state?: CheckboxState;
  testID?: string;
}
