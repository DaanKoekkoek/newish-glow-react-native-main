import type { GestureResponderEvent } from "react-native";

export type ToggleSize = "default" | "lg" | "xl";

export interface ToggleProps {
  ariaLabel: string;
  onPress: (isChecked?: boolean, event?: GestureResponderEvent) => void;
  inactive?: boolean;
  size?: ToggleSize;
  label?: boolean;
  labelText?: "Ja/Nee" | "Yes/No" | "Aan/Uit" | "On/Off";
  isSelected?: boolean;
  isHovered?: boolean;
  testID?: string | undefined;
}

export interface ToggleBaseProps extends Required<ToggleProps> {}
