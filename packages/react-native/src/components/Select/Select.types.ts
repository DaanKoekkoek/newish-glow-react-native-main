import type { PickerItemProps, PickerProps } from "@react-native-picker/picker";

import type { InputFieldProps } from "../InputField";

/**
 * Represents the properties for an select component.
 *
 * @export
 * @interface SelectProps
 * @extends {Omit<InputFieldProps>}
 */
export interface SelectProps
  extends Omit<
    InputFieldProps,
    "type" | "autoComplete" | "children" | "onChange" | "onChangeText"
  > {
  /**
   * The options to display in the select.
   *
   * @type {string | number}
   * @memberof SelectProps
   */
  options: PickerItemProps[];

  /**
   * The functio
   *
   * @type {(itemValue: string, itemIndex: number) => void}
   * @memberof SelectProps
   */
  onValueChange?: PickerProps["onValueChange"];
}
