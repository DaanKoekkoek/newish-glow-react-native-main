import { OdidoPalette } from "_internals/Color";

export type ToggleSize = "default" | "lg" | "xl";

export type ToggleLabelOptions = "aanuit" | "onoff" | "yesno" | "janee";

/**
 * Props for the Toggle component.
 * @type {ToggleProps}
 * @extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange">
 * @property {string} id - Unique identifier for the toggle.
 * @property {"default" | "lg" | "xl"} [size] - Size variant of the toggle.
 * @property {boolean} [checked] - Determines if the toggle is checked.
 * @property {boolean} [disabled] - Whether the toggle is disabled.
 * @property {string} [labelText] - Text to display as a label.
 * @property {string} [testID] - Test identifier for testing frameworks.
 * @property {boolean} [stretched] - Whether the toggle should stretch to fill its container.
 * @property {OdidoPalette} [palette='default'] - Sets the glow gradient.
 * @property {React.ChangeEventHandler<HTMLInputElement>} [onChange] - Callback function triggered when toggle state changes.
 */
export type ToggleProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "size" | "onChange"
> & {
  id: string;
  size?: ToggleSize;
  labelText?: ToggleLabelOptions;
  testID?: string;
  stretched?: boolean;
  palette?: OdidoPalette;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
