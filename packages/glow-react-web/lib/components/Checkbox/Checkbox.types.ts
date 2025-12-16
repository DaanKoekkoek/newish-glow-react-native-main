import { OdidoPalette } from "_internals/Color";
import type { LegendProps, BaseInputType } from "_internals/Form";
import type { ReactElement } from "react";

export type CheckboxState = "default" | "inactive" | "error";

export type CheckboxOnChangeProps = { id: string; checked: boolean };

/**
 * Props for the Checkbox component.
 * @typedef {Object} CheckboxProps
 * @extends {BaseInputType}
 * @property {string} [className] - The className of the checkbox.
 * @property {string} [errorMessage] - The error message to display when there's an error.
 * @property {string} [helperText] - The text to help the user understand the options and the content of the options.
 * @property {string} [id] - The id to update the state with.
 * @property {boolean} [indeterminate] - Specify whether the checkbox is indeterminate.
 * @property {string | React.ReactElement} [label] - The label for the checkbox.
 * @property {LegendProps} [legend] - The legend for the checkbox. I can provide some extra context or information about the checkbox.
 * @property {CheckboxState} [state] - The state of the checkbox. Can be 'default', 'inactive' or 'error'.
 * @property {string | undefined} [testID] - The state of the checkbox. Can be 'default', 'inactive' or 'error'.
 * @property {boolean} [isStretched] - Represents whether the checkbox should stretch across parent.
 * @property {OdidoPalette} [palette='default'] - Generates a glow gradient based on palette.
 * @property {(isChecked: boolean) => void} [onChange] - Callback function to be called when the checkbox is clicked.
 */
export type CheckboxProps = BaseInputType & {
  id: string;
  className?: string;
  errorMessage?: string;
  helperText?: string;
  indeterminate?: boolean;
  label?: string | ReactElement;
  legend?: LegendProps;
  state?: CheckboxState;
  testID?: string;
  isStretched?: boolean;
  palette?: OdidoPalette;
  onChange?: ({ id, checked }: CheckboxOnChangeProps) => void;
};
