import type { InputVariant } from "components/InputField";
import { FocusEvent } from "react";

export interface NumberFieldProps {
  id?: string;
  testID?: string;
  value?: number | string;
  defaultValue?: string | number;
  size?: "default" | "sm";
  state?: InputVariant;
  masked?: boolean;
  min?: number;
  max?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (value: number) => void;
}
