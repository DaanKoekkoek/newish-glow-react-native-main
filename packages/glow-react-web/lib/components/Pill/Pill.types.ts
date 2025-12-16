import { OdidoPalette } from "_internals/Color";
import { BaseInputType } from "_internals/Form";
import { PhoneBrandName } from "foundations/PhoneBrand/PhoneBrand.types";
import { ChangeEventHandler } from "react";

/**
 * Represents the varian of Pill.
 * @type {"default" | "logo"}
 */
export type PillVariant = "default" | "logo";

/**
 * Represents the state of Pill.
 * @type {"default" | "inactive"}
 */
export type PillState = "default" | "inactive";

/**
 * Base props for the Pill component.
 * @typedef {Object} PillProps
 * @extends {BaseInputType}
 * @property {string} [title] - The title of the pill.
 * @property {string} [name] - The name of the pill.
 * @property {string} value - The value of the pill.
 * @property {boolean} [checked] - Indicates if the pill is checked.
 * @property {PillVariant} [variant] - The variant of the pill.
 * @property {PhoneBrandName} [brand] - The brand name of the pill.
 * @property {"default" | "inactive"} [state] - The state of the pill.
 * @property {ChangeEventHandler<HTMLInputElement>} onChange - The change event handler for the pill.
 * @property {string} [testID] - The test ID for the pill.
 * @property {OdidoPalette} [palette='default'] - Changes the gradient color based on the selected palette.
 */

export type PillProps = Omit<BaseInputType, "disabled"> & {
  title?: string;
  id?: string;
  variant?: PillVariant;
  brand?: PhoneBrandName;
  state?: PillState;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  testID?: string;
  palette?: OdidoPalette;
};
