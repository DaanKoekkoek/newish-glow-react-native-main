import type { InputFieldProps } from "../InputField";

/**
 * Represents the properties for a TextArea component.
 *
 * Extends from InputFieldProps, omitting certain properties
 * and adding specific ones for TextArea.
 *
 * @export
 * @interface TextAreaProps
 */
export type TextAreaProps = Omit<
  InputFieldProps,
  "minDate" | "maxDate" | "type"
> & {
  /**
   * The number of lines to display in the TextArea component.
   *
   * @type {number}
   */
  numberOfLines?: number;
};
