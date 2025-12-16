import { ChangeEvent } from "react";
import type { BaseInputType } from "_internals/Form";
import { InputValidated } from "components/index";
import { OdidoPalette } from "_internals/Color";

/**
 * Props for the RadioButtonGroup.
 * @type RadioButtonProps
 * @extends {BaseInputType}
 * @property {string} id - Applies an `id` attribute to the radio button.
 * @property {string} [label] - Generates a label to the left of the radio button.
 * @property {(value?: string | number | readonly string[]) => void} [onChange] - Callback is fired when a radio button is checked
 * @property {string} [testID='radio-button'] - Set the testID on the container.
 * @property {OdidoPalette} [palette='default'] - Set the glow gradient. Only applicable for the Odido brand.
 * @property {InputValidated} [validated] - Set the validation state for the radio button.
 */
export type RadioButtonProps = BaseInputType & {
  id: string;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  testID?: string;
  palette?: OdidoPalette;
  validated?: InputValidated;
};
