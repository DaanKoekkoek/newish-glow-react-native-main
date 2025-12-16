import type {
  NativeSyntheticEvent,
  TextInput,
  TextInputChangeEventData,
  TextInputFocusEventData,
} from "react-native";

import type { InputVariant } from "../InputField/Input.types";

export type NativeNumberFieldProps = Omit<
  React.ComponentProps<typeof TextInput>,
  | "onSelectionChange"
  | "onChangeText"
  | "keyboardType"
  | "inputMode"
  | "value"
  | "onChange"
>;

export interface NumberFieldProps extends NativeNumberFieldProps {
  value?: number | string;
  size?: "default" | "sm";
  state?: InputVariant;
  masked?: boolean;
  min?: number;
  max?: number;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChange?: (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    value: number,
  ) => void;
  allowFontScaling?: boolean;
}
