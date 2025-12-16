import type {
  GestureResponderEvent,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInputFocusEventData,
} from "react-native";

import type { InputVariant } from "../InputField/Input.types";
import type { NumberFieldProps } from "../NumberField/NumberField.types";

export interface NumberInputProps extends NumberFieldProps {
  value?: number | string;
  size?: "default" | "sm";
  state?: InputVariant;
  min?: number;
  max?: number;
  step?: number;
  onIncrement?: (e: GestureResponderEvent, value: number) => void;
  onDecrement?: (e: GestureResponderEvent, value: number) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChange?: (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    value: number,
  ) => void;
}
